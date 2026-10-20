import { existsSync, statSync } from "node:fs";
import { checkExercise, gradeDictation } from "../js/check.js";
import { buildReview, masteryOf, recommendLesson, suggestLevel, suggestLevelFromAnswers } from "../js/adapt.js";
import { freshState } from "../js/storage.js";
import { shuffleBank, shuffleOptions } from "../js/util.js";
import { groupVocab } from "../js/vocab-groups.js";
import { vocabAudio } from "../data/vocab-audio.js";
import { pronunciationItems } from "../data/pronunciation.js";
import { readingPlain, sentencesOf } from "../data/readings.js";
import { clipAudio } from "../data/clip-audio.js";
import {
  LEVELS,
  allVocab,
  conceptById,
  concepts,
  coreLessons,
  jobLessons,
  lessons,
  placement,
  readings,
} from "../data/catalog.js";

const errors = [];
const fail = (message) => errors.push(message);

const levels = new Set(LEVELS);
const conceptIds = new Set(concepts.map((concept) => concept.id));
if (conceptIds.size !== concepts.length) fail("Duplicate concept ids");

const lessonIds = new Set();
const exerciseIds = new Set();
const vocabIds = new Set();
const types = new Set();

function nonEmpty(value, label) {
  if (typeof value !== "string" || value.trim() === "") fail(`${label} is empty`);
}

function counts(list) {
  const map = new Map();
  for (const item of list) map.set(item, (map.get(item) || 0) + 1);
  return map;
}

function checkExerciseShape(exercise, label) {
  nonEmpty(exercise.id, `${label} id`);
  if (exerciseIds.has(exercise.id)) fail(`Duplicate exercise id ${exercise.id}`);
  exerciseIds.add(exercise.id);
  if (!conceptIds.has(exercise.concept)) fail(`${exercise.id} uses unknown concept ${exercise.concept}`);
  types.add(exercise.type);
  nonEmpty(exercise.prompt, `${exercise.id} prompt`);
  nonEmpty(exercise.explanation, `${exercise.id} explanation`);
  if (exercise.type === "mc") {
    if (!Array.isArray(exercise.options) || exercise.options.length < 2) fail(`${exercise.id} needs options`);
    if (new Set(exercise.options).size !== exercise.options.length) fail(`${exercise.id} has duplicate options`);
    const accepted = exercise.answers?.length ? exercise.answers : [exercise.answer];
    for (const answer of accepted) {
      if (!exercise.options.includes(answer)) fail(`${exercise.id} accepted answer is not an option: ${answer}`);
    }
    nonEmpty(exercise.answer, `${exercise.id} answer`);
  } else if (exercise.type === "order") {
    const solutions = exercise.solutions?.length ? exercise.solutions : [exercise.solution];
    if (!solutions.length || solutions.some((row) => !Array.isArray(row) || row.length < 2)) {
      fail(`${exercise.id} needs a solution`);
    }
    for (const solution of solutions) {
      const available = counts(exercise.words || []);
      for (const token of solution) {
        const left = available.get(token) || 0;
        if (!left) fail(`${exercise.id} solution token missing from words: ${token}`);
        available.set(token, left - 1);
      }
    }
  } else {
    fail(`${exercise.id} has unknown type ${exercise.type}. Use mc or order only.`);
  }
  if (exercise.type === "mc" && exercise.text && !String(exercise.text).includes("___")) {
    fail(`${exercise.id} gap text should contain ___`);
  }
  if (/^skriv\b/i.test(exercise.prompt)) fail(`${exercise.id} still asks the learner to type`);
}

if (lessons.length < 40) fail(`Expected at least 40 lessons, found ${lessons.length}`);
if (jobLessons.length < 6) fail(`Expected at least 6 Jobbnorsk lessons, found ${jobLessons.length}`);
for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
  if (!coreLessons.some((lesson) => lesson.level === level)) fail(`No core lesson at ${level}`);
}
const dense = coreLessons.filter((lesson) => lesson.level === "B2" || lesson.level === "C1").length;
const early = coreLessons.filter((lesson) => lesson.level === "A1" || lesson.level === "A2").length;
if (dense <= early) fail("B2–C1 should have denser coverage than A1–A2");

for (const lesson of lessons) {
  if (lessonIds.has(lesson.id)) fail(`Duplicate lesson id ${lesson.id}`);
  lessonIds.add(lesson.id);
  if (!levels.has(lesson.level)) fail(`${lesson.id} has bad level ${lesson.level}`);
  if (lesson.track !== "core" && lesson.track !== "jobb") fail(`${lesson.id} has bad track`);
  if (lesson.minutes < 10 || lesson.minutes > 15) fail(`${lesson.id} minutes out of range`);
  nonEmpty(lesson.title, `${lesson.id} title`);
  nonEmpty(lesson.titleEn, `${lesson.id} titleEn`);
  nonEmpty(lesson.maal, `${lesson.id} maal`);
  nonEmpty(lesson.husk, `${lesson.id} husk`);
  if (!lesson.intro || lesson.intro.length < 120) fail(`${lesson.id} intro is too short`);
  if (!/[æøåÆØÅ]/.test(`${lesson.title} ${lesson.husk} ${lesson.examples.map((example) => example.no).join(" ")}`)) {
    fail(`${lesson.id} does not contain Norwegian letters`);
  }
  if (!Array.isArray(lesson.concepts) || lesson.concepts.length === 0) fail(`${lesson.id} needs concepts`);
  for (const conceptId of lesson.concepts) {
    if (!conceptIds.has(conceptId)) fail(`${lesson.id} references unknown concept ${conceptId}`);
  }
  if (!Array.isArray(lesson.examples) || lesson.examples.length < 2) fail(`${lesson.id} needs examples`);
  for (const example of lesson.examples) {
    nonEmpty(example.no, `${lesson.id} example no`);
    nonEmpty(example.en, `${lesson.id} example en`);
  }
  if (lesson.vocab.length < 5 || lesson.vocab.length > 10) fail(`${lesson.id} vocab count ${lesson.vocab.length}`);
  if (lesson.exercises.length < 8 || lesson.exercises.length > 12) {
    fail(`${lesson.id} exercise count ${lesson.exercises.length}`);
  }
  for (const word of lesson.vocab) {
    if (vocabIds.has(word.id)) fail(`Duplicate vocab id ${word.id}`);
    vocabIds.add(word.id);
    for (const field of ["no", "en", "example", "exampleEn"]) nonEmpty(word[field], `${word.id} ${field}`);
  }
  for (const exercise of lesson.exercises) {
    checkExerciseShape(exercise, lesson.id);
    if (!lesson.concepts.includes(exercise.concept)) {
      fail(`${exercise.id} concept ${exercise.concept} is not on lesson ${lesson.id}`);
    }
  }
}

for (const word of allVocab()) {
  if (!vocabIds.has(word.id)) vocabIds.add(word.id);
  for (const field of ["no", "en", "example", "exampleEn"]) nonEmpty(word[field], `${word.id} ${field}`);
}
const bankIds = new Set();
for (const word of allVocab()) {
  if (bankIds.has(word.id)) fail(`Duplicate vocab id ${word.id}`);
  bankIds.add(word.id);
}

const headwords = new Set(allVocab().map((word) => word.no.trim().toLowerCase()));
if (headwords.size < 300) fail(`Expected at least 300 vocabulary items, found ${headwords.size}`);

if (placement.items.length < 22 || placement.items.length > 28) {
  fail(`Placement has ${placement.items.length} items`);
}
const hardWeight = placement.items.filter((item) => item.band === "C1").reduce((sum, item) => sum + item.weight, 0);
if (hardWeight < 9) fail("Placement needs enough C1 weight");
const perfect = placement.items.map(() => ({ ok: true }));
const missedHard = placement.items.map((item) => ({ ok: item.band !== "C1" }));
if (suggestLevelFromAnswers(perfect, placement.items) !== "C2") fail("A perfect weighted placement should suggest C2");
if (suggestLevelFromAnswers(missedHard, placement.items) === "C1" || suggestLevelFromAnswers(missedHard, placement.items) === "C2") {
  fail("Missing every C1 item should not suggest C1 or C2");
}
for (const exercise of placement.items) checkExerciseShape(exercise, "placement");

for (const concept of concepts) {
  if (!lessons.some((lesson) => lesson.exercises.some((exercise) => exercise.concept === concept.id))) {
    fail(`Concept ${concept.id} is never exercised`);
  }
}
for (const type of ["mc", "order"]) {
  if (!types.has(type)) fail(`Missing exercise type ${type}`);
}
if ([...types].some((type) => type !== "mc" && type !== "order")) {
  fail(`Only mc and order are allowed, found ${[...types].join(", ")}`);
}

if (readings.length < 20) fail(`Expected at least 20 readings, found ${readings.length}`);
const longC1 = readings.filter((reading) => reading.level === "C1" && readingPlain(reading).split(/\s+/).filter(Boolean).length >= 300);
if (longC1.length < 4) fail(`Expected at least 4 C1 readings of 300 words, found ${longC1.length}`);
const dialogues = readings.filter((reading) => reading.dialogue);
if (dialogues.length < 3) fail(`Expected at least 3 two-voice dialogues, found ${dialogues.length}`);
for (const reading of dialogues) {
  const voices = new Set(sentencesOf(reading).map((sentence) => sentence.voice));
  if (voices.size < 2) fail(`${reading.id} should use two voices`);
}
const readingIds = new Set();
for (const reading of readings) {
  if (readingIds.has(reading.id)) fail(`Duplicate reading id ${reading.id}`);
  readingIds.add(reading.id);
  if (!levels.has(reading.level)) fail(`${reading.id} has bad level`);
  nonEmpty(reading.title, `${reading.id} title`);
  nonEmpty(reading.audio, `${reading.id} audio`);
  if (!String(reading.voice || "").endsWith("Neural")) fail(`${reading.id} needs a neural nb-NO voice`);
  if (!reading.audio.endsWith(".mp3")) fail(`${reading.id} audio must be an mp3`);
  if (!existsSync(reading.audio)) fail(`${reading.id} missing audio file ${reading.audio}`);
  else if (statSync(reading.audio).size < 8000) fail(`${reading.id} audio file is too small`);
  if (!Array.isArray(reading.paragraphs) || !reading.paragraphs.length) fail(`${reading.id} needs paragraphs`);
  const sentences = sentencesOf(reading);
  if (sentences.length < 3) fail(`${reading.id} needs sentences`);
  for (const sentence of sentences) {
    if (!existsSync(sentence.audio)) fail(`${reading.id} missing sentence audio ${sentence.audio}`);
    else if (statSync(sentence.audio).size < 700) fail(`${sentence.audio} is too small`);
  }
  const text = sentences.map((sentence) => sentence.text).join(" ");
  if (text.split(/\s+/).filter(Boolean).length < 75) fail(`${reading.id} text is too short`);
  if (!/[æøåÆØÅ]/.test(text)) fail(`${reading.id} text has no Norwegian letters`);
  if (!Array.isArray(reading.dictation) || reading.dictation.length < 3) fail(`${reading.id} needs at least 3 dictation sentences`);
  for (const line of reading.dictation || []) {
    if (!sentences.some((sentence) => sentence.text === line)) fail(`${reading.id} dictation line is not a sentence: ${line}`);
  }
  if (!Array.isArray(reading.questions) || reading.questions.length < 3) fail(`${reading.id} needs at least 3 questions`);
  for (const exercise of reading.questions) {
    checkExerciseShape(exercise, reading.id);
    if (exercise.type !== "mc") fail(`${exercise.id} reading questions must be multiple choice`);
  }
}

const ordbank = groupVocab(allVocab());
for (const lesson of lessons) {
  for (const example of lesson.examples) {
    const key = example.no.replace(/\s+/g, " ").trim();
    const path = clipAudio[key];
    if (!path || !existsSync(path) || statSync(path).size < 400) fail(`Missing example audio for ${lesson.id}: ${key}`);
  }
}
for (const item of pronunciationItems()) {
  const path = `audio/uttale/${item.id}.mp3`;
  if (!existsSync(path) || statSync(path).size < 400) fail(`Missing pronunciation audio ${path}`);
}
if (!ordbank.some((group) => group.display === "ei/en uke")) fail("Expected ei uke and en uke to merge as ei/en uke");
if (ordbank.some((group) => group.display === "ei uke" || group.display === "en uke")) fail("ei uke / en uke should not stay as separate ordbank rows");
for (const group of ordbank) {
  const path = vocabAudio[group.ids[0]];
  if (!path) fail(`Missing vocab audio for ${group.display}`);
  else if (!existsSync(path) || statSync(path).size < 400) fail(`Vocab audio missing or short: ${group.display}`);
}
if (!gradeDictation("Hei, Kari!", "hei kari").ok) fail("Dictation should ignore case and punctuation");
if (gradeDictation("Hei, Kari!", "hei nora").ok) fail("Dictation accepted a wrong word");
if (!gradeDictation("Bussen skulle gå klokka 07.32.", "bussen skulle gå klokka sju tretti to").ok) {
  fail("Dictation should accept the spoken form of 07.32");
}
const spelled = gradeDictation("Hun retter budsjettet.", "hun retter budsjetet");
if (spelled.ok || !spelled.diff.some((part) => part.type === "spell" && part.letters?.some((letter) => letter.type === "missing"))) {
  fail("A one-letter dictation miss should be shown inside the word");
}
const orderSample = lessons.flatMap((lesson) => lesson.exercises).find((exercise) => exercise.id === "c1-07-e5");
if (!orderSample?.solutions || orderSample.solutions.length < 2) fail("c1-07-e5 should accept the fronted time phrase");
if (!checkExercise(orderSample, ["I", "oktober", "føres", "periodiseringen"]).ok) {
  fail("I oktober føres periodiseringen should be accepted");
}
if (!checkExercise(orderSample, orderSample.solution).ok) fail("Primary order solution should still pass");

const sample = lessons[0].exercises.find((exercise) => exercise.type === "mc");
if (!checkExercise(sample, sample.answer).ok) fail("checkExercise failed on a known answer");
if (checkExercise(sample, "__nope__").ok) fail("checkExercise accepted a wrong answer");

const state = freshState();
state.profile = { level: "B2", source: "manual", placement: null, createdAt: "2026-10-17" };
const recommended = recommendLesson(state, lessons);
if (!recommended || recommended.level !== "B2" || recommended.track !== "core") {
  fail(`Expected a B2 core lesson for a new B2 profile, got ${recommended?.id}`);
}
if (suggestLevel(18, 20) !== "C1") fail("suggestLevel 18/20 should be C1");
if (suggestLevel(14, 20) !== "B2") fail("suggestLevel 14/20 should be B2");
if (masteryOf(8, 8) !== 100) fail("masteryOf(8, 8) should be 100");

for (const concept of concepts) {
  state.concepts[concept.id] = concept.id.charCodeAt(0) % 2 === 0 ? { correct: 8, attempts: 8 } : { correct: 1, attempts: 8 };
}
for (const lesson of lessons) state.lessons[lesson.id] = { completed: true, started: true, lastAt: "2026-01-01T00:00:00.000Z" };
const review = buildReview(state, lessons, new Map(allVocab().map((word) => [word.id, word])), 10);
if (review.items.length !== 10) fail(`Review size ${review.items.length}`);
if (review.weakCount < 6) fail(`Review weak count too low: ${review.weakCount}`);

// Answer positions must not give the answer away. The data lists the correct
// option first, so the app has to shuffle options and word banks at render time.
const allExercises = [...lessons.flatMap((lesson) => lesson.exercises), ...placement.items];
const sameMembers = (a, b) => a.length === b.length && [...a].sort().join("\u0000") === [...b].sort().join("\u0000");
for (const exercise of allExercises.filter((entry) => entry.type === "mc")) {
  const seen = new Set();
  for (let run = 0; run < 200; run += 1) {
    const shown = shuffleOptions(exercise.options);
    if (!sameMembers(shown, exercise.options)) {
      fail(`${exercise.id} shuffleOptions changed the option set`);
      break;
    }
    if (!checkExercise(exercise, shown[shown.indexOf(exercise.answer)]).ok) fail(`${exercise.id} answer not accepted after shuffle`);
    seen.add(shown.indexOf(exercise.answer));
  }
  if (seen.size < exercise.options.length) {
    fail(`${exercise.id} answer only appeared at positions ${[...seen].join(",")} after shuffling`);
  }
}
for (const exercise of allExercises.filter((entry) => entry.type === "order")) {
  if (new Set(exercise.words).size < 2) continue;
  for (let run = 0; run < 100; run += 1) {
    const alternatives = exercise.solutions?.length > 1 ? exercise.solutions.slice(1) : [];
    const bank = shuffleBank(exercise.words, exercise.solution, (word) => word, alternatives);
    if (!sameMembers(bank, exercise.words)) {
      fail(`${exercise.id} shuffleBank changed the word set`);
      break;
    }
    const solutions = exercise.solutions?.length ? exercise.solutions : [exercise.solution];
    if (solutions.some((solution) => solution.every((word, index) => bank[index] === word))) {
      fail(`${exercise.id} word bank was shown in solved order`);
      break;
    }
  }
}

if (!conceptById.v2 || !conceptById["adverb-sub"] || !conceptById.possessives) fail("Missing expected concepts");

if (errors.length) {
  console.error(`Validation failed with ${errors.length} problem(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const lessonExercises = lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0);
console.log(
  `OK: ${lessons.length} lessons (${coreLessons.length} core, ${jobLessons.length} jobb), ${lessonExercises} lesson exercises, ${readings.length} readings, ${headwords.size} vocabulary items, ${placement.items.length} placement items, ${concepts.length} concepts.`,
);

import { checkExercise } from "../js/check.js";
import { buildReview, masteryOf, recommendLesson, suggestLevel } from "../js/adapt.js";
import { freshState } from "../js/storage.js";
import { shuffleBank, shuffleOptions } from "../js/util.js";
import {
  LEVELS,
  allVocab,
  conceptById,
  concepts,
  coreLessons,
  jobLessons,
  lessons,
  placement,
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
    if (!exercise.options.includes(exercise.answer)) fail(`${exercise.id} answer is not one of the options`);
    nonEmpty(exercise.answer, `${exercise.id} answer`);
  } else if (exercise.type === "fill") {
    if (!String(exercise.text || "").includes("___")) fail(`${exercise.id} fill text needs ___`);
    if (!Array.isArray(exercise.answers) || exercise.answers.length === 0) fail(`${exercise.id} needs answers`);
    exercise.answers.forEach((answer, index) => nonEmpty(answer, `${exercise.id} answer ${index}`));
  } else if (exercise.type === "order") {
    if (!Array.isArray(exercise.solution) || exercise.solution.length < 2) fail(`${exercise.id} needs a solution`);
    const available = counts(exercise.words || []);
    for (const token of exercise.solution) {
      const left = available.get(token) || 0;
      if (!left) fail(`${exercise.id} solution token missing from words: ${token}`);
      available.set(token, left - 1);
    }
  } else if (exercise.type === "fix" || exercise.type === "rewrite") {
    nonEmpty(exercise.type === "fix" ? exercise.wrong : exercise.source, `${exercise.id} source`);
    if (!Array.isArray(exercise.answers) || exercise.answers.length === 0) fail(`${exercise.id} needs answers`);
    exercise.answers.forEach((answer, index) => nonEmpty(answer, `${exercise.id} answer ${index}`));
  } else {
    fail(`${exercise.id} has unknown type ${exercise.type}`);
  }
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

if (placement.items.length < 18 || placement.items.length > 24) {
  fail(`Placement has ${placement.items.length} items`);
}
for (const exercise of placement.items) checkExerciseShape(exercise, "placement");

for (const concept of concepts) {
  if (!lessons.some((lesson) => lesson.exercises.some((exercise) => exercise.concept === concept.id))) {
    fail(`Concept ${concept.id} is never exercised`);
  }
}
for (const type of ["mc", "fill", "order", "fix", "rewrite"]) {
  if (!types.has(type)) fail(`Missing exercise type ${type}`);
}

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
    const bank = shuffleBank(exercise.words, exercise.solution);
    if (!sameMembers(bank, exercise.words)) {
      fail(`${exercise.id} shuffleBank changed the word set`);
      break;
    }
    if (exercise.solution.every((word, index) => bank[index] === word)) {
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

console.log(
  `OK: ${lessons.length} lessons (${coreLessons.length} core, ${jobLessons.length} jobb), ${exerciseIds.size} exercises, ${headwords.size} vocabulary items, ${placement.items.length} placement items, ${concepts.length} concepts.`,
);

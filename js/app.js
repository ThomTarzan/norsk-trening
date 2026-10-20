import {
  LEVELS,
  allVocab,
  conceptById,
  concepts,
  jobLessons,
  lessonMap,
  lessons,
  placement,
  readingMap,
  readings,
  vocabMap,
} from "../data/catalog.js";
import { buildReview, conceptMastery, dueCount, jobSuggestion, recommendLesson, suggestLevelFromAnswers } from "./adapt.js";
import { checkExercise, gradeDictation } from "./check.js";
import { emptyCard, schedule } from "./srs.js";
import {
  exportPayload,
  freshState,
  loadState,
  markStudyDay,
  parseImport,
  recordConcept,
  refreshStreak,
  saveState,
} from "./storage.js";
import { esc, formatWhen, greeting, localISO, paragraphs, shuffle, shuffleBank, shuffleOptions } from "./util.js";
import { sentencesOf } from "../data/readings.js";
import { clipAudio } from "../data/clip-audio.js";
import { pronunciation, pronunciationItems } from "../data/pronunciation.js";
import { vocabAudio } from "../data/vocab-audio.js";
import { groupVocab } from "./vocab-groups.js";

const AUTH_KEY = "norsk-hver-dag-auth";
const PAGE_PASSWORD = "Tsvitana";

const lessonsById = lessonMap();
const readingsById = readingMap();
const wordsById = vocabMap();
let state = loadState();
if (refreshStreak(state)) saveState(state);
let mem = blankMem();
let focusMode = "route";
let loginNote = "";

function isAuthed() {
  return sessionStorage.getItem(AUTH_KEY) === "1" || localStorage.getItem(AUTH_KEY) === "1";
}

function blankMem() {
  return {
    draft: "",
    note: "",
    locked: false,
    feedback: null,
    choice: null,
    chips: null,
    options: null,
    query: "",
    theme: "alle",
    hideText: false,
    takes: {},
    recordingKey: "",
    micNote: "",
    level: "alle",
    showHelp: false,
    produceChecks: {},
  };
}

function resetAnswer() {
  mem.draft = "";
  mem.note = "";
  mem.locked = false;
  mem.feedback = null;
  mem.choice = null;
  mem.chips = null;
  mem.options = null;
}

function save() {
  const session = state.session;
  if (session?.kind === "lesson" && !session.finalized) {
    const previous = state.lessons[session.lessonId] || {};
    state.lessons[session.lessonId] = {
      ...previous,
      started: true,
      cursor: {
        phase: session.phase,
        index: session.index || 0,
        answers: session.answers || [],
        vocabAdded: Boolean(session.vocabAdded),
      },
    };
  }
  saveState(state);
}

function lessonFromCursor(id) {
  const record = state.lessons[id];
  const cursor = record?.cursor;
  if (!cursor || record?.completed) return null;
  const phase = ["intro", "words", "quiz", "produce"].includes(cursor.phase) ? cursor.phase : "intro";
  return {
    kind: "lesson",
    lessonId: id,
    phase,
    index: phase === "quiz" ? Number(cursor.index) || 0 : 0,
    answers: Array.isArray(cursor.answers) ? cursor.answers : [],
    finalized: false,
    vocabAdded: Boolean(cursor.vocabAdded) || phase === "quiz",
  };
}

function route() {
  const parts = (location.hash || "#/").replace(/^#/, "").split("/").filter(Boolean);
  const name = parts[0] === "loyper" ? "kurs" : parts[0] || "home";
  return { name, id: parts[1] || "" };
}

function go(hash) {
  focusMode = "route";
  if (location.hash === hash) render();
  else location.hash = hash;
}

function announce(message) {
  const live = document.getElementById("live");
  if (!live) return;
  live.textContent = "";
  live.textContent = message;
}

function name() {
  return state.settings?.name?.trim() || "du";
}

function completedCount() {
  return Object.values(state.lessons).filter((lesson) => lesson.completed).length;
}

function ensureProfile(level) {
  if (state.profile) return;
  state.profile = {
    level,
    source: "manual",
    placement: null,
    createdAt: new Date().toISOString(),
  };
}

function conceptLabel(id) {
  return conceptById[id]?.name || id;
}

function tally(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

function coarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function wordClass(word) {
  if (word.pos) return word.pos;
  const head = String(word.no || "").toLowerCase();
  const article = head.match(/^(en|ei|et|å)\b/);
  return article ? article[1] : "other";
}

const THEME_LABEL = {
  kurs: "grammatikk",
  kobling: "bindeord",
  hverdag: "hverdag",
  arbeid: "arbeid",
  økonomi: "økonomi",
  luftfart: "luftfart",
  jobb: "jobb",
};

function themeLabel(theme) {
  return THEME_LABEL[theme] || theme;
}

const MIN_MASTERY_ATTEMPTS = 4;

function lessonRecord(id) {
  return state.lessons[id];
}

function startLesson(id, fresh = false) {
  const lesson = lessonsById.get(id);
  if (!lesson) return;
  ensureProfile(lesson.level === "C2" ? "C1" : lesson.level);
  const existing = state.session;
  const resume = !fresh && existing?.kind === "lesson" && existing.lessonId === id && !existing.finalized;
  if (fresh) {
    state.lessons[id] = { ...(state.lessons[id] || {}), cursor: null };
    state.session = {
      kind: "lesson",
      lessonId: id,
      phase: "intro",
      index: 0,
      answers: [],
      finalized: false,
      vocabAdded: false,
    };
    resetAnswer();
  } else if (!resume) {
    state.session = lessonFromCursor(id) || {
      kind: "lesson",
      lessonId: id,
      phase: "intro",
      index: 0,
      answers: [],
      finalized: false,
      vocabAdded: false,
    };
    resetAnswer();
  }
  state.lessons[id] = { ...(state.lessons[id] || {}), started: true };
  save();
  go(`#/leksjon/${id}`);
}

function startPlacement() {
  state.session = {
    kind: "placement",
    phase: "quiz",
    index: 0,
    answers: [],
    finalized: false,
  };
  resetAnswer();
  save();
  go("#/plassering");
}

function startReview() {
  const built = buildReview(state, lessons, wordsById, 8);
  const plan = built.items.map((item) => ({
    kind: item.kind,
    key: item.key,
    bucket: item.bucket,
    exerciseId: item.exercise?.id || null,
    vocabId: item.vocab?.id || null,
    cardId: item.cardId,
  }));
  const optionsByKey = {};
  for (const item of plan) {
    if (item.kind !== "vocab") continue;
    const word = wordsById.get(item.vocabId);
    if (!word) continue;
    const direction = Math.random() < 0.5 ? "en-no" : "no-en";
    item.direction = direction;
    const sameClass = allVocab().filter((other) => other.id !== word.id && wordClass(other) === wordClass(word));
    const pool = sameClass.length >= 3 ? sameClass : allVocab().filter((other) => other.id !== word.id);
    const wrong = shuffle(pool).slice(0, 3);
    const field = direction === "en-no" ? "no" : "en";
    optionsByKey[item.key] = shuffle([word[field], ...wrong.map((other) => other[field])]);
  }
  state.session = {
    kind: "review",
    phase: plan.length ? "quiz" : "empty",
    index: 0,
    answers: [],
    plan,
    optionsByKey,
    weakCount: built.weakCount,
    reviewCount: built.reviewCount,
    finalized: false,
  };
  resetAnswer();
  save();
  go("#/ovelse");
}

function introduceVocab(lesson) {
  if (state.session.vocabAdded) return;
  for (const word of lesson.vocab) {
    if (!state.srs[word.id]) {
      state.srs[word.id] = schedule(emptyCard("vocab", lesson.concepts[0]), 5);
    }
  }
  state.session.vocabAdded = true;
}

function currentTask() {
  const session = state.session;
  if (!session) return null;
  if (session.kind === "lesson") {
    const lesson = lessonsById.get(session.lessonId);
    if (!lesson || session.phase !== "quiz") return null;
    return { exercise: lesson.exercises[session.index], bucket: null, vocab: null };
  }
  if (session.kind === "placement" && session.phase === "quiz") {
    return { exercise: placement.items[session.index], bucket: null, vocab: null };
  }
  if (session.kind === "reading" && session.phase === "quiz") {
    const reading = readingsById.get(session.readingId);
    return { exercise: reading?.questions[session.index] || null, bucket: null, vocab: null };
  }
  if (session.kind === "concept" && session.phase === "quiz") {
    const exerciseId = session.plan[session.index];
    const exercise = lessons.flatMap((lesson) => lesson.exercises).find((entry) => entry.id === exerciseId);
    return { exercise, vocab: null, bucket: null };
  }
  if (session.kind === "review" && session.phase === "quiz") {
    const item = session.plan[session.index];
    if (!item) return null;
    if (item.kind === "vocab") return { exercise: null, vocab: wordsById.get(item.vocabId), bucket: item.bucket, item };
    const exercise = lessons.flatMap((lesson) => lesson.exercises).find((entry) => entry.id === item.exerciseId);
    return { exercise, vocab: null, bucket: item.bucket, item };
  }
  return null;
}

function submitCurrent() {
  if (mem.locked) return;
  const task = currentTask();
  if (!task) return;
  if (task.vocab) {
    if (!mem.choice) {
      mem.note = "Velg et svar først.";
      render();
      return;
    }
    const direction = task.item?.direction || "no-en";
    const expectedChoice = direction === "en-no" ? task.vocab.no : task.vocab.en;
    const ok = mem.choice === expectedChoice;
    const card = state.srs[task.vocab.id] || emptyCard("vocab", "");
    state.srs[task.vocab.id] = schedule(card, ok ? 5 : 0);
    if (card.concept && conceptById[card.concept]) recordConcept(state, card.concept, ok);
    state.session.answers.push({
      ok,
      concept: card.concept || "",
      id: task.vocab.id,
      bucket: task.bucket,
      given: mem.choice,
      prompt: direction === "en-no" ? task.vocab.en : task.vocab.no,
      expected: `${task.vocab.no} — ${task.vocab.en}`,
      explanation: task.vocab.exampleEn,
    });
    mem.locked = true;
    mem.feedback = {
      ok,
      given: mem.choice,
      expected: `${task.vocab.no} — ${task.vocab.en}`,
      explanation: task.vocab.exampleEn,
    };
    focusMode = "feedback";
    announce(ok ? "Riktig." : "Ikke helt.");
    save();
    render();
    return;
  }
  const exercise = task.exercise;
  if (!exercise) return;
  let input = null;
  if (exercise.type === "mc") {
    if (!mem.choice) {
      mem.note = "Velg et svar først.";
      render();
      return;
    }
    input = mem.choice;
  } else if (exercise.type === "order") {
    input = (mem.chips?.chosen || []).map((chip) => chip.word);
    if (!input.length) {
      mem.note = "Sett sammen setningen først.";
      render();
      return;
    }
  } else {
    input = mem.draft;
    if (!String(input).trim()) {
      mem.note = "Skriv inn et svar først.";
      render();
      return;
    }
  }
  const result = checkExercise(exercise, input);
  if (state.session.kind !== "placement") {
    recordConcept(state, exercise.concept, result.ok);
    const cardId = `ex:${exercise.id}`;
    if (!result.ok || state.srs[cardId]) {
      state.srs[cardId] = schedule(state.srs[cardId] || emptyCard("exercise", exercise.concept), result.ok ? 5 : 0);
    }
  }
  const given = exercise.type === "order" ? input.join(" ") : String(input ?? "");
  state.session.answers.push({
    id: exercise.id,
    ok: result.ok,
    concept: exercise.concept,
    bucket: task.bucket || null,
    expected: result.expected,
    given,
    explanation: exercise.explanation,
    prompt: exercise.prompt,
  });
  mem.locked = true;
  mem.feedback = {
    ok: result.ok,
    given,
    expected: result.expected,
    explanation: exercise.explanation,
    hidden: state.session.kind === "placement",
  };
  focusMode = "feedback";
  announce(state.session.kind === "placement" ? "Svaret er registrert." : result.ok ? "Riktig." : "Ikke helt.");
  save();
  render();
}

function nextStep() {
  const session = state.session;
  const taskCount =
    session.kind === "lesson"
      ? lessonsById.get(session.lessonId).exercises.length
      : session.kind === "placement"
        ? placement.items.length
        : session.kind === "reading"
          ? readingsById.get(session.readingId).questions.length
          : session.plan.length;
  resetAnswer();
  if (session.kind === "lesson" && session.index + 1 >= taskCount) {
    const lesson = lessonsById.get(session.lessonId);
    if (lesson?.produce && session.phase === "quiz") {
      session.phase = "produce";
      focusMode = "route";
      save();
      render();
      return;
    }
  }
  if (session.index + 1 < taskCount) {
    session.index += 1;
    focusMode = "route";
    save();
    render();
    return;
  }
  finishSession();
}

function finishSession() {
  const session = state.session;
  if (session.finalized) {
    session.phase = "done";
    render();
    return;
  }
  const correct = session.answers.filter((answer) => answer.ok).length;
  const total = session.answers.length;
  const score = total ? Math.round((100 * correct) / total) : 0;
  session.score = score;
  session.finalized = true;
  session.phase = "done";
  if (session.kind === "placement") {
    for (const answer of session.answers) recordConcept(state, answer.concept, answer.ok);
    session.result = {
      correct,
      total,
      score,
      suggested: suggestLevelFromAnswers(session.answers, placement.items),
    };
  } else if (session.kind === "lesson") {
    const previous = state.lessons[session.lessonId] || {};
    state.lessons[session.lessonId] = {
      ...previous,
      started: true,
      completed: true,
      lastScore: score,
      bestScore: Math.max(previous.bestScore || 0, score),
      times: (previous.times || 0) + 1,
      lastAt: new Date().toISOString(),
      cursor: null,
    };
    markStudyDay(state);
  } else if (session.kind === "reading") {
    const previous = state.readings[session.readingId] || {};
    state.readings[session.readingId] = {
      ...previous,
      completed: true,
      lastScore: score,
      bestScore: Math.max(previous.bestScore || 0, score),
      lastAt: new Date().toISOString(),
    };
    markStudyDay(state);
  } else if ((session.kind === "review" || session.kind === "concept") && total > 0) {
    markStudyDay(state);
  }
  focusMode = "route";
  save();
  render();
}

function confirmLevel(level, source) {
  const placementResult = state.session?.kind === "placement" ? state.session.result : null;
  state.profile = {
    createdAt: state.profile?.createdAt || new Date().toISOString(),
    level,
    source,
    placement: placementResult
      ? { ...placementResult, at: new Date().toISOString() }
      : state.profile?.placement || null,
  };
  if (state.session?.kind === "placement") state.session = null;
  save();
  go("#/");
}

function isNorwegianParagraph(text) {
  if (/[æøåÆØÅ]/.test(text)) return true;
  const lower = ` ${text.toLowerCase()} `;
  const english = [" the ", " and ", " is ", " are ", " of ", " with ", " that ", " this ", " you ", " not "].filter((word) =>
    lower.includes(word),
  ).length;
  const norwegian = [" jeg ", " ikke ", " fordi ", " når ", " hvis ", " som ", " en ", " et "].filter((word) =>
    lower.includes(word),
  ).length;
  return norwegian > english && text.length > 24;
}

function inlineNorwegian(text) {
  return esc(text).replace(/«([^»]+)»/g, "«<span lang=\"nb\" class=\"nb-inline\">$1</span>»");
}

function englishHtml(source) {
  return paragraphs(source)
    .map((paragraph) =>
      isNorwegianParagraph(paragraph)
        ? `<p lang="nb" class="nb-sample">${esc(paragraph)}</p>`
        : `<p>${inlineNorwegian(paragraph)}</p>`,
    )
    .join("");
}

function clipFor(text) {
  return clipAudio[String(text || "").replace(/\s+/g, " ").trim()] || "";
}

function playButton(src, label) {
  if (!src) return "";
  return `<button class="icon-btn" type="button" data-action="play-src" data-src="${esc(src)}" aria-label="${esc(label)}">▶</button>`;
}

function sentenceHtml(text) {
  return esc(text).replaceAll("___", '<span class="gap" aria-hidden="true">____</span>');
}

function ensureChips(exercise) {
  if (mem.chips?.id === exercise.id) return mem.chips;
  const keyed = exercise.words.map((word, index) => ({ word, key: `${exercise.id}-${index}` }));
  const alternatives = exercise.solutions?.length > 1 ? exercise.solutions.slice(1) : [];
  mem.chips = {
    id: exercise.id,
    bank: shuffleBank(keyed, exercise.solution, (chip) => chip.word, alternatives),
    chosen: [],
  };
  return mem.chips;
}

/** Shuffled once per question, then kept stable while the user clicks around. */
function ensureOptions(exercise) {
  if (mem.options?.id !== exercise.id) {
    mem.options = { id: exercise.id, list: shuffleOptions(exercise.options) };
  }
  return mem.options.list;
}

function exerciseBlock(exercise, progressLabel, { showConcept = true } = {}) {
  const chips = exercise.type === "order" && !mem.feedback ? ensureChips(exercise) : mem.chips;
  const options = exercise.type === "mc" ? ensureOptions(exercise) : [];
  const concept = showConcept ? ` · ${esc(conceptLabel(exercise.concept))}` : "";
  return `
    <p class="kicker">${esc(progressLabel)}${concept}</p>
    <div class="progress" aria-hidden="true"><span style="width:${progressWidth()}%"></span></div>
    <h1>${esc(exercise.prompt)}</h1>
    ${exercise.promptEn ? `<p class="en" lang="en"><span class="en-label">EN</span> ${esc(exercise.promptEn)}</p>` : ""}
    ${exercise.wrong ? `<p class="wrong-box">${esc(exercise.wrong)}</p>` : ""}
    ${exercise.source ? `<p class="wrong-box"><span class="fine">Uformelt</span><br />${esc(exercise.source)}</p>` : ""}
    ${exercise.text ? `<p class="sentence">${sentenceHtml(exercise.text)}</p>` : ""}
    ${mem.note ? `<p class="note" role="alert">${esc(mem.note)}</p>` : ""}
    ${mem.feedback ? feedbackHtml(mem.feedback) : interactionHtml(exercise, options, chips)}
  `;
}

function progressWidth() {
  const session = state.session;
  if (!session) return 0;
  const total =
    session.kind === "lesson"
      ? lessonsById.get(session.lessonId).exercises.length
      : session.kind === "placement"
        ? placement.items.length
        : session.kind === "reading"
          ? readingsById.get(session.readingId).questions.length
          : session.plan.length;
  return Math.round((session.index / total) * 100);
}

function interactionHtml(exercise, options, chips) {
  if (exercise.type === "mc") {
    return `<div class="options" role="radiogroup" aria-label="Svaralternativer">
      ${options
        .map(
          (option, index) => `<button type="button" class="option" data-action="choose" data-value="${esc(option)}" aria-pressed="${mem.choice === option}">
            <span class="fine">${index + 1}</span> ${esc(option)}
          </button>`,
        )
        .join("")}
    </div>
    ${coarsePointer() || options.length < 3 ? "" : `<p class="fine">Tast 1–${options.length} velger. Enter sjekker.</p>`}
    <button class="btn" type="button" data-action="submit">Sjekk svar</button>`;
  }
  if (exercise.type === "order") {
    return `<p class="fine">Trykk på ordene i riktig rekkefølge.</p>
    <div class="answer-line" aria-live="polite">${
      chips.chosen.length
        ? `<div class="chosen">${chips.chosen
            .map((chip) => `<button type="button" class="chip" data-action="unpick" data-key="${esc(chip.key)}">${esc(chip.word)}</button>`)
            .join("")}</div>`
        : `<span class="muted">Setningen bygges her.</span>`
    }</div>
    <div class="bank" aria-label="Ord å velge mellom">${chips.bank
      .map((chip) => `<button type="button" class="chip" data-action="pick" data-key="${esc(chip.key)}">${esc(chip.word)}</button>`)
      .join("")}</div>
    <button class="btn" type="button" data-action="submit">Sjekk svar</button>`;
  }
  return `<p class="note">Denne oppgaven skal besvares ved å velge eller trykke på ord.</p>`;
}

function vocabBlock(word, progressLabel) {
  const item = state.session.plan[state.session.index];
  const direction = item?.direction || "no-en";
  const options = state.session.optionsByKey[item.key] || [direction === "en-no" ? word.no : word.en];
  const prompt = direction === "en-no" ? word.en : word.no;
  const gloss = direction === "en-no" ? "Velg det norske ordet." : "Velg betydningen.";
  return `
    <p class="kicker">${esc(progressLabel)} · ord</p>
    <h1 lang="${direction === "en-no" ? "en" : "nb"}">${esc(prompt)}</h1>
    <p>${esc(word.example)}</p>
    <p class="en" lang="en"><span class="en-label">EN</span> ${gloss}</p>
    ${mem.note ? `<p class="note" role="alert">${esc(mem.note)}</p>` : ""}
    ${
      mem.feedback
        ? feedbackHtml(mem.feedback)
        : `<div class="options">${options
            .map(
              (option, index) => `<button type="button" class="option" data-action="choose" data-value="${esc(option)}" aria-pressed="${mem.choice === option}"><span class="fine">${index + 1}</span> ${esc(option)}</button>`,
            )
            .join("")}</div><button class="btn" type="button" data-action="submit">Sjekk svar</button>`
    }
  `;
}

function feedbackHtml(feedback) {
  if (feedback.hidden) {
    return `<div class="feedback" id="feedback" tabindex="-1"><p><strong>Registrert.</strong></p><p>Du får fasit når testen er ferdig.</p></div>
      <button class="btn" type="button" data-action="next">Neste</button>`;
  }
  return `<div class="feedback ${feedback.ok ? "ok" : "bad"}" id="feedback" tabindex="-1">
      <p><strong>${feedback.ok ? "Riktig." : "Ikke helt."}</strong></p>
      ${feedback.ok || !feedback.given ? "" : `<p>Du valgte: ${esc(feedback.given)}</p>`}
      ${feedback.ok ? "" : `<p>Riktig svar: ${esc(feedback.expected)}</p>`}
      <p class="en" lang="en">${esc(feedback.explanation)}</p>
    </div>
    <button class="btn" type="button" data-action="next">Neste</button>`;
}

function renderHome() {
  if (!state.profile && !(state.session?.kind === "placement" && state.session.answers?.length)) return renderWelcome();
  const recommended = recommendLesson(state, lessons);
  const job = jobSuggestion(state, lessons);
  const due = dueCount(state);
  const resume = state.session && !state.session.finalized ? state.session : null;
  return `
    <section class="hero">
      <p class="kicker">${esc(greeting())}</p>
      <h1>${esc(name())}</h1>
      <p class="en" lang="en"><span class="en-label">EN</span> Explanations are in English. The exercises are Norwegian bokmål, and nothing is generated on the fly.</p>
    </section>
    <div class="stats">
      <div class="stat"><b>${state.streak.current}</b><span>${state.streak.current === 1 ? "dag på rad" : "dager på rad"}</span></div>
      <div class="stat"><b>${esc(state.profile?.level || "–")}</b><span>nivå</span></div>
      <div class="stat"><b>${completedCount()}</b><span>${completedCount() === 1 ? "leksjon" : "leksjoner"}</span></div>
    </div>
    ${resume ? resumeCard(resume) : ""}
    <article class="card">
      <p class="kicker">Dagens økt</p>
      <h2>Leksjon, repetisjon og én tekst</h2>
      <p>Omtrent 25 minutter. Du kan hoppe av etter hvert steg.</p>
      <button class="btn" type="button" data-action="start-day">Start dagens økt</button>
    </article>
    ${recommended ? lessonTeaser(recommended, "Dagens leksjon") : ""}
    <article class="card">
      <p class="kicker">Repetisjon</p>
      <h2>Svake emner og gjentakelse</h2>
      <p>${due ? `${due} kort er forfalt.` : "Nye ord og bommer legges i køen etter leksjonen."} Omtrent 70 % kommer fra det du kan minst, og 30 % er repetisjon.</p>
      <button class="btn" type="button" data-action="review">Start repetisjon</button>
    </article>
    ${job.lesson ? jobCard(job) : ""}
    ${readingCard(suggestReading())}
    ${weakList()}
  `;
}

function renderWelcome() {
  return `
    <section class="hero">
      <p class="kicker">Bokmål · 10–15 minutter</p>
      <h1>Hei, ${esc(name())}.</h1>
      <p>Et kurs fra A1 til C1, med tettere stoff på B2 og C1, pluss jobbnorsk for e-post, status og møter.</p>
      <div class="english" lang="en">
        <p>You took Norwegian at university and use English at work. This app keeps the interface in Norwegian and explains grammar in English. There is no assistant in the exercises. Progress stays in this browser, and you can export it.</p>
      </div>
    </section>
    <article class="card">
      <h2>Nivåtest</h2>
      <p>Omtrent ${placement.minutes} minutter. ${placement.items.length} spørsmål. De vanskelige teller mer. Du kan ta den om igjen, eller velge nivå selv.</p>
      <label>Navn i appen
        <input type="text" data-setting="name" value="${esc(state.settings.name || "")}" />
      </label>
      <button class="btn full" type="button" data-action="start-placement">Start nivåtesten</button>
    </article>
    <h2>Eller velg nivå</h2>
    <div class="row">${LEVELS.map((level) => `<button class="btn secondary" type="button" data-action="pick-level" data-level="${level}">${level}</button>`).join("")}</div>
  `;
}

function resumeCard(session) {
  if (session.kind === "placement") {
    return `<article class="card"><h2>Nivåtesten er i gang</h2><p>Spørsmål ${session.index + 1} av ${placement.items.length}.</p><a class="btn" href="#/plassering">Fortsett testen</a></article>`;
  }
  if (session.kind === "lesson") {
    const lesson = lessonsById.get(session.lessonId);
    return `<article class="card"><h2>Du er midt i en leksjon</h2><p>${esc(lesson?.title || "")}</p><a class="btn" href="#/leksjon/${esc(session.lessonId)}">Fortsett</a></article>`;
  }
  if (session.kind === "review") {
    return `<article class="card"><h2>Repetisjonen er i gang</h2><a class="btn" href="#/ovelse">Fortsett</a></article>`;
  }
  if (session.kind === "reading") {
    const reading = readingsById.get(session.readingId);
    return `<article class="card"><h2>Du er midt i en lesetekst</h2><p>${esc(reading?.title || "")}</p><a class="btn" href="#/lesing/${esc(session.readingId)}">Fortsett</a></article>`;
  }
  return "";
}

function lessonTeaser(lesson, kicker) {
  return `<article class="card">
    <p class="kicker">${esc(kicker)} · ${esc(lesson.level)} · ${lesson.minutes} min</p>
    <h2>${esc(lesson.title)}</h2>
    <p class="en" lang="en">${esc(lesson.titleEn)}</p>
    <p class="meta">${lesson.concepts.map((id) => esc(conceptLabel(id))).join(" · ")}</p>
    <button class="btn" type="button" data-action="open-lesson" data-id="${esc(lesson.id)}">Start leksjonen</button>
  </article>`;
}

function jobCard(job) {
  const early = state.profile && LEVELS.indexOf(state.profile.level) < LEVELS.indexOf("B1");
  return `<article class="card">
    <p class="kicker">Jobbnorsk · én i uka</p>
    <h2>${esc(job.lesson.title)}</h2>
    <p>${job.due ? "Det er en uke siden forrige jobbøkt, eller du har ikke tatt en ennå." : `Sist: ${esc(formatWhen(job.last))}.`}</p>
    ${early ? `<p class="fine">Mest nyttig fra B1. Du kan likevel åpne den.</p>` : ""}
    <button class="btn secondary" type="button" data-action="open-lesson" data-id="${esc(job.lesson.id)}">Åpne jobbøkten</button>
  </article>`;
}

function suggestReading() {
  const order = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const rank = order.indexOf(state.profile?.level || "B1");
  const ranked = [...readings].sort((a, b) => Math.abs(order.indexOf(a.level) - rank) - Math.abs(order.indexOf(b.level) - rank));
  return ranked.find((item) => !state.readings?.[item.id]?.completed) || ranked[0];
}

function readingCard(reading) {
  if (!reading) return "";
  const done = state.readings?.[reading.id]?.completed;
  return `<article class="card">
    <p class="kicker">Lesing · ${esc(reading.level)} · ${reading.minutes} min</p>
    <h2>${esc(reading.title)}</h2>
    <p class="en" lang="en">${esc(reading.titleEn)}</p>
    <p>${done ? "Du har lest denne. Du kan høre den igjen." : "En tekst med ferdig innspilt opplesning, så du kan høre uttalen."}</p>
    <a class="btn secondary" href="#/lesing/${esc(reading.id)}">Åpne teksten</a>
  </article>`;
}

function readingSession(id) {
  const session = state.session;
  if (session?.kind === "reading" && session.readingId === id && !session.finalized) return session;
  return null;
}

function beginDictation(id) {
  const reading = readingsById.get(id);
  if (!reading) return;
  ensureProfile(reading.level === "C2" ? "C1" : reading.level);
  const same = readingSession(id);
  state.session = {
    kind: "reading",
    readingId: id,
    phase: "dict",
    index: 0,
    answers: same?.answers || [],
    dictAnswers: [],
    finalized: false,
  };
  resetAnswer();
  haltAudio();
  focusMode = "route";
  save();
  if (location.hash === `#/lesing/${id}`) render();
  else go(`#/lesing/${id}`);
}

function beginReadingQuestions(id) {
  const reading = readingsById.get(id);
  if (!reading) return;
  ensureProfile(reading.level === "C2" ? "C1" : reading.level);
  const same = readingSession(id);
  if (!same) {
    state.session = {
      kind: "reading",
      readingId: id,
      phase: "quiz",
      index: 0,
      answers: [],
      dictAnswers: [],
      finalized: false,
    };
  } else if (same.phase !== "quiz") {
    same.phase = "quiz";
    same.index = 0;
    if (!Array.isArray(same.dictAnswers)) same.dictAnswers = [];
  }
  resetAnswer();
  mem.hideText = false;
  haltAudio();
  focusMode = "route";
  save();
  if (location.hash === `#/lesing/${id}`) render();
  else go(`#/lesing/${id}`);
}

function submitDictation() {
  const session = state.session;
  if (!session || session.phase !== "dict" || mem.locked) return;
  const reading = readingsById.get(session.readingId);
  const expected = reading?.dictation?.[session.index];
  if (!expected) return;
  if (!String(mem.draft).trim()) {
    mem.note = "Skriv det du hørte.";
    render();
    return;
  }
  const result = gradeDictation(expected, mem.draft);
  if (!Array.isArray(session.dictAnswers)) session.dictAnswers = [];
  session.dictAnswers[session.index] = { ok: result.ok, expected };
  mem.locked = true;
  mem.feedback = { ok: result.ok, expected, diff: result.diff };
  focusMode = "feedback";
  announce(result.ok ? "Riktig." : "Ikke helt.");
  save();
  render();
}

function nextDict() {
  const session = state.session;
  const reading = readingsById.get(session?.readingId);
  if (!reading) return;
  resetAnswer();
  if (session.index + 1 < reading.dictation.length) {
    session.index += 1;
    focusMode = "route";
    save();
    render();
    return;
  }
  beginReadingQuestions(reading.id);
}

function weakList() {
  const ranked = concepts
    .map((concept) => ({ concept, mastery: conceptMastery(state, concept.id), attempts: state.concepts[concept.id]?.attempts || 0 }))
    .filter((item) => item.attempts >= MIN_MASTERY_ATTEMPTS)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);
  if (!ranked.length) return `<p class="fine">Når du har svart noen ganger på et emne, vises de svakeste her.</p>`;
  return `<h2>Svakest nå</h2><div class="row">${ranked
    .map(
      (item) =>
        `<button class="pill" type="button" data-action="practice-concept" data-concept="${esc(item.concept.id)}">${esc(item.concept.name)} ${item.mastery} %</button>`,
    )
    .join("")}</div>`;
}

function renderPath() {
  const recommended = state.profile ? recommendLesson(state, lessons) : null;
  const groups = ["A1", "A2", "B1", "B2", "C1"];
  return `
    <h1>Kurs</h1>
    <p class="en" lang="en"><span class="en-label">EN</span> Nothing is locked. The daily pick still prefers your level and your weak concepts.</p>
    ${groups
      .map((level) => {
        const items = lessons.filter((lesson) => lesson.track === "core" && lesson.level === level);
        return `<h2>${level}</h2>${items.map((lesson) => lessonRow(lesson, recommended?.id === lesson.id)).join("")}`;
      })
      .join("")}
    <p class="fine">C2 er et mulig resultat på nivåtesten. Kurset har leksjoner til og med C1, og repetisjonen vekter da de vanskeligste emnene.</p>
    <p><a class="btn secondary" href="#/lesing">Lesetekster med opplesning</a></p>
  `;
}

function lessonRow(lesson, recommended) {
  const record = lessonRecord(lesson.id);
  const status = record?.completed ? `Fullført · ${record.bestScore} %` : record?.started ? "I gang" : "Ikke startet";
  return `<article class="lesson-card ${record?.completed ? "done" : ""}">
    <p class="meta">${esc(lesson.level)} · ${lesson.minutes} min ${recommended ? "· anbefalt" : ""}</p>
    <h3>${esc(lesson.title)}</h3>
    <p class="en" lang="en">${esc(lesson.titleEn)}</p>
    <p class="fine">${esc(status)}</p>
    <button class="btn" type="button" data-action="open-lesson" data-id="${esc(lesson.id)}" ${record?.completed ? 'data-fresh="true"' : ""}>${record?.completed ? "Gjør på nytt" : "Åpne"}</button>
  </article>`;
}

function renderJob() {
  const job = jobSuggestion(state, lessons);
  return `
    <h1>Jobbnorsk</h1>
    <p>E-post, status til ledelsen, referat, tall og høflig uenighet. Én leksjon i uka er nok ved siden av de andre leksjonene.</p>
    <p class="en" lang="en"><span class="en-label">EN</span> Written for an IT controller at an airport company: formal, but not stiff.</p>
    ${jobLessons
      .map((lesson) => {
        const suggested = job.lesson?.id === lesson.id && job.due;
        return lessonRow(lesson, suggested);
      })
      .join("")}
  `;
}

function renderDash() {
  const stages = ["Basis", "Videre", "Presisjon"];
  return `
    <h1>Fremgang</h1>
    <div class="stats">
      <div class="stat"><b>${state.streak.current}</b><span>${state.streak.current === 1 ? "dag nå" : "dager nå"}</span></div>
      <div class="stat"><b>${state.streak.best}</b><span>beste rekke</span></div>
      <div class="stat"><b>${completedCount()}/${lessons.length}</b><span>${completedCount() === 1 ? "leksjon" : "leksjoner"}</span></div>
      <div class="stat"><b>${dueCount(state)}</b><span>forfalte kort</span></div>
    </div>
    <p>Lesetekster: <strong>${Object.values(state.readings).filter((item) => item.completed).length}/${readings.length}</strong>. <a href="#/lesing">Åpne lesing</a></p>
    <p>Nivå: <strong>${esc(state.profile?.level || "ikke valgt")}</strong>. ${
      state.profile?.placement ? `Siste test: ${state.profile.placement.score} %, foreslått ${esc(state.profile.placement.suggested)}.` : "Du har ikke en lagret test ennå."
    }</p>
    <div class="row">
      <a class="btn secondary" href="#/plassering">Ta nivåtesten</a>
      <a class="btn ghost" href="#/innstillinger">Bytt nivå</a>
    </div>
    ${weakList()}
    ${stages
      .map((stage) => {
        const items = concepts.filter((concept) => concept.stage === stage);
        return `<h2>${esc(stage)}</h2>${items.map(conceptMeter).join("")}`;
      })
      .join("")}
    <p class="en" lang="en"><span class="en-label">EN</span> Mastery grows with both accuracy and how many times you have met the concept. One lucky answer does not fill the bar.</p>
  `;
}

function conceptMeter(concept) {
  const stats = state.concepts[concept.id];
  const attempts = stats?.attempts || 0;
  const mastery = attempts ? conceptMastery(state, concept.id) : 0;
  const ready = attempts >= MIN_MASTERY_ATTEMPTS;
  const tone = !ready ? "none" : mastery < 60 ? "low" : mastery < 80 ? "mid" : "ok";
  return `<article class="concept">
    <h3><button class="text-btn" type="button" data-action="practice-concept" data-concept="${esc(concept.id)}">${esc(concept.name)}</button></h3>
    <p class="en" lang="en">${esc(concept.nameEn)}. ${esc(concept.blurb)}</p>
    <div class="meter ${tone}">
      <div class="meter-track"><span style="width:${ready ? mastery : 0}%"></span></div>
      <span>${!attempts ? "ikke øvd" : !ready ? "for få svar ennå" : `${mastery} %`}</span>
    </div>
  </article>`;
}

function renderMore() {
  return `
    <h1>Mer</h1>
    <article class="card"><h2>Lesing</h2><p>${readings.length} tekster med innspilt opplesning, gruppert etter nivå.</p><a class="btn" href="#/lesing">Åpne lesetekstene</a></article>
    <article class="card"><h2>Uttale</h2><p>Minimale par: hør ordet og velg hvilket det var.</p><a class="btn" href="#/uttale">Åpne uttale</a></article>
    <article class="card"><h2>Ordbank</h2><p>${allVocab().length} oppslag fra kurset og en ekstra bank.</p><a class="btn" href="#/ord">Åpne ordbanken</a></article>
    <article class="card"><h2>Innstillinger</h2><p>Nivå, eksport og import av fremgang.</p><a class="btn" href="#/innstillinger">Åpne innstillinger</a></article>
    <article class="card"><h2>Om</h2><p>Bokmål, forklaringer på engelsk, ferdigskrevne øvelser. Fremgangen ligger i denne nettleseren.</p><a class="btn secondary" href="#/om">Les om appen</a></article>
  `;
}

function renderAbout() {
  return `
    <h1>Om appen</h1>
    <p>Norsk hver dag er en statisk øvelsesbok. Den velger neste leksjon ut fra nivå og hvilke emner som er svakest, og den legger ord og feil i en enkel repetisjonskø. Lydfilene ligger på samme nettsted. Appen har ingen egen frakoblet lagring, så første besøk trenger nett.</p>
    <div class="english" lang="en">
      <p>There is no server and no model in the loop. If a sentence is in the app, it was written into the lesson files. Export the JSON if you want the same streak on another phone.</p>
    </div>
    <p>UI-et er på norsk. Grammatikkforklaringen etterpå er på engelsk, merket EN.</p>
    <a class="btn ghost" href="#/mer">Tilbake</a>
  `;
}

function renderVocab() {
  const query = mem.query.trim().toLowerCase();
  const groups = groupVocab(allVocab());
  const themes = ["alle", ...new Set(groups.flatMap((group) => group.themes))];
  const levels = ["alle", "A1", "A2", "B1", "B2", "C1"];
  const list = groups.filter((group) => {
    const themeOk = mem.theme === "alle" || group.themes.includes(mem.theme);
    const levelOk = !mem.level || mem.level === "alle" || group.level === mem.level;
    const hay = `${group.display} ${group.en} ${group.examples.join(" ")}`.toLowerCase();
    return themeOk && levelOk && (!query || hay.includes(query));
  });
  const capped = mem.level && mem.level !== "alle" ? list : list.slice(0, 80);
  return `
    <h1>Ordbank</h1>
    <p class="fine">Like oppslag er slått sammen. «ei uke» og «en uke» står som «ei/en uke». Grammatikk er ord fra leksjonene. Bindeord er småord som knytter setninger. Trykk på pilen for å høre.</p>
    <label>Søk
      <input id="vocab-search" type="search" data-vocab-query value="${esc(mem.query)}" />
    </label>
    <div class="filters row" role="group" aria-label="Nivå">${levels
      .map(
        (level) =>
          `<button type="button" class="btn ghost" data-action="vocab-level" data-level="${esc(level)}" aria-pressed="${(mem.level || "alle") === level}">${esc(level === "alle" ? "Alle nivå" : level)}</button>`,
      )
      .join("")}</div>
    <div class="filters row" role="group" aria-label="Tema">${themes
      .map(
        (theme) =>
          `<button type="button" class="btn ghost" data-action="theme" data-theme="${esc(theme)}" aria-pressed="${mem.theme === theme}">${esc(theme === "alle" ? "Alle tema" : themeLabel(theme))}</button>`,
      )
      .join("")}</div>
    <p class="fine">${list.length} treff</p>
    ${capped
      .map((group) => {
        const src = vocabAudio[group.ids[0]] || "";
        return `<article class="word">
          <div class="word-head">
            <button class="icon-btn" type="button" data-action="play-src" data-src="${esc(src)}" aria-label="Spill av ${esc(group.display)}">▶</button>
            <div>
              <div class="no" lang="nb">${esc(group.display)}</div>
              <div class="en" lang="en">${esc(group.en)}</div>
            </div>
          </div>
          ${group.examples
            .map(
              (example) =>
                `<div class="example-line">${playButton(clipFor(example), "Spill av eksempelsetningen")}<span lang="nb">${esc(example)}</span></div>`,
            )
            .join("")}
          ${group.articlePair ? `<p class="fine">Begge artiklene er riktig bokmål.</p>` : ""}
          <div class="fine">${esc(group.level)} · ${esc(group.themes.map(themeLabel).join(", "))}</div>
        </article>`;
      })
      .join("")}
    ${capped.length < list.length ? `<p class="fine">Viser ${capped.length} av ${list.length}. Velg et nivå for resten.</p>` : ""}
  `;
}

function renderSettings() {
  return `
    <h1>Innstillinger</h1>
    <label>Navn
      <input type="text" data-setting="name" value="${esc(state.settings.name || "")}" />
    </label>
    <h2>Nivå</h2>
    <div class="row">${LEVELS.map(
      (level) => `<button class="btn ${state.profile?.level === level ? "" : "secondary"}" type="button" data-action="pick-level" data-level="${level}">${level}</button>`,
    ).join("")}</div>
    <h2>Flytt fremgangen</h2>
    <p>Filen er JSON. Importer den på en annen telefon i samme nettleserapp, eller ta vare på den som sikkerhetskopi.</p>
    <div class="row">
      <button class="btn" type="button" data-action="export">Eksporter JSON</button>
      <label class="btn secondary">Importer JSON<input class="visually-hidden" type="file" accept="application/json,.json" data-import /></label>
    </div>
    <h2>Nivåtest</h2>
    <button class="btn secondary" type="button" data-action="start-placement">Ta testen på nytt</button>
    <h2>Nullstill</h2>
    <button class="btn ghost" type="button" data-action="reset-ask">Slett fremgang på denne enheten</button>
    <h2>Utlogging</h2>
    <p>Fremgangen blir liggende i nettleseren. Neste gang må du skrive passordet hvis du ikke har huket av for å bli husket.</p>
    <button class="btn ghost" type="button" data-action="logout">Logg ut</button>
  `;
}

function renderLesson(id) {
  const lesson = lessonsById.get(id);
  if (!lesson) return `<h1>Fant ikke leksjonen</h1><a class="btn" href="#/kurs">Til kurset</a>`;
  const matches = state.session?.kind === "lesson" && state.session.lessonId === id;
  if (!matches) {
    const restored = lessonFromCursor(id);
    if (restored) state.session = restored;
  }
  if (!state.session || state.session.kind !== "lesson" || state.session.lessonId !== id) {
    return `<h1>${esc(lesson.title)}</h1><p>${esc(lesson.maal)}</p><button class="btn" type="button" data-action="open-lesson" data-id="${esc(id)}">Start</button>`;
  }
  const session = state.session;
  if (session.phase !== "intro" && session.phase !== "words" && session.phase !== "quiz" && session.phase !== "done") {
    session.phase = "intro";
    session.index = 0;
  }
  if (session.phase === "intro") {
    return `
      <p class="kicker">${esc(lesson.level)} · ${lesson.minutes} min</p>
      <h1>${esc(lesson.title)}</h1>
      <p class="en" lang="en">${esc(lesson.titleEn)}</p>
      <p>${esc(lesson.maal)}</p>
      <div class="english" lang="en">${englishHtml(lesson.intro)}</div>
      <p class="husk"><strong>Husk.</strong> <span lang="nb">${esc(lesson.husk)}</span></p>
      ${lesson.examples
        .map(
          (example) => `<div class="example"><div class="no">${playButton(clipFor(example.no), `Spill av: ${example.no}`)} <span lang="nb">${esc(example.no)}</span></div><div class="en" lang="en">${esc(example.en)}</div></div>`,
        )
        .join("")}
      <button class="btn" type="button" data-action="phase" data-phase="words">Videre til ordene</button>
    `;
  }
  if (session.phase === "words") {
    return `
      <p class="kicker">${lesson.vocab.length} ord og uttrykk</p>
      <h1>Nye ord</h1>
      <p class="en" lang="en"><span class="en-label">EN</span> These go into the spaced-repetition queue after this step.</p>
      ${lesson.vocab
        .map((word) => {
          const forms = word.forms && (lesson.level === "B2" || lesson.level === "C1" || lesson.track === "jobb") ? word.forms : "";
          return `<article class="word">
            <div class="word-head">
              ${playButton(vocabAudio[word.id], `Spill av ${word.no}`)}
              <div>
                <div class="no" lang="nb">${esc(word.no)}</div>
                <div class="en" lang="en">${esc(word.en)}</div>
              </div>
            </div>
            ${forms ? `<p class="fine" lang="nb">${esc(forms)}</p>` : ""}
            <div class="example-line">${playButton(clipFor(word.example), "Spill av eksempelet")} <span lang="nb">${esc(word.example)}</span></div>
            <div class="fine" lang="en">${esc(word.exampleEn)}</div>
          </article>`;
        })
        .join("")}
      <button class="btn" type="button" data-action="phase" data-phase="quiz">Til øvelsene</button>
    `;
  }
  if (session.phase === "produce" && lesson.produce) return renderProduce(lesson);
  if (session.phase === "done") return renderResult(lesson.title, session);
  if (session.phase !== "quiz") {
    session.phase = "intro";
    return renderLesson(id);
  }
  const exercise = lesson.exercises[session.index] || lesson.exercises[0];
  return exerciseBlock(exercise, `Øvelse ${Math.min(session.index, lesson.exercises.length - 1) + 1} av ${lesson.exercises.length}`);
}

function renderPlacement() {
  if (!state.session || state.session.kind !== "placement") {
    return `
      <h1>Nivåtest</h1>
      <p>Omtrent ${placement.minutes} minutter. ${placement.items.length} spørsmål, uten fasit underveis.</p>
      <div class="english" lang="en"><p>${esc(placement.intro)}</p></div>
      <button class="btn" type="button" data-action="start-placement">Start</button>
    `;
  }
  const session = state.session;
  if (session.phase === "done") return renderPlacementResult(session);
  const exercise = placement.items[session.index];
  return exerciseBlock(exercise, `Spørsmål ${session.index + 1} av ${placement.items.length}`, { showConcept: false });
}

function renderPlacementResult(session) {
  const result = session.result;
  const previous = state.profile?.level;
  return `
    <p class="kicker">Forslag</p>
    <h1>${esc(result.suggested)}</h1>
    <p>${result.correct} av ${result.total} riktige · ${result.score} %. Vanskelige spørsmål teller mer enn de lette, så prosenten og forslaget er ikke det samme tallet.</p>
    <div class="english" lang="en"><p>Hard items carry more weight, and C2 only appears when the C1 items are essentially all correct. Pick the level whose lessons you want tomorrow.</p></div>
    <button class="btn full" type="button" data-action="confirm-level" data-level="${esc(result.suggested)}" data-source="placement">Bruk ${esc(result.suggested)}</button>
    ${previous && previous !== result.suggested ? `<button class="btn secondary full" type="button" data-action="confirm-level" data-level="${esc(previous)}" data-source="placement">Behold ${esc(previous)}</button>` : ""}
    <h2>Andre nivå</h2>
    <div class="row">${LEVELS.map((level) => `<button class="btn ghost" type="button" data-action="confirm-level" data-level="${level}" data-source="placement">${level}</button>`).join("")}</div>
    <h2>Fasit</h2>
    ${session.answers
      .map(
        (answer, index) => `<article class="concept"><h3>${index + 1}. ${answer.ok ? "Riktig" : "Feil"} · ${esc(conceptLabel(answer.concept))}</h3>${
          answer.ok ? "" : `<p>Riktig svar: ${esc(answer.expected)}</p>`
        }<p class="en" lang="en">${esc(answer.explanation || "")}</p></article>`,
      )
      .join("")}
  `;
}

function startConceptPractice(conceptId) {
  if (!conceptById[conceptId]) return;
  ensureProfile(state.profile?.level || "B1");
  const cap = state.profile?.level === "C2" ? "C1" : state.profile?.level || "C1";
  const capIndex = LEVELS.indexOf(cap);
  const pool = lessons.flatMap((lesson) =>
    lesson.exercises.filter((exercise) => exercise.concept === conceptId).map((exercise) => ({ exercise, level: lesson.level })),
  );
  let scoped = pool.filter((item) => LEVELS.indexOf(item.level) <= capIndex);
  if (scoped.length < 4) scoped = pool;
  const picked = shuffle(scoped).slice(0, 8);
  state.session = {
    kind: "concept",
    conceptId,
    phase: picked.length ? "quiz" : "empty",
    index: 0,
    answers: [],
    plan: picked.map((item) => item.exercise.id),
    finalized: false,
  };
  resetAnswer();
  save();
  go("#/ovelse");
}

function renderReview() {
  const session = state.session;
  if (!session || (session.kind !== "review" && session.kind !== "concept")) {
    return `<h1>Repetisjon</h1><button class="btn" type="button" data-action="review">Lag en økt</button>`;
  }
  if (session.phase === "empty") {
    return `<h1>Ingenting i køen ennå</h1><p>Fullfør en leksjon. Ordene og oppgavene du bommer på, blir liggende til senere.</p><a class="btn" href="#/">Til i dag</a>`;
  }
  if (session.phase === "done") return renderResult(session.kind === "concept" ? conceptLabel(session.conceptId) : "Repetisjon", session);
  const task = currentTask();
  const label =
    session.kind === "concept"
      ? `Øvelse ${session.index + 1} av ${session.plan.length} · ${conceptLabel(session.conceptId)}`
      : `Oppgave ${session.index + 1} av ${session.plan.length} · ${session.weakCount} svake · ${session.reviewCount} repetisjon`;
  if (task?.vocab) return vocabBlock(task.vocab, label);
  if (task?.exercise) return exerciseBlock(task.exercise, label);
  return `<h1>Denne oppgaven mangler</h1><button class="btn" type="button" data-action="next">Hopp over</button>`;
}

function renderProduce(lesson) {
  const task = lesson.produce;
  const checks = mem.produceChecks || {};
  return `
    <p class="kicker">Egen produksjon · frivillig</p>
    <h1>${esc(task.prompt)}</h1>
    ${task.promptEn ? `<p class="en" lang="en"><span class="en-label">EN</span> ${esc(task.promptEn)}</p>` : ""}
    <p class="fine">Appen retter ikke teksten. Skriv eller ta opp, se modellsvar, og kryss av selv.</p>
    <label>Din tekst
      <textarea data-draft autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off">${esc(mem.draft)}</textarea>
    </label>
    <div class="row">
      <button class="btn ghost" type="button" data-action="toggle-model" aria-pressed="${Boolean(mem.showHelp)}">${mem.showHelp ? "Skjul modellsvar" : "Vis modellsvar"}</button>
      <button class="btn ghost" type="button" data-action="skip-produce">Hopp over</button>
    </div>
    ${mem.showHelp ? `<article class="example"><div class="no" lang="nb">${esc(task.model)}</div>${task.modelEn ? `<div class="en" lang="en">${esc(task.modelEn)}</div>` : ""}</article>` : ""}
    <fieldset>
      <legend>Sjekk selv</legend>
      ${(task.checks || [])
        .map(
          (label, index) =>
            `<label class="check"><input type="checkbox" data-produce-check="${index}" ${checks[index] ? "checked" : ""} /> ${esc(label)}</label>`,
        )
        .join("")}
    </fieldset>
    <button class="btn" type="button" data-action="finish-produce">Ferdig med leksjonen</button>
  `;
}

function wrongSummary(session) {
  const wrong = (session.answers || []).filter((answer) => answer && answer.ok === false && answer.explanation);
  if (!wrong.length) return "";
  return `<h2>Det som ikke stemte</h2>${wrong
    .map(
      (answer) => `<article class="concept">
        <h3>${esc(answer.prompt || "Oppgave")}</h3>
        ${answer.given ? `<p>Du valgte: ${esc(answer.given)}</p>` : ""}
        <p>Riktig svar: ${esc(answer.expected || "")}</p>
        <p class="en" lang="en">${esc(answer.explanation)}</p>
      </article>`,
    )
    .join("")}`;
}

function dayNext(session) {
  const queue = state.dayQueue;
  if (!queue) return "";
  if (session.kind === "lesson" && queue.stage === "lesson") {
    return `<p><button class="btn" type="button" data-action="day-review">Neste: repetisjon</button></p>`;
  }
  if (session.kind === "review" && queue.stage === "review" && queue.readingId) {
    return `<p><button class="btn" type="button" data-action="day-reading">Neste: lesetekst</button></p>`;
  }
  return "";
}

function startDay() {
  const lesson = recommendLesson(state, lessons);
  const reading = suggestReading();
  if (!lesson) return;
  state.dayQueue = { lessonId: lesson.id, readingId: reading?.id || "", stage: "lesson" };
  startLesson(lesson.id);
}

function renderResult(title, session) {
  const correct = session.answers.filter((answer) => answer.ok).length;
  return `
    <p class="kicker">Ferdig</p>
    <h1>${esc(title)}</h1>
    <p><strong>${correct} av ${session.answers.length}</strong> riktige · ${session.score} %.</p>
    <p>Rekke: ${tally(state.streak.current, "dag", "dager")}. Beste: ${state.streak.best}.</p>
    ${dayNext(session)}
    <div class="row">
      <a class="btn" href="#/">I dag</a>
      <a class="btn secondary" href="#/fremgang">Fremgang</a>
      ${session.kind === "reading" ? `<a class="btn ghost" href="#/lesing">Flere tekster</a>` : ""}
    </div>
    ${wrongSummary(session)}
    ${session.dictAnswers?.length ? `<p class="fine">Diktat: ${session.dictAnswers.filter((item) => item?.ok).length} av ${session.dictAnswers.filter(Boolean).length} uten å telle store bokstaver og tegn.</p>` : ""}
  `;
}

function renderPronunciation() {
  const items = pronunciationItems();
  const index = Math.min(mem.pronIndex || 0, items.length - 1);
  const item = items[index];
  const src = `audio/uttale/${item.id}.mp3`;
  return `
    <p class="kicker">Uttale · ${index + 1} av ${items.length}</p>
    <h1>${esc(item.group)}</h1>
    <p class="en" lang="en"><span class="en-label">EN</span> ${esc(pronunciation.intro)}</p>
    <p class="en" lang="en">${esc(pronunciation.ukrainian)}</p>
    ${item.caution ? `<p class="note">${esc(item.caution)}</p>` : ""}
    <div class="player">
      <button class="icon-btn" type="button" data-action="play-src" data-src="${esc(src)}" aria-label="Spill ordet">▶</button>
      <div><strong>Hvilket ord hørte du?</strong></div>
    </div>
    <div class="options" role="radiogroup">
      ${item.options
        .map(
          (option) =>
            `<button type="button" class="option" data-action="pron-choose" data-value="${esc(option)}" aria-pressed="${mem.choice === option}">${esc(option)}</button>`,
        )
        .join("")}
    </div>
    ${mem.feedback ? `<div class="feedback ${mem.feedback.ok ? "ok" : "bad"}" id="feedback" tabindex="-1"><p><strong>${mem.feedback.ok ? "Riktig." : "Ikke helt."}</strong></p><p>${esc(item.note)}</p></div>` : ""}
    ${
      mem.feedback
        ? `<button class="btn" type="button" data-action="pron-next">${index + 1 >= items.length ? "Start på nytt" : "Neste"}</button>`
        : `<button class="btn" type="button" data-action="pron-check">Sjekk</button>`
    }
  `;
}

function renderLogin() {
  return `
    <section class="hero">
      <p class="kicker">Norsk hver dag</p>
      <h1>Logg inn</h1>
      <p>Skriv passordet for å åpne øvelsene.</p>
      <div class="english" lang="en">
        <p>This is only a lock on the page, not an account. Progress still stays in this browser.</p>
      </div>
    </section>
    <form data-form="login">
      <label>Passord
        <input type="password" data-login autocomplete="current-password" />
      </label>
      <label class="check"><input type="checkbox" data-remember checked /> Husk meg på denne enheten</label>
      ${loginNote ? `<p class="note" role="alert">${esc(loginNote)}</p>` : ""}
      <button class="btn full" type="submit">Logg inn</button>
    </form>
  `;
}

function renderReadingList() {
  const levels = ["A2", "B1", "B2", "C1"];
  return `
    <h1>Lesing</h1>
    <p>Tekstene er gruppert etter nivå. Opplesningen ligger som lydfiler på samme nettsted. Appen lagrer dem ikke for frakoblet bruk.</p>
    <p class="en" lang="en"><span class="en-label">EN</span> The recording is the same text, read aloud in bokmål. Use it as a pronunciation reference.</p>
    ${levels
      .map((level) => {
        const items = readings.filter((reading) => reading.level === level);
        if (!items.length) return "";
        return `<h2>${level}</h2>${items.map((reading) => readingCardRow(reading)).join("")}`;
      })
      .join("")}
  `;
}

function readingCardRow(reading) {
  const done = state.readings?.[reading.id]?.completed;
  return `<article class="lesson-card ${done ? "done" : ""}">
          <p class="meta">${esc(reading.level)} · ${reading.minutes} min${reading.dialogue ? " · dialog" : ""}</p>
          <h3>${esc(reading.title)}</h3>
          <p class="en" lang="en">${esc(reading.titleEn)}</p>
          <p class="fine">${done ? `Lest · ${state.readings[reading.id].bestScore} %` : "Ikke lest"}</p>
          <a class="btn" href="#/lesing/${esc(reading.id)}">Åpne</a>
        </article>`;
}

function voiceLabel(voice) {
  return String(voice || "").includes("Finn") ? "Finn" : "Pernille";
}

function renderReading(id) {
  const reading = readingsById.get(id);
  if (!reading) return `<h1>Fant ikke teksten</h1><a class="btn" href="#/lesing">Til lesing</a>`;
  const session = state.session;
  const mine = session?.kind === "reading" && session.readingId === id;
  if (mine && session.phase === "done") return renderResult(reading.title, session);
  if (mine && !session.finalized && session.phase === "dict") return renderDictation(reading);
  if (mine && !session.finalized && session.phase === "quiz") {
    const task = currentTask();
    if (!task?.exercise) return `<h1>Spørsmålet mangler</h1><a class="btn" href="#/lesing">Til lesing</a>`;
    return exerciseBlock(task.exercise, `Spørsmål ${session.index + 1} av ${reading.questions.length}`);
  }
  return renderReadingArticle(reading);
}

function renderReadingArticle(reading) {
  const sentences = sentencesOf(reading);
  let cursor = 0;
  const body = reading.paragraphs
    .map((paragraph) => {
      const rows = paragraph
        .map(() => {
          const sentence = sentences[cursor];
          cursor += 1;
          const number = cursor;
          const key = sentence.audio;
          const recording = mem.recordingKey === key;
          const take = mem.takes[key];
          const shown = mem.hideText ? `Setning ${number}` : sentence.text;
          const speaker = sentence.voice && sentence.voice !== reading.voice ? voiceLabel(sentence.voice) : reading.dialogue ? voiceLabel(sentence.voice || reading.voice) : "";
          return `<div class="sentence-row">
            <div class="sentence-actions">
              <button class="icon-btn" type="button" data-action="play-src" data-src="${esc(sentence.audio)}" aria-label="Spill setning ${number}">▶</button>
              <button class="icon-btn ${recording ? "rec" : ""}" type="button" data-action="record-sentence" data-key="${esc(key)}" data-src="${esc(sentence.audio)}" aria-pressed="${recording}" aria-label="${recording ? "Stopp opptak" : "Ta opp setningen"}">${recording ? "■" : "●"}</button>
              ${take ? `<button class="icon-btn" type="button" data-action="compare-take" data-key="${esc(key)}" data-src="${esc(sentence.audio)}" aria-label="Sammenlign opptaket med opplesningen">⇄</button>` : ""}
            </div>
            <div>
              ${speaker ? `<p class="fine">${esc(speaker)}</p>` : ""}
              <p lang="nb">${esc(shown)}</p>
              ${mem.showHelp && sentence.en ? `<p class="en" lang="en">${esc(sentence.en)}</p>` : ""}
            </div>
          </div>`;
        })
        .join("");
      return `<div class="paragraph">${rows}</div>`;
    })
    .join("");
  return `
    <p class="kicker">${esc(reading.level)} · ${reading.minutes} min · ${esc(reading.dialogue ? "Pernille og Finn" : voiceLabel(reading.voice))}</p>
    <h1>${esc(reading.title)}</h1>
    <p class="en" lang="en">${esc(reading.titleEn)}</p>
    <div class="player">
      <button class="icon-btn" type="button" data-action="toggle-full" data-src="${esc(reading.audio)}" aria-pressed="false" aria-label="Spill av hele teksten">▶</button>
      <div>
        <strong>Hele teksten</strong>
        <div class="fine" data-duration-for="${esc(reading.audio)}"></div>
      </div>
    </div>
    <p class="note" data-audio-error hidden>Nettleseren spiller ikke lydfilen. Du kan fortsatt lese teksten.</p>
    <p class="fine">Stemmen er bokmål. ▶ spiller setningen. ● tar opp stemmen din på denne enheten. Opptaket stopper når du forlater siden, og etter 45 sekunder. Ingenting lastes opp. Etter opptak trykker du ⇄ selv, så Safari på iPhone får lov til å spille lyden.</p>
    ${mem.micNote ? `<p class="note" role="alert">${esc(mem.micNote)}</p>` : ""}
    <div class="row">
      <button class="btn ghost" type="button" data-action="toggle-text" aria-pressed="${mem.hideText}">${mem.hideText ? "Vis teksten" : "Skjul teksten"}</button>
      ${
        reading.glossary || sentences.some((sentence) => sentence.en)
          ? `<button class="btn ghost" type="button" data-action="toggle-help" aria-pressed="${mem.showHelp}">${mem.showHelp ? "Skjul hjelp" : "Vis hjelp"}</button>`
          : ""
      }
    </div>
    ${
      mem.showHelp && reading.glossary?.length
        ? `<ul class="glossary">${reading.glossary.map((item) => `<li><span lang="nb">${esc(item.no)}</span> — <span lang="en">${esc(item.en)}</span></li>`).join("")}</ul>`
        : ""
    }
    <article class="reading">${body}</article>
    <div class="row">
      <button class="btn" type="button" data-action="start-dictation" data-id="${esc(reading.id)}">Til diktat</button>
      <button class="btn secondary" type="button" data-action="start-reading" data-id="${esc(reading.id)}">Til spørsmålene</button>
    </div>
  `;
}

function renderDictation(reading) {
  const session = state.session;
  const expected = reading.dictation[session.index];
  const audio = sentencesOf(reading).find((sentence) => sentence.text === expected)?.audio || "";
  const last = session.index + 1 >= reading.dictation.length;
  return `
    <p class="kicker">Diktat ${session.index + 1} av ${reading.dictation.length}</p>
    <h1>Skriv det du hører</h1>
    <p class="en" lang="en"><span class="en-label">EN</span> Case and punctuation do not count. The sentence stays hidden until you check.</p>
    <div class="player">
      <button class="icon-btn" type="button" data-action="play-src" data-src="${esc(audio)}" aria-label="Spill setningen">▶</button>
      <div>
        <strong>Setning ${session.index + 1}</strong>
        <div class="fine" data-duration-for="${esc(audio)}"></div>
      </div>
    </div>
    <p class="note" data-audio-error hidden>Nettleseren spiller ikke lydfilen.</p>
    ${mem.note ? `<p class="note" role="alert">${esc(mem.note)}</p>` : ""}
    <label>Din setning
      <textarea data-draft autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" ${mem.locked ? "disabled" : ""}>${esc(mem.draft)}</textarea>
    </label>
    ${mem.locked ? "" : `<div class="row" aria-label="Norske bokstaver">${["æ", "ø", "å", "Æ", "Ø", "Å"].map((letter) => `<button class="btn ghost" type="button" data-action="insert-letter" data-letter="${letter}">${letter}</button>`).join("")}</div>`}
    ${mem.feedback ? dictationFeedback(mem.feedback) : ""}
    ${
      mem.locked
        ? `<button class="btn" type="button" data-action="next-dict">${last ? "Til spørsmålene" : "Neste setning"}</button>`
        : `<button class="btn" type="button" data-action="submit-dict">Sjekk</button>`
    }
  `;
}

function dictationFeedback(feedback) {
  const marks = (feedback.diff || [])
    .map((part) => {
      if (part.type === "spell" && part.letters) {
        const letters = part.letters
          .map((letter) => {
            if (letter.type === "missing") return `<mark class="miss">${esc(letter.text)}</mark>`;
            if (letter.type === "extra") return `<del>${esc(letter.text)}</del>`;
            return esc(letter.text);
          })
          .join("");
        return `<span class="spell">${letters}</span>`;
      }
      if (part.type === "missing") return `<mark class="miss">${esc(part.text)}</mark>`;
      if (part.type === "extra") return `<del>${esc(part.text)}</del>`;
      return esc(part.text);
    })
    .join(" ");
  return `<div class="feedback ${feedback.ok ? "ok" : "bad"}" id="feedback" tabindex="-1">
    <p><strong>${feedback.ok ? "Riktig." : "Ikke helt."}</strong></p>
    <p class="diff">${marks}</p>
    <p>Setningen var: ${esc(feedback.expected)}</p>
    <p class="fine">Gult mangler. Overstreket er ekstra. Én feil bokstav vises inni ordet. Store bokstaver og tegn teller ikke. Tall kan skrives med siffer eller ord.</p>
  </div>`;
}

const clip = new Audio();
clip.preload = "auto";
clip.playbackRate = 1;
clip.dataset.owner = "";
clip.setAttribute("data-player", "engine");
clip.style.display = "none";
document.body.appendChild(clip);

const durationCache = new Map();
let playToken = 0;
let clipDone = null;
let recorder = null;
let recordStream = null;
let recordTimer = null;
const RECORD_LIMIT_MS = 45000;

function absoluteSrc(src) {
  return new URL(src, location.href).href;
}

function formatClock(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "";
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function showAudioError() {
  const node = document.querySelector("[data-audio-error]");
  if (node) node.hidden = false;
}

function settleClip() {
  const done = clipDone;
  clipDone = null;
  if (done) done();
}

function haltAudio() {
  playToken += 1;
  clip.pause();
  settleClip();
}

function paintDurations() {
  const owner = clip.dataset.owner || "";
  for (const node of document.querySelectorAll("[data-duration-for]")) {
    const url = absoluteSrc(node.dataset.durationFor);
    const known = durationCache.get(url);
    if (!Number.isFinite(known) || known <= 0) {
      node.textContent = "";
      continue;
    }
    let current = 0;
    if (owner === url && Number.isFinite(clip.currentTime)) {
      current = clip.ended ? 0 : clip.currentTime;
    }
    node.textContent = `${formatClock(current)} / ${formatClock(known)}`;
  }
}

function paintPlayer() {
  const playing = !clip.paused && !clip.ended;
  const owner = clip.dataset.owner || "";
  for (const button of document.querySelectorAll("[data-action='toggle-full']")) {
    const on = playing && absoluteSrc(button.dataset.src) === owner;
    button.textContent = on ? "❚❚" : "▶";
    button.setAttribute("aria-pressed", on ? "true" : "false");
  }
  paintDurations();
}

function rememberDuration() {
  if (Number.isFinite(clip.duration) && clip.duration > 0 && clip.dataset.owner) {
    durationCache.set(clip.dataset.owner, clip.duration);
  }
  paintPlayer();
}

clip.addEventListener("timeupdate", paintPlayer);
clip.addEventListener("pause", paintPlayer);
clip.addEventListener("play", paintPlayer);
clip.addEventListener("loadedmetadata", rememberDuration);
clip.addEventListener("ended", paintPlayer);

function playUrl(src) {
  if (!src) return Promise.resolve();
  haltAudio();
  const token = playToken;
  const url = absoluteSrc(src);
  return new Promise((resolve) => {
    clipDone = resolve;
    const finish = () => {
      if (token !== playToken) return;
      settleClip();
      paintPlayer();
    };
    clip.addEventListener("ended", finish, { once: true });
    clip.addEventListener(
      "error",
      () => {
        if (token !== playToken) return;
        showAudioError();
        settleClip();
      },
      { once: true },
    );
    clip.src = url;
    clip.playbackRate = 1;
    clip.dataset.owner = url;
    clip.play().catch(() => {
      if (token !== playToken) return;
      showAudioError();
      settleClip();
    });
  });
}

async function playThen(first, second) {
  await playUrl(first);
  if (!second) return;
  await playUrl(second);
}

function ensureDuration(src) {
  const url = absoluteSrc(src);
  if (durationCache.has(url)) return Promise.resolve(durationCache.get(url));
  return new Promise((resolve) => {
    const probe = new Audio();
    probe.preload = "metadata";
    const finish = (value) => {
      if (Number.isFinite(value) && value > 0) durationCache.set(url, value);
      probe.removeAttribute("src");
      probe.load();
      resolve(durationCache.get(url) || 0);
    };
    probe.addEventListener("loadedmetadata", () => finish(probe.duration), { once: true });
    probe.addEventListener(
      "error",
      () => {
        showAudioError();
        finish(0);
      },
      { once: true },
    );
    probe.src = url;
  });
}

function hydrateAudio() {
  clip.playbackRate = 1;
  const sources = [...document.querySelectorAll("[data-duration-for]")].map((node) => node.dataset.durationFor).filter(Boolean);
  for (const src of sources) ensureDuration(src).then(() => paintDurations());
  paintPlayer();
}

function releaseStream() {
  recordStream?.getTracks().forEach((track) => track.stop());
  recordStream = null;
}

function stopRecording() {
  if (recordTimer) {
    clearTimeout(recordTimer);
    recordTimer = null;
  }
  if (recorder && recorder.state === "recording") {
    try {
      recorder.stop();
    } catch {
      releaseStream();
      mem.recordingKey = "";
      recorder = null;
    }
    return;
  }
  releaseStream();
  if (mem.recordingKey) {
    mem.recordingKey = "";
    recorder = null;
  }
}

async function toggleRecord(key, src) {
  if (recorder && recorder.state === "recording") {
    stopRecording();
    return;
  }
  if (mem.recordingKey === "pending") return;
  mem.recordingKey = "pending";
  haltAudio();
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    mem.recordingKey = "";
    mem.micNote = "Mikrofonen ble ikke tillatt. Opptaket blir bare liggende i denne nettleseren, og ingenting lastes opp.";
    render();
    return;
  }
  releaseStream();
  recordStream = stream;
  let nextRecorder;
  try {
    const mime = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported?.("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
    nextRecorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
  } catch {
    releaseStream();
    mem.recordingKey = "";
    mem.micNote = "Mikrofonen ble ikke tillatt. Opptaket blir bare liggende i denne nettleseren, og ingenting lastes opp.";
    render();
    return;
  }
  recorder = nextRecorder;
  const chunks = [];
  recorder.ondataavailable = (event) => {
    if (event.data?.size) chunks.push(event.data);
  };
  recorder.onstop = () => {
    releaseStream();
    const blob = new Blob(chunks, { type: recorder?.mimeType || "audio/webm" });
    if (mem.takes[key]) URL.revokeObjectURL(mem.takes[key]);
    const url = URL.createObjectURL(blob);
    mem.takes[key] = url;
    mem.recordingKey = "";
    recorder = null;
    mem.micNote = "Opptaket er klart. Trykk ⇄ for å høre originalen og deretter deg selv.";
    render();
  };
  mem.recordingKey = key;
  mem.micNote = "";
  recorder.start(1000);
  recordTimer = setTimeout(() => {
    mem.micNote = "Opptaket stoppet etter 45 sekunder.";
    stopRecording();
  }, RECORD_LIMIT_MS);
  render();
}

function render() {
  const current = route();
  const main = document.getElementById("main");
  document.body.classList.toggle("locked", !isAuthed());
  if (!isAuthed()) {
    main.innerHTML = renderLogin();
    document.title = "Norsk hver dag · logg inn";
    if (focusMode === "route") main.querySelector("h1")?.focus();
    focusMode = "none";
    return;
  }
  const view =
    current.name === "home"
      ? renderHome()
      : current.name === "kurs"
        ? renderPath()
        : current.name === "lesing"
          ? current.id
            ? renderReading(current.id)
            : renderReadingList()
          : current.name === "uttale"
            ? renderPronunciation()
        : current.name === "jobb"
          ? renderJob()
          : current.name === "fremgang"
            ? renderDash()
            : current.name === "mer"
              ? renderMore()
              : current.name === "om"
                ? renderAbout()
                : current.name === "ord"
                  ? renderVocab()
                  : current.name === "innstillinger"
                    ? renderSettings()
                    : current.name === "leksjon"
                      ? renderLesson(current.id)
                      : current.name === "plassering"
                        ? renderPlacement()
                        : current.name === "ovelse"
                          ? renderReview()
                          : `<h1>Fant ikke siden</h1><a class="btn" href="#/">Hjem</a>`;
  main.innerHTML = view;
  const tab = ["ord", "innstillinger", "om", "uttale"].includes(current.name) ? "mer" : current.name;
  for (const link of document.querySelectorAll(".tabbar a")) {
    if ((link.dataset.tab || "home") === (tab || "home")) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  document.title = current.name === "home" ? "Norsk hver dag" : `Norsk hver dag · ${current.name}`;
  if (focusMode === "route") main.querySelector("h1")?.focus();
  if (focusMode === "feedback") document.getElementById("feedback")?.focus();
  if (focusMode === "choice" && mem.choice) {
    document.querySelector(`[data-value="${CSS.escape(mem.choice)}"]`)?.focus();
  }
  if (current.name === "ord") {
    const search = document.getElementById("vocab-search");
    if (search && document.activeElement !== search && mem.query) {
      search.focus();
      const end = search.value.length;
      search.setSelectionRange(end, end);
    }
  }
  hydrateAudio();
  focusMode = "none";
}

function onClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "play-src") {
    playUrl(button.dataset.src);
    return;
  }
  if (action === "toggle-full") {
    const src = button.dataset.src;
    const url = absoluteSrc(src);
    if (clip.dataset.owner === url && !clip.paused && !clip.ended) {
      clip.pause();
      paintPlayer();
      return;
    }
    playUrl(src);
    return;
  }
  if (action === "record-sentence") {
    toggleRecord(button.dataset.key, button.dataset.src);
    return;
  }
  if (action === "compare-take") {
    const take = mem.takes[button.dataset.key];
    if (take) playThen(button.dataset.src, take);
    return;
  }
  if (action === "start-dictation") {
    beginDictation(button.dataset.id);
    return;
  }
  if (action === "submit-dict") {
    submitDictation();
    return;
  }
  if (action === "next-dict") {
    nextDict();
    return;
  }
  if (action === "practice-concept") {
    startConceptPractice(button.dataset.concept);
    return;
  }
  if (action === "choose") {
    if (mem.locked) return;
    mem.choice = button.dataset.value;
    mem.note = "";
    focusMode = "choice";
    render();
    return;
  }
  if (action === "pick" || action === "unpick") {
    if (mem.locked || !mem.chips) return;
    const key = button.dataset.key;
    if (action === "pick") {
      const index = mem.chips.bank.findIndex((chip) => chip.key === key);
      if (index >= 0) mem.chips.chosen.push(mem.chips.bank.splice(index, 1)[0]);
    } else {
      const index = mem.chips.chosen.findIndex((chip) => chip.key === key);
      if (index >= 0) mem.chips.bank.push(mem.chips.chosen.splice(index, 1)[0]);
    }
    render();
    return;
  }
  if (action === "submit") submitCurrent();
  if (action === "next") nextStep();
  if (action === "open-lesson") startLesson(button.dataset.id, button.dataset.fresh === "true");
  if (action === "start-reading") beginReadingQuestions(button.dataset.id);
  if (action === "toggle-text") {
    mem.hideText = !mem.hideText;
    render();
  }
  if (action === "logout") {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    loginNote = "";
    render();
  }
  if (action === "review") startReview();
  if (action === "start-placement") startPlacement();
  if (action === "pick-level") confirmLevel(button.dataset.level, "manual");
  if (action === "confirm-level") confirmLevel(button.dataset.level, button.dataset.source || "placement");
  if (action === "phase") {
    state.session.phase = button.dataset.phase;
    if (button.dataset.phase === "quiz") introduceVocab(lessonsById.get(state.session.lessonId));
    resetAnswer();
    focusMode = "route";
    save();
    render();
  }
  if (action === "theme") {
    mem.theme = button.dataset.theme;
    render();
  }
  if (action === "vocab-level") {
    mem.level = button.dataset.level;
    render();
  }
  if (action === "toggle-help" || action === "toggle-model") {
    mem.showHelp = !mem.showHelp;
    render();
  }
  if (action === "insert-letter") {
    const box = document.querySelector("[data-draft]");
    const letter = button.dataset.letter || "";
    const start = box?.selectionStart ?? mem.draft.length;
    const end = box?.selectionEnd ?? start;
    mem.draft = `${mem.draft.slice(0, start)}${letter}${mem.draft.slice(end)}`;
    render();
    const next = document.querySelector("[data-draft]");
    if (next) {
      next.focus();
      const cursor = start + letter.length;
      next.setSelectionRange(cursor, cursor);
    }
  }
  if (action === "pron-choose") {
    mem.choice = button.dataset.value;
    render();
  }
  if (action === "pron-check") {
    const items = pronunciationItems();
    const item = items[Math.min(mem.pronIndex || 0, items.length - 1)];
    if (!mem.choice) {
      mem.note = "Velg et ord først.";
      render();
      return;
    }
    mem.feedback = { ok: mem.choice === item.word };
    mem.locked = true;
    focusMode = "feedback";
    render();
  }
  if (action === "pron-next") {
    const items = pronunciationItems();
    const index = mem.pronIndex || 0;
    mem.pronIndex = index + 1 >= items.length ? 0 : index + 1;
    mem.choice = null;
    mem.feedback = null;
    mem.locked = false;
    focusMode = "route";
    render();
  }
  if (action === "start-day") startDay();
  if (action === "day-review") {
    if (state.dayQueue) state.dayQueue.stage = "review";
    startReview();
  }
  if (action === "day-reading") {
    const id = state.dayQueue?.readingId;
    if (state.dayQueue) state.dayQueue.stage = "done";
    if (id) go(`#/lesing/${id}`);
  }
  if (action === "skip-produce" || action === "finish-produce") {
    finishSession();
  }
  if (action === "export") downloadProgress();
  if (action === "reset-ask") openReset();
  if (action === "reset-yes") {
    state = freshState();
    mem = blankMem();
    save();
    document.getElementById("dialog").close();
    go("#/");
  }
  if (action === "dialog-close") document.getElementById("dialog").close();
}

function downloadProgress() {
  const blob = new Blob([JSON.stringify(exportPayload(state), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `norsk-hver-dag-${localISO()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openReset() {
  const dialog = document.getElementById("dialog");
  dialog.innerHTML = `<h2 id="dialog-title">Slette fremgangen?</h2><p>Rekke, leksjoner og ordkort på denne enheten blir borte. Eksporter først hvis du vil ta vare på dem.</p><div class="row"><button class="btn" type="button" data-action="reset-yes">Slett</button><button class="btn ghost" type="button" data-action="dialog-close">Avbryt</button></div>`;
  dialog.showModal();
}

function onInput(event) {
  if (event.target.matches("[data-draft]")) mem.draft = event.target.value;
  if (event.target.matches("[data-setting='name']")) {
    state.settings.name = event.target.value;
    save();
  }
  if (event.target.matches("[data-vocab-query]")) {
    mem.query = event.target.value;
    const start = event.target.selectionStart;
    render();
    const search = document.getElementById("vocab-search");
    if (search) {
      search.focus();
      search.setSelectionRange(start, start);
    }
  }
}

async function onChange(event) {
  if (!event.target.matches("[data-import]")) return;
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  try {
    state = parseImport(await file.text());
    mem = blankMem();
    save();
    announce("Fremgangen er importert.");
    go("#/");
  } catch (error) {
    const dialog = document.getElementById("dialog");
    dialog.innerHTML = `<h2 id="dialog-title">Kunne ikke importere</h2><p>${esc(error.message || "Ukjent feil")}</p><button class="btn" type="button" data-action="dialog-close">Lukk</button>`;
    dialog.showModal();
  }
}

function submitLogin() {
  const input = document.querySelector("[data-login]");
  const remember = document.querySelector("[data-remember]")?.checked;
  if ((input?.value || "") === PAGE_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "1");
    if (remember) localStorage.setItem(AUTH_KEY, "1");
    else localStorage.removeItem(AUTH_KEY);
    loginNote = "";
    focusMode = "route";
    render();
    return;
  }
  loginNote = "Feil passord. Prøv igjen.";
  render();
  document.querySelector("[data-login]")?.focus();
}

function onSubmit(event) {
  if (event.target.matches("[data-form='login']")) {
    event.preventDefault();
    submitLogin();
    return;
  }
  if (!event.target.matches("[data-form='answer']")) return;
  event.preventDefault();
  submitCurrent();
}

function onKeydown(event) {
  if (event.key === "Enter" && mem.locked && document.activeElement?.tagName !== "TEXTAREA") {
    const next = document.querySelector("[data-action='next'], [data-action='next-dict']");
    if (next) {
      event.preventDefault();
      next.click();
    }
    return;
  }
  if (mem.locked) return;
  if (/^[1-9]$/.test(event.key) && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
    const option = document.querySelectorAll(".option")[Number(event.key) - 1];
    if (option) {
      event.preventDefault();
      option.click();
    }
  }
  if (event.key === "Enter" && document.activeElement?.classList?.contains("option")) {
    event.preventDefault();
    submitCurrent();
  }
}

document.getElementById("main").addEventListener("click", onClick);
document.getElementById("dialog").addEventListener("click", onClick);
document.getElementById("main").addEventListener("input", onInput);
document.getElementById("main").addEventListener("change", onChange);
document.getElementById("main").addEventListener("submit", onSubmit);
document.addEventListener("keydown", onKeydown);
window.addEventListener("hashchange", () => {
  focusMode = "route";
  haltAudio();
  stopRecording();
  render();
});
window.addEventListener("pagehide", () => stopRecording());
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") stopRecording();
});
render();

import {
  LEVELS,
  allVocab,
  conceptById,
  concepts,
  jobLessons,
  lessonMap,
  lessons,
  placement,
  vocabMap,
} from "../data/catalog.js";
import { buildReview, conceptMastery, dueCount, jobSuggestion, recommendLesson, suggestLevel } from "./adapt.js";
import { checkExercise } from "./check.js";
import { emptyCard, schedule } from "./srs.js";
import {
  exportPayload,
  freshState,
  loadState,
  markStudyDay,
  parseImport,
  recordConcept,
  saveState,
} from "./storage.js";
import { esc, formatWhen, greeting, localISO, paragraphs, shuffle } from "./util.js";

const lessonsById = lessonMap();
const wordsById = vocabMap();
let state = loadState();
let mem = blankMem();
let focusMode = "route";

function blankMem() {
  return {
    draft: "",
    note: "",
    locked: false,
    feedback: null,
    choice: null,
    chips: null,
    query: "",
    theme: "alle",
  };
}

function resetAnswer() {
  mem.draft = "";
  mem.note = "";
  mem.locked = false;
  mem.feedback = null;
  mem.choice = null;
  mem.chips = null;
}

function save() {
  saveState(state);
}

function route() {
  const parts = (location.hash || "#/").replace(/^#/, "").split("/").filter(Boolean);
  return { name: parts[0] || "home", id: parts[1] || "" };
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

function lessonRecord(id) {
  return state.lessons[id];
}

function startLesson(id, fresh = false) {
  const lesson = lessonsById.get(id);
  if (!lesson) return;
  ensureProfile(lesson.level === "C2" ? "C1" : lesson.level);
  const existing = state.session;
  const resume = !fresh && existing?.kind === "lesson" && existing.lessonId === id && !existing.finalized;
  if (!resume) {
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
    const wrong = shuffle(allVocab().filter((other) => other.en !== word.en)).slice(0, 3);
    optionsByKey[item.key] = shuffle([word.en, ...wrong.map((other) => other.en)]);
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
    const ok = mem.choice === task.vocab.en;
    const card = state.srs[task.vocab.id] || emptyCard("vocab", "");
    state.srs[task.vocab.id] = schedule(card, ok ? 5 : 0);
    if (card.concept && conceptById[card.concept]) recordConcept(state, card.concept, ok);
    state.session.answers.push({ ok, concept: card.concept || "", id: task.vocab.id, bucket: task.bucket });
    mem.locked = true;
    mem.feedback = {
      ok,
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
  state.session.answers.push({
    id: exercise.id,
    ok: result.ok,
    concept: exercise.concept,
    bucket: task.bucket || null,
    expected: result.expected,
    explanation: exercise.explanation,
    prompt: exercise.prompt,
  });
  mem.locked = true;
  mem.feedback = {
    ok: result.ok,
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
        : session.plan.length;
  resetAnswer();
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
    session.result = { correct, total, score, suggested: suggestLevel(correct, total) };
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
    };
    markStudyDay(state);
  } else if (session.kind === "review" && total > 0) {
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

function sentenceHtml(text) {
  return esc(text).replaceAll("___", '<span class="gap" aria-hidden="true">____</span>');
}

function ensureChips(exercise) {
  if (mem.chips?.id === exercise.id) return mem.chips;
  const keyed = exercise.words.map((word, index) => ({ word, key: `${exercise.id}-${index}` }));
  mem.chips = { id: exercise.id, bank: shuffle(keyed), chosen: [] };
  return mem.chips;
}

function exerciseBlock(exercise, progressLabel) {
  const chips = exercise.type === "order" && !mem.feedback ? ensureChips(exercise) : mem.chips;
  const options = exercise.type === "mc" ? exercise.options : [];
  return `
    <p class="kicker">${esc(progressLabel)} · ${esc(conceptLabel(exercise.concept))}</p>
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
    <p class="fine">Tast 1–4 velger. Enter sjekker.</p>
    <button class="btn" type="button" data-action="submit">Sjekk svar</button>`;
  }
  if (exercise.type === "order") {
    return `<div class="answer-line" aria-live="polite">${
      chips.chosen.length
        ? `<div class="chosen">${chips.chosen
            .map((chip) => `<button type="button" class="chip" data-action="unpick" data-key="${esc(chip.key)}">${esc(chip.word)}</button>`)
            .join("")}</div>`
        : `<span class="muted">Trykk på ordene i riktig rekkefølge.</span>`
    }</div>
    <div class="bank" aria-label="Ord å velge mellom">${chips.bank
      .map((chip) => `<button type="button" class="chip" data-action="pick" data-key="${esc(chip.key)}">${esc(chip.word)}</button>`)
      .join("")}</div>
    <button class="btn" type="button" data-action="submit">Sjekk svar</button>`;
  }
  const long = exercise.type === "rewrite" || exercise.type === "fix";
  return `<form data-form="answer">
    <label>${long ? "Din setning" : "Ord som mangler"}
      ${long ? `<textarea data-draft lang="nb">${esc(mem.draft)}</textarea>` : `<input type="text" data-draft lang="nb" autocomplete="off" autocapitalize="off" value="${esc(mem.draft)}" />`}
    </label>
    <button class="btn" type="submit" data-action="submit">Sjekk svar</button>
  </form>`;
}

function vocabBlock(word, progressLabel) {
  const options = state.session.optionsByKey[state.session.plan[state.session.index].key] || [word.en];
  return `
    <p class="kicker">${esc(progressLabel)} · ord</p>
    <h1>${esc(word.no)}</h1>
    <p>${esc(word.example)}</p>
    <p class="en" lang="en"><span class="en-label">EN</span> Choose the meaning.</p>
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
      <div class="stat"><b>${state.streak.current}</b><span>dager på rad</span></div>
      <div class="stat"><b>${esc(state.profile?.level || "–")}</b><span>nivå</span></div>
      <div class="stat"><b>${completedCount()}</b><span>leksjoner</span></div>
    </div>
    ${resume ? resumeCard(resume) : ""}
    ${recommended ? lessonTeaser(recommended, "Dagens leksjon") : ""}
    <article class="card">
      <p class="kicker">Repetisjon</p>
      <h2>Svake emner og gjentakelse</h2>
      <p>${due ? `${due} kort er forfalt.` : "Nye ord og bommer legges i køen etter leksjonen."} Omtrent 70 % kommer fra det du kan minst, og 30 % er repetisjon.</p>
      <button class="btn" type="button" data-action="review">Start repetisjon</button>
    </article>
    ${job.lesson ? jobCard(job) : ""}
    ${weakList()}
  `;
}

function renderWelcome() {
  return `
    <section class="hero">
      <p class="kicker">Bokmål · 10–15 minutter</p>
      <h1>Hei, ${esc(name())}.</h1>
      <p>En løype fra A1 til C1, med tettere stoff på B2 og C1, pluss jobbnorsk for e-post, status og møter.</p>
      <div class="english" lang="en">
        <p>You took Norwegian at university and use English at work. This app keeps the interface in Norwegian and explains grammar in English. There is no assistant and no account. Progress stays in this browser, and you can export it.</p>
      </div>
    </section>
    <article class="card">
      <h2>Nivåtest</h2>
      <p>Omtrent ${placement.minutes} minutter. 20 spørsmål om ordstilling, tid, passiv, sin/hans og formelt språk. Du kan ta den om igjen, eller velge nivå selv.</p>
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

function weakList() {
  const ranked = concepts
    .map((concept) => ({ concept, mastery: conceptMastery(state, concept.id), attempts: state.concepts[concept.id]?.attempts || 0 }))
    .filter((item) => item.attempts > 0)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);
  if (!ranked.length) return `<p class="fine">Når du har svart på noen oppgaver, vises de svakeste emnene her.</p>`;
  return `<h2>Svakest nå</h2><div class="row">${ranked
    .map((item) => `<span class="pill">${esc(item.concept.name)} ${item.mastery} %</span>`)
    .join("")}</div>`;
}

function renderPath() {
  const recommended = state.profile ? recommendLesson(state, lessons) : null;
  const groups = ["A1", "A2", "B1", "B2", "C1"];
  return `
    <h1>Løype</h1>
    <p class="en" lang="en"><span class="en-label">EN</span> Nothing is locked. The daily pick still prefers your level and your weak concepts.</p>
    ${groups
      .map((level) => {
        const items = lessons.filter((lesson) => lesson.track === "core" && lesson.level === level);
        return `<h2>${level}</h2>${items.map((lesson) => lessonRow(lesson, recommended?.id === lesson.id)).join("")}`;
      })
      .join("")}
    <p class="fine">C2 er et mulig resultat på nivåtesten. Løypa stopper på C1, og repetisjonen vekter da de vanskeligste emnene.</p>
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
    <p>E-post, status til ledelsen, referat, tall og høflig uenighet. Én leksjon i uka er nok ved siden av dagsløypa.</p>
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
      <div class="stat"><b>${state.streak.current}</b><span>dager nå</span></div>
      <div class="stat"><b>${state.streak.best}</b><span>beste rekke</span></div>
      <div class="stat"><b>${completedCount()}/${lessons.length}</b><span>leksjoner</span></div>
      <div class="stat"><b>${dueCount(state)}</b><span>forfalte kort</span></div>
    </div>
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
  const tone = !attempts ? "none" : mastery < 60 ? "low" : mastery < 80 ? "mid" : "ok";
  return `<article class="concept">
    <h3>${esc(concept.name)}</h3>
    <p class="en" lang="en">${esc(concept.nameEn)}. ${esc(concept.blurb)}</p>
    <div class="meter ${tone}">
      <div class="meter-track"><span style="width:${attempts ? mastery : 0}%"></span></div>
      <span>${attempts ? `${mastery} %` : "ikke øvd"}</span>
    </div>
  </article>`;
}

function renderMore() {
  return `
    <h1>Mer</h1>
    <article class="card"><h2>Ordbank</h2><p>${allVocab().length} oppslag fra løypa og en ekstra bank.</p><a class="btn" href="#/ord">Åpne ordbanken</a></article>
    <article class="card"><h2>Innstillinger</h2><p>Nivå, eksport og import av fremgang.</p><a class="btn" href="#/innstillinger">Åpne innstillinger</a></article>
    <article class="card"><h2>Om</h2><p>Bokmål, forklaringer på engelsk, ferdigskrevne øvelser. Fremgangen ligger i denne nettleseren.</p><a class="btn secondary" href="#/om">Les om appen</a></article>
  `;
}

function renderAbout() {
  return `
    <h1>Om appen</h1>
    <p>Norsk hver dag er en statisk øvelsesbok. Den velger neste leksjon ut fra nivå og hvilke emner som er svakest, og den legger ord og feil i en enkel repetisjonskø.</p>
    <div class="english" lang="en">
      <p>There is no server and no model in the loop. If a sentence is in the app, it was written into the lesson files. Export the JSON if you want the same streak on another phone.</p>
    </div>
    <p>UI-et er på norsk. Grammatikkforklaringen etterpå er på engelsk, merket EN.</p>
    <a class="btn ghost" href="#/mer">Tilbake</a>
  `;
}

function renderVocab() {
  const query = mem.query.trim().toLowerCase();
  const themes = ["alle", ...new Set(allVocab().map((word) => word.theme))];
  const list = allVocab().filter((word) => {
    const themeOk = mem.theme === "alle" || word.theme === mem.theme;
    const hay = `${word.no} ${word.en} ${word.example}`.toLowerCase();
    return themeOk && (!query || hay.includes(query));
  });
  return `
    <h1>Ordbank</h1>
    <label>Søk
      <input id="vocab-search" type="search" data-vocab-query value="${esc(mem.query)}" />
    </label>
    <div class="filters row" role="group" aria-label="Tema">${themes
      .map(
        (theme) => `<button type="button" class="btn ghost" data-action="theme" data-theme="${esc(theme)}" aria-pressed="${mem.theme === theme}">${esc(theme)}</button>`,
      )
      .join("")}</div>
    <p class="fine">${list.length} treff</p>
    ${list
      .slice(0, 80)
      .map(
        (word) => `<article class="word"><div class="no">${esc(word.no)}</div><div class="en" lang="en">${esc(word.en)}</div><div>${esc(word.example)}</div><div class="fine">${esc(word.level)} · ${esc(word.theme)}</div></article>`,
      )
      .join("")}
    ${list.length > 80 ? `<p class="fine">Viser 80 av ${list.length}. Snevre inn søket for resten.</p>` : ""}
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
  `;
}

function renderLesson(id) {
  const lesson = lessonsById.get(id);
  if (!lesson) return `<h1>Fant ikke leksjonen</h1><a class="btn" href="#/loyper">Til løypa</a>`;
  if (!state.session || state.session.kind !== "lesson" || state.session.lessonId !== id) {
    return `<h1>${esc(lesson.title)}</h1><p>${esc(lesson.maal)}</p><button class="btn" type="button" data-action="open-lesson" data-id="${esc(id)}">Start</button>`;
  }
  const session = state.session;
  if (session.phase === "intro") {
    return `
      <p class="kicker">${esc(lesson.level)} · ${lesson.minutes} min</p>
      <h1>${esc(lesson.title)}</h1>
      <p class="en" lang="en">${esc(lesson.titleEn)}</p>
      <p>${esc(lesson.maal)}</p>
      <div class="english" lang="en">${paragraphs(lesson.intro).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div>
      <p class="husk"><strong>Husk.</strong> ${esc(lesson.husk)}</p>
      ${lesson.examples.map((example) => `<div class="example"><div class="no">${esc(example.no)}</div><div class="en" lang="en">${esc(example.en)}</div></div>`).join("")}
      <button class="btn" type="button" data-action="phase" data-phase="words">Videre til ordene</button>
    `;
  }
  if (session.phase === "words") {
    return `
      <p class="kicker">${lesson.vocab.length} ord og uttrykk</p>
      <h1>Nye ord</h1>
      <p class="en" lang="en"><span class="en-label">EN</span> These go into the spaced-repetition queue after this step.</p>
      ${lesson.vocab
        .map(
          (word) => `<article class="word"><div class="no">${esc(word.no)}</div><div class="en" lang="en">${esc(word.en)}</div><div>${esc(word.example)}</div><div class="fine" lang="en">${esc(word.exampleEn)}</div></article>`,
        )
        .join("")}
      <button class="btn" type="button" data-action="phase" data-phase="quiz">Til øvelsene</button>
    `;
  }
  if (session.phase === "done") return renderResult(lesson.title, session);
  const exercise = lesson.exercises[session.index];
  return exerciseBlock(exercise, `Øvelse ${session.index + 1} av ${lesson.exercises.length}`);
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
  return exerciseBlock(exercise, `Spørsmål ${session.index + 1} av ${placement.items.length}`);
}

function renderPlacementResult(session) {
  const result = session.result;
  const previous = state.profile?.level;
  return `
    <p class="kicker">Forslag</p>
    <h1>${esc(result.suggested)}</h1>
    <p>${result.correct} av ${result.total} riktige · ${result.score} %.</p>
    <div class="english" lang="en"><p>This is a suggestion. B2 and C1 are close together on purpose. Pick the level whose lessons you want tomorrow, even if it is not the suggestion.</p></div>
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

function renderReview() {
  const session = state.session;
  if (!session || session.kind !== "review") {
    return `<h1>Repetisjon</h1><button class="btn" type="button" data-action="review">Lag en økt</button>`;
  }
  if (session.phase === "empty") {
    return `<h1>Ingenting i køen ennå</h1><p>Fullfør en leksjon. Ordene og oppgavene du bommer på, blir liggende til senere.</p><a class="btn" href="#/">Til i dag</a>`;
  }
  if (session.phase === "done") return renderResult("Repetisjon", session);
  const task = currentTask();
  const label = `Oppgave ${session.index + 1} av ${session.plan.length} · ${session.weakCount} svake · ${session.reviewCount} repetisjon`;
  if (task?.vocab) return vocabBlock(task.vocab, label);
  if (task?.exercise) return exerciseBlock(task.exercise, label);
  return `<h1>Denne oppgaven mangler</h1><button class="btn" type="button" data-action="next">Hopp over</button>`;
}

function renderResult(title, session) {
  const correct = session.answers.filter((answer) => answer.ok).length;
  return `
    <p class="kicker">Ferdig</p>
    <h1>${esc(title)}</h1>
    <p><strong>${correct} av ${session.answers.length}</strong> riktige · ${session.score} %.</p>
    <p>Rekke: ${state.streak.current} dager. Beste: ${state.streak.best}.</p>
    <div class="row">
      <a class="btn" href="#/">I dag</a>
      <a class="btn secondary" href="#/fremgang">Fremgang</a>
    </div>
  `;
}

function render() {
  const current = route();
  const main = document.getElementById("main");
  const view =
    current.name === "home"
      ? renderHome()
      : current.name === "loyper"
        ? renderPath()
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
  const tab = ["ord", "innstillinger", "om"].includes(current.name) ? "mer" : current.name;
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
  focusMode = "none";
}

function onClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
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

function onSubmit(event) {
  if (!event.target.matches("[data-form='answer']")) return;
  event.preventDefault();
  submitCurrent();
}

function onKeydown(event) {
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
  render();
});
render();

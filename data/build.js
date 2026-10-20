/** Helpers for lesson files. See README (Legge til en leksjon). */

import { decoysFor } from "./decoys.js";
import { gapChoices } from "./gap-choices.js";

function unique(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const text = String(item ?? "").trim();
    if (!text || seen.has(text)) continue;
    seen.add(text);
    out.push(text);
  }
  return out;
}

function bodyOf(sentence) {
  return String(sentence).replace(/[.!?…]+$/u, "").trim();
}

function soften(prompt) {
  return prompt
    .replace(/^Skriv setningen mer presist/, "Velg den mer presise setningen")
    .replace(/^Skriv setningen riktig/, "Velg den riktige setningen")
    .replace(/^Skriv frasen riktig/, "Velg den riktige frasen")
    .replace(/^Skriv spørsmålet riktig/, "Velg det riktige spørsmålet")
    .replace(/^Skriv setningen med/, "Velg setningen med")
    .replace(/^Skriv setningen slik/, "Velg setningen slik")
    .replace(/^Skriv setningen/, "Velg setningen")
    .replace(/^Skriv skjelettet/, "Velg skjelettet")
    .replace(/^Skriv åpningen/, "Velg åpningen")
    .replace(/^Skriv om hearsay-skal til/, "Velg")
    .replace(/^Skriv om slik at/, "Velg formuleringen slik at")
    .replace(/^Skriv om til/, "Velg")
    .replace(/^Skriv beløpet/, "Velg beløpet")
    .replace(/^Skriv en /, "Velg en ")
    .replace(/^Skriv statussetningen/, "Velg statussetningen")
    .replace(/^Gjør om samtalen til/, "Velg")
    .replace(/^Del opp i to setninger/, "Velg oppdelingen i to setninger")
    .replace(/^Legg inn relativsetningen/, "Velg setningen med relativsetningen")
    .replace(/^Si nei, og si hva du kan gjøre/, "Velg svaret der du sier nei og hva du kan gjøre")
    .replace(/^Slå sammen til én setning/, "Velg sammenslåingen til én setning")
    .replace(/^Bruk «Så vidt jeg vet» først i setningen/, "Velg setningen som starter med «Så vidt jeg vet»");
}

/**
 * Free typing of a whole sentence is not used. A gap becomes a choice of
 * ready-made fillers. A correction or a rewrite becomes a choice among full
 * sentences, so another valid wording is never marked wrong.
 */
export function closeExercise(exercise) {
  if (exercise.type === "mc" || exercise.type === "order") return exercise;
  if (exercise.type === "fill") {
    const options = gapChoices[exercise.id];
    if (!options) throw new Error(`Missing gap choices for ${exercise.id}`);
    const answer = exercise.answers.find((item) => options.includes(item));
    if (!answer) throw new Error(`Gap choices for ${exercise.id} do not include an accepted answer`);
    return {
      ...exercise,
      type: "mc",
      options: [...options],
      answer,
      answers: exercise.answers.filter((item) => options.includes(item)),
    };
  }
  if (exercise.type === "fix" || exercise.type === "rewrite") {
    const accepted = unique(exercise.answers);
    const answer = accepted[0];
    const blocked = new Set(accepted);
    const rawSource = String(exercise.wrong || exercise.source || "").trim();
    const source = rawSource && !/[.!?…]$/.test(answer) ? bodyOf(rawSource) : rawSource;
    const wrongs = [];
    if (source && !blocked.has(source)) wrongs.push(source);
    const decoys = unique([...(exercise.decoys || []), ...decoysFor(exercise.id)]).filter(
      (item) => !blocked.has(item) && item !== source,
    );
    const options = unique([...accepted, ...wrongs, ...decoys]);
    if (options.length < 2 || !accepted.every((item) => options.includes(item))) {
      throw new Error(`Could not build choices for ${exercise.id}`);
    }
    const rest = { ...exercise };
    delete rest.wrong;
    delete rest.source;
    delete rest.decoys;
    return {
      ...rest,
      type: "mc",
      prompt: soften(exercise.prompt),
      options,
      answer,
      answers: accepted,
    };
  }
  throw new Error(`Unknown exercise type ${exercise.type} on ${exercise.id}`);
}

export function asList(value) {
  return Array.isArray(value) ? value : [value];
}

export function mc(concept, prompt, options, answer, explanation, promptEn = "") {
  return { type: "mc", concept, prompt, promptEn, options, answer, explanation };
}

export function fill(concept, prompt, text, answers, explanation, promptEn = "") {
  return {
    type: "fill",
    concept,
    prompt,
    promptEn,
    text,
    answers: asList(answers),
    explanation,
    ignoreComma: concept !== "punctuation",
  };
}

export function order(concept, prompt, solution, explanation, extras = [], promptEn = "", solutions = []) {
  const accepted = [solution, ...solutions].filter((row) => Array.isArray(row) && row.length);
  const counts = new Map();
  for (const row of accepted) {
    const seen = new Map();
    for (const token of row) seen.set(token, (seen.get(token) || 0) + 1);
    for (const [token, count] of seen) counts.set(token, Math.max(counts.get(token) || 0, count));
  }
  for (const token of extras) counts.set(token, (counts.get(token) || 0) + 1);
  const words = [];
  for (const [token, count] of counts) {
    for (let index = 0; index < count; index += 1) words.push(token);
  }
  return {
    type: "order",
    concept,
    prompt,
    promptEn,
    words,
    solution,
    solutions: accepted,
    explanation,
  };
}

export function fix(concept, prompt, wrong, answers, explanation, promptEn = "") {
  return {
    type: "fix",
    concept,
    prompt,
    promptEn,
    wrong,
    answers: asList(answers),
    explanation,
    ignoreComma: concept !== "punctuation",
  };
}

export function rewrite(concept, prompt, source, answers, explanation, promptEn = "") {
  return {
    type: "rewrite",
    concept,
    prompt,
    promptEn,
    source,
    answers: asList(answers),
    explanation,
    ignoreComma: concept !== "punctuation",
  };
}

export function lesson(spec) {
  const track = spec.track || "core";
  const vocab = spec.vocab.map((row, index) => ({
    id: `${spec.id}-v${index + 1}`,
    no: row[0],
    en: row[1],
    example: row[2],
    exampleEn: row[3],
    pos: row[4] || "",
    forms: row[5] || "",
    level: spec.level,
    track,
    theme: track === "jobb" ? "jobb" : "kurs",
  }));
  const exercises = spec.exercises.map((exercise, index) =>
    closeExercise({
      ...exercise,
      id: `${spec.id}-e${index + 1}`,
      lessonId: spec.id,
    }),
  );
  return {
    minutes: 12,
    track,
    ...spec,
    vocab,
    exercises,
  };
}

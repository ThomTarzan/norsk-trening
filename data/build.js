/** Helpers for lesson files. See README (Legge til en leksjon). */

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

export function order(concept, prompt, solution, explanation, extras = [], promptEn = "") {
  return {
    type: "order",
    concept,
    prompt,
    promptEn,
    words: [...solution, ...extras],
    solution,
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
    level: spec.level,
    track,
    theme: track === "jobb" ? "jobb" : "løype",
  }));
  const exercises = spec.exercises.map((exercise, index) => ({
    ...exercise,
    id: `${spec.id}-e${index + 1}`,
    lessonId: spec.id,
  }));
  return {
    minutes: 12,
    track,
    ...spec,
    vocab,
    exercises,
  };
}

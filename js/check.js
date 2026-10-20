export function normalize(value, { ignoreComma = false } = {}) {
  let text = String(value ?? "").trim().toLowerCase();
  text = text.replace(/[«»“”„]/g, '"').replace(/[’‘ʼ]/g, "'");
  text = text.replace(/\s+/g, " ");
  text = text.replace(/\s+([,.;:!?])/g, "$1");
  text = text.replace(/[.!?…]+$/g, "");
  if (ignoreComma) text = text.replace(/,/g, "");
  return text.trim();
}

const PUNCT = /[.,;:!?…"'“”«»„‟'`´()[\]{}<>\-–—/]+/g;

/** Case and punctuation do not count. Spelling does. */
export function looseWords(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[’‘ʼ]/g, "'")
    .replace(PUNCT, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/** Word-level diff after the lenient normalisation. */
export function gradeDictation(expected, given) {
  const exp = looseWords(expected);
  const got = looseWords(given);
  const ok = exp.length > 0 && exp.join(" ") === got.join(" ");
  const n = exp.length;
  const m = got.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = exp[i] === got[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const diff = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (exp[i] === got[j]) {
      diff.push({ type: "same", text: exp[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      diff.push({ type: "missing", text: exp[i] });
      i += 1;
    } else {
      diff.push({ type: "extra", text: got[j] });
      j += 1;
    }
  }
  while (i < n) diff.push({ type: "missing", text: exp[i++] });
  while (j < m) diff.push({ type: "extra", text: got[j++] });
  return { ok, expected, diff };
}

export function checkExercise(exercise, input) {
  if (exercise.type === "mc") {
    const accepted = Array.isArray(exercise.answers) && exercise.answers.length ? exercise.answers : [exercise.answer];
    return { ok: accepted.includes(input), expected: exercise.answer };
  }
  if (exercise.type === "order") {
    const given = Array.isArray(input) ? input : [];
    const ok =
      given.length === exercise.solution.length &&
      given.every((word, index) => word === exercise.solution[index]);
    return { ok, expected: exercise.solution.join(" ") };
  }
  const flags = { ignoreComma: Boolean(exercise.ignoreComma) };
  const given = normalize(input, flags);
  const expectedList = exercise.answers.map((answer) => normalize(answer, flags));
  return {
    ok: given.length > 0 && expectedList.includes(given),
    expected: exercise.answers[0],
  };
}

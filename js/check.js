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

/**
 * Digits and the usual bokmål wording of the same time or date count as the same token.
 * Only the four dictation patterns that mix a numeral with a spoken form are folded.
 */
export function foldNumbers(value) {
  return String(value ?? "")
    .replace(/\b(?:07\.32|7\.32|sju tretti to|syv tretti to)\b/g, "0732")
    .replace(/\b(?:14\.15|fjorten femten|kvart over to)\b/g, "1415")
    .replace(/\b(?:1\. januar|1 januar|første januar)\b/g, "1januar")
    .replace(/\b(?:30\. april|30 april|trettiende april)\b/g, "30april");
}

/** Case and punctuation do not count. Spelling does. */
export function looseWords(value) {
  return foldNumbers(String(value ?? "").toLowerCase())
    .replace(/[’‘ʼ]/g, "'")
    .replace(PUNCT, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] =
        a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

/** Letter alignment for a near-miss, so one missing letter does not strike the whole word. */
export function letterDiff(expected, given) {
  const a = [...expected];
  const b = [...given];
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const letters = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      letters.push({ type: "same", text: a[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      letters.push({ type: "missing", text: a[i] });
      i += 1;
    } else {
      letters.push({ type: "extra", text: b[j] });
      j += 1;
    }
  }
  while (i < n) letters.push({ type: "missing", text: a[i++] });
  while (j < m) letters.push({ type: "extra", text: b[j++] });
  return letters;
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
  const near = (left, right) => {
    if (!left || !right) return false;
    const distance = editDistance(left, right);
    return distance > 0 && distance <= 2 && distance < Math.max(left.length, right.length);
  };
  const diff = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (exp[i] === got[j]) {
      diff.push({ type: "same", text: exp[i] });
      i += 1;
      j += 1;
    } else if (i + 1 < n && j + 1 < m && exp[i + 1] === got[j + 1] && near(exp[i], got[j])) {
      diff.push({ type: "spell", text: exp[i], given: got[j], letters: letterDiff(exp[i], got[j]) });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1] && !(j < m && near(exp[i], got[j]) && dp[i][j + 1] === dp[i + 1][j])) {
      diff.push({ type: "missing", text: exp[i] });
      i += 1;
    } else if (near(exp[i], got[j])) {
      diff.push({ type: "spell", text: exp[i], given: got[j], letters: letterDiff(exp[i], got[j]) });
      i += 1;
      j += 1;
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
    const solutions = exercise.solutions?.length ? exercise.solutions : [exercise.solution];
    const same = (solution) =>
      given.length === solution.length && given.every((word, index) => word === solution[index]);
    const ok = solutions.some(same);
    return { ok, expected: solutions.map((solution) => solution.join(" ")).join(" · ") };
  }
  const flags = { ignoreComma: Boolean(exercise.ignoreComma) };
  const given = normalize(input, flags);
  const expectedList = exercise.answers.map((answer) => normalize(answer, flags));
  return {
    ok: given.length > 0 && expectedList.includes(given),
    expected: exercise.answers[0],
  };
}

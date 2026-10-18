export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function localISO(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(iso, days) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

export function daysSince(iso) {
  if (!iso) return 999;
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  const [nowY, nowM, nowD] = localISO().split("-").map(Number);
  const then = Date.UTC(year, month - 1, day);
  const now = Date.UTC(nowY, nowM - 1, nowD);
  return Math.round((now - then) / 86400000);
}

export function shuffle(list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

/**
 * Answer options in a random order (Fisher–Yates). The lesson files list the
 * correct answer first, so options must never be shown in authored order.
 * Correctness is checked against the option text, never its position.
 */
export function shuffleOptions(options) {
  return shuffle(options);
}

/**
 * Word bank for an order exercise. Never starts out already in the solved
 * order (when another order is possible), so the task cannot be solved by
 * tapping the chips from left to right.
 */
export function shuffleBank(items, solution, wordOf = (item) => item) {
  const solved = (list) =>
    solution.length > 0 && solution.every((word, index) => wordOf(list[index]) === word);
  const distinct = new Set(items.map(wordOf)).size > 1;
  let result = shuffle(items);
  let guard = 0;
  while (distinct && solved(result) && guard < 20) {
    result = shuffle(items);
    guard += 1;
  }
  return result;
}

export function shuffleWords(words) {
  if (words.length < 2) return [...words];
  let result = shuffle(words);
  let guard = 0;
  while (result.every((word, index) => word === words[index]) && guard < 6) {
    result = shuffle(words);
    guard += 1;
  }
  return result;
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 10) return "God morgen";
  if (hour < 17) return "God dag";
  return "God kveld";
}

export function formatWhen(iso) {
  if (!iso) return "aldri";
  const days = daysSince(iso);
  if (days <= 0) return "i dag";
  if (days === 1) return "i går";
  return `${days} dager siden`;
}

export function paragraphs(text) {
  return String(text)
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

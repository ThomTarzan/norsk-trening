function normalizeHead(no) {
  return String(no ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function unique(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    if (!item || seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

/**
 * Ordbank rows. Exact repeats collapse to one card. ei/en + the same noun
 * (ei uke / en uke) is shown as ei/en uke. Other forms, such as uka, stay separate.
 */
export function groupVocab(words) {
  const heads = new Set(words.map((word) => normalizeHead(word.no)));
  const groups = new Map();
  for (const word of words) {
    const key = groupKey(word.no, heads);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()].map((items) => {
    const key = groupKey(items[0].no, heads);
    const display = displayOf(key, items);
    return {
      key,
      display,
      spoken: spokenOf(display, items),
      en: unique(items.map((item) => item.en)).join(" · "),
      examples: unique(items.map((item) => item.example)).slice(0, 2),
      exampleEn: items[0].exampleEn,
      level: [...items].sort((a, b) => String(a.level).localeCompare(String(b.level)))[0].level,
      themes: unique(items.map((item) => item.theme)),
      ids: items.map((item) => item.id),
      merged: items.length > 1,
      articlePair: key.startsWith("ei/en "),
    };
  });
}

function groupKey(no, heads) {
  const lower = normalizeHead(no);
  const match = lower.match(/^(ei|en)\s+(.+)$/);
  if (match) {
    const other = `${match[1] === "ei" ? "en" : "ei"} ${match[2]}`;
    if (heads.has(other)) return `ei/en ${match[2]}`;
  }
  return lower;
}

function displayOf(key, items) {
  if (key.startsWith("ei/en ")) {
    const rest = items[0].no.trim().replace(/^(ei|en)\s+/i, "");
    return `ei/en ${rest}`;
  }
  return items[0].no.trim();
}

function spokenOf(display, items) {
  if (display.toLowerCase().startsWith("ei/en ")) {
    return `ei eller en ${display.slice(6).trim()}`;
  }
  return items[0].no.trim().replace(/\u2026/g, "");
}

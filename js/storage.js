import { localISO } from "./util.js";

export const STORAGE_KEY = "norsk-hver-dag-v1";

export function freshState() {
  return {
    version: 1,
    profile: null,
    settings: { name: "Tsvitana" },
    streak: { current: 0, best: 0, lastDate: null },
    lessons: {},
    concepts: {},
    srs: {},
    session: null,
    updatedAt: null,
  };
}

function hydrate(raw) {
  const base = freshState();
  return {
    ...base,
    ...raw,
    version: 1,
    settings: { ...base.settings, ...(raw.settings || {}) },
    streak: { ...base.streak, ...(raw.streak || {}) },
    lessons: raw.lessons || {},
    concepts: raw.concepts || {},
    srs: raw.srs || {},
    session: raw.session || null,
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    const state = parsed?.state && parsed.app === "norsk-hver-dag" ? parsed.state : parsed;
    if (!state || state.version !== 1) return freshState();
    return hydrate(state);
  } catch {
    return freshState();
  }
}

export function saveState(state) {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportPayload(state) {
  return {
    app: "norsk-hver-dag",
    version: 1,
    exportedAt: new Date().toISOString(),
    state,
  };
}

export function parseImport(text) {
  const parsed = JSON.parse(text);
  const state = parsed?.state && parsed.app === "norsk-hver-dag" ? parsed.state : parsed;
  if (!state || state.version !== 1 || typeof state !== "object") {
    throw new Error("Filen er ikke en gyldig fremgangsfil for Norsk hver dag.");
  }
  return hydrate(state);
}

export function markStudyDay(state) {
  const today = localISO();
  if (state.streak.lastDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
  state.streak.current = state.streak.lastDate === y ? state.streak.current + 1 : 1;
  state.streak.best = Math.max(state.streak.best || 0, state.streak.current);
  state.streak.lastDate = today;
}

export function recordConcept(state, conceptId, ok) {
  if (!conceptId) return;
  const current = state.concepts[conceptId] || { correct: 0, attempts: 0 };
  current.attempts += 1;
  if (ok) current.correct += 1;
  state.concepts[conceptId] = current;
}

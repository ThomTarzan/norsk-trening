import { addDays, localISO } from "./util.js";

export function emptyCard(kind, concept) {
  return {
    kind,
    concept: concept || "",
    ease: 2.5,
    interval: 0,
    reps: 0,
    lapses: 0,
    due: localISO(),
  };
}

/** quality: 0 = miss, 5 = pass. A small SM-2 step. */
export function schedule(card, quality) {
  const next = { ...card };
  if (quality < 3) {
    next.reps = 0;
    next.interval = 1;
    next.lapses = (next.lapses || 0) + 1;
    next.ease = Math.max(1.3, (next.ease || 2.5) - 0.2);
  } else {
    const reps = next.reps || 0;
    if (reps === 0) next.interval = 1;
    else if (reps === 1) next.interval = 3;
    else next.interval = Math.max(1, Math.round((next.interval || 1) * (next.ease || 2.5)));
    next.reps = reps + 1;
    const gap = 5 - quality;
    next.ease = (next.ease || 2.5) + (0.1 - gap * (0.08 + gap * 0.02));
    if (next.ease < 1.3) next.ease = 1.3;
  }
  next.due = addDays(localISO(), next.interval);
  return next;
}

export function isDue(card, today = localISO()) {
  return Boolean(card && card.due && card.due <= today);
}

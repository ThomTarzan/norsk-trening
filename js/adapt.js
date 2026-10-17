import { LEVELS } from "../data/concepts.js";
import { daysSince, localISO, shuffle } from "./util.js";
import { isDue } from "./srs.js";

export function masteryOf(correct, attempts) {
  if (!attempts) return 0;
  const accuracy = correct / attempts;
  const trust = Math.min(1, attempts / 8);
  return Math.round(100 * accuracy * (0.45 + 0.55 * trust));
}

export function conceptMastery(state, conceptId) {
  const stats = state.concepts?.[conceptId];
  if (!stats?.attempts) return 0;
  return masteryOf(stats.correct, stats.attempts);
}

function levelIndex(level) {
  const index = LEVELS.indexOf(level);
  return index === -1 ? 0 : index;
}

function lessonScore(lesson, state, targetLevel) {
  const distance = levelIndex(targetLevel) - levelIndex(lesson.level);
  let score = lesson.level === targetLevel ? 100 : 42 - distance * 12;
  const record = state.lessons?.[lesson.id];
  const done = Boolean(record?.completed);
  if (!done) score += 80;
  else score += Math.min(28, daysSince(record.lastAt)) - 42;

  let weakSum = 0;
  for (const conceptId of lesson.concepts) {
    const stats = state.concepts?.[conceptId];
    if (!stats?.attempts) weakSum += done ? 8 : 36;
    else weakSum += 100 - masteryOf(stats.correct, stats.attempts);
  }
  score += (weakSum / lesson.concepts.length) * 0.85;
  if (done && record.lastAt && daysSince(record.lastAt) === 0) score -= 55;
  return score;
}

export function recommendLesson(state, lessons) {
  const chosen = state.profile?.level || "A1";
  const target = chosen === "C2" ? "C1" : chosen;
  const candidates = lessons.filter(
    (lesson) => lesson.track === "core" && levelIndex(lesson.level) <= levelIndex(target),
  );
  let best = null;
  let bestScore = -Infinity;
  for (const lesson of candidates) {
    const score = lessonScore(lesson, state, target);
    if (score > bestScore) {
      best = lesson;
      bestScore = score;
    }
  }
  return best;
}

export function jobSuggestion(state, lessons) {
  const jobs = lessons.filter((lesson) => lesson.track === "jobb").sort((a, b) => a.id.localeCompare(b.id));
  const doneDates = jobs
    .map((lesson) => state.lessons?.[lesson.id]?.lastAt)
    .filter(Boolean)
    .sort();
  const last = doneDates.at(-1) || null;
  const due = !last || daysSince(last) >= 6;
  const incomplete = jobs.find((lesson) => !state.lessons?.[lesson.id]?.completed);
  const oldest = [...jobs].sort((a, b) => {
    const left = state.lessons?.[a.id]?.lastAt || "";
    const right = state.lessons?.[b.id]?.lastAt || "";
    return left.localeCompare(right);
  })[0];
  return { due, lesson: incomplete || oldest || null, last };
}

function seen(state, lessonId) {
  const record = state.lessons?.[lessonId];
  return Boolean(record?.completed || record?.started);
}

/**
 * About 70% items from weak concepts and missed cards, 30% from stronger review.
 * Only exercises from lessons already started, plus due cards.
 */
export function buildReview(state, lessons, vocabById, size = 8) {
  const exercises = lessons.flatMap((lesson) =>
    lesson.exercises.map((exercise) => ({ ...exercise, level: lesson.level })),
  );
  const exerciseById = new Map(exercises.map((exercise) => [exercise.id, exercise]));
  const weakIds = new Set(
    Object.entries(state.concepts || {})
      .filter(([, stats]) => stats.attempts > 0 && masteryOf(stats.correct, stats.attempts) < 75)
      .map(([id]) => id),
  );

  const dueEntries = Object.entries(state.srs || {}).filter(([, card]) => isDue(card));
  const weak = [];
  const review = [];
  const used = new Set();

  function push(bucket, item) {
    if (used.has(item.key)) return;
    used.add(item.key);
    bucket.push(item);
  }

  for (const [cardId, card] of dueEntries) {
    if (card.kind === "exercise") {
      const exercise = exerciseById.get(cardId.replace(/^ex:/, ""));
      if (!exercise) continue;
      const item = { key: cardId, kind: "exercise", exercise, cardId };
      push(weakIds.has(exercise.concept) || card.lapses > 0 ? weak : review, item);
    } else if (card.kind === "vocab") {
      const vocab = vocabById.get(cardId);
      if (!vocab) continue;
      const item = { key: cardId, kind: "vocab", vocab, cardId };
      push(weakIds.has(card.concept) || card.lapses > 0 ? weak : review, item);
    }
  }

  const weakExercises = shuffle(
    exercises.filter(
      (exercise) =>
        weakIds.has(exercise.concept) &&
        seen(state, exercise.lessonId) &&
        !used.has(`ex:${exercise.id}`),
    ),
  );
  for (const exercise of weakExercises) {
    push(weak, { key: `ex:${exercise.id}`, kind: "exercise", exercise, cardId: `ex:${exercise.id}` });
  }

  const reviewExercises = shuffle(
    exercises.filter((exercise) => {
      if (!seen(state, exercise.lessonId) || used.has(`ex:${exercise.id}`)) return false;
      const stats = state.concepts?.[exercise.concept];
      return stats?.attempts && masteryOf(stats.correct, stats.attempts) >= 75;
    }),
  );
  for (const exercise of reviewExercises) {
    push(review, { key: `ex:${exercise.id}`, kind: "exercise", exercise, cardId: `ex:${exercise.id}` });
  }

  const weakTarget = Math.round(size * 0.7);
  const reviewTarget = size - weakTarget;
  let weakPicked = weak.slice(0, weakTarget);
  let reviewPicked = review.slice(0, reviewTarget);
  if (weakPicked.length < weakTarget) {
    reviewPicked = review.slice(0, size - weakPicked.length);
  } else if (reviewPicked.length < reviewTarget) {
    weakPicked = weak.slice(0, size - reviewPicked.length);
  }

  const items = [];
  const max = Math.max(weakPicked.length, reviewPicked.length);
  for (let index = 0; index < max; index += 1) {
    if (weakPicked[index]) items.push({ ...weakPicked[index], bucket: "weak" });
    if (items.length < size && reviewPicked[index] && index < reviewPicked.length) {
      if (items.filter((item) => item.bucket === "review").length < reviewPicked.length) {
        items.push({ ...reviewPicked[index], bucket: "review" });
      }
    }
    if (items.length >= size) break;
  }
  for (const item of [...weakPicked, ...reviewPicked]) {
    if (items.length >= size) break;
    if (!items.some((picked) => picked.key === item.key)) {
      items.push({ ...item, bucket: weakPicked.includes(item) ? "weak" : "review" });
    }
  }

  const weakCount = items.filter((item) => item.bucket === "weak").length;
  return {
    items: items.slice(0, size),
    weakCount,
    reviewCount: items.length - weakCount,
  };
}

export function suggestLevel(correct, total) {
  const ratio = total ? correct / total : 0;
  if (ratio < 0.26) return "A1";
  if (ratio < 0.41) return "A2";
  if (ratio < 0.56) return "B1";
  if (ratio < 0.76) return "B2";
  if (ratio < 0.91) return "C1";
  return "C2";
}

export function dueCount(state) {
  return Object.values(state.srs || {}).filter((card) => isDue(card)).length;
}

export function todayLabel() {
  return localISO();
}

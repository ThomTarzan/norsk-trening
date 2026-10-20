import { LEVELS, conceptById, concepts } from "./concepts.js";
import { lessonsA1 } from "./lessons-a1.js";
import { lessonsA2 } from "./lessons-a2.js";
import { lessonsB1 } from "./lessons-b1.js";
import { lessonsB2 } from "./lessons-b2.js";
import { lessonsC1 } from "./lessons-c1.js";
import { lessonsC1Extra } from "./lessons-c1-extra.js";
import { lessonsJobb } from "./lessons-jobb.js";
import { lessonsJobbExtra } from "./lessons-jobb-extra.js";
import { placement } from "./placement.js";
import { readingMap, readings } from "./readings.js";
import { vocabBank } from "./vocab-bank.js";

export { LEVELS, conceptById, concepts, placement, readingMap, readings, vocabBank };

export const lessons = [
  ...lessonsA1,
  ...lessonsA2,
  ...lessonsB1,
  ...lessonsB2,
  ...lessonsC1,
  ...lessonsC1Extra,
  ...lessonsJobb,
  ...lessonsJobbExtra,
];

export const coreLessons = lessons.filter((lesson) => lesson.track === "core");
export const jobLessons = lessons.filter((lesson) => lesson.track === "jobb");

export function allVocab() {
  return [...lessons.flatMap((lesson) => lesson.vocab), ...vocabBank];
}

export function vocabMap() {
  return new Map(allVocab().map((word) => [word.id, word]));
}

export function lessonMap() {
  return new Map(lessons.map((lesson) => [lesson.id, lesson]));
}

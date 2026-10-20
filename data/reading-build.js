import { mc } from "./build.js";

export const rq = (id, concept, prompt, options, answer, explanation) => ({
  id,
  ...mc(concept, prompt, options, answer, explanation),
});

/** Flat sentence list. Audio files follow the sentence order. */
export function sentencesOf(reading) {
  const sentences = [];
  for (const paragraph of reading.paragraphs) {
    for (const text of paragraph) {
      const n = String(sentences.length + 1).padStart(2, "0");
      sentences.push({
        text,
        audio: `audio/setninger/${reading.id}-${n}.mp3`,
      });
    }
  }
  return sentences;
}

export function readingPlain(reading) {
  return reading.paragraphs.map((paragraph) => paragraph.join(" ")).join("\n\n");
}

import { mc } from "./build.js";

export const rq = (id, concept, prompt, options, answer, explanation) => ({
  id,
  ...mc(concept, prompt, options, answer, explanation),
});

function entryText(entry) {
  return typeof entry === "string" ? entry : entry.text;
}

/** Flat sentence list. Audio files follow the sentence order. */
export function sentencesOf(reading) {
  const sentences = [];
  for (const paragraph of reading.paragraphs) {
    for (const entry of paragraph) {
      const n = String(sentences.length + 1).padStart(2, "0");
      const text = entryText(entry);
      sentences.push({
        text,
        en: typeof entry === "string" ? "" : entry.en || "",
        voice: typeof entry === "string" ? reading.voice : entry.voice || reading.voice,
        audio: `audio/setninger/${reading.id}-${n}.mp3`,
      });
    }
  }
  return sentences;
}

export function readingPlain(reading) {
  return reading.paragraphs.map((paragraph) => paragraph.map(entryText).join(" ")).join("\n\n");
}

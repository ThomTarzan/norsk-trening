export function normalize(value, { ignoreComma = false } = {}) {
  let text = String(value ?? "").trim().toLowerCase();
  text = text.replace(/[«»“”„]/g, '"').replace(/[’‘ʼ]/g, "'");
  text = text.replace(/\s+/g, " ");
  text = text.replace(/\s+([,.;:!?])/g, "$1");
  text = text.replace(/[.!?…]+$/g, "");
  if (ignoreComma) text = text.replace(/,/g, "");
  return text.trim();
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

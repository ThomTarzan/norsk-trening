import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { lessons } from "../data/catalog.js";

const lesson = lessons.find((item) => item.id === "b2-01");
const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--user-data-dir=/tmp/chrome-shot-profile",
    "--remote-debugging-port=9333",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
const pending = new Map();
let nextId = 1;

function send(method, params = {}) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function connect() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const list = await fetch("http://127.0.0.1:9333/json/list").then((response) => response.json());
      const page = list.find((target) => target.type === "page");
      if (!page) throw new Error("no page");
      socket = new WebSocket(page.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        socket.addEventListener("open", resolve);
        socket.addEventListener("error", reject);
      });
      socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (!message.id || !pending.has(message.id)) return;
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(JSON.stringify(message.error)));
        else resolve(message.result);
      });
      return;
    } catch {
      await wait(200);
    }
  }
  throw new Error("Chrome did not start");
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result?.value;
}

async function shot(name) {
  const image = await send("Page.captureScreenshot", { format: "png" });
  const file = `/opt/cursor/artifacts/screenshots/${name}.png`;
  writeFileSync(file, Buffer.from(image.data, "base64"));
  console.log(file);
}

try {
  await connect();
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Page.navigate", { url: "http://127.0.0.1:8765/" });
  await wait(600);
  await evaluate("localStorage.clear(); sessionStorage.clear();");
  await send("Page.reload", { ignoreCache: true });
  await wait(600);
  await evaluate(`(() => {
    document.querySelector("[data-login]").value = "Tsvitana";
    document.querySelector("[data-form=login]").requestSubmit();
  })()`);
  await wait(400);
  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/plassering" });
  await wait(600);
  await evaluate(`document.querySelector('[data-action="start-placement"]').click()`);
  await wait(300);
  await shot("placement_test");

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/" });
  await wait(400);
  await evaluate(`document.querySelector('[data-action="pick-level"][data-level="B2"]').click()`);
  await wait(300);
  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/leksjon/b2-01" });
  await wait(400);
  await evaluate(`document.querySelector('[data-action="open-lesson"]').click()`);
  await wait(250);
  await shot("lesson_grammar");

  await evaluate(`document.querySelector('[data-phase="words"]').click()`);
  await wait(150);
  await evaluate(`document.querySelector('[data-phase="quiz"]').click()`);
  await wait(200);

  for (const exercise of lesson.exercises) {
    const heading = await evaluate("document.querySelector('h1')?.textContent");
    if (heading !== exercise.prompt) throw new Error(`Expected prompt ${exercise.prompt}, got ${heading}`);
    if (exercise.type === "mc") {
      await evaluate(`(() => {
        const button = [...document.querySelectorAll(".option")].find((item) => item.dataset.value === ${JSON.stringify(exercise.answer)});
        if (!button) throw new Error("missing option");
        button.click();
      })()`);
    } else if (exercise.type === "order") {
      for (const word of exercise.solution) {
        await evaluate(`(() => {
          const chip = [...document.querySelectorAll(".bank .chip")].find((item) => item.textContent === ${JSON.stringify(word)});
          if (!chip) throw new Error("missing chip " + ${JSON.stringify(word)});
          chip.click();
        })()`);
      }
    } else {
      throw new Error(`Unexpected exercise type ${exercise.type}`);
    }
    const ready = await evaluate(`Boolean(document.querySelector('[data-action="submit"]')) + " | " + document.querySelector("h1")?.textContent`);
    if (!String(ready).startsWith("true")) throw new Error(`No submit for ${exercise.id}: ${ready}\n${await evaluate("document.body.innerText.slice(0,700)")}`);
    await evaluate(`document.querySelector('[data-action="submit"]').click()`);
    await wait(80);
    const hasNext = await evaluate(`Boolean(document.querySelector('[data-action="next"]'))`);
    if (!hasNext) throw new Error(`No next after ${exercise.id}: ${await evaluate("document.body.innerText.slice(0,700)")}`);
    await evaluate(`document.querySelector('[data-action="next"]').click()`);
    await wait(40);
  }

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/fremgang" });
  await wait(400);
  await shot("dashboard");
  const mastery = await evaluate("document.body.innerText.includes('%') && document.body.innerText.includes('Adverb i leddsetninger')");
  if (!mastery) throw new Error("Dashboard did not show mastery");
  console.log("screenshots ready");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  try {
    socket?.close();
  } catch {
    /* closed */
  }
  chrome.kill("SIGKILL");
}

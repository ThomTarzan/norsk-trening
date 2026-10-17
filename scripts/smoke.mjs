import { spawn } from "node:child_process";

const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--user-data-dir=/tmp/chrome-norsk-profile",
    "--remote-debugging-port=9222",
    "about:blank",
  ],
  { stdio: "ignore" },
);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let socket;
const pending = new Map();
let nextId = 1;
const problems = [];

function send(method, params = {}) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

async function connect() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const list = await fetch("http://127.0.0.1:9222/json/list").then((response) => response.json());
      const page = list.find((target) => target.type === "page");
      if (!page) throw new Error("no page");
      socket = new WebSocket(page.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        socket.addEventListener("open", resolve);
        socket.addEventListener("error", reject);
      });
      socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.id && pending.has(message.id)) {
          const { resolve, reject } = pending.get(message.id);
          pending.delete(message.id);
          if (message.error) reject(new Error(message.error.message));
          else resolve(message.result);
          return;
        }
        if (message.method === "Runtime.exceptionThrown") {
          problems.push(message.params.exceptionDetails.text || "exception");
        }
        if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
          const text = message.params.args.map((arg) => arg.value || arg.description || "").join(" ");
          problems.push(`console.${message.params.type}: ${text}`);
        }
      });
      return;
    } catch {
      await wait(200);
    }
  }
  throw new Error("Could not connect to Chrome");
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "evaluate failed");
  }
  return result.result?.value;
}

try {
  await connect();
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Page.navigate", { url: "http://127.0.0.1:8765/" });
  await wait(800);
  const welcome = await evaluate("document.querySelector('h1')?.textContent");
  if (!welcome?.includes("Tsvitana")) throw new Error(`Unexpected welcome: ${welcome}`);

  await evaluate("document.querySelector('[data-level=\"B2\"]').click()");
  await wait(300);
  const home = await evaluate("document.querySelector('h1')?.textContent");
  if (home !== "Tsvitana") throw new Error(`Home heading: ${home}`);

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/fremgang" });
  await wait(400);
  const dash = await evaluate("document.body.innerText.includes('V2 og inversjon') && document.body.innerText.includes('ikke øvd')");
  if (!dash) throw new Error("Dashboard did not show concepts");

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/plassering" });
  await wait(300);
  await evaluate("document.querySelector('[data-action=\"start-placement\"]').click()");
  await wait(300);
  const question = await evaluate("document.querySelector('h1')?.textContent");
  if (!question) throw new Error("Placement question missing");
  await evaluate("document.querySelector('.option').click(); document.querySelector('[data-action=\"submit\"]').click()");
  await wait(200);
  const registered = await evaluate("document.body.innerText.includes('Registrert')");
  if (!registered) throw new Error("Placement did not register an answer");

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/leksjon/b2-01" });
  await wait(300);
  await evaluate("document.querySelector('[data-action=\"open-lesson\"]').click()");
  await wait(200);
  const lessonTitle = await evaluate("document.querySelector('h1')?.textContent");
  if (!lessonTitle?.includes("Ikke og aldri")) throw new Error(`Lesson title: ${lessonTitle}`);
  await evaluate("document.querySelector('[data-phase=\"words\"]').click()");
  await wait(150);
  await evaluate("document.querySelector('[data-phase=\"quiz\"]').click()");
  await wait(200);
  await evaluate("document.querySelector('.option').click(); document.querySelector('[data-action=\"submit\"]').click()");
  await wait(200);
  const feedback = await evaluate("document.getElementById('feedback')?.innerText || ''");
  if (!feedback.includes("Riktig") && !feedback.includes("Ikke helt")) throw new Error(`No exercise feedback: ${feedback}`);

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/jobb" });
  await wait(300);
  const job = await evaluate("document.body.innerText.includes('E-post som blir lest')");
  if (!job) throw new Error("Job track missing");

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/ord" });
  await wait(400);
  const words = await evaluate("document.querySelectorAll('.word').length");
  if (words < 10) throw new Error(`Vocab list too short: ${words}`);

  if (problems.length) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Smoke OK: welcome, dashboard, placement, lesson feedback, job track, vocab. No console errors.");
  }
} catch (error) {
  console.error(error);
  if (problems.length) console.error(problems.join("\n"));
  process.exitCode = 1;
} finally {
  try {
    socket?.close();
  } catch {
    /* already closed */
  }
  chrome.kill("SIGKILL");
}

import { spawn } from "node:child_process";

const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--user-data-dir=/tmp/chrome-norsk-profile",
    "--remote-debugging-port=9222",
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--autoplay-policy=no-user-gesture-required",
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
    const details = result.exceptionDetails;
    throw new Error(details.exception?.description || details.text || "evaluate failed");
  }
  return result.result?.value;
}

try {
  await connect();
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Page.navigate", { url: "http://127.0.0.1:8765/" });
  await wait(800);
  await evaluate("localStorage.clear(); sessionStorage.clear();");
  await send("Page.reload", { ignoreCache: true });
  await wait(800);
  const gate = await evaluate("document.querySelector('h1')?.textContent");
  if (gate !== "Logg inn") throw new Error(`Expected login, got ${gate}`);
  await evaluate(`(() => {
    document.querySelector("[data-login]").value = "feil";
    document.querySelector("[data-form=login]").requestSubmit();
  })()`);
  await wait(200);
  const rejected = await evaluate("document.body.innerText.includes('Feil passord')");
  if (!rejected) throw new Error("Wrong password was accepted");
  await evaluate(`(() => {
    document.querySelector("[data-login]").value = "Tsvitana";
    document.querySelector("[data-remember]").checked = true;
    document.querySelector("[data-form=login]").requestSubmit();
  })()`);
  await wait(300);
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

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/lesing/les-b2-01" });
  await wait(500);
  const reading = await evaluate("document.querySelector('h1')?.textContent");
  if (reading !== "Status til ledelsen") throw new Error(`Reading title: ${reading}`);
  const audio = await evaluate("document.querySelector('[data-action=toggle-full]')?.dataset.src");
  if (audio !== "audio/les-b2-01.mp3") throw new Error(`Reading audio: ${audio}`);
  const nativeControls = await evaluate("!!document.querySelector('audio[controls]')");
  if (nativeControls) throw new Error("Native audio controls are visible");
  const errorHidden = await evaluate("document.querySelector('[data-audio-error]')?.hidden === true");
  if (!errorHidden) throw new Error("Audio error was visible before playback");
  let duration = "";
  for (let attempt = 0; attempt < 20; attempt += 1) {
    duration = await evaluate("document.querySelector('[data-duration-for]')?.textContent || ''");
    if (/^\d+:\d\d \/ \d+:\d\d$/.test(duration) && duration !== "0:00 / 0:00") break;
    await wait(200);
  }
  if (!/^\d+:\d\d \/ \d+:\d\d$/.test(duration) || duration === "0:00 / 0:00") {
    throw new Error(`Duration did not preload: ${duration}`);
  }
  await evaluate("document.querySelector('[data-action=toggle-full]').click()");
  await wait(700);
  const played = await evaluate(`(() => {
    const engine = document.querySelector('[data-player=engine]');
    const pressed = document.querySelector('[data-action=toggle-full]')?.getAttribute('aria-pressed');
    return { current: engine?.currentTime || 0, paused: engine?.paused, rate: engine?.playbackRate, pressed, error: document.querySelector('[data-audio-error]')?.hidden };
  })()`);
  if (!(played.current > 0) || played.paused || played.pressed !== "true") {
    throw new Error(`Full text did not play: ${JSON.stringify(played)}`);
  }
  if (played.rate !== 1) throw new Error(`Playback rate changed: ${played.rate}`);
  if (played.error !== true) throw new Error("Audio error appeared during playback");
  const speedControl = await evaluate("document.body.innerText.includes('Hastighet') || !!document.querySelector('[data-rate]')");
  if (speedControl) throw new Error("Playback speed control is present");
  await evaluate("document.querySelector('[data-action=play-src]').click()");
  await wait(400);
  const sentencePlayed = await evaluate("document.querySelector('[data-player=engine]')?.currentTime > 0");
  if (!sentencePlayed) throw new Error("Sentence audio did not play");
  await evaluate("document.querySelector('[data-action=record-sentence]').click()");
  await wait(600);
  const recording = await evaluate("document.querySelector('[data-action=record-sentence]')?.getAttribute('aria-pressed')");
  if (recording !== "true") throw new Error(`Recording did not start: ${recording}`);
  await evaluate("document.querySelector('[data-action=record-sentence]').click()");
  await wait(400);
  const compare = await evaluate("!!document.querySelector('[data-action=compare-take]')");
  if (!compare) throw new Error("Compare button missing after recording");
  await evaluate("document.querySelector('[data-action=start-dictation]').click()");
  await wait(300);
  const dictTitle = await evaluate("document.querySelector('h1')?.textContent");
  if (dictTitle !== "Skriv det du hører") throw new Error(`Dictation title: ${dictTitle}`);
  const hiddenLine = await evaluate("document.body.innerText.includes('Setningen var')");
  if (hiddenLine) throw new Error("Dictation revealed the sentence before checking");
  await evaluate(`(() => {
    const box = document.querySelector('[data-draft]');
    box.value = 'helt feil setning';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('[data-action=submit-dict]').click();
  })()`);
  await wait(250);
  const diff = await evaluate("!!document.querySelector('.diff mark.miss') && document.body.innerText.includes('Setningen var')");
  if (!diff) throw new Error("Dictation diff missing");
  for (let step = 0; step < 3; step += 1) {
    const hasNext = await evaluate("!!document.querySelector('[data-action=next-dict]')");
    if (!hasNext) {
      await evaluate(`(() => {
        const box = document.querySelector('[data-draft]');
        box.value = 'x';
        box.dispatchEvent(new Event('input', { bubbles: true }));
        document.querySelector('[data-action=submit-dict]').click();
      })()`);
      await wait(150);
    }
    await evaluate("document.querySelector('[data-action=next-dict]').click()");
    await wait(180);
  }
  const asked = await evaluate("document.querySelector('h1')?.textContent");
  if (!asked?.includes("skyldes")) throw new Error(`Reading question: ${asked}`);

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/leksjon/b2-10" });
  await wait(300);
  await evaluate("document.querySelector('[data-action=open-lesson]').click()");
  await wait(150);
  await evaluate("document.querySelector('[data-phase=words]').click()");
  await wait(100);
  await evaluate("document.querySelector('[data-phase=quiz]').click()");
  await wait(200);
  const typed = await evaluate("!!document.querySelector('textarea, input[data-draft]')");
  if (typed) throw new Error("Lesson still asks for typed input");
  const choices = await evaluate("document.querySelectorAll('.option, .chip').length");
  if (choices < 2) throw new Error(`Expected choices, found ${choices}`);

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/leksjon/a2-01" });
  await wait(300);
  await evaluate("document.querySelector('[data-action=open-lesson]').click()");
  await wait(200);
  const intro = await evaluate("document.querySelector('h1')?.textContent");
  if (intro !== "V2-regelen") throw new Error(`Intro heading: ${intro}`);
  await send("Page.reload", { ignoreCache: true });
  await wait(500);
  const introAgain = await evaluate("document.querySelector('h1')?.textContent");
  if (introAgain !== "V2-regelen") throw new Error(`Reload left the intro: ${introAgain}`);
  await evaluate("document.querySelector('[data-phase=words]').click()");
  await wait(150);
  await send("Page.reload", { ignoreCache: true });
  await wait(500);
  const wordsHeading = await evaluate("document.querySelector('h1')?.textContent");
  if (wordsHeading !== "Nye ord") throw new Error(`Reload skipped vocabulary: ${wordsHeading}`);
  await evaluate("document.querySelector('[data-phase=quiz]').click()");
  await wait(200);
  await evaluate("document.querySelector('.option').click(); document.querySelector('[data-action=submit]').click()");
  await wait(150);
  await evaluate("document.querySelector('[data-action=next]').click()");
  await wait(200);
  const exerciseTwo = await evaluate("document.querySelector('.kicker')?.textContent || ''");
  if (!exerciseTwo.includes("Øvelse 2")) throw new Error(`Expected exercise 2, got ${exerciseTwo}`);
  const hintBefore = await evaluate("document.body.innerText.includes('Trykk på ordene i riktig rekkefølge.')");
  if (!hintBefore) throw new Error("Order hint missing");
  await evaluate("document.querySelector('[data-action=pick]').click()");
  await wait(150);
  const hintAfter = await evaluate("document.body.innerText.includes('Trykk på ordene i riktig rekkefølge.')");
  if (!hintAfter) throw new Error("Order hint disappeared after the first tap");
  await send("Page.reload", { ignoreCache: true });
  await wait(500);
  const exerciseTwoAgain = await evaluate("document.querySelector('.kicker')?.textContent || ''");
  if (!exerciseTwoAgain.includes("Øvelse 2")) throw new Error(`Reload jumped away from exercise 2: ${exerciseTwoAgain}`);

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/fremgang" });
  await wait(400);
  await evaluate("document.querySelector('[data-action=practice-concept]').click()");
  await wait(700);
  const practice = await evaluate(`(() => ({
    hash: location.hash,
    h1: document.querySelector('h1')?.textContent || '',
    kicker: document.querySelector('.kicker')?.textContent || '',
    buttons: document.querySelectorAll('[data-action=practice-concept]').length,
  }))()`);
  if (practice.hash !== "#/ovelse" || !/Øvelse 1/.test(`${practice.kicker} ${practice.h1}`)) {
    throw new Error(`Concept topic did not start practice: ${JSON.stringify(practice)}`);
  }

  await send("Page.navigate", { url: "http://127.0.0.1:8765/#/ord" });
  await wait(400);
  const words = await evaluate("document.querySelectorAll('.word').length");
  if (words < 10) throw new Error(`Vocab list too short: ${words}`);
  await evaluate(`(() => {
    const search = document.querySelector('#vocab-search');
    search.value = 'uke';
    search.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  await wait(200);
  const merged = await evaluate(`(() => {
    const heads = [...document.querySelectorAll('.word .no')].map((node) => node.textContent);
    const play = [...document.querySelectorAll('[data-action=play-src]')].some((button) => (button.dataset.src || '').includes('audio/ord/'));
    return heads.includes('ei/en uke') && !heads.includes('ei uke') && !heads.includes('en uke') && play;
  })()`);
  if (!merged) throw new Error("Ordbank did not merge ei/en uke or is missing audio");
  await evaluate("document.querySelector('[data-action=play-src]').click()");
  await wait(400);
  const wordPlayed = await evaluate("document.querySelector('[data-player=engine]')?.paused === false");
  if (!wordPlayed) throw new Error("Vocab audio did not play");

  if (problems.length) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Smoke OK: login, lessons, readings, dictation, recording, ordbank, concept practice. No console errors.");
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

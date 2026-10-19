import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { readings } from "../data/readings.js";

mkdirSync("audio", { recursive: true });
const jobs = readings.map((reading) => ({
  id: reading.id,
  path: reading.audio,
  text: reading.text.join("\n\n"),
}));
writeFileSync("/tmp/norsk-readings.json", JSON.stringify(jobs));

const python = spawn("python3", ["-"], { stdio: ["pipe", "inherit", "inherit"] });
python.stdin.end(`
import asyncio, json
from pathlib import Path
import edge_tts

async def one(job):
    communicate = edge_tts.Communicate(job["text"], "nb-NO-PernilleNeural", rate="-8%")
    Path(job["path"]).parent.mkdir(parents=True, exist_ok=True)
    await communicate.save(job["path"])
    print(job["path"])

async def main():
    jobs = json.loads(Path("/tmp/norsk-readings.json").read_text())
    for job in jobs:
        await one(job)

asyncio.run(main())
`);

const code = await new Promise((resolve) => python.on("close", resolve));
if (code !== 0) process.exit(code);

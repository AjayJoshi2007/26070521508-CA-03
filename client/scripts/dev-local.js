const { spawn } = require("node:child_process");
const path = require("node:path");

const clientDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(clientDir, "..");
const processes = [];
let stopping = false;

function stopAll(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = exitCode;
  for (const child of processes) {
    if (!child.killed) child.kill();
  }
}

function startProcess(args, cwd, name) {
  const child = spawn(process.execPath, args, {
    cwd,
    env: process.env,
    stdio: "inherit",
  });
  processes.push(child);
  child.once("error", (error) => {
    console.error(`${name} failed to start:`, error.message);
    stopAll(1);
  });
  child.once("exit", (code) => {
    if (!stopping) stopAll(code ?? 1);
  });
}

process.once("SIGINT", () => stopAll(0));
process.once("SIGTERM", () => stopAll(0));

startProcess(["--watch", "server.js"], path.join(projectDir, "server"), "Backend");
startProcess([path.join(clientDir, "node_modules", "next", "dist", "bin", "next"), "dev", "--turbopack"], clientDir, "Next.js");

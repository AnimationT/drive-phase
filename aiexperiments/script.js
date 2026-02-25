const START_DELAY_MS = 3000;
const TRACK_PADDING = 90;
const PLAYER_NAME = "You";
const BEST_TIME_KEY = "drivePhaseBestTimeAI";

const state = {
  started: false,
  finished: false,
  raceStartTime: 0,
  playerLastTap: 0,
  playerVelocity: 0,
  racers: [],
  finishers: [],
};

const track = document.getElementById("track");
const info = document.getElementById("info");
const timerEl = document.getElementById("timer");
const bestTimeEl = document.getElementById("bestTimeInd");
const resultsEl = document.getElementById("results");
const playAgainBtn = document.getElementById("playAgain");

const botProfiles = [
  { name: "Black", baseAccel: 980, topSpeed: 600, variance: 0.08, tint: "brightness(0.2)" },
  { name: "Green", baseAccel: 960, topSpeed: 610, variance: 0.1, tint: "hue-rotate(120deg)" },
  { name: "Yellow", baseAccel: 990, topSpeed: 590, variance: 0.07, tint: "sepia(1) saturate(9) brightness(1.3)" },
  { name: "Blue", baseAccel: 970, topSpeed: 620, variance: 0.12, tint: "hue-rotate(240deg)" },
];

function readBestTime() {
  const value = Number(localStorage.getItem(BEST_TIME_KEY));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function renderBestTime() {
  const pb = readBestTime();
  bestTimeEl.textContent = pb ? `PB: ${pb.toFixed(3)}s` : "PB: --";
}

function addLane(name, image = null, tint = "", fallbackGlyph = "") {
  const lane = document.createElement("div");
  lane.className = "lane";

  const runner = image ? document.createElement("img") : document.createElement("div");
  runner.className = "runner";

  if (image) {
    runner.src = image;
    runner.alt = name;
    if (tint) runner.style.filter = tint;
  } else {
    runner.textContent = fallbackGlyph || "🏃";
    runner.setAttribute("role", "img");
    runner.setAttribute("aria-label", name);
  }

  lane.appendChild(runner);
  track.appendChild(lane);

  const isPlayer = name === PLAYER_NAME;
  const profile = botProfiles.find((p) => p.name === name);

  state.racers.push({
    name,
    isPlayer,
    lane,
    runner,
    x: 0,
    velocity: 0,
    finished: false,
    finishMs: null,
    baseAccel: profile?.baseAccel ?? 0,
    topSpeed: profile?.topSpeed ?? 0,
    variance: profile?.variance ?? 0,
  });
}

function setupTrack() {
  addLane(PLAYER_NAME, null, "", "🏃");
  for (const profile of botProfiles) {
    addLane(profile.name, null, profile.tint, "🏃");
  }
}

function finishDistance() {
  return track.clientWidth - TRACK_PADDING;
}

function updatePlayerFromTap(now) {
  if (!state.started || state.finished) return;

  const racer = state.racers.find((r) => r.isPlayer);
  if (!racer || racer.finished) return;

  const cadence = state.playerLastTap ? now - state.playerLastTap : 180;
  state.playerLastTap = now;

  const cadenceQuality = Math.max(0.5, 1 - Math.abs(cadence - 170) / 220);
  const accel = 480 + cadenceQuality * 360;

  racer.velocity = Math.min(650, racer.velocity + accel * 0.07);
  racer.runner.classList.add("pop");
  setTimeout(() => racer.runner.classList.remove("pop"), 70);
}

function updateBots(dt) {
  for (const racer of state.racers) {
    if (racer.isPlayer || racer.finished) continue;
    const noise = 1 + (Math.random() * 2 - 1) * racer.variance;
    racer.velocity += racer.baseAccel * noise * dt;
    racer.velocity = Math.min(racer.topSpeed, racer.velocity);
  }
}

function updatePositions(dt, elapsedMs) {
  const finishX = finishDistance();

  for (const racer of state.racers) {
    if (racer.finished) continue;

    const drag = racer.isPlayer ? 0.93 : 0.965;
    racer.velocity *= drag;
    racer.x += racer.velocity * dt;

    if (racer.x >= finishX) {
      racer.x = finishX;
      racer.finished = true;
      racer.finishMs = elapsedMs;
      state.finishers.push(racer);
      renderResults();
    }

    racer.runner.style.left = `${racer.x}px`;
  }

  if (state.finishers.length === state.racers.length) {
    state.finished = true;
    info.textContent = "Race complete";
  }
}

function maybeUpdatePb() {
  const player = state.finishers.find((r) => r.isPlayer);
  if (!player) return;

  const timeS = player.finishMs / 1000;
  const pb = readBestTime();

  if (!pb || timeS < pb) {
    localStorage.setItem(BEST_TIME_KEY, String(timeS));
    bestTimeEl.textContent = `NEW PB: ${timeS.toFixed(3)}s`;
  } else {
    renderBestTime();
  }
}

function renderResults() {
  resultsEl.innerHTML = "";
  const ordered = [...state.finishers].sort((a, b) => a.finishMs - b.finishMs);

  ordered.forEach((racer, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${racer.name} — ${(racer.finishMs / 1000).toFixed(3)}s`;
    resultsEl.appendChild(li);
  });

  maybeUpdatePb();
}

function raceLoop(now) {
  if (!state.started) return;

  const elapsedMs = now - state.raceStartTime;
  const dt = 1 / 60;

  if (!state.finished) {
    updateBots(dt);
    updatePositions(dt, elapsedMs);
    timerEl.textContent = `${(elapsedMs / 1000).toFixed(3)}s`;
  }

  requestAnimationFrame(raceLoop);
}

function startCountdown() {
  const messages = ["Ready...", "Set...", "GO!"];
  let i = 0;

  const timer = setInterval(() => {
    info.textContent = messages[i] ?? "GO!";
    i += 1;

    if (i === messages.length) {
      clearInterval(timer);
      state.started = true;
      state.raceStartTime = performance.now();
      requestAnimationFrame(raceLoop);
    }
  }, START_DELAY_MS / 3);
}

function falseStart() {
  info.textContent = "False start — restart race";
  state.finished = true;
  state.started = false;
}

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space") return;
  event.preventDefault();

  if (!state.started && !state.finished) {
    falseStart();
    return;
  }

  if (event.repeat) return;
  updatePlayerFromTap(performance.now());
});

playAgainBtn.addEventListener("click", () => window.location.reload());

setupTrack();
renderBestTime();
startCountdown();

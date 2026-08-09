/* Shared behavior across all three screens. */

/* 20 named themes, one every 3 days across the 60-day challenge —
   Ash & Charcoal on Day 1 through Supernova Gold on Day 60. Each is a
   full CSS custom-property swap ([data-tier="tN"] in style.css), so the
   whole product's color story evolves continuously instead of jumping
   between four flat checkpoints. */
const TIER_COPY = {
  t1:  { icon: "🌑", name: "Ash & Charcoal",    days: "Days 1–3",   line: "Day one. Every streak starts in the quiet dark." },
  t2:  { icon: "🔥", name: "First Spark",       days: "Days 4–6",   line: "The first spark catches. Obsidian gives way to amber." },
  t3:  { icon: "🌱", name: "Sprout Mint",       days: "Days 7–9",   line: "Something's growing. A week of showing up, and it shows." },
  t4:  { icon: "🌲", name: "Emerald Forest",    days: "Days 10–12", line: "Ten days deep. This is jungle-green territory now — real momentum." },
  t5:  { icon: "🌊", name: "Oceanic Trench",    days: "Days 13–15", line: "Two weeks in. Deep, steady, abyss-blue focus." },
  t6:  { icon: "⚡", name: "Electric Indigo",   days: "Days 16–18", line: "Halfway to a month. The habit is wired in — indigo and violet." },
  t7:  { icon: "🔮", name: "Purple Haze",       days: "Days 19–21", line: "Three weeks of proof. Magenta for a streak turning heads." },
  t8:  { icon: "🌇", name: "Sunset Horizon",    days: "Days 22–24", line: "Rose-gold for a student who doesn't quit at sunset." },
  t9:  { icon: "💠", name: "Cyber Teal",        days: "Days 25–27", line: "High-tech teal for a build streak running at full voltage." },
  t10: { icon: "🥉", name: "Halfway Bronze",    days: "Days 28–30", line: "Halfway there. Bronze for the days already banked." },
  t11: { icon: "🌌", name: "Cosmic Nebula",     days: "Days 31–33", line: "Past the midpoint — galaxy blue, starlight purple." },
  t12: { icon: "🌈", name: "Northern Lights",   days: "Days 34–36", line: "Five weeks. Your consistency is its own aurora." },
  t13: { icon: "☀️", name: "Solar Flare",       days: "Days 37–39", line: "Burning orange for a streak that refuses to cool down." },
  t14: { icon: "⚙️", name: "Titanium Alloy",    days: "Days 40–42", line: "Forty days. Sleek, unbreakable, titanium." },
  t15: { icon: "💜", name: "Hyper Violet",      days: "Days 43–45", line: "Amethyst for a streak deep into rare territory." },
  t16: { icon: "💎", name: "Royal Sapphire",    days: "Days 46–48", line: "Royal blue for a student who's basically unstoppable now." },
  t17: { icon: "🔷", name: "Prism Glow",        days: "Days 49–51", line: "Seven weeks. Every color at once — you've earned the prism." },
  t18: { icon: "⬛", name: "Diamond Obsidian",  days: "Days 52–54", line: "Fifty days plus. True black, diamond-sharp focus." },
  t19: { icon: "🥈", name: "Prestige Platinum", days: "Days 55–57", line: "Platinum for the final stretch. Almost there." },
  t20: { icon: "🥇", name: "Supernova Gold",    days: "Days 58–60", line: "Day 60. Supernova gold — you finished what you started." }
};
const TIER_ORDER = Object.keys(TIER_COPY); // ["t1", ..., "t20"]

function applyTier(tier) {
  if (tier === "t1") document.documentElement.removeAttribute("data-tier");
  else document.documentElement.setAttribute("data-tier", tier);
}

/* Every 3 completed days advances one theme, capped at t20 (Day 58–60). */
function tierFromStreak(daysCompleted) {
  const idx = Math.min(20, Math.max(1, Math.ceil((daysCompleted || 0) / 3) || 1));
  return "t" + idx;
}

function tierLabel(tier) {
  return (TIER_COPY[tier] && TIER_COPY[tier].name) || TIER_COPY.t1.name;
}

function getActiveScenarioKey() {
  return localStorage.getItem("abtalks_scenario") || "onTrack";
}

function setActiveScenarioKey(key) {
  localStorage.setItem("abtalks_scenario", key);
}

/* Milestone celebration — a real full-screen moment, not just a
   silent color swap, whenever a student's tier changes (see TIER_COPY
   above, defined once alongside the tier-progression logic). */

function getThemeMode() {
  return localStorage.getItem("abtalks_theme") || "dark";
}
function applyThemeMode(mode) {
  if (mode === "light") document.documentElement.setAttribute("data-theme", "light");
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("abtalks_theme", mode);
  const btn = document.querySelector(".theme-toggle");
  if (btn) btn.textContent = mode === "light" ? "🌙" : "☀️";
}
function initThemeToggle() {
  applyThemeMode(getThemeMode());
  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      applyThemeMode(getThemeMode() === "light" ? "dark" : "light");
    });
  }
}

function getLastSeenTier() {
  return localStorage.getItem("abtalks_last_tier");
}
function setLastSeenTier(t) {
  localStorage.setItem("abtalks_last_tier", t);
}
function celebrateTier(tier) {
  const info = TIER_COPY[tier];
  let overlay = document.querySelector(".celebrate-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "celebrate-overlay";
    overlay.innerHTML = `
      <div class="celebrate-card">
        <div class="confetti-wrap"></div>
        <div class="spark">${info.icon}</div>
        <div class="tier-name">${info.name}</div>
        <div class="tier-days">${info.days}</div>
        <p>${info.line}</p>
        <button class="btn btn-primary btn-sm" id="celebrateClose">Keep going</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#celebrateClose").addEventListener("click", () => {
      overlay.classList.remove("show");
    });
  } else {
    overlay.querySelector(".spark").textContent = info.icon;
    overlay.querySelector(".tier-name").textContent = info.name;
    overlay.querySelector(".tier-days").textContent = info.days;
    overlay.querySelector(".tier-days").nextElementSibling.textContent = info.line;
  }
  const wrap = overlay.querySelector(".confetti-wrap");
  wrap.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const bit = document.createElement("div");
    bit.className = "confetti-bit";
    bit.style.left = Math.random() * 100 + "%";
    bit.style.background = i % 2 ? "var(--accent)" : "var(--accent-2)";
    bit.style.animationDelay = (Math.random() * 0.4) + "s";
    wrap.appendChild(bit);
  }
  requestAnimationFrame(() => overlay.classList.add("show"));
}

function getMockProfile() {
  const raw = localStorage.getItem("abtalks_profile");
  return raw ? JSON.parse(raw) : null;
}
function setMockProfile(p) {
  localStorage.setItem("abtalks_profile", JSON.stringify(p));
}

/* ---- Real progress tracking ----
   The four objects in ABTALKS_MOCK.scenarios are fixed "Judge Preview"
   baselines and are never mutated, so switching between them always shows
   the same four edge cases. Everything a student actually *does* — i.e.
   submitting a day's proof — is tracked separately here, seeded from
   whichever baseline is active, so the dashboard/profile/today screens
   actually move forward after a real submission instead of snapping back
   to the scenario's fixed starting point. */
const PROGRESS_KEY = "abtalks_progress";

function getStoredProgress() {
  const raw = localStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) : null;
}
function setStoredProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  return p;
}

function progressFromScenario(key) {
  const base = ABTALKS_MOCK.scenarios[key] || ABTALKS_MOCK.scenarios.onTrack;
  return {
    scenarioKey: key,
    streak: base.streak,
    longestStreak: base.longestStreak,
    daysCompleted: base.daysCompleted,
    currentDay: base.currentDay,
    missedYesterday: base.missedYesterday,
    freezesLeft: base.freezesLeft,
    tier: base.tier,
    doneDays: base.rungs.filter(r => r.state === "done").map(r => r.day)
  };
}

/* The live, mutable state for whichever scenario is currently active.
   Self-heals from the scenario baseline the first time it's read, or
   whenever the active scenario key has changed (e.g. Judge Preview). */
function getEffectiveState(key) {
  let p = getStoredProgress();
  if (!p || p.scenarioKey !== key) {
    p = progressFromScenario(key);
    setStoredProgress(p);
  }
  return p;
}

/* Explicitly re-seeds progress from a scenario's baseline. Used only when
   a judge taps a different "Preview a scenario" option, so switching
   personas always shows that persona's real edge case rather than
   whatever the previously-active persona had submitted. */
function resetProgress(key) {
  return setStoredProgress(progressFromScenario(key));
}

/* The one place real progression happens: called when a student actually
   submits proof for a day. Advances streak/day-count/tier and unlocks the
   next day, and persists it so every other screen reflects it immediately. */
function recordSubmission(dayNumber) {
  const p = getStoredProgress();
  if (!p) return null;
  if (p.doneDays.includes(dayNumber)) return p; // already logged — don't double count
  p.doneDays.push(dayNumber);
  p.daysCompleted = Math.min(60, p.daysCompleted + 1);
  p.streak = p.missedYesterday ? 1 : p.streak + 1;
  p.longestStreak = Math.max(p.longestStreak, p.streak);
  p.missedYesterday = false;
  p.currentDay = Math.min(60, Math.max(p.currentDay, dayNumber + 1));
  p.tier = tierFromStreak(p.daysCompleted);
  return setStoredProgress(p);
}

function progressRungs(p) {
  return buildRungs(p.currentDay, p.doneDays);
}
/* Floating Help button — present on every screen so a confused first-time
   visitor or a stuck student always has a working way to get unstuck,
   without needing a real backend. */
function initHelpWidget() {
  if (document.querySelector(".help-fab")) return;

  const fab = document.createElement("button");
  fab.className = "help-fab";
  fab.setAttribute("aria-label", "Get help");
  fab.textContent = "?";

  const backdrop = document.createElement("div");
  backdrop.className = "help-backdrop";
  backdrop.innerHTML = `
    <div class="help-panel" role="dialog" aria-label="Help">
      <div class="hp-head"><h4>Need a hand?</h4><button class="hp-close" aria-label="Close help">✕</button></div>
      <p class="hp-sub">Most questions are answered in seconds — pick one below.</p>
      <div class="hp-links">
        <button type="button" data-faq="submit">How do I submit proof for a day? <span class="arr">›</span></button>
        <button type="button" data-faq="missed">I missed a day — what happens? <span class="arr">›</span></button>
        <button type="button" data-faq="free">Is ABTalks really free? <span class="arr">›</span></button>
      </div>
      <a class="btn btn-primary btn-sm" href="mailto:support@abtalks.dev" style="width:100%;">Email support@abtalks.dev</a>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(backdrop);

  const FAQ_ANSWERS = {
    submit: "Open today's task from your dashboard, then paste your GitHub commit link and your LinkedIn post link on that day's page — both are required.",
    missed: "Your streak resets to 0, but your longest streak stays on record, and every student has a streak freeze to protect one missed day.",
    free: "Yes — the full 60-day challenge is free, no card required."
  };

  function open() { backdrop.classList.add("show"); }
  function close() { backdrop.classList.remove("show"); }

  fab.addEventListener("click", open);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
  backdrop.querySelector(".hp-close").addEventListener("click", close);
  backdrop.querySelectorAll("[data-faq]").forEach(btn => {
    btn.addEventListener("click", () => showToast(FAQ_ANSWERS[btn.dataset.faq]));
  });
}

function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(showToast._tid);
  showToast._tid = setTimeout(() => t.classList.remove("show"), 2400);
}

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

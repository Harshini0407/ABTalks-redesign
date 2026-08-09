# ABTalks Redesign

A mobile-first redesign of ABTalks, a 60-day coding challenge for Indian
college students. Static build, mocked data only — no auth, no database.

## What this is

Students pick a track, build daily, and keep a public streak alive by
submitting a GitHub commit + a LinkedIn post each day. This redesign is
built around that real usage moment: mostly on a phone, late at night,
after college.

- The 60 days are drawn literally, as a grid of 60 rungs that light up
  as a student progresses — visible on the landing page as a
  preview/promise, and structurally implied everywhere else (progress
  bars, day counters).
- **Theming:** the accent color and glow shift through 20 named themes,
  one every 3 days, across the full 60-day challenge — a continuous
  palette journey rather than four flat checkpoints. Implemented as a
  `data-tier="t1"`…`data-tier="t20"` attribute on `<html>`, driving CSS
  custom properties (`--accent`, `--accent-2`, `--tier-glow`,
  `--tier-label`) defined once in `assets/style.css`. Every component
  (buttons, task card border, streak number, chips, milestone
  celebration) reads from these variables, so the whole UI evolves
  without per-component logic. `tierFromStreak(daysCompleted)` in
  `assets/app.js` maps completed days to a tier
  (`Math.ceil(days / 3)`, capped at 20), and a full-screen milestone
  celebration (unique icon, name, day range, line of copy per theme —
  see `TIER_COPY` in `app.js`) fires whenever a student crosses into a
  new one.
- **Why dark, not a cream/serif "safe" default:** the real usage moment
  is a phone, late at night, after college — a dark UI is a
  legibility/eye-strain choice grounded in that, not a style choice.
- **Type system:** JetBrains Mono for display/data (headlines, day
  numbers, streak counts, nav labels) paired with Inter for body copy.
  The mono face is used because the product's proof mechanism is a
  GitHub commit — a monospaced, code-adjacent voice fits the subject.

## Pages / routes

| Route         | File                     | Purpose                                   |
|---------------|--------------------------|--------------------------------------------|
| `/`           | `index.html`             | Landing page                               |
| `/dashboard`  | `dashboard/index.html`   | Student dashboard                          |
| `/day/12`     | `day/12/index.html`      | Daily submission screen + Proof Receipt    |
| `/start`      | `start/index.html`       | Onboarding / track selection               |
| `/profile`    | `profile/index.html`     | Student profile                            |
| `/ranks`      | `ranks/index.html`       | Leaderboard / rankings                     |

Each route is a real folder with its own `index.html`, so it works
directly on any static host with no extra routing configuration.

## Notable additions

- **Proof Receipt** (`/day/12`) — after a student submits both links, a
  small "receipt" card appears summarizing the day and new streak,
  meant to be screenshotted and reused in the next LinkedIn post. It
  closes the loop between "prove your work" and "be seen for it" —
  most streak apps stop at a checkmark; this hands the student
  something to reuse.

## Theme table (day → tier)

| Days  | Theme             | Days  | Theme             |
|-------|--------------------|-------|--------------------|
| 1–3   | Ash & Charcoal      | 31–33 | Cosmic Nebula       |
| 4–6   | First Spark         | 34–36 | Northern Lights     |
| 7–9   | Sprout Mint         | 37–39 | Solar Flare         |
| 10–12 | Emerald Forest      | 40–42 | Titanium Alloy      |
| 13–15 | Oceanic Trench      | 43–45 | Hyper Violet        |
| 16–18 | Electric Indigo     | 46–48 | Royal Sapphire      |
| 19–21 | Purple Haze         | 49–51 | Prism Glow          |
| 22–24 | Sunset Horizon      | 52–54 | Diamond Obsidian    |
| 25–27 | Cyber Teal          | 55–57 | Prestige Platinum   |
| 28–30 | Halfway Bronze      | 58–60 | Supernova Gold      |

## Project structure

```
.
├── index.html            # Landing page (/)
├── dashboard/index.html  # Dashboard (/dashboard)
├── day/12/index.html     # Day submission screen (/day/12)
├── start/index.html      # Onboarding (/start)
├── profile/index.html    # Profile (/profile)
├── ranks/index.html      # Rankings (/ranks)
├── assets/
│   ├── style.css         # All styling, incl. the 20-theme CSS variables
│   ├── app.js             # Tier logic, milestone celebrations, interactivity
│   └── data.js             # Mocked data (students, streaks, submissions)
```

## Running &amp; Deploying

This is a static build (plain HTML/CSS/JS) — no build step, no local
dev server needed.

1. Push this project to a GitHub repository (repo root should contain
   `index.html`, `dashboard/`, `day/`, `assets/`, etc. — see structure
   above).
2. On Netlify: **Add new site → Import an existing project → Deploy
   with GitHub**, then select the repo.
3. Leave the build command empty and set the publish directory to the
   project root (`.`).
4. Netlify gives a live URL, and every push to the connected branch
   redeploys automatically — that's what "runs" the site going
   forward, no manual redeploy needed.

Every route (`/`, `/dashboard`, `/day/12`, etc.) is a real folder with
its own `index.html`, which is exactly what Netlify expects for clean
URLs — no extra redirect/rewrite configuration needed.

To preview a change before pushing, just open the relevant `index.html`
file directly in a browser.

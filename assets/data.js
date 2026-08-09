/* Mock data — stands in for a real backend/database.
   Everything the three screens render comes from here. */

const ABTALKS_MOCK = {
  student: {
    name: "Ishita Rao",
    handle: "@ishitacodes",
    track: "Full-Stack Web",
    college: "VNR VJIET, Hyderabad",
    joinedDay: "2026-06-10"
  },

  // Three named scenarios a judge can flip between on the dashboard —
  // this is the "Judge Preview Mode" feature: real edge cases, one tap away.
  scenarios: {
    day1: {
      key: "day1",
      label: "Day 1 · Fresh start",
      streak: 0,
      longestStreak: 0,
      daysCompleted: 0,
      currentDay: 1,
      missedYesterday: false,
      freezesLeft: 1,
      tier: "t1",
      rungs: buildRungs(1, [])
    },
    onTrack: {
      key: "onTrack",
      label: "Day 12 · Building momentum",
      streak: 11,
      longestStreak: 11,
      daysCompleted: 11,
      currentDay: 12,
      missedYesterday: false,
      freezesLeft: 1,
      tier: "t4",
      rungs: buildRungs(12, range(1, 11))
    },
    missed: {
      key: "missed",
      label: "Day 23 · Missed yesterday",
      streak: 0,
      longestStreak: 19,
      daysCompleted: 19,
      currentDay: 23,
      missedYesterday: true,
      freezesLeft: 1,
      tier: "t7",
      rungs: buildRungs(23, range(1, 19))
    },
    gold: {
      key: "gold",
      label: "Day 52 · Home stretch",
      streak: 51,
      longestStreak: 51,
      daysCompleted: 51,
      currentDay: 52,
      missedYesterday: false,
      freezesLeft: 0,
      tier: "t17",
      rungs: buildRungs(52, range(1, 51))
    }
  },

  badges: [
    { id: "spark", icon: "🔥", name: "First Spark", need: 1 },
    { id: "week1", icon: "⚡", name: "7-Day Circuit", need: 7 },
    { id: "half", icon: "🧭", name: "Halfway", need: 30 },
    { id: "gold", icon: "🏆", name: "Golden 50", need: 50 },
    { id: "finish", icon: "🎓", name: "Finisher", need: 60 }
  ],

  leaderboard: [
    { name: "Aarav Mehta", streak: 58, you: false },
    { name: "Sana Iqbal", streak: 54, you: false },
    { name: "Ishita Rao", streak: 51, you: true },
    { name: "Devansh Rao", streak: 47, you: false },
    { name: "Priya Nair", streak: 44, you: false }
  ],

  tracks: [
    { icon: "🖥️", name: "Full-Stack Web", desc: "Ship a real product, one feature a day" },
    { icon: "🤖", name: "AI / ML", desc: "Models, data, and deployed demos" },
    { icon: "📱", name: "Android", desc: "Kotlin apps, published to a device" },
    { icon: "🔐", name: "DSA + CP", desc: "Daily problems, contest-ready" }
  ],

  daysByTrack: {
    "Full-Stack Web": {
      1: {
        number: 1, track: "Full-Stack Web",
        title: "Set up your project and ship a working health-check endpoint",
        minutes: "30–45 min", difficulty: "Beginner",
        brief: "Day 1 is about getting a real, running project on the board — not a tutorial folder. You'll scaffold a minimal backend, add one working route, and confirm it responds, so every day after this one has something to build on top of.",
        requirements: [
          "A backend project initialized with a package manager (npm, pip, etc.)",
          "One GET /health route that returns a 200 status and a JSON body",
          "Project pushed to a public GitHub repo with a short README",
          "Confirm the route responds locally before you submit"
        ],
        resources: ["Minimal API starter guide", "README template", "Reference repo"]
      },
      12: {
        number: 12, track: "Full-Stack Web",
        title: "Build a paginated API and wire it to a live list view",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Today's build is about handling data at scale, not just displaying it. You'll add pagination to an existing API endpoint, then connect a frontend list view that loads more results as the student scrolls.",
        requirements: [
          "A REST endpoint that accepts page and limit query params",
          "Response includes total count and hasNextPage",
          "Frontend list that fetches page 1 on load and page N+1 on scroll",
          "Loading and empty states handled — don't skip these"
        ],
        resources: ["REST pagination guide", "Infinite scroll patterns", "Reference repo"]
      },
      23: {
        number: 23, track: "Full-Stack Web",
        title: "Add auth middleware to protect your write routes",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Three weeks in, your API needs real access control. You'll add token-based auth middleware that guards create/update/delete routes while leaving read routes open, then confirm both the blocked and allowed paths behave correctly.",
        requirements: [
          "Middleware that checks for a valid auth token on protected routes",
          "A clear 401 response with a JSON error body when the token is missing or invalid",
          "At least one write route protected end-to-end",
          "A short test (script or manual log) showing both a blocked and an allowed request"
        ],
        resources: ["Token auth patterns", "Middleware guide", "Reference repo"]
      },
      52: {
        number: 52, track: "Full-Stack Web",
        title: "Add response caching and measure the before/after",
        minutes: "60–90 min", difficulty: "Advanced",
        brief: "This close to Day 60, the bar is production polish, not new features. You'll add a caching layer to your slowest endpoint and prove it actually helped, with real before/after numbers instead of a guess.",
        requirements: [
          "Caching added to at least one read-heavy endpoint",
          "Cache invalidation handled on the relevant write path",
          "Before/after response-time numbers captured and included in your commit or README",
          "Cache-miss path still returns correct data"
        ],
        resources: ["HTTP caching guide", "Basic load-testing tools", "Reference repo"]
      }
    },
    "AI / ML": {
      1: {
        number: 1, track: "AI / ML",
        title: "Load a dataset and ship a working train/predict script",
        minutes: "30–45 min", difficulty: "Beginner",
        brief: "Day 1 is about proving the pipeline runs end to end, not picking the fanciest model. You'll load a small public dataset, train a baseline model, and confirm it can produce a prediction on new input.",
        requirements: [
          "A script that loads a public dataset (CSV or built-in) into a dataframe/array",
          "A baseline model trained on that data (any simple classifier/regressor is fine)",
          "One prediction printed on a held-out example",
          "Project pushed to a public GitHub repo with a short README"
        ],
        resources: ["Baseline model guide", "Public dataset list", "Reference repo"]
      },
      12: {
        number: 12, track: "AI / ML",
        title: "Serve your model's predictions behind a REST endpoint",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "A model sitting in a notebook isn't usable by anything else. You'll wrap your trained model in a REST endpoint that accepts input and returns a prediction, then confirm it works with a real request, not just in-notebook.",
        requirements: [
          "A POST endpoint that accepts input and returns a prediction as JSON",
          "Model loaded once at startup, not re-trained per request",
          "A basic error response when the input shape is wrong",
          "Tested with at least one real request (curl, Postman, or a script)"
        ],
        resources: ["Model-serving patterns", "REST API basics", "Reference repo"]
      },
      23: {
        number: 23, track: "AI / ML",
        title: "Add input validation and a confidence score to your endpoint",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Three weeks in, a bare prediction isn't enough — consumers of your endpoint need to know how much to trust it and what happens with bad input. You'll validate incoming data and return a confidence score alongside every prediction.",
        requirements: [
          "Input validation that rejects malformed requests with a clear error",
          "A confidence/probability score returned alongside the prediction",
          "Documented in the README: what a low-confidence result means",
          "At least one valid and one invalid request logged as proof"
        ],
        resources: ["Input validation patterns", "Model confidence scoring", "Reference repo"]
      },
      52: {
        number: 52, track: "AI / ML",
        title: "Benchmark and optimize your model's inference latency",
        minutes: "60–90 min", difficulty: "Advanced",
        brief: "This close to Day 60, the bar is production readiness. You'll measure how long your endpoint actually takes to respond under load, apply one real optimization, and prove it helped with numbers.",
        requirements: [
          "Baseline latency measured across at least 20 requests",
          "One concrete optimization applied (batching, quantization, caching, etc.)",
          "Before/after latency numbers included in your commit or README",
          "Endpoint still returns correct predictions after the change"
        ],
        resources: ["Inference optimization guide", "Basic load-testing tools", "Reference repo"]
      }
    },
    "Android": {
      1: {
        number: 1, track: "Android",
        title: "Scaffold your app and ship one working screen",
        minutes: "30–45 min", difficulty: "Beginner",
        brief: "Day 1 is about having a real app that runs on a device or emulator, not a blank template. You'll create a new Android project and ship one screen with a button that actually does something when tapped.",
        requirements: [
          "A new Android project (Kotlin) that builds and runs",
          "One screen with a button that triggers a visible change (text, toast, or navigation)",
          "Project pushed to a public GitHub repo with a short README",
          "Confirmed running on an emulator or real device before you submit"
        ],
        resources: ["Android project setup guide", "README template", "Reference repo"]
      },
      12: {
        number: 12, track: "Android",
        title: "Add a paginated list backed by a real data source",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Today's build is about handling real data at scale on-device. You'll wire a RecyclerView (or Compose LazyColumn) to a data source that loads more items as the user scrolls, instead of dumping everything at once.",
        requirements: [
          "A list view (RecyclerView or LazyColumn) backed by a real or mock data source",
          "Loads the next page as the user scrolls near the bottom",
          "Loading and empty states handled — don't skip these",
          "Confirmed scrolling behavior on an emulator or device"
        ],
        resources: ["Paging library guide", "RecyclerView/Compose list patterns", "Reference repo"]
      },
      23: {
        number: 23, track: "Android",
        title: "Add local storage so data survives an app restart",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Three weeks in, an app that forgets everything on restart isn't finished. You'll add local persistence (Room or an equivalent) so a student's data survives closing and reopening the app.",
        requirements: [
          "Local database (Room or equivalent) integrated into the project",
          "At least one piece of data written to and read back from local storage",
          "Data confirmed to survive an app restart",
          "A short test log or screen recording showing the before/after"
        ],
        resources: ["Room persistence guide", "Local storage patterns", "Reference repo"]
      },
      52: {
        number: 52, track: "Android",
        title: "Add a settings screen and basic crash/error logging",
        minutes: "60–90 min", difficulty: "Advanced",
        brief: "This close to Day 60, the bar is an app that feels shippable. You'll add a settings screen for at least one real preference, plus basic logging so crashes and errors don't disappear silently.",
        requirements: [
          "A settings screen with at least one persisted user preference",
          "Basic crash/error logging integrated (even a simple local log is fine)",
          "One deliberately triggered error confirmed to appear in the log",
          "App still runs cleanly after the change"
        ],
        resources: ["Settings screen patterns", "Basic logging setup", "Reference repo"]
      }
    },
    "DSA + CP": {
      1: {
        number: 1, track: "DSA + CP",
        title: "Solve your first problem and write up your approach",
        minutes: "30–45 min", difficulty: "Beginner",
        brief: "Day 1 is about building the habit of explaining your thinking, not just getting a green checkmark. You'll solve one problem and write a short explanation of your approach alongside the code.",
        requirements: [
          "One problem solved with working, submitted code",
          "A short written explanation of your approach (a few sentences is enough)",
          "Time and space complexity stated, even roughly",
          "Project pushed to a public GitHub repo with a short README"
        ],
        resources: ["Problem set", "Complexity analysis primer", "Reference repo"]
      },
      12: {
        number: 12, track: "DSA + CP",
        title: "Solve a sliding-window problem and test the edge cases",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Today's build is about handling data at scale efficiently, not brute-forcing it. You'll solve a sliding-window problem, then write tests that cover the edge cases most solutions miss.",
        requirements: [
          "A sliding-window solution with better than brute-force complexity",
          "At least 3 test cases, including an edge case (empty input, single element, etc.)",
          "Time and space complexity documented",
          "All tests passing before you submit"
        ],
        resources: ["Sliding window patterns", "Edge-case testing guide", "Reference repo"]
      },
      23: {
        number: 23, track: "DSA + CP",
        title: "Solve a graph traversal problem on a realistic input size",
        minutes: "60–90 min", difficulty: "Intermediate",
        brief: "Three weeks in, the problems stop being toy-sized. You'll solve a BFS/DFS-based graph problem sized closer to what a real system would see, and confirm your solution doesn't fall over at that scale.",
        requirements: [
          "A BFS or DFS-based solution to a graph problem",
          "Tested against an input large enough to expose a naive-solution timeout",
          "Time and space complexity documented",
          "A note on why the chosen traversal fits the problem"
        ],
        resources: ["Graph traversal guide", "Complexity analysis primer", "Reference repo"]
      },
      52: {
        number: 52, track: "DSA + CP",
        title: "Solve a DP optimization problem and document the tradeoffs",
        minutes: "60–90 min", difficulty: "Advanced",
        brief: "This close to Day 60, the bar is showing real mastery, not just a working answer. You'll solve a dynamic-programming problem, then document the space/time tradeoffs of your approach versus a naive one.",
        requirements: [
          "A working dynamic-programming solution to the assigned problem",
          "A brief comparison to the naive/brute-force approach's complexity",
          "State transition or recurrence relation written out, not just coded",
          "All tests passing before you submit"
        ],
        resources: ["DP problem set", "Space/time tradeoff guide", "Reference repo"]
      }
    }
  },
};

function range(a, b) {
  const out = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}

/* Resolves a day's task content by the student's actual chosen track, so
   the task shown always matches the track label next to it — falls back to
   Full-Stack Web content only if the given track has no authored days.

   Only Days 1/12/23/52 have bespoke content per track. For every other day
   (2-11, 13-22, etc.) this borrows the nearest authored checkpoint's brief
   as a stand-in — but always relabels it with the REAL day number, so the
   eyebrow/title/hashtag/receipt match the student's actual current day
   instead of silently showing "Day 12" while they're really on Day 2. */
function getDayContent(track, dayNumber) {
  const byTrack = ABTALKS_MOCK.daysByTrack[track] || ABTALKS_MOCK.daysByTrack["Full-Stack Web"];
  const exact = byTrack[dayNumber] || ABTALKS_MOCK.daysByTrack["Full-Stack Web"][dayNumber];
  if (exact) return exact;

  const checkpoints = Object.keys(byTrack).map(Number).sort((a, b) => a - b);
  let nearest = checkpoints[0];
  for (const c of checkpoints) {
    if (Math.abs(c - dayNumber) < Math.abs(nearest - dayNumber)) nearest = c;
  }
  const source = byTrack[nearest] || ABTALKS_MOCK.daysByTrack["Full-Stack Web"][1];
  return { ...source, number: dayNumber };
}

function buildRungs(currentDay, doneDays) {
  const total = 60;
  const rungs = [];
  for (let i = 1; i <= total; i++) {
    let state = "future";
    if (doneDays.includes(i)) state = "done";
    else if (i === currentDay) state = "today";
    rungs.push({ day: i, state });
  }
  return rungs;
}

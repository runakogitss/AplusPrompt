const app = document.querySelector("#app");
const beltPill = document.querySelector("#beltPill");
const xpPill = document.querySelector("#xpPill");
const homeButton = document.querySelector("#homeButton");

const mascotMap = {
  thinking: "aplusprompt-assets/mascots/coach_thinking.png",
  checklist: "aplusprompt-assets/mascots/coach_checklist.png",
  thumbs: "aplusprompt-assets/mascots/coach_thumbs_up.png",
  celebration: "aplusprompt-assets/mascots/coach_celebration.png",
  serious: "aplusprompt-assets/mascots/coach_serious.png"
};

const state = {
  sessionId: localStorage.getItem("aplusprompt-session-id") || randomId(),
  session: null,
  currentView: "landing",
  offlineMode: false
};

localStorage.setItem("aplusprompt-session-id", state.sessionId);

homeButton.addEventListener("click", () => renderLanding());

async function api(path, options = {}) {
  if (!state.offlineMode) {
    try {
      const response = await fetch(path, {
        headers: { "Content-Type": "application/json" },
        ...options
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Request failed");
      return payload;
    } catch (error) {
      state.offlineMode = true;
      console.warn("AplusPrompt API unavailable; using local mock mode.", error);
    }
  }
  return localApi(path, options);
}

async function loadProgress() {
  const { session } = await api(`/api/progress?sessionId=${encodeURIComponent(state.sessionId)}`);
  state.session = session;
  updateChrome();
}

function updateChrome() {
  beltPill.textContent = state.session?.belt || "White Belt";
  xpPill.textContent = `${state.session?.xp || 0} XP`;
}

function renderTemplate(id) {
  app.replaceChildren(document.querySelector(id).content.cloneNode(true));
}

function renderLanding() {
  state.currentView = "landing";
  renderTemplate("#landingTemplate");
  app.querySelector('[data-action="start"]').addEventListener("click", renderMissions);
  app.querySelector('[data-action="missions"]').addEventListener("click", renderMissions);
}

function renderMissions() {
  state.currentView = "missions";
  renderTemplate("#missionsTemplate");
  app.querySelector('[data-action="train"]').addEventListener("click", renderTraining);
}

function renderTraining() {
  state.currentView = "training";
  renderTemplate("#trainingTemplate");
  const form = app.querySelector("#promptForm");
  const promptInput = app.querySelector("#promptInput");
  const feedbackPanel = app.querySelector("#feedbackPanel");

  app.querySelector('[data-action="use-demo"]').addEventListener("click", () => {
    promptInput.value = "Find competitors for my business.";
    promptInput.focus();
  });

  app.querySelector('[data-action="finish"]').addEventListener("click", finishMission);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const prompt = promptInput.value.trim();
    if (!prompt) {
      feedbackPanel.className = "feedback-panel";
      feedbackPanel.innerHTML = "<h2>Add a prompt first</h2><p>Even a rough beginner prompt is enough for the first coaching rep.</p>";
      return;
    }

    feedbackPanel.className = "feedback-panel";
    feedbackPanel.innerHTML = "<h2>Coach is reviewing...</h2><p>Checking your prompt against the market research training rubric.</p>";

    try {
      const { session, feedback } = await api("/api/attempts", {
        method: "POST",
        body: JSON.stringify({ sessionId: state.sessionId, prompt })
      });
      state.session = session;
      updateChrome();
      renderFeedback(feedback);
    } catch (error) {
      feedbackPanel.innerHTML = `<h2>Something went wrong</h2><p>${escapeHtml(error.message)}</p>`;
    }
  });
}

function renderFeedback(feedback) {
  const panel = app.querySelector("#feedbackPanel");
  const coachImage = app.querySelector("#coachImage");
  coachImage.src = mascotMap[feedback.coachMood] || mascotMap.thinking;
  coachImage.alt = `AplusPrompt dog coach ${feedback.coachMood}`;
  const scorePercent = Math.round((feedback.score / feedback.maxScore) * 100);

  panel.className = "feedback-panel";
  panel.innerHTML = `
    <div class="feedback-header">
      <div>
        <span class="stamp">+${feedback.xpReward} XP</span>
        <h2>${escapeHtml(feedback.headline)}</h2>
        <p>${escapeHtml(feedback.retryInstruction)}</p>
      </div>
      <div class="score-ring" style="--score: ${scorePercent}%">${feedback.score}/${feedback.maxScore}</div>
    </div>
    <div class="feedback-grid">
      ${feedbackBlock("What worked", feedback.whatWentWell)}
      ${feedbackBlock("Missing pieces", feedback.missing.length ? feedback.missing : ["Nothing major. This prompt is ready for a final pass."])}
      <div class="feedback-block">
        <h3>Why it matters</h3>
        <p>${escapeHtml(feedback.whyItMatters)}</p>
      </div>
      <div class="feedback-block">
        <h3>Rubric</h3>
        <div class="rubric-list">
          ${feedback.rubric.map((item) => `
            <div class="rubric-item">
              <span>${escapeHtml(item.label)}</span>
              <span class="rubric-status ${item.passed ? "pass" : "miss"}">${item.passed ? "Hit" : "Add"}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="feedback-block">
        <h3>Lesson principles used</h3>
        <ul>
          ${feedback.lessonPrinciples.map((item) => `<li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.beginner_explanation)}</li>`).join("")}
        </ul>
      </div>
      <div class="feedback-block">
        <h3>Improved prompt options</h3>
        ${feedback.improvedPromptOptions.map((option) => `<button class="suggestion-button" type="button">${escapeHtml(option)}</button>`).join("")}
      </div>
    </div>
  `;

  panel.querySelectorAll(".suggestion-button").forEach((button) => {
    button.addEventListener("click", () => {
      app.querySelector("#promptInput").value = button.textContent;
      app.querySelector("#promptInput").focus();
    });
  });
}

function feedbackBlock(title, items) {
  return `
    <div class="feedback-block">
      <h3>${escapeHtml(title)}</h3>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

async function finishMission() {
  const attempts = state.session?.attempts || [];
  if (!attempts.length) {
    app.querySelector("#feedbackPanel").className = "feedback-panel";
    app.querySelector("#feedbackPanel").innerHTML = "<h2>Do one training rep first</h2><p>Submit at least one prompt so the coach can build your mission summary.</p>";
    return;
  }

  const { session, summary } = await api("/api/summary", {
    method: "POST",
    body: JSON.stringify({ sessionId: state.sessionId })
  });
  state.session = session;
  updateChrome();
  renderSummary(summary);
}

function renderSummary(summary) {
  state.currentView = "summary";
  renderTemplate("#summaryTemplate");
  app.querySelector("#summaryXp").textContent = `${summary.xpEarned} XP earned`;
  app.querySelector("#summaryBelt").textContent = summary.belt;
  app.querySelector("#finalPrompt").textContent = summary.finalPrompt;
  app.querySelector("#briefList").innerHTML = summary.brief.sections.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  app.querySelector('[data-action="train-again"]').addEventListener("click", renderTraining);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function randomId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function localApi(path, options = {}) {
  const body = options.body ? JSON.parse(options.body) : {};
  const sessions = JSON.parse(localStorage.getItem("aplusprompt-local-sessions") || "{}");
  sessions[state.sessionId] ||= {
    id: state.sessionId,
    currentMission: "market-research-coach",
    xp: 0,
    belt: "White Belt",
    completed: false,
    attempts: [],
    createdAt: new Date().toISOString()
  };

  const session = sessions[state.sessionId];
  let payload;

  if (path.startsWith("/api/progress")) {
    payload = { session };
  } else if (path === "/api/attempts") {
    const feedback = localFeedback(body.prompt || "", session.attempts.at(-1));
    const attempt = {
      id: randomId(),
      missionId: "market-research-coach",
      prompt: body.prompt,
      createdAt: new Date().toISOString(),
      feedback
    };
    session.attempts.push(attempt);
    session.xp += feedback.xpReward;
    session.belt = session.xp >= 240 ? "Green Belt" : session.xp >= 110 ? "Yellow Belt" : "White Belt";
    payload = { session, attempt, feedback };
  } else if (path === "/api/summary") {
    const finalAttempt = session.attempts.at(-1);
    session.completed = true;
    payload = {
      session,
      summary: {
        finalPrompt: finalAttempt?.prompt || "",
        xpEarned: session.xp,
        belt: session.belt,
        learned: ["Business context", "Customer and market specificity", "Source awareness", "Output structure"],
        brief: {
          sections: [
            "Competitor map with direct competitors and substitutes.",
            "Comparison table with pricing, positioning, channels, and gaps.",
            "Evidence notes that separate sources from assumptions.",
            "Recommended next actions ranked by business usefulness."
          ]
        }
      }
    };
  } else {
    payload = { lessons: [] };
  }

  localStorage.setItem("aplusprompt-local-sessions", JSON.stringify(sessions));
  return Promise.resolve(payload);
}

function localFeedback(prompt, previousAttempt) {
  const text = String(prompt).trim();
  const checks = [
    ["Clarity of task", /(find|compare|research|identify|analyze|list|summarize|evaluate)/i, "Say the exact research job you want AI to do."],
    ["Business context", /(business|company|brand|shop|agency|restaurant|clinic|saas|service|product|startup|i run|we sell|we offer)/i, "Add your business type, offer, and situation."],
    ["Target customer / market", /(target|customer|buyer|audience|market|location|city|country|region|local|online|b2b|b2c|gen z|parents|owners|managers)/i, "Name the customer group and market or location."],
    ["Source and recency awareness", /(source|sources|cite|citation|recent|latest|2026|2025|last|current|within|links|evidence)/i, "Ask for recent sources or clearly labeled evidence."],
    ["Output structure", /(table|bullets|columns|format|sections|rank|scorecard|matrix|compare by|include)/i, "Choose the output format, such as a table or short brief."],
    ["Constraints and assumptions", /(assumption|constraints|budget|limit|exclude|only|must|avoid|criteria|if unknown|ask me)/i, "Set constraints and ask AI to state assumptions."],
    ["Business usefulness", /(recommend|next steps|action|decision|gap|opportunity|strategy|priority|what should|so i can|use this to)/i, "Tell AI what decision or next action the research should support."]
  ].map(([label, detect, missing], index) => ({
    key: `local-${index}`,
    label,
    passed: detect.test(text),
    missing
  }));
  const score = checks.filter((item) => item.passed).length;
  const previousScore = previousAttempt?.feedback?.score || 0;
  const improvement = Math.max(0, score - previousScore);
  const missing = checks.filter((item) => !item.passed);

  return {
    id: randomId(),
    score,
    maxScore: checks.length,
    improvement,
    xpReward: 20 + score * 8 + improvement * 18,
    coachMood: score >= 6 ? "celebration" : score >= 4 ? "thumbs" : score >= 2 ? "checklist" : "thinking",
    headline: score >= 6 ? "Strong work. This is becoming a business-ready research prompt." : "Good start. Let’s make the AI do sharper business work.",
    whatWentWell: checks.filter((item) => item.passed).map((item) => `${item.label}: this gives the AI useful direction.`).slice(0, 3),
    missing: missing.map((item) => item.missing),
    whyItMatters: "When these details are missing, AI tends to answer with generic competitor lists. Better context helps it compare the right businesses, use fresher evidence, and produce advice you can act on.",
    lessonPrinciples: [
      {
        id: "MR-001",
        title: "Add business context first",
        beginner_explanation: "AI gives better research when it knows the business, customer, location, and decision goal.",
        source_reference: "AplusPrompt internal business AI rubric"
      },
      {
        id: "MR-004",
        title: "Choose the output shape",
        beginner_explanation: "A table or brief makes the answer easier to compare and use.",
        source_reference: "OpenAI and DeepLearning.AI prompting principles, paraphrased"
      }
    ],
    improvedPromptOptions: [
      "I run a [business type] in [location] for [target customer]. Research 5 direct competitors and compare them in a table by offer, pricing, positioning, marketing channels, strengths, weaknesses, and customer reviews. Use recent sources from the last 12 months where possible, include links, state assumptions, and finish with 3 recommended next actions for my business.",
      "Act as a market research coach. My business is [describe product/service], serving [target customer] in [market]. Help me identify competitors, substitutes, and market gaps. Show your answer as: competitor table, patterns, risks or assumptions, best opportunities, and actions I should take this week."
    ],
    retryInstruction: missing.length ? "For the next rep, add the highest-impact missing details and keep the business situation specific." : "You are ready to finish the mission.",
    rubric: checks
  };
}

loadProgress().then(renderLanding).catch((error) => {
  console.error(error);
  renderLanding();
});

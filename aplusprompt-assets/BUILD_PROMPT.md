# Master Build Prompt for Claude / Fable / Claude Code

You are building a full-stack hackathon MVP called AplusPrompt.

Before coding, first create a detailed PRD.md for the product. The PRD should include:
- Product summary
- Target users
- Core problem
- Product positioning
- MVP scope
- User journey
- Main screens
- AI coach behavior
- Source-of-truth curriculum design
- Evaluation rubric
- Data model
- API endpoints
- Frontend design direction
- Technical architecture
- Demo flow for hackathon judges
- Future roadmap

After creating the PRD, start building the actual full-stack web app end to end.

Product concept:
AplusPrompt is an AI capability training platform for non-technical business users, mostly focused on prompting at first.

It is for founders, small business owners, managers, and older business people who know AI is useful but do not know how to use it properly. Many of them only use AI like a basic chatbot. They ask vague questions, accept weak answers, do manual market research or data analysis, and do not know how to ask for context, structure, reliable sources, assumptions, or next actions.

The product should not feel like a video course.
It should not feel like a normal chatbot.
It should not feel like a static prompt grader.
It should feel like an interactive AI personal trainer.

Think:
Duolingo learning loop + personal trainer + business coach + soft Japanese business-kawaii SaaS.

The key idea:
The AI coach does not simply judge the user.
The AI coach trains the user.

The coach should:
- See what the user is trying to do
- Diagnose what is missing
- Explain the mistake in simple language
- Teach the relevant prompting principle
- Give improved prompt options
- Ask the user to retry
- Reward improvement
- Show progress over time

Build one complete mission really well.

MVP mission:
Market Research Coach

Mission goal:
Teach a non-technical business user how to use AI for better market research.

Example weak beginner prompt:
“Find competitors for my business.”

The coach should explain why this is weak:
- Missing business type
- Missing location / market
- Missing target customer
- Missing comparison criteria
- Missing source and recency requirement
- Missing output format
- Missing business action

The user should then improve the prompt through a guided retry loop.

Core app flow:
1. Landing page
   - Explain AplusPrompt clearly in 30 seconds.
   - Show mascot.
   - CTA: Start Training.

2. Mission selection page
   - Available mission: Market Research Coach.
   - Locked future missions:
     - Data Analysis Coach
     - Marketing Campaign Coach
     - Sales Message Coach
     - Customer Support Coach
     - AI Workflow / Operator Coach

3. Training mission page
   - Show mission brief.
   - User writes first prompt attempt.
   - AI coach reviews the attempt.
   - Coach returns structured feedback:
     - What the user did well
     - What is missing
     - Why it matters
     - Relevant lesson principle
     - Improved prompt options
     - Retry instruction
     - XP reward
     - Belt progress

4. Retry loop
   - User submits improved prompt.
   - Coach compares the new attempt against the previous attempt.
   - Reward improvement, not just perfection.
   - The experience should feel like training.

5. Final summary page
   - Show final improved prompt.
   - Show what the user learned.
   - Show XP earned.
   - Show belt/level progress.
   - Optionally generate a sample business-ready market research brief from the improved prompt.

Progression system:
Use belt levels:
- White Belt: Basic prompting
- Yellow Belt: Better context
- Green Belt: Source-aware research
- Blue Belt: Business analysis
- Black Belt: AI Operator

For the MVP, the Market Research Coach should move the user from White Belt toward Green Belt.

Source-of-truth curriculum:
The AI coach should not teach randomly from model memory only.

Create a small internal curriculum knowledge base using lesson cards. Each lesson card should have:
- id
- title
- skill_category
- beginner_explanation
- evaluation_rule
- weak_prompt_example
- improved_prompt_example
- source_reference

Use source_reference labels such as:
- DeepLearning.AI / Andrew Ng prompt engineering principles
- OpenAI prompt engineering guide
- Anthropic prompt engineering guide
- Google/Gemini business prompting guide
- AplusPrompt internal business AI rubric

Do not copy long copyrighted course text. Paraphrase into original beginner-friendly lessons.

When the user submits a prompt, the backend should:
1. Evaluate the prompt against the AplusPrompt rubric.
2. Retrieve the most relevant lesson cards.
3. Generate coaching feedback grounded in those lesson cards.
4. Show which lesson principles were used.

Core rubric:
- Clarity of task
- Business context
- Target customer / market specificity
- Source and recency awareness
- Output structure
- Constraints and assumptions
- Business usefulness / actionability

AI coach behavior:
The AI should act like a personal trainer, not a judge.
Avoid saying only “score: 6/10.”
Instead say:
“Good start. Your goal is clear, but your prompt is missing business context. If you ask AI this way, the answer will probably be generic. Let’s add your industry, location, target customer, and what you want to compare.”

The coach should be:
- Warm
- Simple
- Practical
- Encouraging
- Honest
- Non-technical
- Business-focused

The coach should avoid jargon. If jargon is needed, explain it simply.

Backend requirements:
Build backend routes/API endpoints for:
- Submit prompt attempt
- Get AI coach feedback
- Generate improved prompt suggestions
- Generate final mission summary
- Track user progress / XP / belt level
- Retrieve curriculum lesson cards

Use environment variable placeholders for API keys.
Do not hardcode secrets.

Include .env.example with:
AI_PROVIDER_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
FIREWORKS_API_KEY=
AMD_API_KEY=
DATABASE_URL=

Important:
If real API keys are not available, include a mock AI response mode so the app still works locally for demo purposes. The mock mode should be polished and realistic enough for a hackathon demo.

Data requirements:
Use a simple persistence layer suitable for an MVP.
Track:
- User/session
- Current mission
- Prompt attempts
- Feedback
- XP
- Belt level
- Completion status
- Lesson cards used

Frontend design direction:
Design AplusPrompt as a soft Japanese business-kawaii SaaS app.

It should be cute but professional.
It should feel friendly for beginners but credible for business users.

Use the uploaded mascot images as the AI coach.
The mascot is a smart dog coach / sensei / personal trainer.

Visual style:
- Warm ivory background, not pure white
- Deep forest green as primary brand color
- Sage green as secondary color
- Soft gold/orange for XP and rewards
- Rounded cards
- Soft shadows
- Clean SaaS dashboard layout
- Subtle Japanese-inspired details: paper texture, wave pattern, stamp-like badges, belt progression
- Friendly professional typography

Recommended colors:
- Background: #FAF7F1
- Primary green: #0F3D2E
- Sage green: #8E9A82
- Accent gold: #D9A441
- Soft orange: #F3B562
- Text: #222222
- Card background: #FFFFFF

Main mission screen layout:
- Top nav with logo, current mission, XP, and belt level
- Left workspace for prompt writing and retry history
- Right coach panel with mascot, speech bubble, and feedback
- Rubric cards showing strengths and missing parts
- XP/belt progress bar
- Final summary card after completion

Mascot usage:
Use different mascot images for different states:
- Welcome / onboarding
- Thinking / analyzing
- Teaching / pointing
- Encouraging / thumbs up
- Celebration
- Serious coach
- Checklist / clipboard

Build quality:
Make the app complete enough for a hackathon demo.
It should be visually polished.
It should be understandable within 30 seconds.
It should run locally.
Include README instructions.
Include .env.example.
Include mock data/demo mode.
Use clean code structure.
Choose the most suitable tech stack and architecture yourself.

Important product principle:
The app is not trying to teach users to memorize prompt formulas.
It is training users to become better AI users through business missions.

Final deliverable:
A working full-stack MVP of AplusPrompt with:
- PRD.md
- Full frontend
- Full backend
- Curriculum lesson cards
- AI coach feedback system
- Mock AI mode
- API key placeholders
- Mascot-based UI
- One complete interactive mission: Market Research Coach

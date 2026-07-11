# AplusPrompt PRD

## Product Summary
AplusPrompt is an AI capability training platform for non-technical business users. The MVP focuses on prompting for market research and presents the experience as an interactive training mission, not a video course or static prompt grader.

## Target Users
- Founders and small business owners who want better AI-assisted research.
- Managers and operators who use AI casually but need more reliable business outputs.
- Older or less technical business users who benefit from simple, guided coaching.

## Core Problem
Many business users ask AI vague prompts, accept generic answers, and do not know how to add context, source expectations, assumptions, output structure, or business decisions. They need repeated practice and feedback, not a one-time score.

## Product Positioning
AplusPrompt is a friendly AI personal trainer for business AI skills. It combines a Duolingo-style learning loop, a business coach, and a soft Japanese business-kawaii SaaS interface.

## MVP Scope
The MVP ships one complete mission: Market Research Coach. It includes a landing screen, mission selection, prompt attempt and retry loop, coach feedback, XP and belt progress, curriculum lesson cards, and a final summary with a business-ready prompt.

## User Journey
1. User lands on AplusPrompt and understands the promise in under 30 seconds.
2. User starts training and selects the Market Research Coach mission.
3. User submits a beginner prompt.
4. Coach reviews the prompt against the rubric and lesson cards.
5. User improves the prompt through guided retry.
6. User completes the mission and receives a summary, XP, belt progress, and final prompt.

## Main Screens
- Landing: product promise, mascot, training CTA.
- Mission selection: available Market Research mission and locked future missions.
- Training mission: mission brief, prompt entry, coach feedback, rubric meters, lesson principles, retry loop.
- Final summary: improved prompt, learned skills, XP, belt progress, sample market research brief.

## AI Coach Behavior
The coach is warm, simple, practical, encouraging, honest, and business-focused. It rewards improvement over perfection and explains why missing details matter in plain language.

## Source-of-Truth Curriculum Design
The backend owns lesson cards with id, title, skill category, beginner explanation, evaluation rule, weak prompt example, improved prompt example, and source reference. Feedback is grounded in the selected lesson cards.

## Evaluation Rubric
- Clarity of task
- Business context
- Target customer / market specificity
- Source and recency awareness
- Output structure
- Constraints and assumptions
- Business usefulness / actionability

## Data Model
- Session: id, xp, belt level, current mission, completion status.
- PromptAttempt: id, session id, mission id, prompt text, created at, feedback id.
- Feedback: id, score details, strengths, missing items, why it matters, lesson principles, improved prompt options, XP reward.
- LessonCard: curriculum metadata and examples.

## API Endpoints
- `GET /api/lessons`: retrieve curriculum lesson cards.
- `GET /api/progress?sessionId=...`: retrieve or initialize session progress.
- `POST /api/attempts`: submit a prompt attempt and receive coach feedback.
- `POST /api/summary`: generate final mission summary.
- `GET /api/health`: local server health check.

## Frontend Design Direction
Soft Japanese business-kawaii SaaS: warm ivory background, forest green primary color, sage secondary color, gold XP accents, mascot-driven coach states, paper-like surfaces, stamp badges, and clean dashboard layouts.

## Technical Architecture
The MVP uses a dependency-free Node HTTP server, static HTML/CSS/JS frontend, JSON persistence, and polished mock AI mode. Environment variables are provided for future model providers without hardcoded secrets.

## Demo Flow for Hackathon Judges
1. Open the app and click Start Training.
2. Select Market Research Coach.
3. Submit “Find competitors for my business.”
4. Watch the coach diagnose missing context and suggest better prompts.
5. Submit an improved version with business type, location, target customer, sources, and output format.
6. Complete the mission and show XP, belt progress, and final prompt.

## Future Roadmap
- Real model-provider integration.
- User accounts and team progress dashboards.
- More missions: data analysis, marketing campaigns, sales messaging, support, and AI workflow/operator training.
- Adaptive lesson sequencing.
- Exportable prompt playbooks and business research briefs.

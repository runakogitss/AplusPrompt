# PRD — A+Prompt

## Product name

A+Prompt

## Subtitle

The AI Gym for Business Owners

## Product summary

A+Prompt trains non-technical business owners to use AI effectively through interactive business missions. Users write prompts, receive rubric-based scores, get AI coaching, compare weak vs improved outputs, and save reusable prompts into a business playbook. Advanced missions unlock supervised mini-agents such as the Customer Save Agent.

## Goals

1. Help users move from vague AI usage to structured AI workflows.
2. Make prompt improvement measurable through scoring.
3. Teach by doing instead of passive video watching.
4. Provide business-specific missions that produce useful outputs.
5. Demonstrate a path from prompting to safe agent workflows.

## Non-goals for MVP

- No full course marketplace.
- No real payment processing in MVP; show only a mock upgrade/paywall flow.
- No enterprise admin dashboard.
- No auto-sending customer replies.
- No fully autonomous agents.
- No fine-tuning requirement for MVP.
- No broad mission library beyond three polished missions.

## Primary users

- Non-technical small-business owners.
- Busy operators who use WhatsApp, Instagram, spreadsheets, email.
- Users who know AI exists but get poor outputs because they prompt vaguely.

## Monetization model

A+Prompt uses a freemium learning ladder. The free foundation track moves users from **AI Novice → AI Able** and unlocks a completion certificate. Paid subscription unlocks advanced missions, full playbook memory, business profile memory, industry packs, and supervised agent-builder workflows.

For the hackathon MVP, implement the certificate screen and locked paid-track cards, but do not implement real billing.

## Core MVP missions

0. **AI Able Foundation Track**
   - Free novice-to-able track inspired by high-quality beginner prompting fundamentals.
   - Final unlock: A+Prompt AI Able Certificate.

1. **Customer Save Agent**
   - User learns to handle angry customer messages safely.
   - Final unlock: supervised complaint-response workflow.

2. **Competitor Analysis Gym**
   - User learns context, comparison criteria, source-awareness, and action plan prompting.

3. **Marketing Campaign Gym**
   - User learns audience, offer, channel, tone, constraints, and CTA prompting.

## User flow

### Flow A — Prompt workout

1. User lands on homepage.
2. User chooses a mission.
3. User reads short scenario.
4. User writes a prompt.
5. System scores the prompt.
6. System shows strengths and weaknesses.
7. System generates an improved prompt.
8. User can edit or accept improved prompt.
9. System compares output from weak prompt vs improved prompt.
10. User saves final prompt to playbook.

### Flow B — Customer Save Agent unlock

1. User completes customer complaint mission.
2. System explains that the improved prompt is now a repeatable workflow.
3. User enters business policy.
4. Agent runs complaint workflow.
5. Agent returns classification, severity, recommended action, draft reply, and follow-up.
6. User approves/copies response manually.

## Functional requirements

### Mission selection

- Show mission cards with title, difficulty, estimated time, skill focus, and free/paid status.
- MVP includes the free foundation track plus 3 business mission cards.
- Paid missions can be shown as locked cards for product storytelling.

### Certificate unlock

- User can unlock the **A+Prompt AI Able Certificate** after completing the free foundation track.
- Certificate requires:
  - all free missions completed,
  - at least 5 prompt attempts,
  - at least 3 improved prompts,
  - final assessment score of 75+,
  - at least 1 saved playbook prompt.
- Certificate screen should show user name, completion date, skills demonstrated, final score, share/download button, and upgrade CTA.

### Mock subscription upgrade

- Show upgrade CTA after certificate completion.
- No real payment processing for MVP.
- Upgrade page explains paid value: advanced missions, full playbook, business memory, industry packs, and supervised agents.

### Prompt editor

- User can type a prompt.
- Include scenario context above the editor.
- Include optional “Need hint?” button.

### Prompt scoring

- Score prompt from 0–100.
- Show grade label.
- Show per-category scores.
- Explain missing parts in simple language.
- Must use structured JSON output internally.

### Prompt coaching

- Coach should explain:
  - What is good.
  - What is missing.
  - Why the missing part matters.
  - How to fix it.
- Tone should be encouraging, not condescending.

### Prompt rewrite

- Generate a stronger prompt.
- Highlight improvements:
  - Added business context.
  - Added constraints.
  - Added output format.
  - Added verification.

### Before/after comparison

- Run or simulate output for original prompt and improved prompt.
- Compare:
  - Specificity
  - Safety
  - Actionability
  - Business fit

### Business playbook

- User can save final prompts.
- Each saved prompt should include:
  - Mission name
  - Final prompt
  - Score
  - Date
  - Tags

### Customer Save Agent

- Accepts complaint text and business policy.
- Produces structured output:
  - issue_type
  - emotion
  - severity
  - policy_match
  - recommended_action
  - risk_flags
  - draft_reply
  - follow_up_message
  - approval_required
- Must not send automatically.

## Non-functional requirements

- Must be demoable in under 5 minutes.
- Should work without requiring real customer data.
- Must have clear loading states.
- Must handle empty prompt gracefully.
- Must avoid hallucinated business claims.
- Must clearly label uncertainty.
- Must be containerized for hackathon submission.

## Acceptance criteria

### Mission workout

Given a user enters a vague prompt, when they submit it, then the system returns a score under 60 with clear feedback.

Given a user accepts the improved prompt, when before/after comparison is generated, then the improved output should clearly be more specific, safe, and actionable.

Given a user saves a prompt, when they open the playbook, then the prompt appears with mission name and score.

### Customer Save Agent

Given a complaint and policy, when the agent runs, then it classifies the complaint, detects emotion/severity, checks policy, recommends action, drafts a reply, and requires human approval.

Given the policy says full refund requires manager approval, when the draft suggests a full refund, then the agent must flag approval_required = true.

## MVP screens

0. Free foundation track / progress page
1. Landing page
2. Mission selection page
3. Mission workout page
4. Score and coaching page
5. Before/after comparison page
6. Playbook page
7. Customer Save Agent page
8. Certificate unlock page
9. Mock upgrade/subscription page

## Design principles

- Simple and obvious.
- Friendly business coaching.
- Minimal jargon.
- Show progress visibly.
- Make the “before vs after” improvement impossible to miss.

## Core success metric for demo

The judge understands within 60 seconds that A+Prompt is not a course; it is an interactive training gym that turns vague AI users into practical AI operators.

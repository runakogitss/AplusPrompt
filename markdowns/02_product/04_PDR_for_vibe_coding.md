# PDR for Vibe Coding — A+Prompt MVP

## Build goal

Build a demoable web app called **A+Prompt: The AI Gym for Business Owners**. It should train users to write better AI prompts through business missions, scoring, coaching, before/after comparison, and a supervised Customer Save Agent.

## Target user

Non-technical business owners who want AI to help with customer replies, marketing, competitor research, and repeated business tasks.

## Core demo outcome

The demo must show a user entering a weak customer-service prompt, receiving a low score and coaching, seeing an improved prompt, comparing better AI output, saving it to a playbook, and unlocking a supervised Customer Save Agent.

## Non-goals

Do not build a course platform. Do not build billing. Do not build full login unless trivial. Do not auto-send customer messages. Do not overbuild styling or admin tools.

## Pages

1. `/` Landing page
2. `/missions` Mission selection
3. `/missions/[id]` Prompt workout
4. `/playbook` Saved prompts
5. `/agent/customer-save` Customer Save Agent

## Data sources

Use these files:

- `seed_data/missions.json`
- `seed_data/prompt_rubric.json`
- `seed_data/customer_save_agent_policy_template.json`

## Required behavior

### Prompt workout

When user submits prompt:

1. Send prompt + mission + rubric to scoring agent.
2. Return JSON score.
3. Display total score and category scores.
4. Display coach feedback.
5. Generate improved prompt.
6. Generate weak-output and improved-output comparison.
7. Allow user to save final prompt.

### Customer Save Agent

When user submits complaint + policy:

1. Classify issue.
2. Detect emotion/severity.
3. Check policy.
4. Recommend action.
5. Draft reply.
6. Draft follow-up.
7. Mark whether approval is required.

Never say the reply was sent. Only allow copy/approve UI.

## UI tone

Friendly, clear, slightly playful gym metaphor.

Examples:

- “Your prompt form needs work.”
- “Add more business context to lift heavier tasks.”
- “Nice rep. Now add policy constraints.”

Avoid childish visuals.

## Technical constraints

- Use Fireworks AI API and/or AMD GPU inference path.
- Use open-source model where possible.
- Use structured JSON outputs.
- Keep code simple.
- Make project containerized.
- Include README with run instructions.

## Acceptance criteria

- User can complete Customer Save mission end-to-end.
- Prompt score changes meaningfully after improvement.
- Before/after comparison is visibly better.
- Saved prompt appears in playbook.
- Customer Save Agent returns structured safe response.
- App runs locally and in Docker.

## Final summary expected from coding agent

When implementation is done, summarize:

1. Files changed.
2. Main user flow implemented.
3. How to run.
4. How to test the demo.
5. Any assumptions or missing environment variables.

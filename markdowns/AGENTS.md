# AGENTS.md — A+Prompt Build Context

## Product identity

A+Prompt is the AI gym for business owners. It trains non-technical users from AI novice to AI operator through interactive business missions, prompt scoring, feedback, and supervised mini-agents.

## Do not build

- Do not build a passive video course platform.
- Do not build a generic prompt library.
- Do not build an unsafe autonomous agent that sends customer messages without approval.
- Do not overbuild login, billing, or enterprise admin for the hackathon MVP.

## Core MVP experience

The MVP must show:

1. User chooses a business mission.
2. User writes a weak prompt.
3. System scores the prompt with a clear rubric.
4. System explains missing elements in beginner-friendly language.
5. System rewrites the prompt.
6. System compares weak-output vs improved-output.
7. System saves the final prompt to a personal business playbook.
8. System demonstrates a supervised Customer Save Agent.

## Tone

- Friendly, practical, business-owner-safe.
- Use the gym metaphor lightly: reps, form correction, training, progress.
- Avoid insulting users for weak prompts.
- Avoid technical jargon unless the user asks for it.

## Important UX rule

The product should ask: **“What business problem are we training today?”** not “Which prompt engineering lesson do you want?”

## Technical rules

- Keep architecture simple.
- Reuse mission JSON and rubric JSON as the source of truth.
- Use structured outputs for scoring and coaching.
- Add human approval before any customer-facing message is considered sendable.
- Use AMD/Fireworks meaningfully for inference and/or open-source model deployment.

## Definition of done

A demo is done when a judge can understand the product in under 60 seconds and see a full before/after learning loop in under 3 minutes.

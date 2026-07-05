# Implementation Plan

## Build order

### Phase 1 — Static product shell

1. Create app skeleton.
2. Add landing page.
3. Add mission selection page.
4. Load mission cards from `seed_data/missions.json`.
5. Add basic styling.

Done when:

- User can open app and choose a mission.

### Phase 2 — Prompt workout UI

1. Add mission detail page.
2. Add prompt editor.
3. Add submit button.
4. Add placeholder score card.
5. Add improved prompt card.
6. Add before/after panel.

Done when:

- User can see full workflow using mock data.

### Phase 3 — LLM scoring

1. Create `/api/score-prompt`.
2. Add Prompt Judge system prompt.
3. Validate JSON response.
4. Display real score and feedback.

Done when:

- Weak prompt gets low score and useful feedback.

### Phase 4 — LLM rewrite

1. Create `/api/improve-prompt`.
2. Add Rewrite Coach system prompt.
3. Display improved prompt and changes.

Done when:

- Improved prompt clearly adds context, policy, constraints, and output format.

### Phase 5 — Before/after comparison

1. Create `/api/compare-outputs`.
2. Generate weak and improved outputs.
3. Display comparison table.

Done when:

- Difference is obvious to a judge.

### Phase 6 — Playbook

1. Add save button.
2. Store prompt locally or in SQLite.
3. Add playbook page.

Done when:

- Saved prompt appears in playbook.

### Phase 7 — Customer Save Agent

1. Create `/agent/customer-save` page.
2. Add form for complaint and policy.
3. Create `/api/customer-save-agent`.
4. Display structured output.
5. Add approval warning.

Done when:

- Agent returns classification, recommendation, draft reply, follow-up, and approval flag.

### Phase 8 — Containerization and README

1. Add Dockerfile.
2. Add `.env.example`.
3. Add setup instructions.
4. Test fresh run.

Done when:

- Public repo can be cloned and run.

## Suggested engineering split

### Builder 1 — Frontend/Product

- Landing page
- Mission selection
- Prompt workout UI
- Before/after comparison
- Playbook UI

### Builder 2 — AI/Backend

- API routes
- Fireworks integration
- JSON validation
- Agent prompts
- Error fallback

### Builder 3 — Content/Pitch

- Mission copy
- Rubric
- Demo script
- README
- Submission page

## Demo-first priorities

Must have:

- Customer Save mission end-to-end.
- Scoring.
- Coaching.
- Improved prompt.
- Before/after comparison.
- Customer Save Agent.

Nice to have:

- Mission progress badge.
- Playbook persistence.
- Competitor and marketing missions.
- Voice input.
- Multilingual coaching.

## Risk management

### Risk: LLM JSON fails

Mitigation:

- Use strict JSON instructions.
- Retry once.
- Add fallback mock response.

### Risk: Fireworks model unavailable

Mitigation:

- Store model ID in environment variable.
- Support model swap.
- Keep demo model-agnostic.

### Risk: Too much scope

Mitigation:

- Build Customer Save vertical slice first.
- Keep other missions simple.

### Risk: Judges see it as “just prompting”

Mitigation:

- Emphasize gym loop, scoring, before/after comparison, saved playbook, and agent unlock.

## Final demo checklist

- [ ] Landing page says “AI Gym for Business Owners.”
- [ ] Mission cards visible.
- [ ] Customer Save mission works.
- [ ] Bad prompt scores low.
- [ ] Coach feedback is specific.
- [ ] Improved prompt is clearly stronger.
- [ ] Before/after output comparison is obvious.
- [ ] Customer Save Agent returns structured output.
- [ ] Approval warning is visible.
- [ ] README includes setup.
- [ ] Dockerfile works.
- [ ] AMD/Fireworks usage is explained.


## Certificate / freemium implementation tasks

### Data

- Add `certificate_requirements.json` to define free-track completion rules.
- Store user progress locally or in the app database.
- Track prompt attempts, improved prompts, final assessment score, and saved playbook count.

### UI

- Add progress bar for Novice → Able.
- Add certificate unlock screen.
- Add mock certificate card.
- Add locked paid mission cards.
- Add mock upgrade page.

### Logic

- If all certificate requirements are met, unlock certificate.
- If user clicks locked mission before certificate, explain the free track first.
- If user clicks locked mission after certificate, show upgrade screen.

### No real billing for MVP

Use mocked plan cards only. Do not integrate Stripe or any payment provider during the hackathon unless the core demo is already complete.

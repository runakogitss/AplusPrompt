# MVP Scope

## MVP principle

Build one polished vertical slice, not a huge platform.

The MVP should prove the full loop:

```text
bad prompt → score → coaching → improved prompt → better output → saved prompt → supervised agent
```

## In scope

### 1. Landing page

Must communicate:

- A+Prompt is an AI gym for business owners.
- Learn by doing, not watching.
- Start first prompt workout.

### 2. Mission selection

Three cards only:

1. Customer Save Agent
2. Competitor Analysis Gym
3. Marketing Campaign Gym

### 3. Prompt workout interface

Includes:

- Scenario
- Prompt editor
- Submit button
- Hint button
- Scoring result
- Coach feedback
- Improved prompt
- Before/after comparison

### 4. Prompt scoring engine

Use JSON rubric.

Categories:

- Goal clarity
- Business context
- Input/source clarity
- Output format
- Constraints
- Verification
- Actionability

### 5. Business playbook

Simple saved list of final prompts.

No real accounts required for hackathon if time is short. Local storage or lightweight DB is acceptable.

### 6. Customer Save Agent

Structured complaint workflow.

Inputs:

- Complaint text
- Business type
- Business policy
- Tone preference

Outputs:

- Issue type
- Emotion
- Severity
- Policy match
- Recommended action
- Risk flags
- Draft reply
- Follow-up message
- Approval required

## Out of scope

- User authentication unless already easy.
- Billing.
- Analytics dashboard.
- Large mission marketplace.
- Real email/WhatsApp integration.
- Auto-send.
- Complex fine-tuning pipeline.
- Multi-language voice lessons.
- Admin CMS.

## Demo data

Use seeded business profile:

```text
Business type: Bakery
Location: Bandung
Tone: warm, apologetic, professional
Policy:
- Late delivery over 1 hour: eligible for 20% refund or free delivery voucher.
- Full refund requires manager approval.
- Never blame delivery driver.
- Keep customer replies under 120 words.
```

Use seeded complaint:

```text
I ordered a cake for my daughter’s birthday and it arrived 2 hours late. The party was already over. I’m very disappointed.
```

## MVP tech acceptance

The project is acceptable if:

- It runs locally with one command after setup.
- It is containerized.
- It calls an LLM through Fireworks and/or AMD GPU deployment.
- It uses structured outputs for scoring and agent replies.
- It demonstrates the full prompt training loop.
- It has a public README with setup and usage instructions.

## Stretch features

Only build after MVP works:

1. User profile memory.
2. Upload business policy document.
3. Mission progress badges.
4. Voice input for older/non-technical users.
5. Multilingual coaching.
6. Fine-tuned prompt judge.
7. Real WhatsApp/Gmail draft integration.


## Certificate and monetization MVP add-on

The MVP should include a simple freemium product story:

### Free

- Foundation track: Novice → Able
- Basic prompt scoring and coaching
- AI Able Certificate unlock
- Limited playbook saves

### Paid teaser

- Locked advanced mission cards
- Customer Save Agent shown as the first paid-track agent builder mission
- Mock upgrade page explaining Pro subscription

### Do not build in hackathon

- Real payment processing
- Real credential verification
- Enterprise billing
- Complex certificate PDF generation unless time permits

A static certificate screen is enough for the demo.

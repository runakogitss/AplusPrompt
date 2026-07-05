# Technical Architecture

## Architecture goal

Build a small but complete AI product demo with meaningful AMD/Fireworks use. The system should show multi-agent prompt coaching, structured scoring, before/after generation, saved playbook, and a supervised Customer Save Agent.

## Recommended stack

### Frontend

- Next.js or React
- Tailwind CSS
- Simple client-side state for MVP

### Backend

- FastAPI or Next.js API routes
- Pydantic/Zod schemas for structured output validation

### AI inference

- Fireworks AI API using AMD-backed infrastructure when available.
- Open-source model such as Gemma 4, Qwen, Llama, or Gemma 3 depending on Fireworks support.
- Optional AMD GPU local deployment using ROCm/vLLM if the team wants deeper AMD platform use.

### Storage

MVP options:

- LocalStorage for fastest demo.
- SQLite for simple persistent playbook.
- Supabase/Postgres only if team is already comfortable.

## System components

```text
Frontend UI
  ├── Landing Page
  ├── Mission Selection
  ├── Prompt Workout
  ├── Before/After Comparison
  ├── Playbook
  └── Customer Save Agent

Backend API
  ├── /api/score-prompt
  ├── /api/improve-prompt
  ├── /api/compare-outputs
  ├── /api/customer-save-agent
  └── /api/playbook

AI Orchestration Layer
  ├── Prompt Judge
  ├── Prompt Coach
  ├── Rewrite Coach
  ├── Output Simulator
  └── Customer Save Agent

Source of Truth
  ├── missions.json
  ├── prompt_rubric.json
  └── policy templates
```

## Agent roles

### 1. Prompt Judge

Input:

- User prompt
- Mission details
- Rubric

Output:

- Total score
- Category scores
- Grade
- Strengths
- Weaknesses
- Next reps

### 2. Prompt Coach

Input:

- User prompt
- Judge output
- Mission details

Output:

- Beginner-friendly explanation
- Why the prompt failed
- What to add

### 3. Rewrite Coach

Input:

- User prompt
- Mission details
- Judge feedback

Output:

- Improved prompt
- Explanation of improvements

### 4. Output Simulator

Input:

- Original prompt
- Improved prompt
- Mission scenario

Output:

- Weak output
- Improved output
- Comparison summary

### 5. Customer Save Agent

Input:

- Complaint
- Business policy
- Business context

Output:

- Structured complaint analysis
- Recommended action
- Draft reply
- Follow-up
- Approval requirement

## API design

### `/api/score-prompt`

Request:

```json
{
  "mission_id": "customer_save",
  "user_prompt": "Reply to this angry customer.",
  "scenario": {},
  "rubric": {}
}
```

Response:

```json
{
  "total_score": 38,
  "grade": "Needs Training",
  "category_scores": {},
  "strengths": [],
  "weaknesses": [],
  "coach_explanation": "...",
  "next_reps": []
}
```

### `/api/improve-prompt`

Request:

```json
{
  "mission_id": "customer_save",
  "user_prompt": "...",
  "score_result": {},
  "scenario": {}
}
```

Response:

```json
{
  "improved_prompt": "...",
  "changes_made": ["Added policy", "Added tone", "Added approval rule"]
}
```

### `/api/compare-outputs`

Request:

```json
{
  "mission_id": "customer_save",
  "original_prompt": "...",
  "improved_prompt": "...",
  "scenario": {}
}
```

Response:

```json
{
  "weak_output": "...",
  "improved_output": "...",
  "comparison": {
    "specificity": "Improved output uses birthday context.",
    "safety": "Improved output follows refund policy.",
    "actionability": "Improved output gives clear offer and next step."
  }
}
```

### `/api/customer-save-agent`

Request:

```json
{
  "business_type": "Bakery",
  "complaint": "...",
  "policy": "...",
  "tone": "warm, apologetic, professional"
}
```

Response:

```json
{
  "issue_type": "late_delivery",
  "emotion": "disappointed/angry",
  "severity": "high",
  "summary": "...",
  "policy_match": {},
  "recommended_action": "...",
  "risk_flags": [],
  "draft_reply": "...",
  "follow_up_message": "...",
  "approval_required": true
}
```

## LLM orchestration approach

Use separate prompts for separate tasks. Do not ask one model call to do everything unless time is tight.

Recommended MVP flow:

1. Call LLM for scoring.
2. Call LLM for improved prompt.
3. Call LLM for before/after outputs.
4. Call LLM for Customer Save Agent.

If cost/time is an issue, combine scoring + coaching + rewrite into one structured call.

## Structured output validation

Validate every AI JSON response.

If invalid:

- Retry once with “return valid JSON only.”
- If still invalid, show fallback error.

## Frontend components

- `MissionCard`
- `PromptEditor`
- `ScoreGauge`
- `RubricBreakdown`
- `CoachFeedback`
- `ImprovedPromptCard`
- `BeforeAfterComparison`
- `PlaybookList`
- `CustomerSaveAgentForm`
- `AgentOutputPanel`

## Security/safety

- Do not expose API keys in frontend.
- Do not log sensitive user data in production.
- Do not auto-send customer replies.
- Label AI outputs as drafts.
- Require human review.

## Demo reliability tips

- Seed example data.
- Add fallback sample output if API fails.
- Cache mission content locally.
- Keep model calls short.
- Use deterministic temperature for scoring.

## Suggested temperatures

| Agent | Temperature |
|---|---:|
| Prompt Judge | 0.1 |
| Prompt Coach | 0.3 |
| Rewrite Coach | 0.4 |
| Output Simulator | 0.5 |
| Customer Save Agent | 0.2 |

## Why this architecture fits Unicorn Track

- Creativity: AI gym + prompt reps + agent unlock.
- Product potential: clear SME upskilling market.
- Completeness: full end-to-end demo.
- AMD platform use: Fireworks/AMD inference and optional AMD GPU deployment.
- Startup thinking: business playbooks and agent templates become paid product layers.

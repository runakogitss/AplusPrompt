# Data Model and API Contracts

## Entities

### Mission

```ts
type Mission = {
  id: string;
  title: string;
  subtitle: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  skill_focus: string[];
  scenario: string;
  bad_prompt_example: string;
  improved_prompt_example: string;
  success_criteria: string[];
};
```

### PromptAttempt

```ts
type PromptAttempt = {
  id: string;
  mission_id: string;
  user_prompt: string;
  created_at: string;
  score_result?: PromptScore;
  improved_prompt?: string;
};
```

### PromptScore

```ts
type PromptScore = {
  total_score: number;
  grade: string;
  user_title: string;
  category_scores: {
    goal_clarity: number;
    business_context: number;
    input_source_clarity: number;
    output_format: number;
    constraints: number;
    verification: number;
    actionability: number;
  };
  strengths: string[];
  weaknesses: string[];
  coach_explanation: string;
  next_reps: string[];
};
```

### PlaybookEntry

```ts
type PlaybookEntry = {
  id: string;
  mission_id: string;
  title: string;
  final_prompt: string;
  score: number;
  tags: string[];
  when_to_use: string;
  inputs_to_replace: string[];
  safety_notes: string[];
  created_at: string;
};
```

### CustomerSaveAgentInput

```ts
type CustomerSaveAgentInput = {
  business_type: string;
  complaint: string;
  policy: string;
  tone: string;
};
```

### CustomerSaveAgentOutput

```ts
type CustomerSaveAgentOutput = {
  issue_type: string;
  emotion: string;
  severity: "low" | "medium" | "high" | "critical";
  summary: string;
  policy_match: {
    allowed_actions: string[];
    requires_approval: string[];
    forbidden: string[];
  };
  recommended_action: string;
  risk_flags: string[];
  draft_reply: string;
  follow_up_message: string;
  approval_required: boolean;
};
```

## API contracts

### POST `/api/score-prompt`

Request:

```json
{
  "mission_id": "customer_save",
  "user_prompt": "Reply to this angry customer."
}
```

Response: `PromptScore`

### POST `/api/improve-prompt`

Request:

```json
{
  "mission_id": "customer_save",
  "user_prompt": "Reply to this angry customer.",
  "score_result": {}
}
```

Response:

```json
{
  "improved_prompt": "...",
  "changes_made": [],
  "why_it_is_better": "..."
}
```

### POST `/api/compare-outputs`

Request:

```json
{
  "mission_id": "customer_save",
  "original_prompt": "...",
  "improved_prompt": "..."
}
```

Response:

```json
{
  "weak_output": "...",
  "improved_output": "...",
  "comparison": {
    "specificity": "...",
    "safety": "...",
    "usefulness": "...",
    "business_fit": "..."
  },
  "main_learning": "..."
}
```

### POST `/api/playbook`

Request:

```json
{
  "mission_id": "customer_save",
  "title": "Late delivery complaint reply",
  "final_prompt": "...",
  "score": 87,
  "tags": ["customer-service", "complaint", "bakery"]
}
```

Response:

```json
{
  "ok": true,
  "entry_id": "pb_123"
}
```

### GET `/api/playbook`

Response:

```json
{
  "entries": []
}
```

### POST `/api/customer-save-agent`

Request: `CustomerSaveAgentInput`

Response: `CustomerSaveAgentOutput`

## Error handling

If LLM response is invalid JSON:

1. Retry once.
2. If still invalid, return safe fallback:

```json
{
  "error": "The AI response could not be parsed. Please try again.",
  "fallback_message": "Your prompt needs more business context, constraints, and output format."
}
```

If API key missing:

```json
{
  "error": "Missing FIREWORKS_API_KEY environment variable."
}
```

## Data storage MVP

### Option 1 — LocalStorage

Fastest. Good enough for demo.

### Option 2 — SQLite

Better for backend demo.

Tables:

```sql
CREATE TABLE playbook_entries (
  id TEXT PRIMARY KEY,
  mission_id TEXT NOT NULL,
  title TEXT NOT NULL,
  final_prompt TEXT NOT NULL,
  score INTEGER,
  tags TEXT,
  when_to_use TEXT,
  inputs_to_replace TEXT,
  safety_notes TEXT,
  created_at TEXT NOT NULL
);
```

## Validation rules

- Prompt cannot be empty.
- Complaint cannot be empty.
- Policy cannot be empty for Customer Save Agent.
- Score must be 0–100.
- approval_required must always be true for high/critical severity.


## Certificate data model

### CertificateProgress

```json
{
  "user_id": "demo-user",
  "track_id": "ai_able_foundation",
  "missions_completed": ["ai_not_google", "prompt_as_program"],
  "prompt_attempts_count": 5,
  "improved_prompts_count": 3,
  "saved_playbook_count": 1,
  "final_assessment_score": 82,
  "certificate_unlocked": true,
  "certificate_title": "A+Prompt AI Able Certificate",
  "completed_at": "2026-07-04"
}
```

### SubscriptionPlan

```json
{
  "plan_id": "pro",
  "name": "AI Operator",
  "price_display": "$9–$19/month",
  "features": [
    "Unlimited missions",
    "Full prompt playbook",
    "Business memory",
    "Industry context packs",
    "Customer Save Agent"
  ]
}
```

## Certificate endpoint mock

`GET /api/certificate/progress`

Returns certificate progress and unlock status.

`POST /api/certificate/claim`

Returns certificate metadata if requirements are met. For MVP, this can be local mock logic.

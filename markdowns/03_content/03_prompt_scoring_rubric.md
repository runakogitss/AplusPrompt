# Prompt Scoring Rubric

## Purpose

The scoring rubric is the “personal trainer” brain of A+Prompt. It turns vague prompt advice into measurable feedback.

## Total score

100 points

## Rubric categories

| Category | Weight | What it measures |
|---|---:|---|
| Goal clarity | 15 | Does the AI know what to do? |
| Business context | 20 | Does the AI understand the user’s situation? |
| Input/source clarity | 15 | Does the AI know what data/source to use? |
| Output format | 10 | Is the expected structure clear? |
| Constraints | 15 | Are rules, limits, audience, tone, budget, deadline included? |
| Verification | 10 | Does the prompt reduce hallucination and flag uncertainty? |
| Actionability | 15 | Will the output help make a business decision or action? |

## Grade labels

| Score | Grade | User title |
|---:|---|---|
| 90–100 | A+ | Power User |
| 80–89 | A | AI Operator |
| 70–79 | B | Context Builder |
| 60–69 | C | Prompt Trainee |
| 0–59 | Needs Training | AI Novice |

## Category scoring guidance

### Goal clarity — 15 pts

High score:

- Clear action verb.
- Specific task.
- Clear success target.

Low score:

- Vague request.
- Multiple unclear tasks.
- No decision/action outcome.

Example feedback:

> Your task is visible, but it is too broad. Tell the AI what decision or output you need.

### Business context — 20 pts

High score:

- Business type.
- Target customer.
- location/market when relevant.
- Current problem.
- Brand/tone.

Low score:

- No business details.
- AI must guess audience and situation.

Example feedback:

> Add your business type, target customer, and current problem. Without that, AI gives generic advice.

### Input/source clarity — 15 pts

High score:

- Specifies customer message, policy, spreadsheet, competitor names, or source.
- Tells AI whether to use provided info or external research.

Low score:

- Asks AI to analyze without data.
- No source boundaries.

Example feedback:

> The AI does not know what information to use. Paste the data or say what source it should rely on.

### Output format — 10 pts

High score:

- Requests table, bullet list, email draft, JSON, step-by-step plan, etc.

Low score:

- No format.
- Output likely to be long and messy.

Example feedback:

> Tell the AI the format you want. For business tasks, tables and action lists usually work better.

### Constraints — 15 pts

High score:

- Includes budget, deadline, tone, policy, length, region, audience, allowed/not allowed actions.

Low score:

- No guardrails.
- AI may overpromise or produce unrealistic ideas.

Example feedback:

> Add constraints like budget, tone, word limit, policy, and what the AI must avoid.

### Verification — 10 pts

High score:

- Asks AI to separate facts from assumptions.
- Asks AI to flag uncertainty.
- Asks AI to identify risky claims.

Low score:

- Trusts AI blindly.
- No uncertainty handling.

Example feedback:

> Add a verification instruction. Ask AI to mark uncertainty and tell you what to check manually.

### Actionability — 15 pts

High score:

- Requests next steps, recommendations, prioritization, or decision support.

Low score:

- Output may be interesting but not useful.

Example feedback:

> Ask for practical actions you can take, ranked by impact, cost, or urgency.

## Standard coach response structure

```json
{
  "total_score": 38,
  "grade": "Needs Training",
  "title": "AI Novice",
  "category_scores": {
    "goal_clarity": 8,
    "business_context": 2,
    "input_source_clarity": 3,
    "output_format": 0,
    "constraints": 1,
    "verification": 0,
    "actionability": 5
  },
  "strengths": ["You identified the general task."],
  "weaknesses": ["Missing policy", "Missing business context", "No output format"],
  "coach_explanation": "Your prompt has the right target, but weak form. The AI does not know what your business is allowed to offer, so it may overpromise.",
  "next_reps": ["Add business type", "Add policy", "Add tone and length", "Ask AI to flag risky promises"]
}
```

## Anti-sycophancy instruction

The judge must not praise weak prompts excessively. It should be encouraging but honest.

Use:

> Good start, but this needs more context.

Avoid:

> Excellent prompt! Just a few tiny improvements.

## Coach metaphor examples

- “Your prompt form is weak because it has no policy constraints.”
- “Nice rep. Now add context so AI can lift the heavier task.”
- “You are asking AI to guess. Give it the data.”
- “This is safer now because the refund rule is included.”

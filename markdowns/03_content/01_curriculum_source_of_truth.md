# Curriculum Source of Truth

## Curriculum principle

A+Prompt should teach AI power usage through practice, not lectures. The curriculum should be short, applied, and mission-based.

The content must follow this ladder:

```text
AI is not Google → Prompt as Program → Context Engineering → Verification → Business Workflows → Tool Use → First Agent
```

## Source mapping

### OpenAI Academy — Prompting fundamentals

Useful teaching principle:

- Outline the task.
- Give helpful context.
- Describe ideal output.
- Iterate because there is no single perfect prompt.

How A+Prompt uses it:

- Rubric categories: goal clarity, context, output format.
- White/Yellow Belt lessons.

### Microsoft Copilot prompt framework

Useful teaching principle:

- Goal
- Context
- Source
- Expectations

How A+Prompt uses it:

- Beginner prompt anatomy.
- Scoring rubric.
- Mission hints.

### DeepLearning.AI / Andrew Ng prompting course

Useful teaching principle:

- Hands-on practice.
- Iterative prompt development.
- LLM use cases: summarizing, inferring, transforming, expanding, chatbot.

How A+Prompt uses it:

- Users type prompts, see failures, improve prompts.
- Mission outputs include classification, rewriting, summarization, expansion.

### Anthropic context engineering

Useful teaching principle:

- Context is finite and must be curated.
- Agent quality depends on what context is supplied.

How A+Prompt uses it:

- Orange Belt: business context cards.
- Teach users to provide policy, brand voice, customer segment, constraints.

### Karpathy / Software 3.0

Useful teaching principle:

- Natural language becomes a programming interface.
- Prompts are programs/specs.
- AI needs generation-verification loops.
- Partial autonomy is safer than full autonomy.

How A+Prompt uses it:

- Prompt as Program level.
- Before/after output comparison.
- Customer Save Agent requires human approval.

### Prompting Guide / ReAct

Useful teaching principle:

- Agents combine reasoning and acting.
- Tool-using systems need dynamic planning and environmental feedback.

How A+Prompt uses it:

- Black Belt: first supervised agent.
- Purple Belt: tool use and research.

## Core concepts to teach

### 1. AI is not Google

Bad habit:

> “Give me marketing ideas.”

Better habit:

> “Act as a marketing strategist for a small coffee shop targeting students. Suggest 10 Instagram promotion ideas for a 1-week campaign under $100 budget. Rank by cost, difficulty, and likely impact.”

### 2. Prompt anatomy

Every useful prompt should usually include:

1. Role
2. Task
3. Context
4. Input/source
5. Constraints
6. Output format
7. Success criteria

### 3. Context engineering

Teach users to package context:

```text
Business type:
Location:
Target customer:
Brand voice:
Main product/service:
Price level:
Current problem:
Policy/rules:
Data/source:
```

### 4. Verification

Teach users to add:

```text
If uncertain, say uncertain.
Separate facts from assumptions.
Do not invent information.
Flag risky promises.
Tell me what to verify manually.
```

### 5. Workflow prompting

Teach users to turn prompts into steps:

```text
1. Classify the problem.
2. Extract relevant context.
3. Generate options.
4. Evaluate options.
5. Recommend action.
6. Draft output.
7. Create follow-up.
```

### 6. Tool use

Teach when AI needs extra data:

| Need | Tool/context |
|---|---|
| Current facts | Web search |
| Customer history | CRM/export/upload |
| Sales patterns | Spreadsheet |
| Visual evidence | Image input |
| Repeated process | Agent/workflow |

### 7. Safe agents

Beginner-safe agent rule:

> The agent recommends and drafts. The human approves.

No automatic sending in MVP.

## Content tone

- Explain like a practical business coach.
- Use simple language.
- Avoid “prompt engineering jargon” unless introducing a named concept.
- Use examples from small business.
- Make every lesson immediately actionable.

## Lesson format

Each mission should have:

1. Scenario
2. Micro-lesson
3. User prompt attempt
4. Score
5. Feedback
6. Improved prompt
7. Before/after comparison
8. Saved playbook entry
9. Optional challenge

## Example micro-lesson

### Lesson: Add policy before asking AI to reply

Weak prompt:

> Reply to angry customer.

Why it fails:

AI does not know what your business is allowed to offer. It may promise a refund, discount, or replacement that violates your policy.

Better structure:

```text
Business context + customer issue + policy + tone + constraints + output format
```

Better prompt:

> I run a bakery. A customer’s birthday cake arrived 2 hours late. Our policy allows a 20% refund or free delivery voucher, but full refund requires manager approval. Write a warm apology under 120 words. Do not blame the driver. Recommend the safest offer and flag anything that needs manager approval.


## Free foundation track content rule

The free Novice → Able path should teach beginner fundamentals through business missions, inspired by high-quality prompting education such as Andrew Ng / DeepLearning.AI-style Prompting 101.

Do:

- Teach clarity, context, constraints, output format, iteration, and verification.
- Translate each concept into a business-owner task.
- Require users to type and improve prompts.
- Award the AI Able Certificate only after demonstrated practice.

Do not:

- Copy course content word-for-word.
- Claim official affiliation with Andrew Ng, DeepLearning.AI, OpenAI, Anthropic, Microsoft, or AMD.
- Make the certificate sound like an accredited degree.

The certificate is a practical completion badge, not a formal professional license.

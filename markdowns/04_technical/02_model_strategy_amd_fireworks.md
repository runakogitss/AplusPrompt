# Model Strategy — AMD, Fireworks, and Gemma

## Short answer

Use **Gemma 4 for the main demo if it is available in your runtime**, but do **not fine-tune first**. For the hackathon MVP, use:

1. Strong system prompts.
2. Structured rubrics.
3. Mission JSON.
4. Business context cards.
5. Supervised agent workflow.
6. Fireworks/AMD inference.

Fine-tune later after collecting real prompt attempts and coach corrections.

## Why not fine-tune immediately?

Fine-tuning sounds impressive, but for this MVP it may slow the team down.

The product’s core value is not a custom model. The core value is the **training loop**:

```text
prompt attempt → scoring → coaching → rewrite → output comparison → saved playbook → supervised agent
```

You can prove this loop with prompt orchestration and structured outputs. Fine-tuning is a later moat when you have data.

## Recommended model plan

### Option A — Fastest and safest for hackathon

Use Fireworks API with an available strong open model.

- Main model: Gemma 4 if available, otherwise Qwen/Llama/Gemma 3 depending on Fireworks catalog.
- Use JSON schema/structured outputs.
- Use separate agent prompts.
- No fine-tuning.

Best for:

- Fast demo.
- Low engineering risk.
- Clean product story.

### Option B — Stronger AMD story

Use Fireworks API plus an optional AMD GPU deployment path.

- Fireworks for production inference.
- AMD GPU/ROCm/vLLM container for local or cloud inference demo.
- Show architecture diagram that can run open-source models on AMD GPUs.

Best for:

- Stronger “Use of AMD Platforms.”
- More technical credibility.

### Option C — Fine-tuned prompt judge later

After MVP, collect examples:

- weak prompt
- mission scenario
- rubric score
- coach feedback
- improved prompt

Then fine-tune a smaller model to act as Prompt Judge / Coach.

Best for:

- Long-term product moat.
- Lower inference cost.
- Consistent scoring.

## Gemma 4 recommendation

Gemma 4 is a good fit conceptually because it is positioned for advanced reasoning, agentic workflows, multimodal reasoning, and multilingual support. The Google AI documentation lists Gemma 4 sizes including E2B, E4B, 12B, 31B, and 26B A4B, with memory/precision tradeoffs.

Recommended usage:

| Use case | Suggested model size |
|---|---|
| Prompt scoring | Gemma 4 E4B / 12B or available equivalent |
| Prompt rewriting | Gemma 4 12B+ if available |
| Customer Save Agent | Gemma 4 12B+ preferred |
| Local low-cost demo | Gemma 4 E2B/E4B quantized |
| Multimodal future | Gemma 4 vision/audio capabilities if supported |

## Important Fireworks note

Fireworks SFT V2 documentation currently lists support for Qwen 2/2.5/3, Phi 4, Gemma 3, Llama 3 family, and DeepSeek V2/V3/R1. It does not list Gemma 4 in that SFT V2 snippet. So:

- If using **Gemma 4**, treat it as inference-first unless Fireworks has added support in your account/catalog.
- If you want to fine-tune during the hackathon, choose a listed model such as **Gemma 3**, **Qwen 3**, **Llama 3**, or **DeepSeek** depending on availability and license.

## My final recommendation

### For hackathon MVP

Use:

- **Gemma 4 12B or 26B A4B** for main inference if available.
- **Fireworks AI API** for hosted inference on AMD-backed infrastructure.
- **No fine-tuning**.
- **Structured prompt/rubric orchestration**.

### If you really want a fine-tuning bullet

Say:

> “The MVP uses prompt orchestration. The product is designed to collect high-quality supervised examples for a future fine-tuned Prompt Judge model.”

This sounds mature and avoids fake technical overreach.

## Model call routing

| Agent | Model requirement | Notes |
|---|---|---|
| Prompt Judge | Consistency | Low temperature, JSON output |
| Prompt Coach | Clarity | Beginner-friendly explanation |
| Rewrite Coach | Creativity + structure | Show improved prompt |
| Output Simulator | Business writing | Produce before/after outputs |
| Customer Save Agent | Reliability | Low temp, policy-first, approval required |

## Example Fireworks environment variables

```bash
FIREWORKS_API_KEY=your_key_here
FIREWORKS_MODEL=accounts/fireworks/models/your-model-id
```

## AMD platform story

Use this in pitch:

> A+Prompt uses AMD-backed Fireworks inference to run a multi-agent training loop: a Prompt Judge, Coach, Rewrite Agent, Output Simulator, and supervised Customer Save Agent. The architecture is model-portable and can run open-source models on AMD GPUs through ROCm-compatible deployment.

## What judges should believe

- The product is not benchmark chasing.
- The model layer is practical and startup-oriented.
- AMD/Fireworks is used for actual inference, not name-dropping.
- The long-term moat is collected training data from real prompt practice.

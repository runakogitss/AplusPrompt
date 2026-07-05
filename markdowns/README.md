# A+Prompt Hackathon Package

**Project:** A+Prompt — The AI Gym for Business Owners  
**Track:** AMD Developer Hackathon ACT II — Unicorn Track  
**Core idea:** Train non-technical business owners from AI novice to AI operator through interactive business missions, prompt scoring, context coaching, and a final supervised “Customer Save Agent.”

## Why this package exists

This zip is a working handover pack for vibe coding and hackathon execution. It separates the business story, product requirements, curriculum/content, technical architecture, and submission materials.

## Folder structure

```text
aprompt_hackathon_package/
├── README.md
├── AGENTS.md
├── SOURCES.md
├── 01_business/
│   ├── 01_product_strategy.md
│   ├── 02_problem_user_solution.md
│   ├── 03_pitch_and_demo_script.md
│   └── 04_business_model_and_certification.md
├── 02_product/
│   ├── 01_PRD.md
│   ├── 02_user_journey_and_tracks.md
│   ├── 03_mvp_scope.md
│   └── 04_PDR_for_vibe_coding.md
├── 03_content/
│   ├── 01_curriculum_source_of_truth.md
│   ├── 02_mission_library.md
│   ├── 03_prompt_scoring_rubric.md
│   └── 04_customer_save_agent_content.md
├── 04_technical/
│   ├── 01_architecture.md
│   ├── 02_model_strategy_amd_fireworks.md
│   ├── 03_agent_prompts.md
│   ├── 04_data_model_api_contracts.md
│   └── 05_implementation_plan.md
├── 05_submission/
│   ├── 01_hackathon_alignment.md
│   ├── 02_github_readme_draft.md
│   └── 03_roadmap.md
└── seed_data/
    ├── missions.json
    ├── prompt_rubric.json
    └── customer_save_agent_policy_template.json
```

## MVP thesis

Most people do not need a passive prompting course. They need a safe place to practice using AI on real work. A+Prompt turns AI usage into a gym: users do prompt reps, get form correction, compare before/after outputs, and gradually unlock harder workflows.

## Build the demo around one magical moment

```text
Bad prompt → low score → coach explains why → improved prompt → better output → saved business playbook → unlock first supervised agent
```

## Recommended MVP missions

1. **AI Able Foundation Track** — free novice-to-able track with certificate.
2. **Customer Save Agent** — paid-track teaser that rescues angry customers safely.
3. **Competitor Analysis Gym** — turn vague market research into structured decision support.
4. **Marketing Campaign Gym** — create targeted, constrained, actionable campaigns.
## Business model

A+Prompt uses a freemium ladder:

- **Free:** Novice → Able foundation track, ending with the **A+Prompt AI Able Certificate**.
- **Paid subscription:** Advanced missions, full playbook, business memory, industry packs, and supervised agent-builder tracks.

For the hackathon MVP, implement a certificate unlock screen and mock upgrade page instead of real payment processing.


## Model recommendation

Use **Gemma 4 for main inference if available on your selected stack**, but do **not** start by fine-tuning. Build the hackathon demo using prompt orchestration, structured rubrics, mission data, and saved user context. Fine-tuning is a post-MVP improvement once you have real user attempts and coach feedback data.

See `04_technical/02_model_strategy_amd_fireworks.md` for details.

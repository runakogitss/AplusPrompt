# A+Prompt — The AI Gym for Business Owners

A+Prompt is an interactive AI training gym that helps non-technical business owners become AI operators. Users complete real business missions, write prompts, get scored, receive coaching, compare weak vs improved AI outputs, and save reusable prompts into a business playbook.

The final mission unlocks a supervised **Customer Save Agent** that helps draft policy-safe replies to unhappy customers.

## Problem

Most AI education is passive. Business owners watch videos or copy prompt templates, but still struggle to apply AI to real work. They often use AI like a search engine: vague prompts, no context, no constraints, no verification.

A+Prompt turns AI learning into practice.

## Core loop

```text
Bad prompt → score → coaching → improved prompt → better output → saved playbook → supervised agent
```

## Features

- Business mission library
- Prompt scoring rubric
- AI coach feedback
- Improved prompt generator
- Before/after output comparison
- Saved prompt playbook
- Supervised Customer Save Agent
- AMD/Fireworks LLM inference

## MVP missions

1. Customer Save Agent
2. Competitor Analysis Gym
3. Marketing Campaign Gym

## Tech stack

- Frontend: [Next.js/React]
- Backend: [FastAPI or Next.js API routes]
- AI: Fireworks AI API / open-source models
- Compute: AMD-backed Fireworks inference and optional AMD GPU deployment
- Storage: LocalStorage or SQLite for MVP

## Environment variables

Create `.env`:

```bash
FIREWORKS_API_KEY=your_api_key_here
FIREWORKS_MODEL=your_model_id_here
```

## Run locally

```bash
npm install
npm run dev
```

Or if using Python backend:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Docker

```bash
docker build -t aprompt .
docker run -p 3000:3000 --env-file .env aprompt
```

## Demo script

1. Open app.
2. Click Customer Save Agent mission.
3. Enter weak prompt: “Reply to this angry customer.”
4. Submit.
5. Show low score and coaching.
6. Show improved prompt.
7. Show before/after comparison.
8. Save prompt to playbook.
9. Open Customer Save Agent.
10. Run complaint + policy.
11. Show structured, policy-safe draft and approval warning.

## Safety

The Customer Save Agent drafts and recommends only. It does not send messages automatically. Human approval is required.

## Hackathon alignment

A+Prompt is built for the AMD Developer Hackathon ACT II Unicorn Track. It emphasizes creativity, product potential, completeness, and meaningful use of AMD/Fireworks infrastructure.


## Freemium model

A+Prompt starts with a free **Novice → Able** foundation track. Users who complete the beginner missions unlock the **A+Prompt AI Able Certificate**.

After the certificate, users can upgrade to a paid subscription for advanced business missions, full playbook memory, industry packs, and supervised agent-builder tracks such as the Customer Save Agent.

For hackathon scope, payment is mocked with locked mission cards and an upgrade screen.

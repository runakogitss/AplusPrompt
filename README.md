# A+Prompt - The AI Gym for Business Owners (Developer's Notes)

A+Prompt is a practice-first website for non-technical business owners. Users choose a business mission, write a weak prompt, receive rubric-based coaching, compare weak vs improved outputs, save the final prompt to a playbook, and try a supervised Customer Save Agent.

## Demo path

1. Open `/missions`.
2. Choose `Customer Save Agent`.
3. Submit: `Reply to this angry customer.`
4. Show the low score, coaching, improved prompt, and before/after comparison.
5. Save the final prompt to `/playbook`.
6. Open `/agent/customer-save`.
7. Run the seeded complaint and show the policy-safe draft with approval required.
8. Open `/certificate` and `/upgrade` to show the freemium product story.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app works without credentials by returning deterministic demo fallbacks.

## Environment

Copy `.env.example` to `.env.local`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GOOGLE_CLOUD_PROJECT=
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_GEMMA_MODEL=
GOOGLE_APPLICATION_CREDENTIALS=
GOOGLE_APPLICATION_CREDENTIALS_JSON=
GOOGLE_GEMMA_ENDPOINT=
```

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql`.
4. Add the Supabase URL and keys to `.env.local`.

If Supabase is not configured, the demo uses local browser storage for playbook saves.

## Google-hosted Gemma notes

The server-side adapter is in `src/lib/gemma.ts`. It uses Google auth and a Vertex-style prediction endpoint when these values are configured:

- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`
- `GOOGLE_GEMMA_MODEL`
- `GOOGLE_APPLICATION_CREDENTIALS` or `GOOGLE_APPLICATION_CREDENTIALS_JSON`

Because Google-hosted Gemma deployment names and endpoints can vary by account and region, `GOOGLE_GEMMA_ENDPOINT` is included as an override. If the model call fails or returns invalid JSON, the API routes fall back to safe demo responses.

## Docker

```bash
docker build -t aprompt .
docker run -p 3000:3000 --env-file .env.local aprompt
```

## Safety

The Customer Save Agent drafts and recommends only. It never sends customer messages. Human approval is always required for high-severity customer complaints.

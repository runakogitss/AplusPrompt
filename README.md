# AplusPrompt

AplusPrompt is a hackathon MVP for training non-technical business users to write better AI prompts. The first mission, Market Research Coach, teaches users how to add business context, target market detail, source expectations, output structure, assumptions, and next actions.

## Run Locally

```bash
npm run dev
```

Open `http://127.0.0.1:4173`.

## Validate

```bash
npm run smoke
node --check server.js
node --check public/app.js
```

## Notes

- The app uses a dependency-free Node server and static frontend.
- Mock AI feedback is included so the demo works without API keys.
- Runtime session data is stored in `data/` and ignored by Git.

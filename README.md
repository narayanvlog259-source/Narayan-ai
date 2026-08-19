# Narayan AI - Secure Starter

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Set environment variable `OPENAI_API_KEY` (do not put it in public/index.html).
4. Optionally set `OPENAI_MODEL` (default: gpt-5.6-luna).
5. Run `npm start`.
6. Open http://localhost:3000

## Deploy
Deploy this Node/Express project to a host that supports Node.js. Add `OPENAI_API_KEY` in the host's Environment Variables/Secrets settings. Never commit `.env` or the API key to GitHub.

The backend uses OpenAI's Responses API.

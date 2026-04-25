# AI Banking Chat App

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Set `OPENAI_API_KEY` (OpenAI, OpenRouter, or any placeholder for local models)
4. *(Optional)* Set `OPENAI_BASE_URL`:
   - OpenRouter: `https://openrouter.ai/api/v1`
   - LM Studio: `http://localhost:1234/v1`
   - Ollama: `http://localhost:11434/v1`
5. *(Optional)* Set `OPENAI_MODEL` (defaults to `gpt-4o-mini`)
6. Run `npm run dev`

## Using LM Studio (Local Models)

1. Download and install [LM Studio](https://lmstudio.ai/)
2. Load a model (e.g., Llama 3.2)
3. Start the local server (default: `http://localhost:1234/v1`)
4. Configure `.env.local`:
   ```
   OPENAI_BASE_URL=http://localhost:1234/v1
   OPENAI_API_KEY=lm-studio
   OPENAI_MODEL=llama-3.2-3b-instruct
   ```

## Streaming Responses

All chat messages are streamed through the LLM using the Vercel AI SDK. The model decides which banking tools to call, executes them, and returns natural language responses. Structured cards (balance, transactions, spending) appear immediately when tools are invoked, while the model's text continues streaming.

## Test

- `npm test`
- `npm run test:e2e`

## PWA testing on a phone with ngrok

Build and start the production app:

```bash
npm run build
npm run start
```

In a second terminal, expose the local server over HTTPS:

```bash
brew install ngrok/ngrok/ngrok
ngrok http 3000
```

Open the HTTPS forwarding URL from ngrok on your phone, for example:

```text
https://abc123.ngrok-free.app
```

Install the app from the browser:

- Android Chrome: menu -> **Add to Home screen** or **Install app**
- iPhone Safari: Share -> **Add to Home Screen**

Launch Cellar Bank from the home screen and verify it opens in standalone mode. Chat should work while online. After opening once, turn on airplane mode and relaunch; the app shell should still appear, but sending chat messages requires network access.

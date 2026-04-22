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
6. *(Optional)* Set `USE_LLM_FOR_ALL=true` to route every message through the LLM with tool execution (recommended for local models)
7. Run `npm run dev`

## Using LM Studio (Local Models)

1. Download and install [LM Studio](https://lmstudio.ai/)
2. Load a model (e.g., Llama 3.2)
3. Start the local server (default: `http://localhost:1234/v1`)
4. Configure `.env.local`:
   ```
   OPENAI_BASE_URL=http://localhost:1234/v1
   OPENAI_API_KEY=lm-studio
   OPENAI_MODEL=llama-3.2-3b-instruct
   USE_LLM_FOR_ALL=true
   ```

## Demo Mode vs LLM Mode

- **`USE_LLM_FOR_ALL=false` (default)**: Common banking keywords (balance, transactions, spending, transfer, freeze/unfreeze) trigger instant regex-based responses. Fast for demos but doesn't use the LLM.
- **`USE_LLM_FOR_ALL=true`**: Every request goes through the LLM with a full tool-execution loop. The model decides which banking tools to call, executes them, and returns natural language responses. Required for local models.

## Test

- `npm test`
- `npm run test:e2e`

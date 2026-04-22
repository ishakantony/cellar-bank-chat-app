# Frontend Banking Chat Design

Date: 2026-04-22
Topic: Frontend-only AI banking chat POC

## 1. Objective

Design the first implementation slice of the AI banking chat app as a frontend-focused proof of concept. This slice should validate believable, safe conversational banking behavior for a single signed-in user before building the full backend architecture described in the PRD.

The design prioritizes:

- safe action confirmation flows
- realistic chat behavior powered by a real LLM
- mocked banking tools as the source of truth
- a code structure that can later connect to real backend services

## 2. Scope

### In Scope

- Single Next.js application for the frontend POC
- Single signed-in demo user with one main account
- Real LLM integration for intent interpretation and response phrasing
- Mocked banking tools for balance, transactions, spending summaries, transfer preview and execution, and card freeze or unfreeze
- Chat transcript with structured banking UI blocks
- Suggested prompts for common flows
- Confirmation-driven action flows for sensitive operations
- Safe fallback behavior when the model or tools fail
- Frontend-focused automated testing of trust-critical interaction flows

### Out of Scope

- Real bank or core banking integrations
- Multi-user support
- Multi-account switching
- Production authentication and authorization systems
- Persistent audit log storage
- Full backend service decomposition
- Investor-demo visual polish as the primary goal

## 3. Recommended Approach

The recommended approach is a client-led chat experience with a thin mock tool gateway.

The Next.js app owns chat state, pending confirmations, transcript rendering, and structured UI output. The app sends user messages and tool definitions to a real LLM. The LLM can either produce a direct answer or request a tool call. Banking facts and banking actions always come from mocked tools, never from model-generated content.

This approach was chosen because it best balances realism and speed:

- It makes the experience feel like a believable banking product.
- It enforces a clear safety boundary around sensitive actions.
- It avoids prematurely building backend infrastructure before the interaction model is proven.
- It preserves a clean upgrade path from mock tools to real APIs later.

## 4. Architecture

The frontend POC should be organized into four clear areas:

### 4.1 Chat UI

Responsible for rendering the transcript, input composer, suggested prompts, account summary, structured banking results, and inline confirmation affordances.

### 4.2 Conversation Controller

Responsible for:

- chat state
- message sequencing
- pending action state
- coordination between LLM responses and tool execution
- refusal to execute actions without valid confirmation context

This is the trust-critical layer for the frontend POC.

### 4.3 AI Gateway

Responsible for sending the conversation and tool schema to the model and returning either:

- a plain assistant response, or
- a tool request followed by a final assistant response after tool completion

The gateway should be thin and focused on model interaction, not banking logic.

### 4.4 Mock Banking Tools

Responsible for deterministic banking data and action simulation. The tool layer is the source of truth for:

- account balance
- recent transactions
- monthly spending summary
- month-over-month spending comparison
- transfer preview
- transfer execution
- card freeze or unfreeze preview and execution

## 5. Core Safety Rules

The design must enforce the following rules:

- The LLM is never the source of truth for balances, transactions, or action outcomes.
- The LLM cannot execute sensitive banking actions directly.
- All sensitive actions require an explicit preview before they can be confirmed.
- All sensitive actions require explicit confirmation from the user before execution.
- Generic confirmations such as "yes" must only apply to an active pending action.
- If there is no active pending action, the app must not execute anything.
- Canceling or changing course must clear pending state before another action begins.

## 6. User Experience Design

The product should behave like a guided banking assistant rather than a general chatbot.

### 6.1 Read-Only Requests

Read-only requests such as balance checks, recent transactions, and spending summaries should complete in one turn:

1. user asks a question
2. model determines whether a tool is needed
3. mocked tool returns structured data
4. assistant responds in a concise banking tone
5. UI renders both the message and the structured result block

### 6.2 Sensitive Actions

Sensitive actions such as transfers and card freeze or unfreeze must use a two-step flow:

1. user requests the action
2. app gathers required parameters through the model and tool layer
3. app creates a preview payload
4. assistant shows a precise preview with confirm and cancel affordances
5. user confirms or cancels
6. only then may the app execute the stored pending action
7. assistant reports the final result

The preview must restate the action in concrete terms. For transfers, that includes amount, recipient, and source account. For card actions, that includes the affected card and resulting status.

## 7. Pending Action Model

The frontend must maintain a single `pendingAction` object in conversation state.

That object should include enough information to:

- identify the action type
- render the preview state
- validate what the user is confirming
- execute the exact action the user approved

Expected behavior:

- If the user replies with confirmation while a matching `pendingAction` exists, the app executes that stored action.
- If the user replies with confirmation and there is no `pendingAction`, the app asks what they want to confirm and executes nothing.
- If the user cancels, the `pendingAction` is cleared immediately.
- If the user starts a different action while one is pending, the app should either cancel the prior action explicitly or ask the user to resolve it before proceeding. For this first slice, the recommended behavior is to cancel the old pending action and clearly state that it was not executed.

## 8. Components

The initial frontend should include the following user-facing components:

- chat transcript
- message composer
- suggested prompt chips
- compact account summary card
- balance card
- transaction list block
- spending summary block
- action preview block
- confirm and cancel controls for pending actions
- status message states for success, cancellation, and failure

The structured UI should render inline within the transcript so the entire experience remains centered on the conversation rather than spreading the workflow across separate pages.

## 9. Data Flow

The primary interaction loop should work as follows:

1. user submits a message
2. conversation controller appends it to the transcript
3. app sends conversation context and tool definitions to the LLM
4. LLM either:
   - returns a direct response, or
   - requests a mocked banking tool
5. app runs the requested tool
6. tool result is returned to the LLM
7. LLM produces final wording plus a structured UI payload descriptor
8. conversation controller renders the assistant message and structured block

For sensitive actions:

1. the first tool interaction must create a preview only
2. preview details are stored in `pendingAction`
3. execution only occurs after explicit confirmation
4. result state clears the pending action after success, cancellation, or failure

## 10. Error Handling

The app should fail in banking-safe ways.

### 10.1 Model Failure

If the LLM is unavailable or errors:

- do not invent a banking answer
- show a short apology
- suggest retrying or trying another supported prompt
- preserve the user transcript where possible

### 10.2 Tool Failure

If a mocked banking tool fails:

- do not show ambiguous success wording
- clearly state that the request could not be completed
- avoid partial completion language unless the partial result is explicit and safe

### 10.3 Confirmation State Failure

If confirmation state is missing, stale, or inconsistent:

- refuse execution
- clear invalid pending state
- ask the user to restart the action

Every sensitive action should end in one of three visible states:

- previewed
- confirmed and completed
- canceled or failed

## 11. Testing Strategy

Testing should concentrate on trust and correctness rather than broad visual coverage.

Priority cases:

- read-only requests render the expected structured result blocks
- transfer preview does not execute funds movement
- transfer execution only occurs after an active pending confirmation
- card freeze or unfreeze only executes after an active pending confirmation
- generic confirmations do nothing without a pending action
- cancel clears pending state
- starting a new action clears or replaces a previous pending action according to the chosen rule
- model failure produces safe fallback messaging
- tool failure produces safe non-success messaging

Recommended test layers:

- component tests for transcript states and structured result rendering
- integration tests for end-to-end chat flows using mocked model and tool responses

## 12. Implementation Notes

To keep the first slice focused:

- assume one signed-in demo user
- use fixed mock account and transaction data
- avoid building persistence unless a specific interaction depends on it
- keep orchestration logic in small, well-bounded modules so a future backend can replace the mock tool layer without forcing a UI rewrite

## 13. Success Criteria

The frontend POC is successful when:

- a user can ask for a balance and see a trustworthy answer with structured UI
- a user can ask for recent transactions and see a transaction list inline in chat
- a user can ask for spending insight and receive a natural summary grounded in mocked transaction data
- a user can initiate a transfer, receive a clear preview, confirm it, and see a completed result
- a user can initiate a card freeze or unfreeze flow with the same preview-then-confirm safety pattern
- no action executes without explicit confirmation
- confirmation edge cases fail safely

## 14. Follow-On Planning Boundary

This spec intentionally covers only the frontend-first POC slice. A later plan can expand the validated interaction model into a fuller architecture with dedicated backend APIs, persistence, audit logging, and production-ready service boundaries.

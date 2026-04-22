module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/ai/openai-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOpenAIClient",
    ()=>createOpenAIClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
function createOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured.");
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
        apiKey
    });
}
}),
"[project]/lib/ai/tool-schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BANKING_TOOLS",
    ()=>BANKING_TOOLS
]);
const BANKING_TOOLS = [
    {
        type: "function",
        function: {
            name: "get_balance",
            description: "Get the current balance for the signed-in user's main account.",
            parameters: {
                type: "object",
                properties: {},
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "list_recent_transactions",
            description: "List the most recent transactions for the signed-in user's main account.",
            parameters: {
                type: "object",
                properties: {},
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "summarize_spending",
            description: "Summarize current month spending from mock transaction data.",
            parameters: {
                type: "object",
                properties: {},
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "create_transfer_preview",
            description: "Create a transfer preview without executing the transfer.",
            parameters: {
                type: "object",
                properties: {
                    amount: {
                        type: "number"
                    },
                    recipientName: {
                        type: "string"
                    }
                },
                required: [
                    "amount",
                    "recipientName"
                ],
                additionalProperties: false
            }
        }
    },
    {
        type: "function",
        function: {
            name: "execute_transfer",
            description: "Execute a previously previewed transfer after explicit user confirmation.",
            parameters: {
                type: "object",
                properties: {
                    actionId: {
                        type: "string"
                    }
                },
                required: [
                    "actionId"
                ],
                additionalProperties: false
            }
        }
    }
];
}),
"[project]/lib/mock-data/account.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_ACCOUNT",
    ()=>DEMO_ACCOUNT
]);
const DEMO_ACCOUNT = {
    userId: "user_demo_001",
    accountId: "acct_primary_001",
    accountName: "Everyday Savings",
    currency: "MYR",
    balance: 8420.15,
    cardLabel: "Visa ending 4242",
    transactions: [
        {
            id: "txn_1",
            merchant: "Village Grocer",
            amount: 142.8,
            direction: "debit",
            postedAt: "2026-04-20"
        },
        {
            id: "txn_2",
            merchant: "Salary",
            amount: 5200,
            direction: "credit",
            postedAt: "2026-04-18"
        },
        {
            id: "txn_3",
            merchant: "Petron",
            amount: 80,
            direction: "debit",
            postedAt: "2026-04-16"
        },
        {
            id: "txn_4",
            merchant: "Grab",
            amount: 24.5,
            direction: "debit",
            postedAt: "2026-04-15"
        },
        {
            id: "txn_5",
            merchant: "Netflix",
            amount: 55,
            direction: "debit",
            postedAt: "2026-04-12"
        }
    ]
};
}),
"[project]/lib/mock-tools/balance.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBalance",
    ()=>getBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/account.ts [app-route] (ecmascript)");
;
function getBalance() {
    return {
        balance: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].balance,
        currency: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].currency,
        accountName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].accountName
    };
}
}),
"[project]/lib/mock-tools/transactions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listRecentTransactions",
    ()=>listRecentTransactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/account.ts [app-route] (ecmascript)");
;
function listRecentTransactions() {
    return {
        items: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].transactions
    };
}
}),
"[project]/lib/mock-tools/spending.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "summarizeSpending",
    ()=>summarizeSpending
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/account.ts [app-route] (ecmascript)");
;
function summarizeSpending() {
    const debitTransactions = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].transactions.filter((t)=>t.direction === "debit");
    const total = debitTransactions.reduce((sum, t)=>sum + t.amount, 0);
    const categoryMap = new Map();
    for (const t of debitTransactions){
        categoryMap.set(t.merchant, (categoryMap.get(t.merchant) ?? 0) + t.amount);
    }
    const topCategory = Array.from(categoryMap.entries()).sort((a, b)=>b[1] - a[1])[0]?.[0] ?? "Unknown";
    return {
        monthLabel: "April 2026",
        total,
        topCategory,
        comparisonText: "You spent 12% less than last month.",
        summary: `You spent RM ${total.toFixed(2)} this month. Top merchant: ${topCategory}.`
    };
}
}),
"[project]/lib/mock-tools/transfers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTransferPreview",
    ()=>createTransferPreview,
    "executeTransfer",
    ()=>executeTransfer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/account.ts [app-route] (ecmascript)");
;
function createTransferPreview({ amount, recipientName }) {
    return {
        status: "preview",
        executed: false,
        actionId: "transfer_preview_001",
        summary: `Transfer RM ${amount.toFixed(2)} from ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].accountName} to ${recipientName}.`,
        amount,
        recipientName,
        currency: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].currency,
        sourceAccountName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].accountName
    };
}
function executeTransfer({ actionId }) {
    return {
        status: "completed",
        actionId,
        executed: true,
        confirmationText: "Transfer completed successfully."
    };
}
}),
"[project]/lib/mock-tools/card.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCardStatusPreview",
    ()=>createCardStatusPreview,
    "executeCardStatusChange",
    ()=>executeCardStatusChange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/account.ts [app-route] (ecmascript)");
;
function createCardStatusPreview({ action }) {
    return {
        status: "preview",
        executed: false,
        actionId: `card_${action}_preview_001`,
        summary: `${action === "freeze" ? "Freeze" : "Unfreeze"} ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].cardLabel}.`,
        action,
        cardLabel: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].cardLabel
    };
}
function executeCardStatusChange({ actionId }) {
    return {
        status: "completed",
        actionId,
        executed: true,
        confirmationText: "Card status updated successfully."
    };
}
}),
"[project]/lib/mock-tools/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/balance.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transactions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/transactions.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$spending$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/spending.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transfers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/transfers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/card.ts [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$openai$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/openai-client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$tool$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/tool-schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/mock-tools/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/card.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transfers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/transfers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/balance.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transactions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/transactions.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$spending$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/spending.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(request) {
    const { message } = await request.json();
    if (/balance/i.test(message)) {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBalance"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: "Your balance is RM 8,420.15.",
            data: {
                type: "balance",
                balance: result.balance,
                currency: result.currency
            }
        });
    }
    if (/transactions/i.test(message)) {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transactions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listRecentTransactions"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: "Here are your latest transactions.",
            data: {
                type: "transactions",
                items: result.items
            }
        });
    }
    if (/money|spending/i.test(message)) {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$spending$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["summarizeSpending"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: result.summary,
            data: {
                type: "spending",
                monthLabel: result.monthLabel,
                total: result.total,
                topCategory: result.topCategory,
                comparisonText: result.comparisonText
            }
        });
    }
    const transferMatch = message.match(/send\s+rm?\s*(\d+(?:\.\d+)?)\s+to\s+(.+)/i);
    if (transferMatch) {
        const amount = parseFloat(transferMatch[1]);
        const recipientName = transferMatch[2].trim();
        const preview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transfers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTransferPreview"])({
            amount,
            recipientName
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: preview.summary,
            data: {
                type: "action-preview",
                actionId: preview.actionId,
                actionType: "transfer",
                summary: preview.summary,
                confirmLabel: "Confirm",
                cancelLabel: "Cancel"
            },
            pendingAction: {
                id: preview.actionId,
                kind: "transfer",
                recipientName,
                amount,
                currency: preview.currency,
                sourceAccountName: preview.sourceAccountName,
                previewText: preview.summary
            }
        });
    }
    if (/freeze/i.test(message)) {
        const preview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCardStatusPreview"])({
            action: "freeze"
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: preview.summary,
            data: {
                type: "action-preview",
                actionId: preview.actionId,
                actionType: "freeze-card",
                summary: preview.summary,
                confirmLabel: "Confirm",
                cancelLabel: "Cancel"
            },
            pendingAction: {
                id: preview.actionId,
                kind: "freeze-card",
                cardLabel: preview.cardLabel,
                previewText: preview.summary
            }
        });
    }
    if (/unfreeze/i.test(message)) {
        const preview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCardStatusPreview"])({
            action: "unfreeze"
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: preview.summary,
            data: {
                type: "action-preview",
                actionId: preview.actionId,
                actionType: "unfreeze-card",
                summary: preview.summary,
                confirmLabel: "Confirm",
                cancelLabel: "Cancel"
            },
            pendingAction: {
                id: preview.actionId,
                kind: "unfreeze-card",
                cardLabel: preview.cardLabel,
                previewText: preview.summary
            }
        });
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$openai$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOpenAIClient"])();
    const response = await client.responses.create({
        model: "gpt-5.4-mini",
        input: message,
        tools: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$tool$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BANKING_TOOLS"]
    });
    const text = response.output?.[0]?.content?.[0]?.text ?? "I could not complete that request.";
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        reply: text,
        data: {
            type: "status",
            tone: "info",
            summary: text
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0g~uj.m._.js.map
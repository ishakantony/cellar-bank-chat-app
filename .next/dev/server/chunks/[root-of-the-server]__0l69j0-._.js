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
"[project]/app/api/tools/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/mock-tools/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/card.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transfers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/transfers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/balance.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transactions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/transactions.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$spending$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-tools/spending.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    const { toolName, input } = await request.json();
    const result = toolName === "get_balance" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBalance"])() : toolName === "list_recent_transactions" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transactions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listRecentTransactions"])() : toolName === "summarize_spending" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$spending$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["summarizeSpending"])() : toolName === "create_transfer_preview" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transfers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTransferPreview"])(input) : toolName === "execute_transfer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$transfers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeTransfer"])(input) : toolName === "create_card_status_preview" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCardStatusPreview"])(input) : toolName === "execute_card_status_change" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$tools$2f$card$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeCardStatusChange"])(input) : null;
    if (!result) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Unsupported tool: ${toolName}`
        }, {
            status: 400
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        result
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0l69j0-._.js.map
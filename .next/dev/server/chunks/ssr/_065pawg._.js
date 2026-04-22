module.exports = [
"[project]/lib/mock-data/account.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/components/chat/account-summary-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountSummaryCard",
    ()=>AccountSummaryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data/account.ts [app-ssr] (ecmascript)");
;
;
function AccountSummaryCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs uppercase tracking-wider text-slate-500",
                children: "Primary Account"
            }, void 0, false, {
                fileName: "[project]/components/chat/account-summary-card.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-slate-900",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].accountName
            }, void 0, false, {
                fileName: "[project]/components/chat/account-summary-card.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-2xl font-semibold text-slate-950",
                children: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].currency,
                    " ",
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].balance.toLocaleString()
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/account-summary-card.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-slate-400",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2f$account$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_ACCOUNT"].cardLabel
            }, void 0, false, {
                fileName: "[project]/components/chat/account-summary-card.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/account-summary-card.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chat/action-preview-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionPreviewCard",
    ()=>ActionPreviewCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function ActionPreviewCard({ action, onConfirm, onCancel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-amber-200 bg-amber-50 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-medium text-amber-900",
                children: action.previewText
            }, void 0, false, {
                fileName: "[project]/components/chat/action-preview-card.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onConfirm,
                        className: "rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700",
                        children: "Confirm"
                    }, void 0, false, {
                        fileName: "[project]/components/chat/action-preview-card.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCancel,
                        className: "rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/components/chat/action-preview-card.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/action-preview-card.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/action-preview-card.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chat/chat-composer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatComposer",
    ()=>ChatComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ChatComposer({ onSend, disabled }) {
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim() || disabled) return;
        onSend(text.trim());
        setText("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: text,
                onChange: (e)=>setText(e.target.value),
                placeholder: "Ask about your money",
                disabled: disabled,
                className: "flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-slate-500 focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/components/chat/chat-composer.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: disabled || !text.trim(),
                className: "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50",
                children: "Send"
            }, void 0, false, {
                fileName: "[project]/components/chat/chat-composer.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/chat-composer.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chat/structured-result.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StructuredResult",
    ()=>StructuredResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function StructuredResult({ data }) {
    if (data.type === "balance") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-emerald-200 bg-emerald-50 p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-wider text-emerald-600",
                    children: "Balance"
                }, void 0, false, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl font-semibold text-emerald-900",
                    children: [
                        data.currency,
                        " ",
                        data.balance.toLocaleString()
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chat/structured-result.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this);
    }
    if (data.type === "transactions") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-slate-200 bg-white p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-2 text-xs uppercase tracking-wider text-slate-500",
                    children: "Recent Transactions"
                }, void 0, false, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-2",
                    children: data.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex justify-between text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-700",
                                    children: item.merchant
                                }, void 0, false, {
                                    fileName: "[project]/components/chat/structured-result.tsx",
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: item.direction === "credit" ? "text-emerald-600" : "text-slate-900",
                                    children: [
                                        item.direction === "credit" ? "+" : "-",
                                        item.amount.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/chat/structured-result.tsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/components/chat/structured-result.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chat/structured-result.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    if (data.type === "spending") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-slate-200 bg-white p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-wider text-slate-500",
                    children: [
                        data.monthLabel,
                        " Spending"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl font-semibold text-slate-900",
                    children: [
                        "RM ",
                        data.total.toFixed(2)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-600",
                    children: [
                        "Top: ",
                        data.topCategory
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-slate-400",
                    children: data.comparisonText
                }, void 0, false, {
                    fileName: "[project]/components/chat/structured-result.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chat/structured-result.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this);
    }
    if (data.type === "action-preview") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-amber-200 bg-amber-50 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-medium text-amber-900",
                children: data.summary
            }, void 0, false, {
                fileName: "[project]/components/chat/structured-result.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/chat/structured-result.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    if (data.type === "status") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `rounded-xl border p-4 ${data.tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : data.tone === "error" ? "border-rose-200 bg-rose-50 text-rose-900" : "border-slate-200 bg-slate-50 text-slate-900"}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm",
                children: data.summary
            }, void 0, false, {
                fileName: "[project]/components/chat/structured-result.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/chat/structured-result.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this);
    }
    return null;
}
}),
"[project]/components/chat/chat-message-list.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessageList",
    ()=>ChatMessageList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$structured$2d$result$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/structured-result.tsx [app-ssr] (ecmascript)");
;
;
function ChatMessageList({ messages }) {
    if (messages.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400",
            children: "No messages yet. Ask about your money above."
        }, void 0, false, {
            fileName: "[project]/components/chat/chat-message-list.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 space-y-4",
        children: messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `max-w-md rounded-xl px-4 py-3 ${msg.role === "user" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-800"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: msg.text
                        }, void 0, false, {
                            fileName: "[project]/components/chat/chat-message-list.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this),
                        msg.structuredResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$structured$2d$result$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StructuredResult"], {
                                data: msg.structuredResult
                            }, void 0, false, {
                                fileName: "[project]/components/chat/chat-message-list.tsx",
                                lineNumber: 30,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/chat/chat-message-list.tsx",
                            lineNumber: 29,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/chat/chat-message-list.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, msg.id, false, {
                fileName: "[project]/components/chat/chat-message-list.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/chat/chat-message-list.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chat/suggested-prompts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuggestedPrompts",
    ()=>SuggestedPrompts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function SuggestedPrompts({ prompts, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2",
        children: prompts.map((prompt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSelect(prompt),
                className: "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50",
                children: prompt
            }, prompt, false, {
                fileName: "[project]/components/chat/suggested-prompts.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/chat/suggested-prompts.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/chat/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPTY_CONVERSATION_STATE",
    ()=>EMPTY_CONVERSATION_STATE,
    "SUGGESTED_PROMPTS",
    ()=>SUGGESTED_PROMPTS
]);
const SUGGESTED_PROMPTS = [
    "What's my balance?",
    "Show my last 5 transactions",
    "Where did my money go this month?",
    "Send RM 100 to Ali",
    "Freeze my card"
];
const EMPTY_CONVERSATION_STATE = {
    messages: [],
    pendingAction: null,
    isLoading: false
};
}),
"[project]/lib/chat/conversation-controller.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConversationController",
    ()=>createConversationController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chat/constants.ts [app-ssr] (ecmascript)");
;
function createConversationController(initialState = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_CONVERSATION_STATE"]) {
    let state = initialState;
    return {
        getState () {
            return state;
        },
        addUserMessage (message) {
            state = {
                ...state,
                messages: [
                    ...state.messages,
                    message
                ]
            };
        },
        addAssistantMessage (message) {
            state = {
                ...state,
                messages: [
                    ...state.messages,
                    message
                ]
            };
        },
        addAssistantPreview (action) {
            state = {
                ...state,
                pendingAction: action
            };
        },
        setPendingAction (action) {
            state = {
                ...state,
                pendingAction: action
            };
        },
        clearPendingAction () {
            state = {
                ...state,
                pendingAction: null
            };
        },
        setLoading (isLoading) {
            state = {
                ...state,
                isLoading
            };
        }
    };
}
}),
"[project]/lib/chat/confirmation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyConfirmationReply",
    ()=>applyConfirmationReply,
    "isCancellationReply",
    ()=>isCancellationReply,
    "isConfirmationReply",
    ()=>isConfirmationReply,
    "normalizeReply",
    ()=>normalizeReply
]);
const CONFIRM_WORDS = new Set([
    "yes",
    "confirm",
    "proceed",
    "ok"
]);
const CANCEL_WORDS = new Set([
    "no",
    "cancel",
    "stop",
    "never mind"
]);
function normalizeReply(text) {
    return text.trim().toLowerCase();
}
function isConfirmationReply(text) {
    return CONFIRM_WORDS.has(normalizeReply(text));
}
function isCancellationReply(text) {
    return CANCEL_WORDS.has(normalizeReply(text));
}
function applyConfirmationReply({ pendingAction, replyText }) {
    if (!pendingAction) {
        return {
            shouldExecute: false,
            shouldClearPendingAction: false,
            assistantText: "I do not have a pending action to confirm. What would you like to confirm?"
        };
    }
    if (isCancellationReply(replyText)) {
        return {
            shouldExecute: false,
            shouldClearPendingAction: true,
            assistantText: "Canceled. Nothing was executed."
        };
    }
    if (isConfirmationReply(replyText)) {
        return {
            shouldExecute: true,
            shouldClearPendingAction: false,
            assistantText: `Confirming ${pendingAction.kind}.`
        };
    }
    return {
        shouldExecute: false,
        shouldClearPendingAction: false,
        assistantText: "Please confirm or cancel the pending action."
    };
}
}),
"[project]/components/chat/chat-shell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatShell",
    ()=>ChatShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$account$2d$summary$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/account-summary-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$action$2d$preview$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/action-preview-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$chat$2d$composer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/chat-composer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$chat$2d$message$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/chat-message-list.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$suggested$2d$prompts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chat/suggested-prompts.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chat/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$conversation$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chat/conversation-controller.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$confirmation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chat/confirmation.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function ChatShell() {
    const [controller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$conversation$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createConversationController"])());
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(controller.getState());
    const refreshState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setState({
            ...controller.getState()
        });
    }, [
        controller
    ]);
    async function submitMessage(text) {
        const currentPending = controller.getState().pendingAction;
        // Handle confirmation replies if there's a pending action
        if (currentPending) {
            const decision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$confirmation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyConfirmationReply"])({
                pendingAction: currentPending,
                replyText: text
            });
            controller.addUserMessage({
                id: crypto.randomUUID(),
                role: "user",
                text
            });
            if (decision.shouldClearPendingAction) {
                controller.clearPendingAction();
            }
            if (decision.shouldExecute) {
                controller.setLoading(true);
                refreshState();
                const toolName = currentPending.kind === "transfer" ? "execute_transfer" : currentPending.kind === "freeze-card" ? "execute_card_status_change" : "execute_card_status_change";
                const response = await fetch("/api/tools", {
                    method: "POST",
                    body: JSON.stringify({
                        toolName,
                        input: {
                            actionId: currentPending.id
                        }
                    })
                });
                const payload = await response.json();
                controller.clearPendingAction();
                controller.setLoading(false);
                controller.addAssistantMessage({
                    id: crypto.randomUUID(),
                    role: "assistant",
                    text: payload.result.confirmationText,
                    structuredResult: {
                        type: "status",
                        tone: "success",
                        summary: payload.result.confirmationText
                    }
                });
                refreshState();
                return;
            }
            controller.addAssistantMessage({
                id: crypto.randomUUID(),
                role: "assistant",
                text: decision.assistantText,
                structuredResult: {
                    type: "status",
                    tone: "info",
                    summary: decision.assistantText
                }
            });
            refreshState();
            return;
        }
        controller.addUserMessage({
            id: crypto.randomUUID(),
            role: "user",
            text
        });
        controller.setLoading(true);
        refreshState();
        const response = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({
                message: text,
                sessionId: "sess_demo_001",
                messages: controller.getState().messages
            })
        });
        const payload = await response.json();
        controller.addAssistantMessage({
            id: crypto.randomUUID(),
            role: "assistant",
            text: payload.reply,
            structuredResult: payload.data
        });
        if (payload.pendingAction) {
            controller.addAssistantPreview(payload.pendingAction);
        }
        controller.setLoading(false);
        refreshState();
    }
    async function handleConfirm(action) {
        controller.setLoading(true);
        refreshState();
        const toolName = action.kind === "transfer" ? "execute_transfer" : action.kind === "freeze-card" ? "execute_card_status_change" : "execute_card_status_change";
        const response = await fetch("/api/tools", {
            method: "POST",
            body: JSON.stringify({
                toolName,
                input: {
                    actionId: action.id
                }
            })
        });
        const payload = await response.json();
        controller.clearPendingAction();
        controller.setLoading(false);
        controller.addAssistantMessage({
            id: crypto.randomUUID(),
            role: "assistant",
            text: payload.result.confirmationText,
            structuredResult: {
                type: "status",
                tone: "success",
                summary: payload.result.confirmationText
            }
        });
        refreshState();
    }
    function handleCancel() {
        controller.clearPendingAction();
        controller.addAssistantMessage({
            id: crypto.randomUUID(),
            role: "assistant",
            text: "Canceled. Nothing was executed.",
            structuredResult: {
                type: "status",
                tone: "info",
                summary: "Canceled. Nothing was executed."
            }
        });
        refreshState();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.3em] text-slate-500",
                        children: "Single user demo"
                    }, void 0, false, {
                        fileName: "[project]/components/chat/chat-shell.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-semibold text-slate-950",
                        children: "AI Banking Assistant"
                    }, void 0, false, {
                        fileName: "[project]/components/chat/chat-shell.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chat/chat-shell.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$account$2d$summary$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AccountSummaryCard"], {}, void 0, false, {
                fileName: "[project]/components/chat/chat-shell.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$suggested$2d$prompts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SuggestedPrompts"], {
                prompts: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chat$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUGGESTED_PROMPTS"],
                onSelect: submitMessage
            }, void 0, false, {
                fileName: "[project]/components/chat/chat-shell.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$chat$2d$message$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatMessageList"], {
                messages: state.messages
            }, void 0, false, {
                fileName: "[project]/components/chat/chat-shell.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            state.pendingAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$action$2d$preview$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionPreviewCard"], {
                action: state.pendingAction,
                onConfirm: ()=>handleConfirm(state.pendingAction),
                onCancel: handleCancel
            }, void 0, false, {
                fileName: "[project]/components/chat/chat-shell.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chat$2f$chat$2d$composer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatComposer"], {
                onSend: submitMessage,
                disabled: state.isLoading
            }, void 0, false, {
                fileName: "[project]/components/chat/chat-shell.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chat/chat-shell.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_065pawg._.js.map
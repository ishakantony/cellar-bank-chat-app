import { expect, test } from "@playwright/test";

test("transfer requires preview before completion", async ({ page }) => {
  // Intercept /api/chat to mock streaming responses without needing a real LLM
  await page.route("/api/chat", async (route, request) => {
    const body = await request.postDataJSON();
    const lastMessage = body.messages[body.messages.length - 1];
    const content = lastMessage?.content ?? "";

    if (content.includes("Send RM 100 to Ali")) {
      const streamBody = [
        '0:"I\'ve prepared a transfer preview for you."\n',
        '9:{"toolCallId":"call_preview","toolName":"create_transfer_preview","args":{"amount":100,"recipientName":"Ali"}}\n',
        'a:{"toolCallId":"call_preview","result":{"actionId":"preview_1","status":"preview","executed":false,"amount":100,"recipientName":"Ali","currency":"MYR","sourceAccountName":"Everyday Savings","summary":"Transfer RM 100.00 to Ali"}}\n',
        'd:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}\n',
      ].join("");

      return route.fulfill({
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: streamBody,
      });
    }

    if (content.toLowerCase().includes("confirm")) {
      const streamBody = [
        '0:"Transfer completed successfully."\n',
        '9:{"toolCallId":"call_exec","toolName":"execute_transfer","args":{"actionId":"preview_1"}}\n',
        'a:{"toolCallId":"call_exec","result":{"confirmationText":"Transfer completed successfully."}}\n',
        'd:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}\n',
      ].join("");

      return route.fulfill({
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: streamBody,
      });
    }

    return route.fulfill({
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: '0:"Hello! How can I help you today?"\nd:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}\n',
    });
  });

  await page.goto("/");
  await page
    .getByPlaceholder("Ask about your money...")
    .fill("Send RM 100 to Ali");
  await page.getByLabel("Send").click();

  // Wait for the preview card to appear
  await expect(page.getByRole("button", { name: /confirm/i })).toBeVisible();
  await expect(page.getByText(/completed successfully/i)).toHaveCount(0);

  await page.getByRole("button", { name: /confirm/i }).click();
  await expect(page.getByText(/completed successfully/i).first()).toBeVisible();
});

import { test, expect } from "@playwright/test";

test("user can ask about portfolio and see charts", async ({ page }) => {
  await page.goto("/");

  // Type portfolio question
  const input = page.locator("input[placeholder='Ask about your money...']");
  await input.fill("Show me my investment portfolio");
  await input.press("Enter");

  // Wait for assistant response
  await page.waitForSelector("text=portfolio", { timeout: 15000 });

  // Assert chart card appears
  const chartCards = page.locator("text=Allocation");
  await expect(chartCards.first()).toBeVisible({ timeout: 10000 });
});

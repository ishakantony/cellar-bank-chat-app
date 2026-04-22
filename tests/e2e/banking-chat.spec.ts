import { expect, test } from "@playwright/test";

test("transfer requires preview before completion", async ({ page }) => {
  await page.goto("/");
  await page
    .getByPlaceholder("Ask about your money...")
    .fill("Send RM 100 to Ali");
  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByRole("button", { name: /confirm/i })).toBeVisible();
  await expect(page.getByText(/completed successfully/i)).toHaveCount(0);

  await page.getByRole("button", { name: /confirm/i }).click();
  await expect(page.getByText(/completed successfully/i).first()).toBeVisible();
});

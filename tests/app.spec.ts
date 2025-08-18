import { test, expect } from "@playwright/test";

test("vists the home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/TicketSwap/);

  const link = page.getByRole("link", { name: /Louis Tomlinson/i });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", `/event/9`);
});

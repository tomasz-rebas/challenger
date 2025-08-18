import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("checks the title", async ({ page }) => {
  await expect(page).toHaveTitle(/TicketSwap/);
});

test("verifies the first link", async ({ page }) => {
  const link = page.getByRole("link", { name: /Louis Tomlinson/i });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", `/event/9`);
});

test("filters the events", async ({ page }) => {
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards).toHaveCount(10);

  const selectTrigger = page.getByTestId("location-filter");
  await selectTrigger.click();

  const option = page.getByRole("option", { name: "Ziggo Dome" });
  await option.click();

  await expect(selectTrigger).toHaveText("Ziggo Dome");

  await expect(eventCards).toHaveCount(4);
});

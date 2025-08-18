import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("checks the title", async ({ page }) => {
  await expect(page).toHaveTitle("TicketSwap");
});

test("verifies the first link", async ({ page }) => {
  const link = page.getByRole("link", { name: "Louis Tomlinson" });
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

test("searches the events", async ({ page }) => {
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards).toHaveCount(10);

  const searchInput = page.getByLabel("Search events");
  await expect(searchInput).toBeVisible();

  await searchInput.focus();
  await page.keyboard.type("adam");
  await expect(eventCards).toHaveCount(2);

  await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace");
  await expect(eventCards).toHaveCount(8);

  const noEventsLabel = page.getByText("No events to show.");
  await expect(noEventsLabel).not.toBeVisible();

  await page.keyboard.type("x");
  await expect(eventCards).toHaveCount(0);
  await expect(noEventsLabel).toBeVisible();
});

test("navigates to the second event page", async ({ page }) => {
  const link = page.getByRole("link", { name: "Down The Rabbit Hole" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", `/event/4`);

  await link.click();
  await expect(page).toHaveURL(/\/event\/4/);

  const date = page.getByText("02/07/2021");
  await expect(date).toBeVisible();

  const text = page.getByText("Tickets for Down The Rabbit Hole");
  await expect(text).toBeVisible();
});

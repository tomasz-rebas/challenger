import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Base checks", () => {
  test("checks the title", async ({ page }) => {
    await expect(page).toHaveTitle("TicketSwap");
  });

  test("verifies the first link", async ({ page }) => {
    const link = page.getByRole("link", { name: "Louis Tomlinson" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", `/event/9`);
  });
});

test.describe("Searching and filtering", () => {
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

  test("filters and searches the events at the same time", async ({ page }) => {
    const eventCards = page.getByTestId("event-card");
    await expect(eventCards).toHaveCount(10);

    const searchInput = page.getByLabel("Search events");
    await expect(searchInput).toBeVisible();

    await searchInput.focus();
    await page.keyboard.type("h");
    await expect(eventCards).toHaveCount(4);

    const selectTrigger = page.getByTestId("location-filter");
    await selectTrigger.click();

    const option = page.getByRole("option", { name: "Ziggo Dome" });
    await option.click();

    await expect(selectTrigger).toHaveText("Ziggo Dome");

    await expect(eventCards).toHaveCount(2);
  });
});

test.describe("Navigation", () => {
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

  test("navigates to the event page and then to the location page", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "The Weeknd" }).click();
    await expect(page).toHaveURL(/\/event\/8/);

    const date = page.getByText("19/10/2021");
    await expect(date).toBeVisible();

    const text = page.getByText("sell tickets for The Weeknd on TicketSwap!");
    await expect(text).toBeVisible();

    const locationLink = page.getByRole("link", { name: "Ziggo Dome" });
    await expect(locationLink).toBeVisible();
    await expect(locationLink).toHaveAttribute("href", `/location/3`);

    await locationLink.click();
    await expect(page).toHaveURL(/\/location\/3/);

    const locationDetails = page.getByText("Amsterdam, Netherlands");
    await expect(locationDetails).toBeVisible();
  });

  test("tries to access a non-existent page", async ({ page }) => {
    await page.goto("/event/40");

    const text = page.getByText("Page not found");
    await expect(text).toBeVisible();
  });
});

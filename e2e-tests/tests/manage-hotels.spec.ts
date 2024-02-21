import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // check whether we've reached the sign in page by checking the heading
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Filling the sign in form
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  // Clicking the login button
  await page.getByRole("button", { name: "Login" }).click();

  // checking that the toast appears
  await expect(page.getByText("Signed in Successfully!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");

  await page
    .locator('[name="description"]')
    .fill("This is a Test Description for the Test H0tel");
  await page.locator('[name="pricePerNight"]').fill("100");

  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Luxury").click();
  await page.getByLabel("Free Wifi").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
    path.join(__dirname, "files", "3.jpg"),
    path.join(__dirname, "files", "4.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText("Test Hotel").first()).toBeVisible(); // Test only works if these texts are present only once on the entire screen
  await expect(page.getByText("Test Description for").first()).toBeVisible();

  await expect(page.getByText("Test City, Test Country").first()).toBeVisible();
  await expect(page.getByText("Luxury").first()).toBeVisible();
  await expect(page.getByText("Rs. 100 per night").first()).toBeVisible();
  await expect(page.getByText("2 adults, 4 children").first()).toBeVisible();
  await expect(page.getByText("3 Star Rating").first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Add Hotel" }).first()
  ).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });

  await expect(page.locator('[name="name"]').first()).toHaveValue("Test Hotel");

  await page.locator('[name="name"]').fill("Test Hotel UPDATED");

  await page.getByRole("button", { name: "Save" }).first().click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();
  await page.locator('[name="name"]').fill("Test Hotel UPDATED");

  await page.locator('[name="name"]').first().fill("Test Hotel");
  await page.getByRole("button", { name: "Save" }).click();
});

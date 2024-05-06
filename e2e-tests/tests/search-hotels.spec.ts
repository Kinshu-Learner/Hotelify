import { test, expect } from "@playwright/test";

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

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(
    page.getByText("Hotels found in Test City").first()
  ).toBeVisible();
  await expect(page.getByText("Test Hotel").first()).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").first().click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  // Everything from the should show hotel detail test, and more
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test City");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").first().click();

  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: Rs. 200.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4000003560000008");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("123");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  // TODO: not able to click on the "COMPLETE" button

  // await page.getByRole("button", { name: "Complete" }).click();
  // await expect(page.getByText("Booking Saved!")).toBeVisible();

  // Wait for the popup to appear
  // const popup = await page.waitForEvent("popup");

  // // Get the browser context of the popup
  // const popupContext = await popup.context();

  // // Create a new page in the popup context
  // const popupPage = await popupContext.newPage();

  // // Click the "Complete" button on the popup
  // await popupPage.getByRole("button", { name: "COMPLETE" }).click();

  // // Close the popup page
  // await popupPage.close();

  // // Close the popup context
  // await popupContext.close();

  // await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  // Wait for the Stripe 3D Secure 2 Test Page iframe to be available

  // const stripeFrame2 = await await page
  //   .frameLocator('iframe[name^="stripe_3ds2_or_"]')
  //   .first();

  // Click the "Complete" button on the Stripe 3D Secure 2 Test Page
  await stripeFrame.getByRole("link", { name: "COMPLETE" }).click();

  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Test Hotel")).toBeVisible();
});

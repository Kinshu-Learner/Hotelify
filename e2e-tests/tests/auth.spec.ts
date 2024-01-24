import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
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

  // checking if the header links changed after logging in
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstname");
  await page.locator("[name=lastName]").fill("test_lastname");
  await page.locator("[name=email]").fill("test_register@test.com");
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Create Account" }).click();

  // checking that the toast appears
  await expect(page.getByText("Registration Successfull!")).toBeVisible();

  // checking if the header links changed after logging in
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

import { expect, test } from "@playwright/test";

test.describe("Sign Up Page", () => {
    test("It should sign up a user and then navigate to the sign in page", async ({
        page,
        baseURL
    }) => {
        await page.goto(`${baseURL}/signup`);

        await expect(page).toHaveTitle("Sign Up");

        await page.locator("#username").type("demo");
        await page.locator("#password").type("testpassword");
        await page.locator("#signUpButton").click();

        await page.waitForNavigation();
        await expect(page).toHaveTitle("Sign In");
    });
});

import { expect, test } from "@playwright/test";

test.describe("Sign In Page", () => {
    test("Should sign the user in and navigate to the main page", async ({
        page,
        baseURL
    }) => {
        await page.goto(`${baseURL}/signin`);

        await expect(page).toHaveTitle("Sign In");

        await page.locator("#username").type("demo");
        await page.locator("#password").type("testpassword");
        await page.locator("#signInButton").click();

        await page.waitForNavigation();
        await expect(page).toHaveTitle("Main Page");
    });
});

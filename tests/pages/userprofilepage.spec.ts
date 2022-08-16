import { expect, Page, test } from "@playwright/test";

test.describe("User Profile Page", () => {
    let page: Page;
    test.beforeAll(async ({ browser, baseURL }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto(`${baseURL}/signin`);

        await page.locator("#username").type("testusername@gmail.com");
        await page.locator("#password").type("testpassword");
        await page.locator("#signInButton").click();
        await page.waitForNavigation();
        await page.goto(`${baseURL}/user/userprofile`, {
            waitUntil: "networkidle"
        });
    });

    test.afterAll(async ({ browser }) => {
        browser.close;
    });

    test("Should have the correct title and a greeting message with an username address", async () => {
        await expect(page).toHaveTitle("User Profile");
        await expect(page.locator("span >> nth=1")).toContainText(
            /^(.+)@(.+)$/
        );
    });
    test("Should make sure the avatar changes", async () => {
        const oldAvatar = await page
            .locator("#avatarImage")
            .getAttribute("src");

        const [response] = await Promise.all([
            page.waitForResponse("http://localhost:3000/api/user/changeavatar"),
            page.locator("#changeAvatarButton").click()
        ]);

        const changedAvatar = await response.json();

        expect(oldAvatar).not.toEqual(changedAvatar);
    });

    test("Should make sure the theme switches", async () => {
        const prevTheme = await page.locator("html").getAttribute("data-theme");
        await page.locator("#darkMode").check();
        const newTheme = await page.locator("html").getAttribute("data-theme");
        expect(prevTheme).not.toEqual(newTheme);
    });

    test("Should delete the account and navigate to the signup screen", async () => {
        await page.locator("#deleteAccountButton").click();
        await page.locator("#confirmDeleteAccountButton").click();
        await page.waitForNavigation();
        await expect(page).toHaveTitle("Sign Up");
    });
});

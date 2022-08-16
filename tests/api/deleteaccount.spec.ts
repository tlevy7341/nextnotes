import { expect, test } from "@playwright/test";

test.describe("[/api/user/delete]", () => {
    test("should return 401 if there is no session", async ({
        request,
        baseURL
    }) => {
        const response = await request.delete(
            `${baseURL}/api/user/deleteaccount`,
            {
                data: {
                    id: 1
                }
            }
        );
        expect(response.status()).toBe(401);
    });
});

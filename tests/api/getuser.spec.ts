import { expect, test } from "@playwright/test";

test.describe("[/api/user/getuser]", () => {
    test("should return 401 if there is no session", async ({
        request,
        baseURL
    }) => {
        const response = await request.post(`${baseURL}/api/user/getuser`, {
            data: {
                id: 1
            }
        });

        expect(response.status()).toBe(401);
    });
});

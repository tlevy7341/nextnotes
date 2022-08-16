import { expect, test } from "@playwright/test";

test.describe("[/api/user/changeavatar]", () => {
    test("should return 401 if there is no session", async ({
        request,
        baseURL
    }) => {
        const response = await request.post(
            `${baseURL}/api/user/changeavatar`,
            {
                data: {
                    id: 1,
                    avatar: "newavatar"
                }
            }
        );

        expect(response.status()).toBe(401);
    });
});

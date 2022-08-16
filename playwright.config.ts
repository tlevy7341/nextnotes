import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    use: {
        // All requests we send go to this API endpoint.
        baseURL: "http://localhost:3000",
        headless: false
    },
    timeout: 5000
};
export default config;

import axios from "axios";

const BASE_URL = "https://nextnotes.vercel.app/api";

const customAxios = axios.create({
    baseURL: BASE_URL,
    headers: { "content-type": "application/json" }
});
customAxios.interceptors.response.use(
    function (response) {
        const url: string = response.request.responseURL;
        if (url.includes("signup")) {
            return response;
        } else {
            return response;
        }
    },
    function ({ response }) {
        return Promise.reject(response.data.error);
    }
);

export default customAxios;

import { AppUser } from "../types/types";
import customAxios from "../utils/axios";

export const getUser = async (id: number) => {
    const response = await customAxios.post<AppUser>("/user/getuser", { id });
    return response.data;
};

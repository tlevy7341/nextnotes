import { AppUserType } from "../shared/sharedtypes";
import customAxios from "../utils/axios";

export const getUser = async (id: number) => {
    const response = await customAxios.post<AppUserType>("/user/getuser", {
        id
    });
    return response.data;
};

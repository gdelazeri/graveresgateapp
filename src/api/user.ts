import { AxiosResponse } from "axios";
import { post, ApiResponse } from "./request";

export interface PostRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface PostRegisterResult {
  accessToken: string;
  refreshToken: string;
}

export const postRegister = async (payload: PostRegisterPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<PostRegisterResult>> = await post(
      "/v1/user",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

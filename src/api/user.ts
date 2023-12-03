import { AxiosResponse } from "axios";
import { post, ApiResponse } from "./request";

export interface PostRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface TokenResult {
  accessToken: string;
  refreshToken: string;
}

export const postRegister = async (payload: PostRegisterPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<TokenResult>> = await post(
      "/v1/user",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export interface PostLoginPayload {
  email: string;
  password: string;
}

export const postLogin = async (payload: PostLoginPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<TokenResult>> = await post(
      "/v1/user/login",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

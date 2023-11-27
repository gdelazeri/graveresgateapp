import { AxiosResponse } from "axios";
import request from "./request";

export interface PostRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface PostRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export const postRegister = async (payload: PostRegisterPayload) => {
  try {
    const response: AxiosResponse<PostRegisterResponse> = await request.post(
      "/v1/user",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

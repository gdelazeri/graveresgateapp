import { AxiosResponse } from "axios";
import { post, ApiResponse, get, put } from "../request";
import { User } from "./types";

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

export const getUserData = async () => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await get("/v1/user");
    return response.data;
  } catch (err) {
    return null;
  }
};

export const listUsers = async () => {
  try {
    const response: AxiosResponse<ApiResponse<User[]>> = await get("v1/user/list");
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await get(`v1/user/getById/${id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const putUserData = async (id: string, payload: any) => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await put(`v1/user/${id}`, payload);
    return response.data;
  } catch (err) {
    return null;
  }
};

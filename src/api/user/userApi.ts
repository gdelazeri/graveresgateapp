import { AxiosError, AxiosResponse } from "axios";
import { post, ApiResponse, get, put, remove } from "../request";
import { User, UserPermission } from "./types";

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
    const error = err as AxiosError<ApiResponse<TokenResult>>;
    return error.response!.data;
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
    const error = err as AxiosError<ApiResponse<TokenResult>>;
    return error.response!.data;
  }
};

export const getUserData = async () => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await get("/v1/user");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<User>>;
    return error.response!.data;
  }
};

export const listAllUsers = async () => {
  try {
    const response: AxiosResponse<ApiResponse<User[]>> =
      await get("/v1/user/list/all");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<User[]>>;
    return error.response!.data;
  }
};

export const listActiveUsers = async ({
  isDriver,
  isLeader,
  permission,
}: {
  isDriver?: boolean;
  isLeader?: boolean;
  permission?: UserPermission;
}) => {
  try {
    const response: AxiosResponse<ApiResponse<User[]>> = await get(
      "/v1/user/list/active",
      {
        isDriver,
        isLeader,
        permission,
      },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<User[]>>;
    return error.response!.data;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await get(
      `/v1/user/getById/${id}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<User>>;
    return error.response!.data;
  }
};

export const putUserData = async (id: string, payload: any) => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await put(
      `/v1/user/${id}`,
      payload,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<User>>;
    return error.response!.data;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<boolean>> = await remove(
      `/v1/user/${id}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<boolean>>;
    return error.response!.data;
  }
};

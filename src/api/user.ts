import { AxiosResponse } from "axios";
import { post, ApiResponse, get, put } from "./request";

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

export interface IUser {
  id: string;
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: UserPermission;
  status: UserStatus;
  isDriver: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserPermission {
  ADMIN = "ADMIN",
  VOLUNTARY = "VOLUNTARY",
  TRAINEE = "TRAINEE",
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export const getUserData = async () => {
  try {
    const response: AxiosResponse<ApiResponse<IUser>> = await get("/v1/user");
    return response.data;
  } catch (err) {
    return null;
  }
};

export const listUsers = async () => {
  try {
    const response: AxiosResponse<ApiResponse<IUser[]>> = await get("v1/user/list");
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<IUser>> = await get(`v1/user/getById/${id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const putUserData = async (id: string, payload: any) => {
  try {
    const response: AxiosResponse<ApiResponse<IUser>> = await put(`v1/user/${id}`, payload);
    return response.data;
  } catch (err) {
    return null;
  }
};

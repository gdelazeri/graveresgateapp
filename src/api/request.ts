import axios from "axios";
import { API_URL } from "@utils/environment";
import { isString } from "@utils/stringHelper";
import storage, { STORAGE_KEYS } from "@utils/storage";

export interface ApiResponse<ResultType> {
  success: boolean;
  error: string | null;
  result: ResultType;
}

const headers = async () => {
  const accessToken = await storage.get(STORAGE_KEYS.ACCESS_TOKEN);
  return {
    Authorization: isString(accessToken) ? `Bearer ${accessToken}` : "",
  };
};

export const post = async (url: string, payload: any) => {
  const header = await headers();
  return axios.post(url, payload, {
    baseURL: API_URL,
    headers: header,
  });
};

export const put = async (url: string, payload: any) => {
  const header = await headers();
  return axios.put(url, payload, {
    baseURL: API_URL,
    headers: header,
  });
};

export const get = async (url: string, params?: any) => {
  const header = await headers();
  return axios.get(url, {
    baseURL: API_URL,
    headers: header,
    params,
  });
};

export const remove = async (url: string) => {
  const header = await headers();
  return axios.delete(url, {
    baseURL: API_URL,
    headers: header,
  });
};

export const patch = async (url: string) => {
  const header = await headers();
  return axios.patch(url, {
    baseURL: API_URL,
    headers: header,
  });
};

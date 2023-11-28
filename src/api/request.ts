import axios from "axios";
import { API_URL } from "../utils/environment";
import useUser from "../hooks/useUser";
import { isString } from "../utils/stringHelper";

export interface ApiResponse<ResultType> {
  success: boolean;
  error: string | null;
  result: ResultType;
}

const headers = async () => {
  const { getTokens } = useUser();
  const { accessToken } = await getTokens();
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

export const get = async (url: string) => {
  const header = await headers();
  return axios.get(url, {
    baseURL: API_URL,
    headers: header,
  });
};

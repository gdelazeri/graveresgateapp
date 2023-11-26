import axios from "axios";
import { API_URL } from "../utils/environment";

const post = async (url: string, payload: any) => {
  const accessToken = "";
  return axios.post(url, payload, {
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const put = async (url: string, payload: any) => {
  const accessToken = "";
  return axios.put(url, payload, {
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const get = async (url: string) => {
  const accessToken = "";
  console.log({
    url,
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axios.get(url, {
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export default {
  post,
  put,
  get,
};

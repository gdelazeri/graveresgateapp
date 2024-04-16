import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";

export const getSetting = async (key: string) => {
  try {
    const response: AxiosResponse<ApiResponse<any>> = await get(`/v1/setting/get/${key}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<any>>;
    return error.response!.data;
  }
};

export const postSetting = async (key: string, value: any) => {
  try {
    const response: AxiosResponse<ApiResponse<any>> = await post(`/v1/setting/${key}`, value);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<any>>;
    return error.response!.data;
  }
};

import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";
import { DriverChecklist, PostDriverChecklistPayload } from "./types";

export const postDriverChecklist = async (payload: PostDriverChecklistPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<{ id: string }>> = await post('/v1/driver-checklist', payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<{ id: string }>>;
    return error.response!.data;
  }
};

export const getDriverChecklist = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<DriverChecklist>> = await get(`/v1/driver-checklist/get/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DriverChecklist>>;
    return error.response!.data;
  }
};

export const listDriverChecklist = async (page: number, pageSize: number) => {
  try {
    const response: AxiosResponse<ApiResponse<DriverChecklist[]>> = await get(`/v1/driver-checklist/list/paged`, { page, pageSize });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DriverChecklist[]>>;
    return error.response!.data;
  }
};

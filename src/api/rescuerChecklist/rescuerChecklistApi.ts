import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";
import { RescuerChecklist, PostRescuerChecklistPayload } from "./types";

export const postRescuerChecklist = async (
  payload: PostRescuerChecklistPayload,
) => {
  try {
    const response: AxiosResponse<ApiResponse<{ id: string }>> = await post(
      "/v1/rescuer-checklist",
      payload,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<{ id: string }>>;
    return error.response!.data;
  }
};

export const getRescuerChecklist = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<RescuerChecklist>> = await get(
      `/v1/rescuer-checklist/get/${id}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<RescuerChecklist>>;
    return error.response!.data;
  }
};

export const listRescuerChecklist = async (page: number, pageSize: number) => {
  try {
    const response: AxiosResponse<ApiResponse<RescuerChecklist[]>> = await get(
      `/v1/rescuer-checklist/list/paged`,
      { page, pageSize },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<RescuerChecklist[]>>;
    return error.response!.data;
  }
};

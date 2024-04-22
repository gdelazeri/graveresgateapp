import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";
import { PostDriverChecklistPayload } from "./types";

export const postDriverChecklist = async (payload: PostDriverChecklistPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<{ id: string }>> = await post('/v1/driver-checklist', payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<{ id: string }>>;
    return error.response!.data;
  }
};

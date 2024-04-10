import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, post } from "../request";
import { PostDutyCareChecklistPayload } from "./types";

export const postDutyCare = async (payload: PostDutyCareChecklistPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<{ id: string }>> = await post('/v1/duty-care-checklist', payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<{ id: string }>>;
    return error.response!.data;
  }
};

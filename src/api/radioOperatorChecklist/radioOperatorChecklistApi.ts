import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";
import { RadioOperatorChecklist, PostRadioOperatorChecklistPayload } from "./types";

export const postRadioOperatorChecklist = async (
  payload: PostRadioOperatorChecklistPayload,
) => {
  try {
    const response: AxiosResponse<ApiResponse<{ id: string }>> = await post(
      "/v1/radio-operator-checklist",
      payload,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<{ id: string }>>;
    return error.response!.data;
  }
};

export const getRadioOperatorChecklist = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<RadioOperatorChecklist>> = await get(
      `/v1/radio-operator-checklist/get/${id}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<RadioOperatorChecklist>>;
    return error.response!.data;
  }
};

export const listRadioOperatorChecklist = async (page: number, pageSize: number) => {
  try {
    const response: AxiosResponse<ApiResponse<RadioOperatorChecklist[]>> = await get(
      `/v1/radio-operator-checklist/list/paged`,
      { page, pageSize },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<RadioOperatorChecklist[]>>;
    return error.response!.data;
  }
};

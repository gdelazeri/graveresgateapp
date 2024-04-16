import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";
import { DutyCareChecklist, PostDutyCareChecklistPayload } from "./types";

export const postDutyCare = async (payload: PostDutyCareChecklistPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<{ id: string }>> = await post('/v1/duty-care-checklist', payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<{ id: string }>>;
    return error.response!.data;
  }
};

export const listDutyCarePaged = async (page: number, pageSize: number) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyCareChecklist[]>> = await get('/v1/duty-care-checklist/list/paged', { page, pageSize });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DutyCareChecklist[]>>;
    return error.response!.data;
  }
};

export const listDutyCareByDutyId = async (dutyId: string) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyCareChecklist[]>> = await get(`/v1/duty-care-checklist/list/duty/${dutyId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DutyCareChecklist[]>>;
    return error.response!.data;
  }
};

export const getDutyCare = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyCareChecklist>> = await get(`/v1/duty-care-checklist/get/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DutyCareChecklist>>;
    return error.response!.data;
  }
};
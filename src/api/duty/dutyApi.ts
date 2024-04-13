import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get, post } from "../request";
import { Duty, DutyPayload, ListDutyPeriod } from "./types";
import { DutyShift } from "@api/dutyRequest/types";

export const listDutyByMonth = async (period: ListDutyPeriod) => {
  try {
    const response: AxiosResponse<ApiResponse<Duty[]>> = await get(
      `/v1/duty/listByMonth/${period}`,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty[]>>;
    return error.response!.data;
  }
};

export const listPreviousDuty = async (page: number, pageSize: number) => {
  try {
    const response: AxiosResponse<ApiResponse<Duty[]>> = await get(
      `/v1/duty/list/previous?page=${page}&pageSize=${pageSize}`,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty[]>>;
    return error.response!.data;
  }
};

export const listNearbyDuty = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Duty[]>> = await get(
      `/v1/duty/list/nearby`,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty[]>>;
    return error.response!.data;
  }
};

export const getDuty = async (date: string, shift: DutyShift) => {
  try {
    const response: AxiosResponse<ApiResponse<Duty>> = await get(
      `/v1/duty/get/${date}/${shift}`,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty>>;
    return error.response!.data;
  }
};

export const postDuty = async (payload: DutyPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<Duty>> = await post(
      '/v1/duty',
      payload,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty>>;
    return error.response!.data;
  }
};

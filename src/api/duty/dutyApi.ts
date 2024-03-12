import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get } from "../request";
import { Duty, ListDutyPeriod } from "./types";

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
      `/v1/duty/listPrevious?page=${page}&pageSize=${pageSize}`,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty[]>>;
    return error.response!.data;
  }
};

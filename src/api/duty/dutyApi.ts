import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get } from "../request";
import { Duty, ListDutyPeriod } from "./types";

export const listDuty = async (period: ListDutyPeriod) => {
  try {
    const response: AxiosResponse<ApiResponse<Duty[]>> = await get(
      `/v1/duty/list?period=${period}`,
    );
    return response.data;
  } catch (err: any) {
    const error = err as AxiosError<ApiResponse<Duty[]>>;
    return error.response!.data;
  }
};

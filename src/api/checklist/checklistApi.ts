import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get } from "../request";
import { Checklist, ChecklistType, DutyChecklist } from "./types";

export const getChecklistQuestions = async (type: ChecklistType) => {
  try {
    const response: AxiosResponse<ApiResponse<Checklist>> = await get(
      `/v1/checklist/questions/${type}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<Checklist>>;
    return error.response!.data;
  }
};

export const listChecklistsByDuty = async (dutyId: string) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyChecklist[]>> = await get(
      `/v1/checklist/list/duty/${dutyId}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DutyChecklist[]>>;
    return error.response!.data;
  }
};

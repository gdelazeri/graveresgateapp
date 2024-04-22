import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get } from "../request";
import { ChecklistQuestion, ChecklistType, DutyChecklist } from "./types";

export const getChecklistQuestions = async (type: ChecklistType) => {
  try {
    const response: AxiosResponse<ApiResponse<ChecklistQuestion[]>> = await get(
      `/v1/checklist/questions/${type}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<ChecklistQuestion[]>>;
    return error.response!.data;
  }
};

export const listChecklistsByDuty = async (dutyId: string) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyChecklist[]>> = await get(
      `/v1/checklist/list/duty/${dutyId}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<DutyChecklist[]>>;
    return error.response!.data;
  }
};

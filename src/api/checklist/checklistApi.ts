import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get } from "../request";
import { ChecklistQuestions, ChecklistType } from "./types";

export const getChecklistQuestions = async (type: ChecklistType) => {
  try {
    const response: AxiosResponse<ApiResponse<ChecklistQuestions>> = await get(
      `/v1/checklist/questions/${type}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<ChecklistQuestions>>;
    return error.response!.data;
  }
};

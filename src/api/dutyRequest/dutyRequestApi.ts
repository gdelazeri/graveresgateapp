import { AxiosResponse } from "axios";
import { post, ApiResponse, get, remove } from "../request";
import { DutyPosition, DutyRequest, DutyRequestListItem, DutyShift } from "./types";

export interface PostDutyRequestPayload {
  date: string;
  shift: DutyShift;
  startAt: string;
  endAt: string;
  note: string;
  positions: DutyPosition[]
}

export const postDutyRequest = async (payload: PostDutyRequestPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyRequest>> = await post(
      "/v1/duty-request",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getDutyRequests = async () => {
  try {
    const response: AxiosResponse<ApiResponse<DutyRequestListItem[]>> = await get(
      "/v1/duty-request/requests",
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getDutyRequestDetails = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<DutyRequestListItem>> = await get(
      `/v1/duty-request/getById/${id}`,
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const deleteDutyRequest = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<boolean>> = await remove(
      `/v1/duty-request/${id}`,
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

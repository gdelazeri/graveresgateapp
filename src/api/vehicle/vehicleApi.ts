import { AxiosError, AxiosResponse } from "axios";
import { post, ApiResponse, get, put } from "../request";
import { Vehicle } from "./types";

export interface PostVehiclePayload {
  name: string;
  licensePlate: string;
}

export const postVehicle = async (payload: PostVehiclePayload) => {
  try {
    const response: AxiosResponse<ApiResponse<Vehicle>> = await post(
      "/v1/vehicle",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<Vehicle>>;
    return error.response!.data;
  }
};

export const getAllVehicles = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Vehicle[]>> = await get("v1/vehicle/list");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<Vehicle[]>>;
    return error.response!.data;
  }
};

export const getVehicleById = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<Vehicle>> = await get(`v1/vehicle/getById/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<Vehicle>>;
    return error.response!.data;
  }
};

export const putVehicle = async (id: string, payload: PostVehiclePayload) => {
  try {
    const response: AxiosResponse<ApiResponse<Vehicle>> = await put(`v1/vehicle/${id}`, payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<Vehicle>>;
    return error.response!.data;
  }
};

import { AxiosError, AxiosResponse } from "axios";
import { post, ApiResponse, get, put } from "../request";
import { VehicleTripData, PostVehicleTripPayload, VehicleTrip } from "./types";

export const postVehicleTrip = async (payload: PostVehicleTripPayload) => {
  try {
    const response: AxiosResponse<ApiResponse<VehicleTrip>> = await post(
      "/v1/vehicle-trip",
      { ...payload },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<VehicleTrip>>;
    return error.response!.data;
  }
};

export const putVehicleTrip = async (
  id: string,
  payload: PostVehicleTripPayload,
) => {
  try {
    const response: AxiosResponse<ApiResponse<VehicleTrip>> = await put(
      `/v1/vehicle-trip/${id}`,
      { ...payload },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<VehicleTrip>>;
    return error.response!.data;
  }
};

export const listVehicleTrip = async (
  page: number,
  pageSize: number,
  vehicleId?: string,
) => {
  try {
    const response: AxiosResponse<ApiResponse<VehicleTripData[]>> = await get(
      "/v1/vehicle-trip/list",
      { page, pageSize, vehicleId },
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<VehicleTripData[]>>;
    return error.response!.data;
  }
};

export const getVehicleTrip = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<VehicleTripData>> = await get(
      `/v1/vehicle-trip/getById/${id}`,
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<VehicleTripData>>;
    return error.response!.data;
  }
};

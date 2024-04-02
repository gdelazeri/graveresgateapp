import { AxiosError, AxiosResponse } from "axios";
import { post, ApiResponse, get, put } from "../request";
import { GetVehicleTripData, PostVehicleTripPayload, VehicleTrip } from "./types";

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

export const putVehicleTrip = async (id: string, payload: PostVehicleTripPayload) => {
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

export const listByVehicle = async (vehicleId: string) => {
  try {
    const response: AxiosResponse<ApiResponse<VehicleTrip[]>> = await get(`/v1/vehicle-trip/listByVehicle/${vehicleId}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<VehicleTrip[]>>;
    return error.response!.data;
  }
};

export const getVehicleTrip = async (id: string) => {
  try {
    const response: AxiosResponse<ApiResponse<GetVehicleTripData>> = await get(`/v1/vehicle-trip/getById/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<GetVehicleTripData>>;
    return error.response!.data;
  }
};

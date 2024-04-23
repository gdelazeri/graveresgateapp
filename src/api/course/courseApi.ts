import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, get } from "../request";
import { Course } from "./types";

export const getAllCourses = async () => {
  try {
    const response: AxiosResponse<ApiResponse<Course[]>> =
      await get("/v1/course/list");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiResponse<Course[]>>;
    return error.response!.data;
  }
};

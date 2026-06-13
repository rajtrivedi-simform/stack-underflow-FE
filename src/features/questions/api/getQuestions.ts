import axiosClient from "../../../shared/api/axiosClient";
import type { ApiResponse } from "../../../shared/types/api";
import type { Question } from "../../../entities/question/types";

export async function getQuestions(): Promise<ApiResponse<Question[]>> {
  const response = await axiosClient.get<ApiResponse<Question[]>>("/questions");
  return response.data;
}

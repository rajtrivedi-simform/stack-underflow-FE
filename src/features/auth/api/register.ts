import axiosClient from "../../../shared/api/axiosClient";
import type { ApiResponse } from "../../../shared/types/api";
import type { User } from "../../../entities/user/types";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends ApiResponse<{
  user: User;
  accessToken: string;
}> {}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await axiosClient.post<RegisterResponse>(
    "/auth/register",
    payload,
  );
  return response.data;
}

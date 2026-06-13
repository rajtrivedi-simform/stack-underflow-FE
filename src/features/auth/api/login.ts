import axiosClient from "../../../shared/api/axiosClient";
import type { ApiResponse } from "../../../shared/types/api";
import type { User } from "../../../entities/user/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse<{
  user: User;
  accessToken: string;
}> {}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axiosClient.post<LoginResponse>(
    "/auth/login",
    payload,
  );
  return response.data;
}

export interface ApiErrorShape {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

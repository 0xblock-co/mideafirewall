import { AxiosRequestConfig } from "axios";

export interface APIResponse<T = never> {
  data: T;
  message: string;
  status: number;
  isSuccess: boolean;
}

export interface ErrorResult {
  isSuccess: boolean;
  isStore: boolean;
  message: string;
  successCode?: string;
  code: any;
}
export interface ErrorCode {
  successCode: any;
  code?: string | number;
  message?: string;
}

export interface SuccessData {
  message: any;
  data: SuccessData;
  successCode: number | string;
  // add other properties if needed
}

export type CustomAxiosConfig = AxiosRequestConfig & {
  _retry?: boolean;
}

// Enum for HTTP methods
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// Union type for HTTP methods
export type HttpMethodType = keyof typeof HttpMethod;
export interface ApiResponse_V2<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
}
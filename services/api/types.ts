export interface APIResponse<T = never> {
  data: T;
  message?: string;
  status: number;
  isSuccess?: boolean;
}

export interface ISentryParams {
  param: any;
  path: string;
  error?: string;
  isCatchError?: boolean;
  response?: any;
  deviceInfo?: string;
  build_version?: string;
}

export type Response = {
  status: number;
  data: any;
  message?: string;
};

export type ErrorData = {
  isSuccess: boolean;
  isStore: boolean;
  message: string;
};

export type SuccessData = {
  isSuccess: boolean;
  data: any;
};

export type SentryErrorData = {
  path: string;
  response?: any;
  error?: any;
  param?: any;
};

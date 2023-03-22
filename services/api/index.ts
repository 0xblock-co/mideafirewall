import { showToast } from "@/utils/alert";
import { errorString } from "@/utils/constants";
import instanceCreator from "@/services/api/instantCreator";
import { ErrorData, SuccessData, Response, SentryErrorData } from "./types";

export default class Api {
  instance: any;

  constructor (baseUrl: string | null = null) {
    this.instance = instanceCreator(baseUrl);
  }

  handleResponse(
    url: string,
    response: Response,
    isErrorHandle: boolean,
    isSuccessHandle: boolean,
    data: any
  ): Promise<ErrorData | SuccessData> {
    const { status } = response;
    switch (status) {
      case 200:
        return Promise.resolve(
          Api.getSuccessData(response.data, isSuccessHandle)
        );
      case 401:
        response.message = "Logout";
        return Promise.resolve(Api.getErrorData(response, isErrorHandle));
      default:
        Api.sendSentryErrorInfo(url, response, data, false);
        return Promise.resolve(Api.getErrorData(response, isErrorHandle));
    }
  }

  request(
    method: string,
    url: string,
    data: any = {},
    conf: any = {},
    isErrorHandle: boolean = true,
    isSuccessHandle: boolean = true
  ): Promise<ErrorData | SuccessData> {
    return this.instance[method](url, data, conf)
      .then((response: Response) =>
        this.handleResponse(url, response, isErrorHandle, isSuccessHandle, data)
      )
      .catch((error: any) => {
        Api.sendSentryErrorInfo(url, error, data, false);
        return Promise.reject(
          Api.getErrorData(
            {
              message: error?.message,
              code: error?.response?.data?.errorCode || error?.code,
            },
            isErrorHandle
          )
        );
      });
  }

  get(
    url: string,
    conf: any = {},
    isErrorHandle: boolean = true,
    isSuccessHandle: boolean = true
  ): Promise<ErrorData | SuccessData> {
    return this.request("get", url, null, conf, isErrorHandle, isSuccessHandle);
  }

  delete(
    url: string,
    data: any = {},
    conf: any = {},
    isErrorHandle: boolean = true,
    isSuccessHandle: boolean = true
  ): Promise<ErrorData | SuccessData> {
    return this.request(
      "delete",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }

  head(url: string, conf: any = {}): Promise<Response> {
    return this.instance
      .head(url, conf)
      .then((response: Response) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  options(url: string, conf: any = {}): Promise<Response> {
    return this.instance
      .options(url, conf)
      .then((response: Response) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  post(
    url: string,
    data: any = {},
    conf: any = {},
    isErrorHandle: boolean = true,
    isSuccessHandle: boolean = true
  ): Promise<ErrorData | SuccessData> {
    return this.request(
      "post",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }
  
  put(
    url: string,
    data: any = {},
    conf: any = {},
    isErrorHandle: boolean = true,
    isSuccessHandle: boolean = true
  ): Promise<ErrorData | SuccessData> {
    return this.request(
      "put",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }

  patch(
    url: string,
    data: any = {},
    conf: any = {},
    isErrorHandle: boolean = true,
    isSuccessHandle: boolean = true
  ): Promise<ErrorData | SuccessData> {
    return this.request(
      "patch",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }

  static getErrorData(
    data: any,
    isHandle: boolean = false
  ): { isSuccess: boolean, isStore: boolean, message: string } {
    if (data.code && isHandle) {
      showToast("error", data.code);
    }
    return {
      isSuccess: false,
      isStore: false,
      message: data.code || errorString.catchError,
    };
  }

  static getSuccessData(
    data: any,
    isHandle: boolean = false
  ): { isSuccess: boolean, data: any } {
    if (isHandle) {
      showToast("success", data?.successCode || errorString.catchError);
    }
    return {
      isSuccess: true,
      data: data || null,
    };
  }

  static sendSentryErrorInfo(
    path: string,
    response: any,
    param: any,
    isCatch: boolean
  ): SentryErrorData {
    const sentryDataOpt: SentryErrorData = {
      param,
      path,
      response: isCatch ? undefined : response,
    };

    if (isCatch) {
      sentryDataOpt.error = response;
    }

    return sentryDataOpt;
  }
}
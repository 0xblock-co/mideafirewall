import instanceCreator from "@/services/api/instantCreator";
import { showToast } from "@/utils/alert";
import { errorString } from "@/utils/constants";

export default class Api {
  instance;

  constructor(baseUrl = null) {
    this.instance = instanceCreator(baseUrl);
  }

  handleResponse(url, response, isErrorHandle, isSuccessHandle, data) {
    const { status } = response;
    switch (status) {
      case 200:
        return Promise.resolve(
          Api.getSuccessData(response.data, isSuccessHandle)
        );
      case 201:
        return Promise.resolve(
          Api.getSuccessData(response.data, isSuccessHandle)
        );
      case 401:
        response.message = "Logout";
        return Promise.resolve(Api.getErrorData(response, isErrorHandle));
      case 400:
        return Promise.resolve(Api.getErrorData(response, isErrorHandle));
      default:
        Api.sendSentryErrorInfo(url, response, data, false);
        return Promise.resolve(Api.getErrorData(response, isErrorHandle));
    }
  }

  request(
    method,
    url,
    data = {},
    conf = {},
    isErrorHandle = true,
    isSuccessHandle = true
  ) {
    return this.instance[method](url, data, conf)
      .then((response) =>
        this.handleResponse(url, response, isErrorHandle, isSuccessHandle, data)
      )
      .catch((error) => {
        return Promise.reject(
          Api.getErrorData(
            {
              message: error?.response?.data || error?.message,
              code: error?.response?.data?.errorCode || error?.code,
            },
            isErrorHandle
          )
        );
      });
  }

  get(url, conf = {}, isErrorHandle = true, isSuccessHandle = true) {
    return this.request("get", url, null, conf, isErrorHandle, isSuccessHandle);
  }

  delete(
    url,
    data = {},
    conf = {},
    isErrorHandle = true,
    isSuccessHandle = true
  ) {
    return this.request(
      "delete",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }

  head(url, conf = {}) {
    return this.instance
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.instance
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(
    url,
    data = {},
    conf = {},
    isErrorHandle = true,
    isSuccessHandle = true
  ) {
    return this.request(
      "post",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }

  put(url, data = {}, conf = {}, isErrorHandle = true, isSuccessHandle = true) {
    return this.request("put", url, data, conf, isErrorHandle, isSuccessHandle);
  }

  patch(
    url,
    data = {},
    conf = {},
    isErrorHandle = true,
    isSuccessHandle = true
  ) {
    return this.request(
      "patch",
      url,
      data,
      conf,
      isErrorHandle,
      isSuccessHandle
    );
  }

  static getErrorData(data, isHandle = false) {
    if (data.code && isHandle && data?.message) {
      showToast("error", data?.message || data?.message?.detail || data.code);
    }
    return {
      isSuccess: false,
      isStore: false,
      message: data?.message?.detail || data.code || errorString.catchError,
    };
  }

  static getSuccessData(data, isHandle = false) {
    if (isHandle) {
      // showToast("success", data?.successCode || errorString.catchError);
    }
    return {
      isSuccess: true,
      data: data || null,
    };
  }

  static sendSentryErrorInfo(path, response, param, isCatch) {
    const sentryDataOpt = {
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

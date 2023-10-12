import {
    AxiosError,
    AxiosResponse,
    CancelTokenSource,
    Method,
} from "axios";
import instanceCreator from "./instanceCreator";

import { errorString } from "@/constants/global.constants";
import { ToastMessage } from "@/utils/toastMessage.utils";
import { CustomAxiosConfig, ErrorResult, SuccessData } from "./axios";

class Api {
    private static _instance: Api;
    instance: any; // The Axios instance used for making HTTP requests

    constructor (baseUrl = null) {
        this.instance = instanceCreator(baseUrl);
    }

    // create a new CancelTokenSource
    createCancelTokenSource(): CancelTokenSource {
        return this.instance.CancelToken.source();
    }

    static getInstance(baseUrl = null): Api {
        if (!Api._instance) {
            Api._instance = new Api(baseUrl);
        }
        return Api._instance;
    }

    /**
     * Handle the response from an API request.
     *
     * @param response - The AxiosResponse received from the API request.
     * @param url - The URL of the API request.
     * @param data - The data sent in the API request.
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data.
     */
    async handleResponse<T, D extends object | null>(
        response: AxiosResponse<D>,
        url: string,
        data: D,
        isErrorHandle: boolean,
        isSuccessHandle: boolean
    ): Promise<T> {
        // Handle success(2xx), client errors(4xx), and server errors(5xx)
        let errorData: ErrorResult;
        switch (true) {
            case response.status >= 200 && response.status < 300:
                return Api.getSuccessData(
                    response.data as SuccessData,
                    isSuccessHandle
                ) as T;

            case response.status >= 400 && response.status < 500:
                errorData = {
                    isSuccess: false,
                    code: response.status,
                    message: response.statusText,
                    isStore: false,
                };
                throw new Error(
                    JSON.stringify(Api.getErrorData(errorData, isErrorHandle))
                );

            case response.status >= 500:
                errorData = {
                    isSuccess: false,
                    code: response.status,
                    message: errorString.serverError,
                    isStore: false,
                };
                throw new Error(
                    JSON.stringify(Api.getErrorData(errorData, isErrorHandle))
                );

            default:
                errorData = {
                    isSuccess: false,
                    code: response.status,
                    message: errorString.unknownError,
                    isStore: false,
                };
                throw new Error(
                    JSON.stringify(Api.getErrorData(errorData, isErrorHandle))
                );
        }
    };

    /**
     * Handle errors from an API request.
     *
     * @param error - The AxiosError received from the API request.
     * @param url - The URL of the API request.
     * @param data - The data sent in the API request.
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @returns A Promise that rejects with the error data.
     */
    private handleError<T>(
        error: AxiosError,
        url: string,
        data: object | null,
        isErrorHandle: boolean
    ): Promise<T> {
        if (error.response) {
            const errorData = {
                code: error.response.status,
                message: error.response.statusText,
            };
            return Promise.reject<T>(Api.getErrorData(errorData, isErrorHandle));
        }
        const errorData = { message: error.message, code: error.code };
        return Promise.reject<T>(Api.getErrorData(errorData, isErrorHandle));
    }

    /**
     * Expose a public function to make requests using the private makeRequest method.
     *
     * @param method - The HTTP method for the request.
     * @param url - The URL of the API request.
     * @param data - The data to send in the API request (optional).
     * @param conf - Axios request configuration (optional).
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data or rejects with the error data.
     */
    public async makeCustomRequestBaseQuery<T>(
        method: Method,
        url: string,
        data: object | null,
        conf: CustomAxiosConfig,
        isErrorHandle: boolean,
        isSuccessHandle: boolean
    ): Promise<T> {
        return this.makeRequest<T>(
            method,
            url,
            data,
            conf,
            isErrorHandle,
            isSuccessHandle
        );
    }

    /**
     * Make an API request with the specified method.
     *
     * @param method - The HTTP method for the request.
     * @param url - The URL of the API request.
     * @param data - The data to send in the API request (optional).
     * @param conf - Axios request configuration (optional).
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data or rejects with the error data.
     */
    private makeRequest<T>(
        method: Method,
        url: string,
        data: object | null,
        conf: CustomAxiosConfig,
        isErrorHandle: boolean,
        isSuccessHandle: boolean
    ): Promise<T> {
        return this.instance
            .request({
                method,
                url,
                data,
                ...conf,
            })
            .then((response: AxiosResponse<T>) => {
                return this.handleResponse<T, any>(
                    response,
                    url,
                    data,
                    isErrorHandle,
                    isSuccessHandle
                );
            })
            .catch((error: AxiosError) =>
                this.handleError(error, url, data, isErrorHandle)
            );
    }

    /**
     * Make a GET request to the specified URL.
     *
     * @param url - The URL of the API request.
     * @param conf - Axios request configuration (optional).
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data or rejects with the error data.
     */
    get<T>(
        url: string,
        conf: CustomAxiosConfig = {},
        isErrorHandle = true,
        isSuccessHandle = true
    ): Promise<T> {
        return this.makeRequest<T>(
            "get",
            url,
            null,
            conf,
            isErrorHandle,
            isSuccessHandle
        );
    }

    /**
     * Make a POST request to the specified URL.
     *
     * @param url - The URL of the API request.
     * @param data - The data to send in the API request.
     * @param conf - Axios request configuration (optional).
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data or rejects with the error data.
     */
    post<T>(
        url: string,
        data: object | null,
        conf: CustomAxiosConfig = {},
        isErrorHandle = true,
        isSuccessHandle = true
    ): Promise<T> {
        return this.makeRequest<T>(
            "post",
            url,
            data,
            conf,
            isErrorHandle,
            isSuccessHandle
        );
    }

    /**
     * Make a PUT request to the specified URL.
     *
     * @param url - The URL of the API request.
     * @param data - The data to send in the API request.
     * @param conf - Axios request configuration (optional).
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data or rejects with the error data.
     */
    put<T>(
        url: string,
        data: object | null,
        conf: CustomAxiosConfig = {},
        isErrorHandle = true,
        isSuccessHandle = true
    ): Promise<T> {
        return this.makeRequest<T>(
            "put",
            url,
            data,
            conf,
            isErrorHandle,
            isSuccessHandle
        );
    }

    /**
     * Make a DELETE request to the specified URL.
     *
     * @param url - The URL of the API request.
     * @param conf - Axios request configuration (optional).
     * @param isErrorHandle - Whether to handle errors (default: true).
     * @param isSuccessHandle - Whether to handle success messages (default: true).
     * @returns A Promise that resolves to the response data or rejects with the error data.
     */
    delete<T>(
        url: string,
        conf: CustomAxiosConfig = {},
        isErrorHandle = true,
        isSuccessHandle = true
    ): Promise<T> {
        return this.makeRequest<T>(
            "delete",
            url,
            null,
            conf,
            isErrorHandle,
            isSuccessHandle
        );
    }

    /**
     * Check if an error is an Axios cancellation error.
     *
     * @param error - The error to check.
     * @returns True if the error is an Axios cancellation error, false otherwise.
     */
    isCancel(error: any): boolean {
        return this.instance.isCancel(error);
    }

    /**
    * Extract success data from the Axios response.
    *
    * @param data - The success data from the Axios response.
    * @param isSuccessHandle - Whether to handle success messages.
    * @returns An object with isSuccess and data properties.
    */
    private static getSuccessData<T>(
        data: SuccessData,
        isSuccessHandle: boolean
    ): T | SuccessData | any {
        if (isSuccessHandle) {
            ToastMessage.success(data?.message?.toString() || data?.successCode?.toString() || "Request has been successfully processed");
        }
        // TODO:: Need to check data.data is available or not from the all apis
        // console.log('data: ', data.data);
        return {
            isSuccess: true,
            data: data.data || data || null,
        };
    }

    /**
     * Prepare error data for consistent handling.
     *
     * @param errorData - The error data to prepare.
     * @param isErrorHandle - Whether to handle error messages.
     * @returns An object with isSuccess, isStore, code, and message properties.
     */
    private static getErrorData(
        errorData: ErrorResult | any,
        isErrorHandle: boolean
    ): ErrorResult | any {
        // Prepare error data
        if (isErrorHandle && errorData.code) {
            ToastMessage.error(errorData?.message?.toString() || errorData?.successCode?.toString() || errorString.catchError);
        }

        const code: string | number = errorData.code || "";

        return {
            isSuccess: false,
            isStore: false,
            code: code.toString(),
            message: errorData.message || errorString.catchError,
        };
    }
}

export default Api;

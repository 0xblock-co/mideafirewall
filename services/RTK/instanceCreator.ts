/* eslint-disable no-undef */
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from "axios";

import getConfig from "next/config";

type CustomAxiosConfig = AxiosRequestConfig & {
    _retry?: boolean;
}

/**
 * Create an Axios instance with optional base URL.
 *
 * @param baseUrl - The base URL to use for the Axios instance (optional).
 * @returns The created AxiosInstance.
 */
const instanceCreator = (baseUrl = null): AxiosInstance => {
    const { publicRuntimeConfig } = getConfig();

    let isRefreshing = false;

    // Axios configuration options
    const options: AxiosRequestConfig = {
        baseURL: baseUrl || (publicRuntimeConfig.apiPath as string),
    };

    // Create the Axios instance with the specified options
    const instance: AxiosInstance = axios.create(options);

    /**
     * Refresh the access token using the refresh token.
     * This function is called when the access token is expired, but a valid refresh token is available.
     * It updates the Authorization header of the Axios instance with the new access token.
     */
    const refreshAccessToken = async () => {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                // Call the AuthService API to get a new access token using the refresh token
                // const response = await AuthService.getAccessTokenByRefreshToken();
                // return response;
                return;
            } catch (error) {
                return error;
            } finally {
                isRefreshing = false;
            }
        }
    };

    /**
     * Interceptor function that handles successful requests.
     * It checks if the access token is valid and updates the Authorization header if needed.
     * If the access token is not valid but a valid refresh token is available, it refreshes the access token.
     * If no valid refresh token is available, the user is redirected to the sign-in page.
     *
     * @param request - The Axios request config.
     * @returns The updated Axios request config.
     */
    const requestInterceptorSuccess = async (
        request: InternalAxiosRequestConfig<any>
    ): Promise<InternalAxiosRequestConfig<any>> => {
        // request.withCredentials = true;
        console.log('request: ', request);
        return request;
    };

    /**
     * Interceptor function that handles error responses.
     * If the response status is 401 (unauthorized) and the request has not been retried,
     * it tries to refresh the access token and retries the request with the updated token.
     *
     * @param error - The Axios error object.
     * @returns A rejected Promise with the error object or a new Axios request.
     */
    const responseInterceptorError = async (error: AxiosError) => {
        const config = error?.config as CustomAxiosConfig;
        if (error?.response?.status === 401 && !config._retry) {
            const refreshTokenResponse = await refreshAccessToken();
            if (!refreshTokenResponse.isSuccess) {
                // NOTE:: Need to sign out if refresh token is not valid
                // await AuthService.signOut()
                return Promise.reject(error);
            }
            config._retry = true;
            // config.withCredentials = true;
            return axios(config);
        }

        return Promise.reject(error);
    };

    // Add the interceptors to the instance
    instance.interceptors.request.use(
        requestInterceptorSuccess,
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => {
            console.log('response: ', response);
            return response
        },
        responseInterceptorError
    );

    return instance;
};

export default instanceCreator;

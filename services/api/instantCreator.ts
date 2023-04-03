import axios from "axios";
import Router from "next/router";
import appConfig from "@/config";
import { localStorageKeys } from "@/utils/constants";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";

const instanceCreator = (baseUrl = appConfig.BASE_URL) => {
  const instance = axios.create({
    baseURL: baseUrl || appConfig.BASE_URL,
    timeout: 120000, // 60000
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  // instance.interceptors.request.use(async (config) => {
  //   const token = readCookie(localStorageKeys.authKey);
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }

  //   if (config.url === "/auth/logout" && config.headers?.Authorization !== "") {
  //     delete config.headers.Authorization;
  //   }

  //   return config;
  // });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        const email = readCookie(localStorageKeys.userEmail) || "";
        try {
          const res = await axios.post(`${baseUrl}/auth/logout`, { email });
          if (res?.data?.successCode) {
            localStorage.clear();
            eraseCookie(localStorageKeys.authKey);
            eraseCookie(localStorageKeys.userEmail);
            Router.push(`/account-security/login`);
          }
        } catch (e) {
          console.error(e);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default instanceCreator;

import { createContext, useContext, useEffect, useState } from "react";

import { localStorageKeys } from "@/constants/global.constants";
import { authActions, getUserDetails } from "@/store/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";
import getConfig from "next/config";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const userDetails = useAppSelector(getUserDetails);
    const [user, setUser] = useState(userDetails);
    const [allFeatures, setAllFeatures] = useState([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "zsiqscript";
        script.innerHTML = `
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
                widgetcode: "${publicRuntimeConfig.zohoSalesIq}",
                values: {},
                ready: function () {}
            };
            var d = document;
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zohopublic.in/widget";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
        `;
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        setUser(userDetails);

        // const accessToken = readCookie(localStorageKeys.userAccessToken);
        // const refreshToken = readCookie(localStorageKeys.userRefreshToken);
        // if (CommonUtility.isNotEmptyObject(userDetails) && accessToken && refreshToken) {
        // const script = document.createElement("script");
        // script.type = "text/javascript";
        // script.id = "zsiqscript";
        // script.innerHTML = `
        //     var $zoho = $zoho || {};
        //     $zoho.salesiq = $zoho.salesiq || {
        //         widgetcode: "${publicRuntimeConfig.zohoSalesIq}",
        //         values: {},
        //         ready: function () {}
        //     };
        //     var d = document;
        //     var s = d.createElement("script");
        //     s.type = "text/javascript";
        //     s.id = "zsiqscript";
        //     s.defer = true;
        //     s.src = "https://salesiq.zohopublic.in/widget";
        //     var t = d.getElementsByTagName("script")[0];
        //     t.parentNode.insertBefore(s, t);
        // `;
        // document.head.appendChild(script);
        // }
    }, [userDetails]);

    // useEffect(() => {
    //   async function loadUserFromCookies() {
    //     const token = readCookie(localStorageKeys.authKey);
    //     if (token) {
    //       const user = decodeData(token, localStorageKeys.authKey);
    //       if (user) setUser(user);
    //     }
    //     setLoading(false);
    //   }
    //   loadUserFromCookies();
    // }, []);

    // const login = async (user) => {
    //   if (user) {
    //     const token = encodeData(user, localStorageKeys.authKey);
    //     createCookie(localStorageKeys.authKey, token, 5);
    //     setUser(user);
    //   }
    // };

    const logout = () => {
        eraseCookie(localStorageKeys.userAccessToken);
        eraseCookie(localStorageKeys.userRefreshToken);
        localStorage.clear();
        dispatch(authActions.clearAuthStore());
        setUser(null);
        Router.push("/");
    };

    const setAllFeatureList = (featureList) => {
        setAllFeatures(featureList);
    };

    const checkAuthRouteV2 = () => {
        if (typeof window === "undefined") {
            return { isActive: false, route: "/" };
        }

        const accessToken = readCookie(localStorageKeys.userAccessToken);
        const refreshToken = readCookie(localStorageKeys.userRefreshToken);

        if (accessToken && refreshToken) {
            if (!user) {
                return { isActive: false, route: "/" };
            }

            if (CommonUtility.isNotEmptyObject(user) && !user.emailVerified) {
                return { isActive: false, route: "/account-security/login" };
            }

            if (CommonUtility.isNotEmptyObject(user) && !user.surveyAnswered) {
                return { isActive: false, route: "/survey" };
            }

            return { isActive: true, route: "/features-list" };
        }

        return { isActive: false, route: "/" };
    };

    return (
        <AuthContext.Provider
            value={{
                isLogin: user?.isLoggedIn || false,
                user,
                logout,
                checkAuthRouteV2,
                setAllFeatureList,
                allFeatures,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

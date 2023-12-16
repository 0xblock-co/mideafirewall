import { localStorageKeys } from "@/constants/global.constants";
import { authActions, getUserDetails } from "@/store/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { eraseCookie, readCookie } from "@/utils/cookieCreator";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContextV3 = createContext({});

const AuthProvider = ({ children }) => {
    const { pathname, events, replace } = useRouter();
    const userDetailsData = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoadingApp, setIsLoadingApp] = useState(true);
    const [currentRoute, setCurrentRoute] = useState("");

    const userDetails = async (isRedirectedToDashboard) => {
        if (window.top === window.self) {
            const accessToken = readCookie(localStorageKeys.userAccessToken);
            setIsAuthenticated(!!accessToken);
            if (isRedirectedToDashboard && accessToken) {
                replace("/");
                return;
            }

            if (accessToken && userDetailsData) {
                setUser(userDetailsData);
            }
        }
    };

    useEffect(() => {
        const loadUserDetails = async () => {
            userDetails();
            setAppLoading();
        };
        loadUserDetails();
    }, [userDetailsData]);

    useEffect(() => {
        const handleRouteChange = (url) => {
            setCurrentRoute(url);
            if (url.indexOf("/account-security/login") < -1 && !isAuthenticated && !isLoadingApp) {
                replace("/account-security/login");
            }
        };

        setCurrentRoute(pathname);
        setAppLoading();

        events.on("routeChangeStart", handleRouteChange);
        return () => {
            events.off("routeChangeStart", handleRouteChange);
        };
    }, [events, isAuthenticated, isLoadingApp, pathname, replace]);

    const setAppLoading = () => {
        // const screenLoader = document.getElementsByClassName("screen_loader");
        // if (screenLoader?.length) {
        setTimeout(() => {
            setIsLoadingApp(false);
        }, 300);
        // }
    };

    const checkIsLoggedIn = () => {
        setIsLoadingApp(true);
        userDetails(true);
    };

    const checkIsValidRoute = () => {
        if (CommonUtility.isNotEmptyObject(user) && user?.isLoggedIn) {
            // check isSurveyAnswered or not
            if (currentRoute === "/survey") {
                if (user?.surveyAnswered) {
                    console.log("Called");
                    replace("/network-blog");
                }
            }
        }
    };
    const logout = () => {
        eraseCookie(localStorageKeys.userAccessToken);
        eraseCookie(localStorageKeys.userRefreshToken);
        localStorage.clear();
        dispatch(authActions.clearAuthStore());
        setUser(null);
        replace("/");
    };

    const authContextValue = {
        isLoadingApp,
        setIsLoadingApp,
        setIsAuthenticated,
        checkIsLoggedIn,
        checkIsValidRoute,
        logout,
        user,
        isLogin: !!user,
        currentRoute,
        isAuthenticated,
    };

    return <AuthContextV3.Provider value={authContextValue}>{children}</AuthContextV3.Provider>;
};
export const useAuthV3 = () => useContext(AuthContextV3);

export default AuthProvider;

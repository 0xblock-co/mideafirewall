import CommonUtility from "@/utils/common.utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthV3 } from "./auth.context";

const OnlyForAuthRoute = (Component) => {
    const OnlyForAuthRouteComponent = (props) => {
        const authContextData = useAuthV3();

        const { replace } = useRouter();

        useEffect(() => {
            if (authContextData?.isLoadingApp || (!authContextData?.isAuthenticated && window.location.pathname !== "/")) {
                return;
            }
        }, [authContextData?.isAuthenticated, authContextData?.isLoadingApp, authContextData?.currentRoute, replace]);

        if (!authContextData?.isLoadingApp && authContextData?.isAuthenticated) {
            if (authContextData && CommonUtility.isNotEmptyObject(authContextData?.user) && authContextData?.user?.isLoggedIn) {
                if (
                    authContextData?.currentRoute &&
                    authContextData?.currentRoute !== "" &&
                    ["/account-security/login", "account-security/signup", "/account-security/forgot-password", "/account-security/change-password"].includes(authContextData?.currentRoute)
                ) {
                    replace("/");
                }
            }
        }

        // return authContextData?.isLoadingApp ? null : <Component {...props} test="tet" />;
        return <Component {...props} />;
    };

    OnlyForAuthRouteComponent.displayName = `OnlyForAuthRoute(${Component.displayName || Component.name || "Component"})`;

    return OnlyForAuthRouteComponent;
};

export default OnlyForAuthRoute;

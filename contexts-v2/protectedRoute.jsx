import CommonUtility from "@/utils/common.utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthV3 } from "./auth.context";

const ProtectRoute = (Component) => {
    const ProtectRouteComponent = (props) => {
        const authContextData = useAuthV3();

        const { replace } = useRouter();

        useEffect(() => {
            if (authContextData?.isLoadingApp || (!authContextData?.isAuthenticated && window.location.pathname !== "/")) {
                return;
            }
        }, [authContextData?.isAuthenticated, authContextData?.isLoadingApp, authContextData?.currentRoute, replace]);

        if (!authContextData?.isLoadingApp && !authContextData?.isAuthenticated) {
            replace("/account-security/login");
            // if (query && Object.hasOwnProperty.call(query, "redirectUrl")) replace(`${query.redirectUrl}`);
        }

        if (!authContextData?.isLoadingApp && authContextData?.isAuthenticated) {
            if (authContextData && CommonUtility.isNotEmptyObject(authContextData?.user) && authContextData?.user?.isLoggedIn) {
                if (!authContextData?.user.emailVerified) {
                    replace("/account-security/login");
                    return;
                }
                if (authContextData?.currentRoute == "/survey") {
                    if (authContextData?.user?.surveyAnswered && authContextData?.user?.surveyAnswered == true) {
                        replace("/features-list");
                    }
                }

                if (authContextData?.user?.surveyAnswered && authContextData?.user?.surveyAnswered == false) {
                    replace("/survey");
                }
            }
        }

        // return authContextData?.isLoadingApp ? null : <Component {...props} />;
        return <Component {...props} />;
    };

    ProtectRouteComponent.displayName = `ProtectRoute(${Component.displayName || Component.name || "Component"})`;

    return ProtectRouteComponent;
};

export default ProtectRoute;

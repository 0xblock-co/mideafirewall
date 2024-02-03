import RenderIf from "@/components/ConditionalRender/RenderIf";
import Loader from "@/components/Loader";
import { localStorageKeys } from "@/constants/global.constants";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { useServiceStatus } from "@/contexts-v2/serviceStatusContext";
import { asyncGetAllContents, asyncGetMFWTestCustomers } from "@/services/product/product.service";
import { asyncGetAllHeaderData } from "@/services/shared/defaultConfig.service";
import { getAllHeaderDataOptions, setAllMediaContents, setMfwTestCustomers } from "@/store/defaultConfig.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { readCookie } from "@/utils/cookieCreator";
import { asyncGetAccessToken } from "@/utils/globalFunctions";
import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import UnderMaintenance from "../UnderMaintanceBanner";

const FooterComponent = dynamic(() => import("@/components/layouts/footer"), {
    ssr: false,
});
const HeaderComponent = dynamic(() => import("@/components/layouts/header"), {
    ssr: false,
});
function organizeDataByPageId(data) {
    // Initialize an empty object to store the organized data
    const organizedData = {};

    // Iterate over the input data array
    data.forEach((item) => {
        // Extract the pageId from the current item
        const { pageId } = item;

        // If the pageId is not a key in the organizedData object, initialize it with an empty array
        if (!organizedData[pageId]) {
            organizedData[pageId] = [];
        }

        // Push the current item to the array corresponding to the pageId
        organizedData[pageId].push(item);
    });

    return organizedData;
}

const MainLayout = ({ children }) => {
    const dispatch = useAppDispatch();
    const { isServiceAvailable } = useServiceStatus();

    const headerData = useAppSelector(getAllHeaderDataOptions);
    const { isLogin, isAuthenticated, isLoadingApp } = useAuthV3();

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.min.js");
        async function getMFWTestCustomers() {
            const result = await asyncGetMFWTestCustomers();
            if (result && result?.isSuccess) {
                dispatch(setMfwTestCustomers(result?.data || []));
            }
        }
        async function getContents() {
            const result = await asyncGetAllContents();
            if (result && result?.isSuccess) {
                const res = organizeDataByPageId(result?.data);
                dispatch(setAllMediaContents(res));
            }
        }
        getContents();

        if (headerData && headerData?.length == 0) {
            getProducts();
        }
        if (isLogin) getMFWTestCustomers();
    }, [isLogin]);

    useEffect(() => {
        if (isLogin && isAuthenticated) {
            if (typeof window !== "undefined") {
                const token = readCookie(localStorageKeys.userAccessToken);
                if (!token) {
                    const refreshToken = readCookie(localStorageKeys.userRefreshToken);
                    if (refreshToken) {
                        asyncGetAccessToken();
                    }
                }
            }
        }
    });

    const getProducts = async () => {
        dispatch(asyncGetAllHeaderData({}));
    };

    return (
        <Fragment>
            <HeaderComponent />
            <main className="mdf__main_top_fix">
                <RenderIf isTrue={isLoadingApp}>
                    <Loader isLoading={isLoadingApp} />
                </RenderIf>
                {isServiceAvailable ? (
                    <>
                        {children}
                        <FooterComponent />
                    </>
                ) : (
                    <>
                        <UnderMaintenance />
                        <FooterComponent />
                    </>
                )}
            </main>
        </Fragment>
    );
};

export default MainLayout;

import { useRouter } from "next/router";
import { useEffect } from "react";

import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import UploadTabs from "@/components/UploadBlocks/upload-tabs";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import CommonUtility from "@/utils/common.utils";
import { getUrlVars } from "@/utils/globalFunctions";

const Uploads = () => {
    const router = useRouter();
        const { user, isLogin } = useAuthV3();

    // const mfw_customersList = useAppSelector(getMfwTestCustomersSelector);
    // useEffect(() => {
    //     if(isLogin){
    //         const currentUserEmail = user?.userDetails?.email;
    //         if (mfw_customersList && !mfw_customersList.includes(currentUserEmail)) {
    //             newInfoAlert(
    //                 "Service under maintenance",
    //                 "Sorry for the inconvenience. We're currently going through a quarterly scheduled maintenance and upgrade. Please return on January 4, 2024 to experience our offerings! Existing customer's request and filters will not be affected. Thanks for your understanding.",
    //                 "Got It.",
    //                 "warning",
    //                 false,
    //                 "",
    //                 false
    //             ).then(()=>{
    //                 router.replace("/features-list");
    //             });
    //             return;
    //         }
    //     }
    // }, []);

    useEffect(() => {
        const queryParamData = router.query || getUrlVars();

        if (CommonUtility.isNotEmptyObject(queryParamData) && (!("filters" in queryParamData) || !CommonUtility.isNotEmpty(queryParamData.filters))) {
            router.push("/features-list");
        }
        // if(isLogin){
        //     const currentUserEmail = user?.userDetails?.email;
        //     if (mfw_customersList && !mfw_customersList.includes(currentUserEmail)) {
        //         newInfoAlert(
        //             "Service under maintenance",
        //             "Sorry for the inconvenience. We're currently going through a quarterly scheduled maintenance and upgrade. Please return on January 4, 2024 to experience our offerings! Existing customer's request and filters will not be affected. Thanks for your understanding.",
        //             "Got It.",
        //             "warning",
        //             false,
        //             "",
        //             false
        //         );
        //         return;
        //     }
        // }
    }, [router.query]);

    return (
        <BoxContainerWithFilterIconWrapper>
            <UploadTabs />
        </BoxContainerWithFilterIconWrapper>
    );
};
export default ProtectRoute(Uploads);

import { useRouter } from "next/router";
import { useEffect } from "react";

import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import UploadTabs from "@/components/UploadBlocks/upload-tabs";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import CommonUtility from "@/utils/common.utils";
import { getUrlVars } from "@/utils/globalFunctions";

const Uploads = () => {
    const router = useRouter();
    useEffect(() => {
        const queryParamData = router.query || getUrlVars();

        if (CommonUtility.isNotEmptyObject(queryParamData) && (!("filters" in queryParamData) || !CommonUtility.isNotEmpty(queryParamData.filters))) {
            router.push("/features-list");
        }
    }, [router.query]);

    return (
        <BoxContainerWithFilterIconWrapper>
            <UploadTabs />
        </BoxContainerWithFilterIconWrapper>
    );
};
export default ProtectRoute(Uploads);

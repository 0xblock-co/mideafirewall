import { useRouter } from "next/router";
import { useEffect } from "react";

import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import UploadTabs from "@/components/UploadBlocks/upload-tabs";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import CommonUtility from "@/utils/common.utils";

const Uploads = () => {
    const router = useRouter();
    useEffect(() => {
        if (CommonUtility.isNotEmptyObject(router.query) && (!("filters" in router.query) || !CommonUtility.isNotEmpty(router.query.filters))) {
            router.push("/network-blog");
        }
    }, [router.query]);

    return (
        <BoxContainerWithFilterIconWrapper>
            <UploadTabs />
        </BoxContainerWithFilterIconWrapper>
    );
};
export default ProtectRoute(Uploads);

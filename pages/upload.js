import { useRouter } from "next/router";
import { useEffect } from "react";

import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import UploadTabs from "@/components/UploadBlocks/upload-tabs";
import { useAuth } from "@/contexts/AuthContext";
import CommonUtility from "@/utils/common.utils";
export default function Uploads() {
  const { checkAuthRouteV2 } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const { isActive, route } = checkAuthRouteV2();
    if (!isActive) {
      router.push(route);
    } else if (
      CommonUtility.isNotEmptyObject(router.query) &&
      (!("filters" in router.query) ||
        !CommonUtility.isNotEmpty(router.query.filters))
    ) {
      router.push("/network-blog1");
    }
  }, [checkAuthRouteV2, router.query]);

  return (
    <BoxContainerWithFilterIconWrapper>
      <UploadTabs />
    </BoxContainerWithFilterIconWrapper>
  );
}

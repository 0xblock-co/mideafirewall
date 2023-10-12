import Router, { useRouter } from "next/router";
import { useEffect } from "react";

import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import UploadTabs from "@/components/UploadBlocks/upload-tabs";
import { checkAuthRoute } from "@/utils/globalFunctions";
export default function Uploads() {
  const router = useRouter();
  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    if (!isActive) {
      Router.push(route);
      return;
    }

    // if (
    //   !router.query.hasOwnProperty("filters") ||
    //   router.query?.filters === ""
    // ) {
    //   console.log("iside");
    //   // router.push("/network-blog");
    // }
  }, []);

  return (
    <BoxContainerWithFilterIconWrapper>
      <UploadTabs />
    </BoxContainerWithFilterIconWrapper>
  );
}

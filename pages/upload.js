import Router from "next/router";
import { useEffect } from "react";

import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import UploadTabs from "@/components/UploadBlocks/upload-tabs";
import { checkAuthRoute } from "@/utils/globalFunctions";
export default function Uploads() {
  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    if (!isActive) {
      Router.push(route);
      return;
    }
  }, []);

  return (
    <BoxContainerWithFilterIconWrapper>
      <UploadTabs />
    </BoxContainerWithFilterIconWrapper>
  );
}

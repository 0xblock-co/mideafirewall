import Router from "next/router";
import { Fragment, useEffect } from "react";

import NeetworkBanner from "@/components/NetworkBlog/banner-top";
import NeetworkBlock from "@/components/NetworkBlog/network-block";
import { checkAuthRoute } from "@/utils/globalFunctions";

const NetworkBlog = () => {
  useEffect(() => {
    const { isActive, route } = checkAuthRoute();
    if (!isActive) {
      Router.push(route);
      return;
    }
  }, []);

  return (
    <Fragment>
      <div className="bg__light_blue">
        <NeetworkBanner />
        <NeetworkBlock />
      </div>
    </Fragment>
  );
};

export default NetworkBlog;

import Router from "next/router";
import React, { useEffect } from "react";

import { checkIsAuth } from "@/utils/globalFunctions";

const DemoPage = () => {
  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/account-security/login");
      return;
    }
  }, []);
  return <div>Demo</div>;
};

export default DemoPage;

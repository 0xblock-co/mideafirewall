import { Fragment } from "react";

import NetworkBanner from "@/components/NetworkBlog/banner-top";
import NetworkBlock from "@/components/NetworkBlog/network-block";
import style from "@/components/NetworkBlog/network-blog.module.scss";

const NetworkBlog = () => {
  return (
    <Fragment>
      <div className={style.bg__light_blue}>
        <NetworkBanner />
        <NetworkBlock />
      </div>
    </Fragment>
  );
};

export default NetworkBlog;

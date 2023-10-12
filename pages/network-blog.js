import { Fragment } from "react";

import NeetworkBanner from "@/components/NetworkBlog/banner-top";
import NeetworkBlock from "@/components/NetworkBlog/network-block";
import style from "@/components/NetworkBlog/network-blog.module.scss";
import {
  getAllFeatures,
  getRunningQueriesThunk,
} from "@/services/shared/common.service";
import { wrapper } from "@/store";

const NetworkBlog = (props) => {
  return (
    <Fragment>
      <div className={style.bg__light_blue}>
        <NeetworkBanner />
        <NeetworkBlock
          allFeatures={
            props.result.data?.isSuccess && props.result.data?.response
          }
        />
      </div>
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getAllFeatures.initiate({}));
    const res = await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: { result: res[0] },
    };
  }
);

export default NetworkBlog;

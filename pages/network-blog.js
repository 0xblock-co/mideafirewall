import { Fragment } from "react";

import NeetworkBanner from "@/components/NetworkBlog/banner-top";
import NeetworkBlock from "@/components/NetworkBlog/network-block";
import style from "@/components/NetworkBlog/network-blog.module.scss";

const NetworkBlog = () => {
  return (
    <Fragment>
      <div className={style.bg__light_blue}>
        <NeetworkBanner />
        <NeetworkBlock />
      </div>
    </Fragment>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(getAllFeatures.initiate({}));
//     const res = await Promise.all(store.dispatch(getRunningQueriesThunk()));
//     console.log("res: ", res);
//     return {
//       props: { result: res[0] },
//     };
//   }
// );

export default NetworkBlog;

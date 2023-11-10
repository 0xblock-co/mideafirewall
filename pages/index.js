import RenderIf from "@/components/ConditionalRender/RenderIf";

import { getAllHeaderDataOptionsUpdated } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import dynamic from "next/dynamic";
import { Fragment } from "react";

// const Banner = dynamic(() => import("@/components/Home/Banner"), {
//   ssr: false,
// });
const Banner1 = dynamic(() => import("@/components/Home/Banner1"), {
    ssr: false,
});
const Feature = dynamic(() => import("@/components/Home/Features"), {
    ssr: false,
});
const Moderation = dynamic(() => import("@/components/Home/Moderation"), {
    ssr: false,
});
const OfferBlock = dynamic(() => import("@/components/Home/Offer"), {
    ssr: false,
});

export default function LandingScreen(props) {
    // const { setAllFeatureList } = useAuth();
    const headerData = useAppSelector(getAllHeaderDataOptionsUpdated);
    // useEffect(() => {
    //   if (
    //     props.result.isSuccess &&
    //     CommonUtility.isValidArray(props.result?.data?.response)
    //   ) {
    //     setAllFeatureList(props.result?.data?.response);
    //   }
    // }, []);

    return (
        <Fragment>
            <Banner1 />

            {/* <Banner /> */}
            <RenderIf isTrue={headerData && CommonUtility.isValidArray(headerData)}>
                <Feature headerData={headerData} featureLists={headerData} />
            </RenderIf>
            <Moderation />
            <OfferBlock />
        </Fragment>
    );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(getAllFeatures.initiate({}));
//     const res = await Promise.all(store.dispatch(getRunningQueriesThunk()));
//     return {
//       props: { result: res[0] },
//     };
//   }
// );

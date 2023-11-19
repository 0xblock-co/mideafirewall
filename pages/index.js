import RenderIf from "@/components/ConditionalRender/RenderIf";

import { getAllHeaderDataOptionsUpdated } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import dynamic from "next/dynamic";
import { Fragment } from "react";

const Banner = dynamic(() => import("@/components/Home/Banner1"), {
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
    const headerData = useAppSelector(getAllHeaderDataOptionsUpdated);
    return (
        <Fragment>
            <Banner />
            <RenderIf isTrue={headerData && CommonUtility.isValidArray(headerData)}>
                <Feature headerData={headerData} featureLists={headerData} />
            </RenderIf>
            <Moderation />
            <OfferBlock />
        </Fragment>
    );
}

import RenderIf from "@/components/ConditionalRender/RenderIf";

import { getAllHeaderDataOptionsUpdated } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { Fragment } from "react";

const Banner = dynamic(() => import("@/components/Home/Banner1"), {
    ssr: false,
});
// const Feature = dynamic(() => import("@/components/Home/Features"), {
//     ssr: false,
// });
const Feature = dynamic(() => import("@/components/Home/FeaturesV2"), {
    ssr: false,
});
// const Moderation = dynamic(() => import("@/components/Home/Moderation"), {
//     ssr: false,
// });
const Moderation = dynamic(() => import("@/components/Home/ModerationV2"), {
    ssr: false,
});
// const OfferBlock = dynamic(() => import("@/components/Home/Offer"), {
//     ssr: false,
// });
const OfferBlock = dynamic(() => import("@/components/Home/OfferV2"), {
    ssr: false,
});

const LandingPage = (props) => {
    const headerData = useAppSelector(getAllHeaderDataOptionsUpdated);
    return (
        <Fragment>
            <NextSeo
                title="Media Firewall - Realtime Image and Video Moderation API"
                description="Enhance online safety with our AI-powered Content Moderation platform. Detect and filter offensive content in real-time with our advanced Image and Video Moderation API, ensuring a secure and user-friendly digital experience"
                canonical="https://mediafirewall.ai/"
                openGraph={{
                    type: "website",
                    author: "",
                    locale: "en_US",
                    author: "https://www.themillionvisions.com/",
                    url: "https://mediafirewall.ai/",
                    title: "Media Firewall -  Realtime Image and Video Moderation API ",
                    description:
                        "Enhance online safety with our AI-powered Content Moderation platform. Detect and filter offensive content in real-time with our advanced Image and Video Moderation API, ensuring a secure and user-friendly digital experience",

                    site_name: "Media Firewall",
                    images: [
                        {
                            url: "https://mediafirewall.ai/images/logo.png",
                            width: 1200,
                            height: 630,
                            alt: "Media Firewall Logo",
                        },
                    ],
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "best image moderation, image moderation, image moderation api, content moderation, content moderation ai, image moderation service, photo moderation, porn detection, violence detection, nudity detection, video moderation, best video moderation, video moderation api, video moderation service, watermark detection, nudity detector, image quality, image light quality, gdpr, deep fake detection, Celebrity detection, celebrity abuse",
                    },
                ]}
            />
            <Banner />
            <RenderIf isTrue={headerData && CommonUtility.isValidArray(headerData)}>
                <Feature headerData={headerData} featureLists={headerData} />
            </RenderIf>
            <Moderation />
            <OfferBlock />
        </Fragment>
    );
};

// Specifies the default values for props:
LandingPage.defaultProps = {
    pathname: "/",
};

export async function getServerSideProps(context) {
    const params = {
        pathname: context.resolvedUrl,
    };
    return {
        props: params,
    };
}
export default LandingPage;

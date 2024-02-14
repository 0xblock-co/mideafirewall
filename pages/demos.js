import style from "@/components/FeaturesList/featuresList.module.scss";
import FeaturesListV2Block from "@/components/FeaturesList_v2/FeaturesListBlock";
import { NextSeo } from "next-seo";
import { Fragment } from "react";

const FeaturesList = () => {
    return (
        <Fragment>
            <NextSeo
                title="Realtime Image Moderation and Video Moderation API"
                description="Test our online demo for categories like Media Type Quality Filter, Nudity Filter, Deepfake Detection, Property Listing, AI Tagging, watermark detection and more."
                canonical="https://mediafirewall.ai/features-list"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    author: "https://www.themillionvisions.com/",
                    url: "https://mediafirewall.ai/ ",
                    title: "Realtime Image Moderation and Video Moderation API",
                    description: "Test our online demo for categories like Media Type Quality Filter, Nudity Filter, Deepfake Detection, Property Listing, AI Tagging, watermark detection and more.",
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
                // twitter={{
                //     cardType: "summary_large_image",
                //     handle: "@yourTwitterHandle", // Replace with your Twitter handle
                //     site: "@yourTwitterHandle", // Replace with your Twitter handle
                // }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "Best image moderation, image moderation, image moderation API, content moderation, content moderation AI, image moderation service, photo moderation, porn detection, violence detection, nudity detection, video moderation, best video moderation, video moderation API, video moderation service, watermark detection, nudity detector, image quality, image light quality, GDPR, deep fake detection, celebrity detection, celebrity abuse",
                    },
                ]}
            />
            <div className={style.bg__light_blue}>
                <FeaturesListV2Block />
            </div>
        </Fragment>
    );
};

export default FeaturesList;

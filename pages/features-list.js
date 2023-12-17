import { Fragment } from "react";

import FeaturesListBlock from "@/components/FeaturesList/FeaturesListBlock";
import FeaturesListScreenBanner from "@/components/FeaturesList/FeaturesListScreenBanner";
import style from "@/components/FeaturesList/featuresList.module.scss";
import { NextSeo } from "next-seo";

const FeaturesList = () => {
    return (
        <Fragment>
            <NextSeo
                title="Features List"
                description="Explore the comprehensive list of features categorized for efficient content moderation. From Micro-Blogging to Real Estate platforms, discover how Media Firewall & AI safeguard online communities. Dive into subfeatures like Media Type Quality Filter, Nudity Filter, Deepfake Detection, and more."
                canonical="https://mediafirewall.ai/features-list"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    author: "https://www.themillionvisions.com/",
                    url: "https://mediafirewall.ai/ ",
                    title: "Features List",
                    description:
                        "Explore the comprehensive list of features categorized for efficient content moderation. From Micro-Blogging to Real Estate platforms, discover how Media Firewall & AI safeguard online communities. Dive into subfeatures like Media Type Quality Filter, Nudity Filter, Deepfake Detection, and more.",
                    site_name: "Media Firewall & AI",
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
                            "Features List, Content Moderation, Micro-Blogging, Social Review Sites, Blog Comments & Forum, Community Blogs, Media-Sharing, Real Estate, AI Tagging, Deepfake Detection, Nudity Filter, GDPR Violation Filter, Celebrity Detection Filter, Obscene Gestures Filter, Media Type Quality Filter, Violent Text Filter, Property Listing Media Filter, Disturbing Visual Filter, Promotional Text Filter, Promotional Voice Filter, Violent Voice Filter, Watermark Detection, Distinguished Personality Abuse Protection Filter, Unauthorized Promotion Filter",
                    },
                ]}
            />
            <div className={style.bg__light_blue}>
                <FeaturesListScreenBanner />
                <FeaturesListBlock />
            </div>
        </Fragment>
    );
};

export default FeaturesList;

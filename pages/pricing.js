import { Fragment, useEffect, useRef, useState } from "react";

import Loader from "@/components/Loader";
import PricingBanner from "@/components/Pricing/banner";
import PricingBlock from "@/components/Pricing/pricing-block";
import PricingFaqs from "@/components/Pricing/pricing-faqs";
import { asyncGetAllPricingDataV2 } from "@/services/product/product.service";
import { getGeoLocationData } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import { NextSeo } from "next-seo";

export default function Pricing() {
    const [priceData, setPriceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dataFetchedRef = useRef(false);
    const geoInfo = useAppSelector(getGeoLocationData);

    // const priceData  = useAppSelector(getAllPricingPlanSelector)
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        // getPrices();
    }, []);

    useEffect(() => {
        if (geoInfo) {
            getPricesV2();
        }
    }, [geoInfo]);

    const getPricesV2 = async () => {
        setIsLoading(true);
        try {
            let countryRegionCurrency = geoInfo?.currency.toLowerCase() || "usd";
            if (countryRegionCurrency !== "inr") {
                countryRegionCurrency = "usd";
            }
            const response = await asyncGetAllPricingDataV2(countryRegionCurrency);
            if (response && response.isSuccess && response.data) {
                setPriceData(response.data.pricingTiers);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    // const getPrices = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await asyncGetAllPricingData();
    //         if (response && response.isSuccess && response.data) {
    //             setPriceData(response.data.items);
    //         }
    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <Fragment>
            <NextSeo
                title="Pricing Plans"
                description="Explore our subscription options: FREE, STARTER, STANDARD, PROFESSIONAL, and ENTERPRISE. Details on operations, parallelism limits, support levels, and custom options. FAQs on operations, plan changes, free trials, and more."
                canonical="https://mediafirewall.ai/pricing"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/pricing",
                    title: "Pricing Plans",
                    description:
                        "Explore our subscription options: FREE, STARTER, STANDARD, PROFESSIONAL, and ENTERPRISE. Details on operations, parallelism limits, support levels, and custom options. FAQs on operations, plan changes, free trials, and more.",
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
                            "Pricing, Subscription Plans, Operations, Parallelism Limit, Support Levels, Custom Pricing, Free Trial, Bulk Analysis, Monthly Limit, Content Moderation, Image Anonymization, Video Anonymization, Dedicated Infrastructure, Customer Support, Enterprise SLA, FAQ, Plan Changes",
                    },
                ]}
            />
            <PricingBanner />
            {priceData && priceData.length > 0 && <PricingBlock priceData={priceData} setIsLoading={setIsLoading} />}
            {/* <CalculateSaving /> */}
            {/* <PricingModerate /> */}
            <PricingFaqs />
            <Loader isLoading={isLoading} />
        </Fragment>
    );
}

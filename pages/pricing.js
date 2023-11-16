import { Fragment, useEffect, useRef, useState } from "react";

import Loader from "@/components/Loader";
import PricingBanner from "@/components/Pricing/banner";
import PricingBlock from "@/components/Pricing/pricing-block";
import PricingFaqs from "@/components/Pricing/pricing-faqs";
import { asyncGetAllPricingData } from "@/services/product/product.service";
import { useRouter } from "next/router";
export default function Pricing() {
    const [priceData, setPriceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dataFetchedRef = useRef(false);
    const router = useRouter();

    // const priceData  = useAppSelector(getAllPricingPlanSelector)
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getPrices();
    }, []);

    const getPrices = async () => {
        setIsLoading(true);
        try {
            const response = await asyncGetAllPricingData();
            if (response && response.isSuccess && response.data) {
                setPriceData(response.data.items);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <PricingBanner />
            {priceData && priceData.length > 0 && <PricingBlock priceData={priceData} setIsLoading={setIsLoading} />}
            {/* <CalculateSaving /> */}
            {/* <PricingModerate /> */}
            <PricingFaqs />
            <Loader isLoading={isLoading} />
        </Fragment>
    );
}

import { PRICING_CARD_BG } from "@/constants/global.constants";
import CommonUtility from "@/utils/common.utils";
import { Button } from "react-bootstrap";
import RenderIf from "../ConditionalRender/RenderIf";
import style from "./pricing.module.scss";

const PricingCard = ({ item, index, handleGetStartedClick, subscriptionDetails, isUpgrade }) => {
    const className = index >= PRICING_CARD_BG.length ? PRICING_CARD_BG[index % PRICING_CARD_BG.length] : PRICING_CARD_BG[index];

    return (
        <div
            className={`mfw__pricing-col ${className} ${style.mdf__pricingcard} ${style[`card__price__${className}`]} ${
                subscriptionDetails?.active && subscriptionDetails?.tireName === item.tierName ? style.active_border : ""
            }`}
            key={index}
        >
            <div className={`mfw__pricing-main-heading ${style.b_bottom}`}>
                <span className={`name ${style.title}`} style={{ textTransform: "uppercase" }}>
                    {item.tierName}
                </span>
                <span className="price">
                    <RenderIf isTrue={item?.basePrice?.currency === "INR"}>₹</RenderIf>
                    <RenderIf isTrue={item?.basePrice?.currency === "USD"}>$</RenderIf>
                    {item.basePrice.value}/mo
                </span>
            </div>
            <div className="mfw__pricing-card-body">
                <ul className="fist-list">
                    <li>
                        <span className="pb-left"></span>
                        <span className="pb-title">{CommonUtility.addDecimalCommas(item.maxOperations.value || 0)}</span>
                        <span className="pb-sub">
                            {item.dailyLimit !== "-1"
                                ? `Operations per month (max ${item.dailyLimit} per day) + $${item.additionalCharge.value} per additional operations`
                                : `Operations per month + $${item.additionalCharge.value} per additional operations`}
                        </span>
                    </li>
                    <li>
                        <span className="pb-left"></span>
                        <span className="pb-title">Parallelism Limit</span>
                        <span className="pb-sub">{item.parallelismLimit}</span>
                        <span className="pb-desc"></span>
                    </li>
                </ul>
                {CommonUtility.isValidArray(item.supportOptions) &&
                    item.supportOptions.map((supportOption, supportIndex) => (
                        <div key={supportIndex}>
                            <p className="text-center">
                                {supportOption.name} at ${supportOption.price.value}
                            </p>
                            <ul className="features support-list">
                                {CommonUtility.isValidArray(supportOption.supportFeatures) &&
                                    supportOption.supportFeatures.map((feature, featureIndex) => (
                                        <li
                                            className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center"
                                            key={featureIndex}
                                            style={{
                                                listStyleType: "none",
                                            }}
                                        >
                                            {/* <img
                        className="check"
                        src="/images/CheckCircle.svg"
                        alt="supportFeatures"
                      /> */}
                                            {feature}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                <Button
                    variant="primary"
                    className="mx-3 mb-3 text-uppercase d-flex align-items-center justify-content-center"
                    size="lg"
                    onClick={(e) => handleGetStartedClick(e, item)}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: 0,
                        right: 0,
                    }}
                    disabled={subscriptionDetails?.active && subscriptionDetails?.tireName === item.tierName}
                >
                    {subscriptionDetails?.active && subscriptionDetails?.tireName === item.tierName ? "Active" : isUpgrade ? "Upgrade" : "Get Started"}
                </Button>
            </div>
        </div>
    );
};

export default PricingCard;

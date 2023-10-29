/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";

import style from "./pricing.module.scss";
import { PRICING_CARD_BG } from "@/constants/global.constants";
import CommonUtility from "@/utils/common.utils";
import { useDispatch } from "react-redux";
import { setSelectedPricingPlan } from "@/store/defaultConfig.slice";
import { useAuth } from "@/contexts/AuthContext";
import { newInfoAlert } from "@/utils/toastMessage.utils";

export default function PricingBlock({ priceData = [] }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin } = useAuth();
  const handleGetStartedClick = async (e, selectedPricing) => {
    e.preventDefault();
    if (!isLogin) {
      newInfoAlert(
        "Signup Required for Subscription",
        "To access the demo, you need to either log in or sign up for an account. Please proceed with login or sign-up.",
        "Continue",
        "warning"
      ).then(() => {
        router.push("/account-security/signup");
      });
      return;
    }
    dispatch(setSelectedPricingPlan(selectedPricing));
    router.push(
      `/pricing-survey?tierName=${selectedPricing.tierName.toLowerCase()}`
    );
    // router.push(`/payment?tierName=${selectedPricing.tierName.toLowerCase()}`);
  };
  return (
    <section className={style.mdf__pricing_block}>
      <Container fluid className="px-5">
        <div className="mfw__pricing-card-wrapper">
          {priceData &&
            priceData?.map((item, index) => {
              let className = "yellow";
              if (index >= PRICING_CARD_BG.length) {
                className = PRICING_CARD_BG[index % PRICING_CARD_BG.length];
              } else {
                className = PRICING_CARD_BG[index];
              }
              return (
                <div
                  className={`mfw__pricing-col ${className} ${
                    style.mdf__pricingcard
                  }  ${style[`card__price__${className}`]} `}
                  key={index}
                >
                  <div
                    className={`mfw__pricing-main-heading ${style.b_bottom}`}
                  >
                    <span
                      className={`name ${style.title}`}
                      style={{ textTransform: "uppercase" }}
                    >
                      {item?.tierName}
                    </span>
                    <span className="price">${item?.basePrice.value}/mo</span>
                  </div>
                  <div className="mfw__pricing-card-body">
                    <ul className="fist-list">
                      <li>
                        <span className="pb-left"></span>
                        <span className="pb-title">
                          {CommonUtility.addDecimalCommas(
                            item?.maxOperations?.value || 0
                          )}
                        </span>
                        <span className="pb-sub">
                          {item?.dailyLimit != "-1"
                            ? `Operations per month (max ${item?.dailyLimit} per day) + $${item.additionalCharge?.value} per additional op`
                            : `Operations   per month + $${item.additionalCharge?.value} per additional op`}
                        </span>
                        {/* <span className="pb-sub2">(max 500 per day)</span> */}
                      </li>
                      <li>
                        <span className="pb-left"></span>
                        <span className="pb-title">Parallelism Limit</span>
                        <span className="pb-sub">{item?.parallelismLimit}</span>
                        <span className="pb-desc"></span>
                      </li>
                    </ul>
                    {CommonUtility.isValidArray(item.supportOptions) &&
                      item.supportOptions?.map((item, index) => {
                        return (
                          <>
                            <p className="text-center" key={index}>
                              {item.name} at ${item.price?.value}
                            </p>
                            <ul className="features support-list">
                              {CommonUtility.isValidArray(
                                item.supportFeatures
                              ) &&
                                item.supportFeatures.map((feature, index) => (
                                  <li
                                    className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center"
                                    // className="w-75 ms-auto d-flex justify-content-center align-items-center"
                                    key={index}
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
                          </>
                        );
                      })}

                    <Button
                      variant="primary"
                      className="mx-3 mb-3 text-uppercase"
                      size="lg"
                      onClick={(e) => handleGetStartedClick(e, item)}
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: 0,
                        right: 0,
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              );
            })}
          <div
            className={`mfw__pricing-col ${style.mdf__pricingcard} ${style.card__price__primary}`}
          >
            <div className={`mfw__pricing-main-heading ${style.b_bottom}`}>
              <span className={`name ${style.title}`}>ENTERPRISE</span>
              <span className="price">Custom pricing</span>
            </div>
            <div className="mfw__pricing-card-body">
              <ul className="fist-list">
                <li>
                  <span className="pb-left"></span>
                  <span className="pb-title">Contact us</span>
                  <span className="pb-sub">custom number of operations</span>
                  {/* <span className="pb-sub2">(max 500 per day)</span> */}
                </li>
                <li>
                  <span className="pb-left"></span>
                  <span className="pb-title">Contact us</span>
                  <span className="pb-sub">
                    custom number of simultaneous streams
                  </span>
                  <span className="pb-desc"></span>
                </li>
              </ul>
              <>
                <ul className="features support-list">
                  <li
                    className="w-100 ms-auto gap-2 d-flex justify-content-start   align-items-start"
                    style={{
                      listStyleType: "none",
                    }}
                  >
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Content Moderation
                  </li>
                  <li className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-start">
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Content Moderation
                  </li>
                  <li className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-start">
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Image, Video Anonymization
                  </li>
                  <li className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-start">
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Dedicated infrastructure for Unparalleled performance
                  </li>
                  <li className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-start">
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Dedicated Customer Support Engineer
                  </li>
                  <li className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-start">
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Enterprise-class SLA
                  </li>
                  <li className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-start">
                    <img
                      className="check"
                      src="/images/CheckCircle.svg"
                      alt="supportFeatures"
                    />
                    Exclusive enterprise premium options
                  </li>
                </ul>
              </>

              <Button
                variant="primary"
                className="mx-3 mb-3 text-uppercase"
                size="lg"
                onClick={() => router.push("/contact-us")}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: 0,
                  right: 0,
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

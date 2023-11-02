/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";

import style from "./pricing.module.scss";
import CommonUtility from "@/utils/common.utils";
import { useAuth } from "@/contexts/AuthContext";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { asyncGetCheckoutSessionUrl } from "@/services/product/product.service";
import PricingCard from "./PricingCard";

const PricingBlock = ({ priceData = [], setIsLoading }) => {
  const router = useRouter();
  const { isLogin, user } = useAuth();

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
    if (user && user.customerId && CommonUtility.isNotEmpty(user.customerId)) {
      setIsLoading(true);
      const response = await asyncGetCheckoutSessionUrl(user.customerId);
      if (response.isSuccess && CommonUtility.isNotEmpty(response.data)) {
        localStorage.setItem("checkoutPlanName", selectedPricing.tierName);
        window.open(response.data, "_blank");
      }
      setIsLoading(false);
    }
  };

  return (
    <section className={style.mdf__pricing_block}>
      <Container className="">
        <div className="mfw__pricing-card-wrapper">
          {priceData &&
            priceData.map((item, index) => (
              <PricingCard
                key={index}
                item={item}
                index={index}
                handleGetStartedClick={handleGetStartedClick}
              />
            ))}
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
                  <span className="pb-sub">Custom number of operations</span>
                </li>
              </ul>
              <ul className="features support-list">
                <li>
                  <span className="pb-left"></span>
                  <span className="pb-title">Content Moderation</span>
                </li>
                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">
                  Image, Video Anonymization
                </li>
                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">
                  Dedicated infrastructure for Unparalleled performance
                </li>
                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">
                  Dedicated Customer Support Engineer
                </li>
                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">
                  Enterprise-class SLA
                </li>
                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">
                  Exclusive enterprise premium options
                </li>
              </ul>

              <Button
                variant="success"
                className="mx-3 mb-3 text-uppercase d-flex align-items-center justify-content-center"
                size="lg"
                onClick={() => router.push("/contact-us")}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: 0,
                  right: 0,
                }}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PricingBlock;

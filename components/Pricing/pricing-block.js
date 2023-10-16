/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { PRICING_CARD_BG } from "@/constants/global.constants";

import style from "./pricing.module.scss";
import CommonUtility from "@/utils/common.utils";
import { useAuth } from "@/contexts/AuthContext";
import { newInfoAlert } from "@/utils/toastMessage.utils";

export default function PricingBlock({ priceData = [] }) {
  const { isLogin } = useAuth();
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    if (!isLogin) {
      newInfoAlert(
        "Signup Required for Subscription",
        "To access the demo, you need to either log in or sign up for an account. Please proceed with login or sign-up.",
        "Continue",
        "warning"
      ).then(() => {
        Router.push("/account-security/signup");
      });
      return;
    }
    newInfoAlert("Comming soon...", "", "OK", "warning");
  };

  return (
    <section className={style.mdf__pricing_block}>
      <Container fluid className="px-5">
        {/* <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Range />
              <div className="d-flex justify-content-center mt-3">
                <label>Monthly</label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="mx-3 mb-0"
                />
                <label>Yearly</label>
                <Badge pill bg="primary" className="ms-3 py-2 px-3">
                  20% OFF
                </Badge>
              </div>
            </Form>
          </Col>
        </Row> */}
        <Row className="justify-content-center mt-2 mt-xxl-5">
          {priceData &&
            priceData?.map((item, index) => {
              let className = "yellow";
              if (index >= PRICING_CARD_BG.length) {
                className = PRICING_CARD_BG[index % PRICING_CARD_BG.length];
              } else {
                className = PRICING_CARD_BG[index];
              }
              return (
                <Col
                  sm={4}
                  lg={3}
                  xxl={2}
                  className="mt-3 mt-xxl-0"
                  key={index}
                >
                  <Card
                    className={`${style.mdf__pricingcard} ${
                      style[`card__price__${className}`]
                    } text-center h-100`}
                  >
                    <div className="text mb-5 h-100">
                      <h3 className="title my-4">{item?.tierName}</h3>
                      <div className={style.b_bottom}>
                        <label className="display-5 mb-4">
                          ${item?.basePrice.value}
                        </label>
                        <span>/mo</span>
                      </div>
                      <h4 className="my-4"> {item?.maxOperations?.value} </h4>
                      <p className="px-2">
                        {item?.dailyLimit != "-1"
                          ? `Operations per month (max ${item?.dailyLimit} per day) + $${item.additionalCharge?.value} per additional op`
                          : `Operations   per month + $${item.additionalCharge?.value} per additional op`}
                        {/* Operations per month (max {item?.dailyLimit} per day)+ $
                        {item.additionalCharge?.value} per additional op */}
                      </p>
                      <h4>{item?.parallelismLimit}</h4>
                      {CommonUtility.isValidArray(item.supportOptions) &&
                        item.supportOptions?.map((item, index) => {
                          return (
                            <>
                              <p className="px-2" key={index}>
                                {item.name} at ${item.price?.value}
                              </p>
                              {/* <div
                                data-tippy-content="<video autoplay loop muted playsinline data-src='https://synthesia-results.s3.eu-west-1.amazonaws.com/website_demos/Features-short-demos/120_languages_and_accents.mp4' type='video/mp4' ></video> Number of stock voices you have access to in Synthesia STUDIO"
                                className="flex flex-gap_05"
                              >
                                <img
                                  loading="lazy"
                                  src="https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/64103504f4a10b57fdc9dbdd_CheckCircle.svg"
                                  alt="Yes"
                                />
                                <p className="paragraph-default text-size-small pricing-link">
                                  <strong className="text-weight-semibold">
                                    120+
                                  </strong>{" "}
                                  Languages and Voices
                                </p>
                                <a
                                  href="#"
                                  className="pricing-tooltip-main w-inline-block"
                                >
                                  <img
                                    loading="lazy"
                                    src="https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/64106055324f14b8d06d959f_Info.svg"
                                    alt=""
                                  />
                                </a>
                              </div> */}

                              <ul className="px-3 support-list">
                                {CommonUtility.isValidArray(
                                  item.supportFeatures
                                ) &&
                                  item.supportFeatures.map((feature, index) => (
                                    <li
                                      className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-center"
                                      // className="w-75 ms-auto d-flex justify-content-center align-items-center"
                                      key={index}
                                      style={{
                                        listStyleType: "none",
                                      }}
                                    >
                                      <img
                                        className="check"
                                        src="/images/CheckCircle.svg"
                                        alt="supportFeatures"
                                      />
                                      {feature}
                                    </li>
                                  ))}
                              </ul>
                            </>
                          );
                        })}
                    </div>
                    <Button
                      variant="primary"
                      className="mx-3 mb-3 text-uppercase"
                      size="lg"
                      onClick={(e) => handleGetStartedClick(e)}
                    >
                      Get Started
                    </Button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
}

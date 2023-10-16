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
                    }  h-100`}
                  >
                    <div className="text mb-5 h-100">
                      <div className="text-center">
                        <h3 className="title my-4">{item?.tierName}</h3>
                        <div className={style.b_bottom}>
                          <label className="display-5 mb-4">
                            ${item?.basePrice.value}
                          </label>
                          <span>/mo</span>
                        </div>
                      </div>
                      <div className="px-3 pb-3">
                        <h4 className="my-4 text-center">
                          {" "}
                          {item?.maxOperations?.value}{" "}
                        </h4>
                        <p>
                          {item?.dailyLimit != "-1"
                            ? `Operations per month (max ${item?.dailyLimit} per day) + $${item.additionalCharge?.value} per additional op`
                            : `Operations   per month + $${item.additionalCharge?.value} per additional op`}
                          {/* Operations per month (max {item?.dailyLimit} per day)+ $
                        {item.additionalCharge?.value} per additional op */}
                        </p>
                        <h4 className="text-center">
                          {item?.parallelismLimit}
                        </h4>
                        {CommonUtility.isValidArray(item.supportOptions) &&
                          item.supportOptions?.map((item, index) => {
                            return (
                              <>
                                <p key={index}>
                                  {item.name} at ${item.price?.value}
                                </p>
                                <ul className=" support-list">
                                  {CommonUtility.isValidArray(
                                    item.supportFeatures
                                  ) &&
                                    item.supportFeatures.map(
                                      (feature, index) => (
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
                                      )
                                    )}
                                </ul>
                              </>
                            );
                          })}
                      </div>
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
          <Col sm={4} lg={3} xxl={2} className="mt-3 mt-xxl-0">
            <Card
              className={`${style.mdf__pricingcard} ${
                style[`card__price__`]
              }  h-100`}
            >
              <div className="text mb-5 h-100">
                <div className="text-center">
                  <h3 className="title my-4">ENTERPRISE</h3>
                  <div className={style.b_bottom}>
                    <label className="display-5 mb-4">$__</label>
                    <span>/mo</span>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <h4 className="my-4 text-center">Contact us</h4>
                  <p>custom number of operations</p>
                  <h4 className="text-center">Contact us</h4>
                  <p>custom number of simultaneous streams</p>
                  <ul className=" support-list">
                    <li
                      className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-center"
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
                    <li
                      className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-center"
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <img
                        className="check"
                        src="/images/CheckCircle.svg"
                        alt="supportFeatures"
                      />
                      Image, Video Anonymization
                    </li>
                    <li
                      className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-center"
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <img
                        className="check"
                        src="/images/CheckCircle.svg"
                        alt="supportFeatures"
                      />
                      Dedicated infrastructure for Unparalleled performance
                    </li>
                    <li
                      className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-center"
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <img
                        className="check"
                        src="/images/CheckCircle.svg"
                        alt="supportFeatures"
                      />
                      Dedicated Customer Support Engineer
                    </li>
                    <li
                      className="w-100 ms-auto gap-2 d-flex justify-content-start align-items-center"
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <img
                        className="check"
                        src="/images/CheckCircle.svg"
                        alt="supportFeatures"
                      />
                      Enterprise-class SLA Exclusive enterprise premium options
                    </li>
                  </ul>
                </div>
              </div>
              <Button
                variant="primary"
                className="mx-3 mb-3 text-uppercase"
                size="lg"
                onClick={(e) => {}}
              >
                Get Started
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

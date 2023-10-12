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
    // Router.push("/payment");
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
                      {/* <p className="px-2">
                        {item?.dailyLimit != "-1"
                          ? `Operations per month  (max ${item?.dailyLimit} per day)`
                          : `Operations per month + $${} per additional op`}
                      </p> */}
                      <h4>{item?.parallelismLimit}</h4>
                      {CommonUtility.isValidArray(item.supportOptions) &&
                        item.supportOptions?.map((item, index) => {
                          return (
                            <>
                              <p className="px-2" key={index}>
                                {item.name} at ${item.price?.value}
                              </p>
                              <ul className="p-0 d-flex flex-column align-items-center">
                                {CommonUtility.isValidArray(
                                  item.supportFeatures
                                ) &&
                                  item.supportFeatures.map((feature, index) => (
                                    <li className="text-start" key={index}>
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

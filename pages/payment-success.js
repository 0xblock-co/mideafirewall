import { useAuth } from "@/contexts/AuthContext";
// import { asyncGetCustomerSubscriptionData } from "@/services/product/product.service";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { HiCheck } from "react-icons/hi";
export default function PaymentSuccess() {
  const { user } = useAuth();
  console.log("user: ", user);
  useEffect(() => {
    // async function getPricingDetails() {
    //   const tierName = localStorage.getItem("checkoutPlanName");
    //   const abcRes = await asyncGetCustomerSubscriptionData({
    //     tierName,
    //     email: encodeURIComponent("jemish.me@gmail.com"),
    //     customerId: user?.customerId,
    //   });
    //   console.log("abcRes: ", abcRes);
    // }
    // getPricingDetails();
  }, []);

  return (
    <Fragment>
      <section className="payment__success__block">
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md={6} xxl={5}>
              <h1 className="text-white">
                Thank You for choosing Midea Firewall
              </h1>
              <Button variant="primary" className=" mt-3 py-3">
                Account
              </Button>
            </Col>
            <Col md={6} xxl={5} className="text-center">
              <Image
                className="mb-3 w-75"
                layout="fill"
                src="/images/success.svg"
                alt=""
              />
              <div className="stepper-wrapper">
                <div className="stepper-item completed">
                  <div className="step-counter">
                    <HiCheck />
                  </div>
                  <div className="step-name">Plan Selected</div>
                </div>
                <div className="stepper-item completed">
                  <div className="step-counter">
                    <HiCheck />
                  </div>
                  <div className="step-name">Card Added</div>
                </div>
                <div className="stepper-item  completed">
                  <div className="step-counter">
                    <HiCheck />
                  </div>
                  <div className="step-name">Payment Received</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
}

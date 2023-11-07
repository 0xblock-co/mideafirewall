import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const PaymentFailure = () => {
  const router = useRouter();

  return (
    <Fragment>
      <section className="payment__success__block">
        <Container className="h-100">
          <Row className="h-100 justify-content-start align-items-center">
            <Col md={10} className="text-start">
              <h1 className="text-white">
                Thank you for considering Media Firewall.
                <br />
                Unfortunately, we were unable to process your payment at this
                time. Please check your payment details and try again.
              </h1>
              <Button
                variant="primary"
                className=" mt-3 py-3"
                onClick={() => router.push("/pricing")}
              >
                Go To Pricing
              </Button>
            </Col>
            {/* <Col md={6} xxl={5} className="text-center">
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
                <div className="stepper-item ">
                  <div className="step-counter">
                    <FcCancel />
                  </div>
                  <div className="step-name">Payment Received</div>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default PaymentFailure;

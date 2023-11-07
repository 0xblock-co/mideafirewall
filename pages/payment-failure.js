import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { HiCheck } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";

const PaymentFailure = () => {
  const router = useRouter();

  return (
    <Fragment>
      <section className="payment__success__block">
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md={6} xxl={5}>
              <h1 className="text-white">
                Your payment is not successfully done.
              </h1>
              <Button
                variant="primary"
                className=" mt-3 py-3"
                onClick={() => router.push("/pricing")}
              >
                Please choose plan
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
                <div className="stepper-item ">
                  <div className="step-counter">
                    <FcCancel />
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
};

export default PaymentFailure;

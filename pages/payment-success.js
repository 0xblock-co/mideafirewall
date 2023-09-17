import Image from "next/image";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiCheck } from "react-icons/hi";
export default function PaymentSuccess() {
  return (
    <Fragment>
      <section className="payment__success__block">
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md={6} xxl={5}>
              <h1 className="text-white">
                Thank You for choosing Midea Firewall
              </h1>
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

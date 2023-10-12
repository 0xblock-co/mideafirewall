import { Col, Container, Row } from "react-bootstrap";

import style from "./pricing.module.scss";
export default function PricingBanner() {
  return (
    <section className={style.mdf__pricing_banner}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} xl={4} className="text-center">
            <h1 className="text-shadow display-4">Choose your plan</h1>
            <p className="fs-5 fw-normal mb-0">
              30 days unlimited free trial. No contract or credit card required.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

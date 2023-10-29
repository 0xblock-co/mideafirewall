import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import style from "./contact.module.scss";
export default function ContactBanner() {
  return (
    <section className={`mt-5 mb-5 pt-5 ${style.mdf__contactus_banner}`}>
      <Container>
        <Row className="w-100 justify-content-center justify-content-between align-items-center">
          <Col xl={5} lg={6}>
            <h2 className="text-blue fw-normal">
              <span
                className="fw-bolder"
                style={{
                  letterSpacing: "0.055em",
                  textShadow: "3px 2px 7px rgba(0, 0, 0, 0.25)",
                }}
              >
                We'd Love to Hear from You:
              </span>
              <br></br>
              Contact us today to learn more about our products and services.
            </h2>
          </Col>
          <Col xl={5} lg={6}>
            <div className="contact-img">
              <Image
                layout="fill"
                src="/images/people-working-call-center.jpg"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

import Router from "next/router";
import React from "react";
import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { AuthContext } from "@/pages/_app";
export default function OfferBlock() {
  const { isLogin } = useContext(AuthContext);

  return (
    <section className="mdf__offer__block">
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} lg={6}>
            <h1 className="fw-bold text-shadow text-center">
              Start saving <span className="fw-bolder text_gredient">80%</span>{" "}
              of your time and budget today!
            </h1>
          </Col>
        </Row>
        <Row className="flex flex-column align-items-center">
          <Col sm={4} lg={3} xl={2}>
            <Button
              variant="primary"
              className="mt-4 rounded-pill w-100"
              onClick={() =>
                Router.push(
                  isLogin ? "/network-blog" : "/account-security/login"
                )
              }
            >
              See Demo
            </Button>
          </Col>
          <Col sm={4} lg={3} xl={2}>
            <Button
              variant="outline-primary"
              className="mt-4 rounded-pill w-100"
              onClick={() => Router.push("/pricing")}
            >
              See pricing
            </Button>
          </Col>
          <Col sm={4} lg={3} xl={2}>
            <Button
              variant="outline-primary"
              className="mt-4 rounded-pill w-100"
              onClick={() => Router.push("/contact-us")}
            >
              Contact Us
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

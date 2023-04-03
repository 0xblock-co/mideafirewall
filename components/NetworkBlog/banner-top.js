import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
export default function NeetworkBanner() {
  return (
    <section className="mdf__network-banner p-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-blue fw-normal fw-bolder pt-5">
              Get started with Image Moderation
            </h2>
            <Breadcrumb className="mt-3">
              <Breadcrumb.Item href="#" active>
                Image Moderation
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#"> Video Moderation </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

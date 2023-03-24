
import React, { useState } from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Survey1 from "@/components/Auth/Layout/survey-block1.js";
export default function SurveyPg1() {
  return (
    <section className="mdf__authpage__section">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={10}> 
              <Row className="mdf__authpage__blocks justify-content-between">
                <Col lg={4} xl={5} className="ps-0">
                  <Image
                    className="mdf__logo_auth"
                    layout='fill'
                    src="/images/auto_logo.png"
                    alt=""
                  />
                </Col>
                <Col lg={8} xl={6}>
                  <Survey1/>
                </Col>
              </Row> 
          </Col>
        </Row>
      </Container>
    </section>
  );
}

import React, { useState } from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import SurveyName from "@/components/Auth/Layout/survey-name.js";
import SurveyEmail from "@/components/Auth/Layout/survey-email";
import SelectSurvey from "@/components/Auth/Layout/select-survey";
import CompanyCatSurvey from "@/components/Auth/Layout/company-category-survey";
import FeatureSurvey from "@/components/Auth/Layout/features-survey";
export default function Survey() {
  return (
    <section className="mdf__authpage__section">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={10}>
            <Row className="mdf__authpage__blocks justify-content-between">
              <Col lg={4} xl={5} className="ps-0">
                <Image
                  className="mdf__logo_auth"
                  layout="fill"
                  src="/images/auto_logo.png"
                  alt=""
                />
              </Col>
              <Col lg={8} xl={7}>
                <Image
                  className="mdf__logo_modal mx-3"
                  layout="fill"
                  src="/images/logo.png"
                  alt=""
                />
                {/* <SurveyName/> */}
                {/* <SurveyEmail/> */}
                <SelectSurvey />
                {/* <CompanyCatSurvey/> */}
                {/* <FeatureSurvey/> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

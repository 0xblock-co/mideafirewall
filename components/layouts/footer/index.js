import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

export default function FooterBottom() {
  return (
    <footer className="mdf__footer">
      <Container>
        <Row>
          <Col sm={12}>
            <Image
              className="mdf__logo_modal"
              layout="fill"
              src="/images/footer-logo.png"
              alt=""
            />
          </Col>
          <Col lg={6} xl={3}>
            <h5 className="mt-3">Features</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <Link href="#"> 85+ Video Avatars </Link>
              </li>
              <li className="py-2">
                <Link href="#"> 120+ Languages </Link>
              </li>
              <li className="py-2">
                <Link href="#"> 55+ Templates </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Custom Avatars </Link>
              </li>
              <li className="py-2">
                <Link href="#"> PowerPoint to Video </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Alternatives </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Text to Video </Link>
              </li>
              <li className="py-2">
                <Link href="#"> AI Video Generator </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Online Video Maker </Link>
              </li>
            </ul>
          </Col>
          <Col lg={6} xl={3}>
            <h5 className="mt-3">Use Cases</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <Link href="#"> Training Videos </Link>
              </li>
              <li className="py-2">
                <Link href="#"> How-to Videos </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Marketing Videos </Link>
              </li>
            </ul>
          </Col>
          <Col lg={6} xl={3}>
            <h5 className="mt-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <Link href="#"> Pricing </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Book a Demo </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Blog </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Case Studies </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Example videos </Link>
              </li>
              <li className="py-2">
                <Link href="#"> How-to Guides </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Synthesia Academy </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Integrations </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Service Providers </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Tools </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Future of Synthetic Media </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Help Center </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Product Updates </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Glossary </Link>
              </li>
            </ul>
          </Col>
          <Col lg={6} xl={3}>
            <h5 className="mt-3">Company</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <Link href="#"> About Us </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Ethics Guidelines </Link>
              </li>
              <li className="py-2">
                <Link href="#"> AI Research </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Jobs </Link>
              </li>
              <li className="py-2">
                <Link href="/contact-us"> Contact Sales </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Press Kit </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Affiliates / Referrals </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Privacy Policy </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Terms of Service </Link>
              </li>
              <li className="py-2">
                <Link href="#"> Security </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

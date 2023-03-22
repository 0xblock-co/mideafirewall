
import React, { useState } from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

export default function FooterBottom() {
  return (
    <footer className="mdf__footer">
        <Container>
            <Row>
            <Col sm={12}>
            <Image
                className="mdf__logo_modal"
                layout='fill'
                src="/images/footer-logo.png"
                alt=""
              /></Col>
                <Col lg={6} xl={3}> 
                    <h5 className="mt-3">Features</h5>
                    <ul className="list-unstyled">
                        <li className="py-2"> <a href="#"> 85+ Video Avatars </a></li>
                        <li className="py-2"> <a href="#"> 120+ Languages </a></li>
                        <li className="py-2"> <a href="#"> 55+ Templates </a></li>
                        <li className="py-2"> <a href="#"> Custom Avatars </a></li>
                        <li className="py-2"> <a href="#"> PowerPoint to Video </a></li>
                        <li className="py-2"> <a href="#"> Alternatives </a></li>
                        <li className="py-2"> <a href="#"> Text to Video </a></li>
                        <li className="py-2"> <a href="#"> AI Video Generator </a></li>
                        <li className="py-2"> <a href="#"> Online Video Maker </a></li>
                    </ul>
                </Col>
                <Col lg={6} xl={3}>
                <h5 className="mt-3">Use Cases</h5>
                    <ul className="list-unstyled">
                        <li className="py-2"> <a href="#"> Training Videos </a></li>
                        <li className="py-2"> <a href="#"> How-to Videos </a></li>
                        <li className="py-2"> <a href="#"> Marketing Videos </a></li> 
                    </ul>
                </Col>
                <Col lg={6} xl={3}>
                <h5 className="mt-3">Resources</h5>
                    <ul className="list-unstyled">
                        <li className="py-2"> <a href="#"> Pricing </a></li>
                        <li className="py-2"> <a href="#"> Book a Demo </a></li>
                        <li className="py-2"> <a href="#"> Blog </a></li> 
                        <li className="py-2"> <a href="#"> Case Studies </a></li> 
                        <li className="py-2"> <a href="#"> Example videos </a></li> 
                        <li className="py-2"> <a href="#"> How-to Guides </a></li> 
                        <li className="py-2"> <a href="#"> Synthesia Academy </a></li> 
                        <li className="py-2"> <a href="#"> Integrations </a></li> 
                        <li className="py-2"> <a href="#"> Service Providers </a></li> 
                        <li className="py-2"> <a href="#"> Tools </a></li> 
                        <li className="py-2"> <a href="#"> Future of Synthetic Media </a></li> 
                        <li className="py-2"> <a href="#"> Help Center </a></li> 
                        <li className="py-2"> <a href="#"> Product Updates </a></li> 
                        <li className="py-2"> <a href="#"> Glossary </a></li> 
                    </ul>
                </Col>
                <Col lg={6} xl={3}>
                <h5 className="mt-3">Company</h5>
                    <ul className="list-unstyled">
                        <li className="py-2"> <a href="#"> About Us </a></li>
                        <li className="py-2"> <a href="#"> Ethics Guidelines </a></li>
                        <li className="py-2"> <a href="#"> AI Research </a></li>  
                        <li className="py-2"> <a href="#"> Jobs </a></li>  
                        <li className="py-2"> <a href="#"> Contact Sales </a></li>  
                        <li className="py-2"> <a href="#"> Press Kit </a></li>  
                        <li className="py-2"> <a href="#"> Affiliates / Referrals </a></li>  
                        <li className="py-2"> <a href="#"> Privacy Policy </a></li>  
                        <li className="py-2"> <a href="#"> Terms of Service </a></li>  
                        <li className="py-2"> <a href="#"> Security </a></li>  
                    </ul>
                </Col>
            </Row>
        </Container>
    </footer>
  );
}

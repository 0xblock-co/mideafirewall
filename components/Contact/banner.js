import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
export default function ContactBanner() {
    return (
        <section className="mdf__contactus-banner"> 
                <Container>
                <Row className="w-100 justify-content-center justify-content-xxl-between align-items-center">
                    <Col md={6} xxl={{ span: 4, offset: 2 }}>
                        <h2 className="text-blue fw-normal"> <span className="fw-bolder">We'd Love to Hear from You:</span> <br></br>
Contact us today to learn more about our products and services.</h2>
                    </Col>
                    <Col md={6} xxl={4} className="mt-5 pt-5 ">
                    <Image 
            layout="fill"
            src="/images/Contactus.png"
            alt=""
          />
                    </Col>
                </Row> 
                </Container>
        </section>
    );
}
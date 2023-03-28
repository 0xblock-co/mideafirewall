import React, { useState } from "react"; 
import { Col, Container, Row } from "react-bootstrap";
export default function ContactBanner() {
    return (
        <section className="mdf__contactus-banner">
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 2 }}>
                        <h2 className="text-blue fw-normal"> <span className="fw-bolder">We'd Love to Hear from You:</span> <br></br>
Contact us today to learn more about our products and services.</h2>
                    </Col>
                </Row>
            </Container> 
        </section>
    );
}
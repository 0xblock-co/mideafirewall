import React, { useState } from "react"; 
import { Button,Col, Container, Row } from "react-bootstrap";
export default function PricingModerate() {
    return (
        <section className="mdf__moderate-banner">
            <Container>
                <Row className="justify-content-center">
                   <Col md={6} xl={4} className="text-center">
                        <p>FREE TRIAL</p>
                        <h1 className="display-5 text-white">Start content moderation right now</h1> 
                        <Button variant="primary" className="text-uppercase py-3 mx-3 mt-3">Get Started</Button>
                        <Button variant="outline-primary" className="text-uppercase py-3 mx-3 mt-3 border-white text-white">SEE DEMO</Button>
                   </Col>
                </Row>
            </Container> 
        </section>
    );
}
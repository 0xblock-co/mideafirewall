import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
export default function PricingBlock() {
    return (
        <section className="mdf__pricing-block">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form>
                            <Form.Range />
                            <div className="d-flex justify-content-center mt-3">
                                <label>Monthly</label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    className="mx-3 mb-0"
                                />
                                <label>Yearly</label>
                                <Badge pill bg="primary" className="ms-3 py-2 px-3" >20% OFF</Badge>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
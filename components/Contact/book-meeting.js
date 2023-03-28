import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
export default function BookMeeting() {
    return (
        <section className="mdf__book__meeting">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="p-5 text-center">
                            <h2>Book a Meeting</h2>
                            <Form>
                                <Row className="justify-content-around">
                                    <Col md={6} lg={5}>
                                        <Form.Group className="mt-5" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="text" placeholder="First Name*" className="mdf__form__input" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={5}>
                                        <Form.Group className="mt-5" controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Last Name*" className="mdf__form__input" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={5}>
                                        <Form.Group className="mt-5" controlId="exampleForm.ControlInput3">
                                            <Form.Control type="email" placeholder="Email*" className="mdf__form__input" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={5}>
                                        <Form.Group className="mt-5" controlId="exampleForm.ControlInput3">
                                            <Form.Control type="text" placeholder="Company Name*" className="mdf__form__input" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={5}>
                                        <Form.Group className="mt-5" controlId="exampleForm.ControlInput3">
                                            <Form.Control type="url" placeholder="Website Url*" className="mdf__form__input" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={5}>
                                        <Form.Group className="mt-5" controlId="exampleForm.ControlInput3">
                                            <Form.Control type="date" placeholder="Select Date*" className="mdf__form__input" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <a href="/auth/survey" className="btn btn-primary mt-5 py-2 px-5">
                                Book
                                </a>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
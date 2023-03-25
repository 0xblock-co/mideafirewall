import React, { useState } from "react";
import Image from "next/image";
import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
export default function CompanyCatSurvey() {
    return (
        <section className="mdf__login_right-block mdf__login__card_button"> 
            <Form>
            <Form.Label className="fs-4 my-0 fw-bold">Which category best describes your company?</Form.Label>
              <Row>
                <Col sm={4} className="mt-4">
                <Form.Group>
                    <Form.Control type="radio" class="btn-check" name="Category" id="Cat01" autocomplete="off" hidden />
                    <label class="btn btn-outline-primary raio__button__card" for="Cat01">
                        <Image
                            layout='fill'
                            src="/images/midea-sharing.png"
                            alt=""
                        />
                        <h5 className="mt-3">Media Sharing</h5>
                    </label>
                </Form.Group > 
                </Col>
                <Col sm={4} className="mt-4">
                <Form.Group>
                    <Form.Control type="radio" class="btn-check" name="Category" id="Cat02" autocomplete="off" hidden />
                    <label class="btn btn-outline-primary raio__button__card" for="Cat02">
                        <Image
                            layout='fill'
                            src="/images/realstate-broker.png"
                            alt=""
                        />
                        <h5 className="mt-3">Real Stock Broker </h5>
                    </label>
                </Form.Group >
                </Col>
                <Col sm={4} className="mt-4">
                <Form.Group>
                    <Form.Control type="radio" class="btn-check" name="Category" id="Cat03" autocomplete="off" hidden />
                    <label class="btn btn-outline-primary raio__button__card" for="Cat03">
                        <Image
                            layout='fill'
                            src="/images/Online-reviews.png"
                            alt=""
                        />
                        <h5 className="mt-3">Social Review Site</h5>
                    </label>
                </Form.Group >
                </Col>
                <Col sm={4} className="mt-4">
                <Form.Group>
                    <Form.Control type="radio" class="btn-check" name="Category" id="cat04" autocomplete="off" hidden />
                    <label class="btn btn-outline-primary raio__button__card" for="cat04">
                        <Image
                            layout='fill'
                            src="/images/blogging.png"
                            alt=""
                        />
                        <h5 className="mt-3">Blogging</h5>
                    </label>
                </Form.Group >
                </Col>
                <Col sm={4} className="mt-4">
                <Form.Group>
                    <Form.Control type="radio" class="btn-check" name="Category" id="cat05" autocomplete="off" hidden />
                    <label class="btn btn-outline-primary raio__button__card" for="cat05">
                        <Image
                            layout='fill'
                            src="/images/social-network.png"
                            alt=""
                        />
                        <h5 className="mt-3">Social Network</h5>
                    </label>
                </Form.Group >
                </Col>
              </Row>
 
                <Button variant="primary" className="w-100 mt-3 py-3">
                    Next
                </Button>
            </Form>
        </section>
    );
}
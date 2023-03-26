import React, { useState } from "react";
import Image from "next/image";
import { Button, Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
export default function SelectSurvey() {
  return (
    <section className="mdf__login_right-block mdf__login__card_button">
      <h5 className="text_blue fw-bold mt-3">Hello there Sam! </h5>
      <Form.Label className="fs-4 fw-bold">
        Which best describes you?
      </Form.Label>
      <Form>
        <Row>
          <Col sm={4} className="mt-4">
            <Form.Group>
              <Form.Control
                type="radio"
                class="btn-check"
                name="options"
                id="option2"
                autocomplete="off"
                hidden
              />
              <label
                class="btn btn-outline-primary raio__button__card"
                for="option2"
              >
                <Image layout="fill" src="/images/freelancer.png" alt="" />
                <h5 className="mt-3">I’m a freelancer</h5>
              </label>
            </Form.Group>
          </Col>
          <Col sm={4} className="mt-4">
            <Form.Group>
              <Form.Control
                type="radio"
                class="btn-check"
                name="options"
                id="option3"
                autocomplete="off"
                hidden
              />
              <label
                class="btn btn-outline-primary raio__button__card"
                for="option3"
              >
                <Image layout="fill" src="/images/founder.png" alt="" />
                <h5 className="mt-3">I’m lead</h5>
              </label>
            </Form.Group>
          </Col>
          <Col sm={4} className="mt-4">
            <Form.Group>
              <Form.Control
                type="radio"
                class="btn-check"
                name="options"
                id="option4"
                autocomplete="off"
                hidden
              />
              <label
                class="btn btn-outline-primary raio__button__card"
                for="option4"
              >
                <Image layout="fill" src="/images/contibutor.png" alt="" />
                <h5 className="mt-3">I’m contributor</h5>
              </label>
            </Form.Group>
          </Col>
          <Col sm={4} className="mt-4">
            <Form.Group>
              <Form.Control
                type="radio"
                class="btn-check"
                name="options"
                id="option5"
                autocomplete="off"
                hidden
              />
              <label
                class="btn btn-outline-primary raio__button__card"
                for="option5"
              >
                <Image layout="fill" src="/images/director.png" alt="" />
                <h5 className="mt-3">I’m director</h5>
              </label>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" className="w-100 mt-3 py-3">
          Next
        </Button>
      </Form>
    </section>
  );
}

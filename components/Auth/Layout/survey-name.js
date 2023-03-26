import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { HiUser } from "react-icons/hi";
import Form from "react-bootstrap/Form";
import { InputTypeTextComponent } from "@/components/UI/InputTextBox";
export default function SurveyName() {
  return (
    <section className="mdf__login_right-block">
      <h5 className="text_blue fw-bold mt-3">
        Thank you! Lets set up your profile{" "}
      </h5>
      <Form>
        <InputTypeTextComponent />
        {/* <Form.Label className="fs-4 fw-bold">What is your name?</Form.Label>
        <Form.Group
          className="mb-2 position-relative"
          controlId="exampleForm.ControlInput1"
        >
          <HiUser
            size={22}
            color="#BDCBEC"
            className="position-absolute input__icon"
          />
          <Form.Control
            type="text"
            placeholder="Your Name"
            className="mdf__form__input"
          />
        </Form.Group> */}
        <Button variant="primary" className="w-100 mt-3 py-3">
          Next
        </Button>
      </Form>
    </section>
  );
}

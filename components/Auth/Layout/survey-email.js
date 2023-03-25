import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { HiMail } from "react-icons/hi";
import Form from 'react-bootstrap/Form';
export default function SurveyEmail() {
    return (
        <section className="mdf__login_right-block"> 
            <Form>
                <Form.Label className="fs-4 fw-bold">What is your business email?</Form.Label>
                <Form.Group className="mb-2 position-relative" controlId="exampleForm.ControlInput1">
                    <HiMail size={22} color="#BDCBEC" className="position-absolute input__icon" />
                    <Form.Control type="email" placeholder="Your email" className="mdf__form__input" />
                </Form.Group> 
                <Button variant="primary" className="w-100 mt-3 py-3">
                    Next
                </Button>
            </Form>

        </section>
    );
}
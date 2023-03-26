import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { HiSearch} from "react-icons/hi";
import Form from 'react-bootstrap/Form';
export default function FeatureSurvey() {
    return (
        <section className="mdf__login_right-block">
            <Form>
                <Form.Label className="fs-4 my-0 fw-bold mb-3">What are the most important features you look for in a platform?</Form.Label>
                <Form.Group className="mb-2 position-relative" controlId="exampleForm.ControlInput1">
                    <HiSearch size={22} className="position-absolute input__icon text-primary" />
                    <Form.Control type="search" placeholder="Search" className="mdf__form__input rounded-pill border-primary mb-5" />
                </Form.Group>
                <div className="d-flex flex-wrap">
                    <Form.Group className="me-3 mb-3">
                        <Form.Control type="checkbox" class="btn-check" id="btn-check-outlined01" hidden />
                        <label class="btn btn-outline-primary checkbox__primary" for="btn-check-outlined01">
                            Image Quality Detection
                        </label>
                    </Form.Group >
                    <Form.Group className="me-3 mb-3">
                        <Form.Control type="checkbox" class="btn-check" id="btn-check-outlined02" hidden />
                        <label class="btn btn-outline-primary checkbox__primary" for="btn-check-outlined02">
                            GDPR
                        </label>
                    </Form.Group >
                    <Form.Group className="me-3 mb-3">
                        <Form.Control type="checkbox" class="btn-check" id="btn-check-outlined03" hidden />
                        <label class="btn btn-outline-primary checkbox__primary" for="btn-check-outlined03">
                            Violence Detection
                        </label>
                    </Form.Group >
                    <Form.Group className="me-3 mb-3">
                        <Form.Control type="checkbox" class="btn-check" id="btn-check-outlined04" hidden />
                        <label class="btn btn-outline-primary checkbox__primary" for="btn-check-outlined04">
                            Abusive Text Detection
                        </label>
                    </Form.Group >
                    <Form.Group className="me-3 mb-3">
                        <Form.Control type="checkbox" class="btn-check" id="btn-check-outlined05" hidden />
                        <label class="btn btn-outline-primary checkbox__primary" for="btn-check-outlined05">
                            Abuse Detection
                        </label>
                    </Form.Group >
                    <Form.Group className="me-3 mb-3">
                        <Form.Control type="checkbox" class="btn-check" id="btn-check-outlined06" hidden />
                        <label class="btn btn-outline-primary checkbox__primary" for="btn-check-outlined06">
                            Nudity Detection
                        </label>
                    </Form.Group >
                </div>
                <Button variant="primary" className="w-100 mt-3 py-3">
                    Next
                </Button>
            </Form>
        </section>
    );
}
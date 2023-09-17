import React from "react";
import { Form } from "react-bootstrap";
import { HiOutlineSearch } from "react-icons/hi";
export default function MusicPanel() {
    return (
        <section>
            <Form.Group className="mb-3 position-relative w-50" controlId="formBasicEmail">
                <HiOutlineSearch className="position-absolute search__icon"/>
                <Form.Control type="search" placeholder="Search" className="py-2 px-5 border-2 border border-primary rounded-pill" />
            </Form.Group>
            <div className="mdf__music__panel mb-3">
                <div className="mdf__left-content">
                    <h6 className="text-orange">Promotional Text detection</h6>
                    <p className="mb-0">8845 frames</p>
                </div>
                <div className="mdf__right-content flex-fill">
                    <ul className="d-flex justify-content-around mb-0 flex-row mt-1 list-unstyled">
                        <li>Test.mp4</li>
                        <li>mp4</li>
                        <li>HD</li>
                        <li>77sec</li>
                    </ul>
                </div>
            </div>
            <div className="mdf__music__panel mb-3">
                <div className="mdf__left-content">
                    <h6 className="text-orange">Promotional Text detection</h6>
                    <p className="mb-0">8845 frames</p>
                </div>
                <div className="mdf__right-content flex-fill">
                    <ul className="d-flex justify-content-around mb-0 flex-row mt-1 list-unstyled">
                        <li>Test.mp4</li>
                        <li>mp4</li>
                        <li>HD</li>
                        <li>77sec</li>
                    </ul>
                </div>
            </div>
            <div className="mdf__music__panel mb-3">
                <div className="mdf__left-content">
                    <h6 className="text-orange">Promotional Text detection</h6>
                    <p className="mb-0">8845 frames</p>
                </div>
                <div className="mdf__right-content flex-fill">
                    <ul className="d-flex justify-content-around mb-0 flex-row mt-1 list-unstyled">
                        <li>Test.mp4</li>
                        <li>mp4</li>
                        <li>HD</li>
                        <li>77sec</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
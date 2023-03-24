import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { HiMail, HiLockClosed} from "react-icons/hi";
import Form from 'react-bootstrap/Form';
export default function LoginBlock() {
    return (
        <section className="mdf__login_right-block">
            <Image
                className="mdf__logo_modal"
                layout='fill'
                src="/images/logo.png"
                alt=""
            />
            <h1 className="text_blue fw-bold">Welcome to Media <br></br> Firewall </h1>
            <p>Continue with</p>
            <div className="social_button__blocks">
                <Button>
                    <Image
                        className="social__icons"
                        layout='fill'
                        src="/images/google-icon.png"
                        alt=""
                    />
                    Google
                </Button>
                <Button className="ms-3">
                    <Image
                        className="social__icons"
                        layout='fill'
                        src="/images/facebook-icon.png"
                        alt=""
                    />
                    Facebook
                </Button>
            </div>
            <p className="mt-3">Or, sign-in with your email</p>
            <Form>
                <Form.Group className="mb-2 position-relative" controlId="exampleForm.ControlInput1"> 
                    <HiMail size={22} color="#BDCBEC" className="position-absolute input__icon"/>
                    <Form.Control type="email" placeholder="Email" className="mdf__form__input" />
                </Form.Group>
                <Form.Group className="mb-1 position-relative" controlId="exampleForm.ControlInput1"> 
                    <HiLockClosed size={22} color="#BDCBEC" className="position-absolute input__icon"/>
                    <Form.Control type="password" placeholder="Password" className="mdf__form__input" />
                </Form.Group>
           <div className="text-end"><a href="#" className="text-primary text-decoration-none fw-bold ">Forgot Password?</a></div>
           <Button variant="primary" className="w-100 mt-3 py-3">
                Sign In
           </Button>
           <div className="text-center mt-3">
            <p>Don't have an account? <a href="/account-security/register" className="text-primary text-decoration-none fw-bold">Sign up</a> </p>
           </div>
            </Form>

        </section>
    );
}
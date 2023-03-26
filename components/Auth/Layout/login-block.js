/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail } from "react-icons/hi";
import * as yup from "yup";

import { auth } from "@/services/firebase";
import { captchaKey } from "@/utils/constants";

//Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginBlock = () => {
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema), // set the validation schema resolver
  });

  const [isCaptchaVerify, setIsCaptchaVerify] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const captcha = useRef(null);

  //google auth provider from firebase
  const googleAuth = new GoogleAuthProvider();

  //Handle method of google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      if (result && result.user) {
        Router.push("/auth/survey");
      }
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleFacebookLogin = async () => {
    console.log("facebook login clicked");
  };

  //Form submit method
  const onSubmitLogin = (data) => {
    if (!isCaptchaVerify) {
      setError("captcha", { message: "Please verify captcha" });
      return;
    }
    console.log(data);
    console.log("captchaToken :>> ", captchaToken);
    Router.push("/auth/survey");
  };

  //captcha verification functions
  const onVerifyCaptchaCallback = (response) => {
    setCaptchaToken(response);
    setIsCaptchaVerify(true);
  };

  const onErrorInCaptcha = async () => {
    setIsCaptchaVerify(false);
    setCaptchaToken("");
  };

  //render method
  return (
    <section className="mdf__login_right-block">
      <h1 className="text_blue fw-bold">
        Welcome to Media <br></br> Firewall{" "}
      </h1>
      <p>Continue with</p>
      <div className="social_button__blocks">
        <Button onClick={handleGoogleLogin}>
          <Image
            className="social__icons"
            layout="fill"
            src="/images/google-icon.png"
            alt=""
          />
          Google
        </Button>
        <Button className="ms-3" onClick={handleFacebookLogin}>
          <Image
            className="social__icons"
            layout="fill"
            src="/images/facebook-icon.png"
            alt=""
          />
          Facebook
        </Button>
      </div>
      <p className="mt-3">Or, sign-in with your email</p>
      <Form onSubmit={handleSubmit(onSubmitLogin)}>
        <Form.Group
          className="mb-2 position-relative"
          controlId="exampleForm.ControlInput1"
        >
          <HiMail
            size={22}
            color="#BDCBEC"
            className="position-absolute input__icon"
          />
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="Email"
            className="mdf__form__input"
          />
        </Form.Group>
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
        <Form.Group
          className="mb-1 position-relative"
          controlId="exampleForm.ControlInput1"
        >
          <HiLockClosed
            size={22}
            color="#BDCBEC"
            className="position-absolute input__icon"
          />
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="Password"
            className="mdf__form__input"
          />
        </Form.Group>
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
        <ReCAPTCHA
          ref={captcha}
          sitekey={captchaKey.siteKey}
          onChange={onVerifyCaptchaCallback}
          onExpired={onErrorInCaptcha}
          onErrored={onErrorInCaptcha}
        />
        {errors.captcha && (
          <span className="error-message">{errors.captcha.message}</span>
        )}
        <div className="text-end">
          <Link
            href="/account-security/forgot-password"
            className="text-primary text-decoration-none fw-bold "
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" variant="primary" className="w-100 mt-3 py-3">
          Sign In
        </Button>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link
              href="/account-security/signup"
              className="text-primary text-decoration-none fw-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default LoginBlock;

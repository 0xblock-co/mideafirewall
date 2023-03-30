/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail } from "react-icons/hi";
import * as yup from "yup";

import Loader from "@/components/Loader";
import { auth } from "@/services/firebase";
import { localStorageKeys, regex } from "@/utils/constants";
import { createCookie } from "@/utils/cookieCreator";

//Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      regex.passwordRegex,
      "Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, and one special character."
    )
    .required("Password is required."),
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
  const [isLoading, setIsLoading] = useState(false);
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

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async (token) => {
    setCaptchaToken(token);
    setIsCaptchaVerify(true);
    // Do whatever you want with the token
  }, []);

  //Form submit method
  const onSubmitLogin = async (data) => {
    setIsLoading(true);
    if (!isCaptchaVerify) {
      setError("captcha", { message: "Please verify captcha" });
      return;
    }

    console.log("object :>> ", captchaToken);
    createCookie(localStorageKeys.authKey, data.email, 1);
    Router.push("/auth/survey");
    setIsLoading(false);
    //TODO: comment out the code after the api works fine
    // const response = await asyncLoginService({
    //   ...data,
    //   recaptchaResponse: captchaToken,
    // });
    // if (response && response.isSuccess && response.data) {
    //   createCookie(localStorageKeys.authKey, data.email, 1);
    //   Router.push("/auth/survey");
    // }
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

        <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
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
      <Loader isLoading={isLoading} />
    </section>
  );
};

export default LoginBlock;

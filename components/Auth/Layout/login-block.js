/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail } from "react-icons/hi";
import * as yup from "yup";

import { auth } from "@/services/firebase";
import { showToast } from "@/utils/alert";
import { regex } from "@/utils/constants";

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

const LoginBlock = ({ handleLoginSubmit }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema), // set the validation schema resolver
  });

  //google auth provider from firebase
  const googleAuth = new GoogleAuthProvider();

  //Handle method of google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      if (result && result.user) {
        const formData = {
          email: result.user.email,
          authType: "google",
        };
        await handleLoginSubmit(formData);
      }
    } catch (error) {
      showToast("error", error);
    }
  };

  // const handleFacebookLogin = async () => {
  //   console.log("facebook login clicked");
  // };

  //Form submit method

  const onSubmitLogin = useCallback(
    (data) => {
      if (!executeRecaptcha) {
        setError("captcha", { message: "Please verify captcha" });
        return;
      }
      executeRecaptcha("login").then(async (gReCaptchaToken) => {
        await handleLoginSubmit({ ...data, gReCaptchaToken });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [executeRecaptcha, setError]
  );

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
        <Button className="ms-3" onClick={() => signIn("linkedin")}>
          <Image
            className="social__icons"
            layout="fill"
            src="/images/facebook-icon.png"
            alt=""
          />
          Linkedin
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

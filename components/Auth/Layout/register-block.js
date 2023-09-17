/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import * as yup from "yup";

import { auth } from "@/services/firebase";
import { showToast } from "@/utils/alert";
import { regex } from "@/utils/constants";

//Validation Schema
const schema = yup.object().shape({
  userId: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup
    .string()
    .matches(
      regex.passwordRegex,
      "Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, and one special character."
    )
    .required("Password is required."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

const RegisterBlock = ({ handleSubmitSingUp }) => {
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm({
    resolver: yupResolver(schema), // set the validation schema resolver
  });

  //google auth provider from firebase
  const googleAuth = new GoogleAuthProvider();
  // const { login } = useAuth();

  //Handle method of google login
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      if (result && result.user) {
        const user = {
          firstName: result.user?.displayName?.split(" ")?.[0] || "test",
          lastName: result.user?.displayName?.split(" ")?.[1] || "user",
          email: result.user.email,
          authType: "google",
          password: "Password1230*",
        };
        handleSubmitSingUp(user);
      }
    } catch (error) {
      // console.log("error :>> ", error);
      showToast("error", error);
    }
  };

  // const handleFacebookSignup = async () => {
  //   console.log("facebook login clicked");
  // };

  //Form submit method
  const onSubmitSingUp = async (data) => {
    delete data.passwordConfirmation;
    handleSubmitSingUp({ ...data, authType: "Credentials" });
  };

  return (
    <section className="mdf__login_right-block">
      <h1 className="text_blue fw-bold">
        Welcome to Media <br></br> Firewall{" "}
      </h1>
      <p>Continue with</p>
      <div className="social_button__blocks">
        <Button onClick={handleGoogleSignup}>
          <Image
            className="social__icons"
            layout="fill"
            src="/images/google-icon.png"
            alt=""
          />
          Google
        </Button>
        {/* <Button className="ms-3" onClick={handleFacebookSignup}>
          <Image
            className="social__icons"
            layout="fill"
            src="/images/facebook-icon.png"
            alt=""
          />
          Facebook
        </Button> */}
      </div>
      <p className="mt-3">Or, sign-up with your email</p>
      <Form onSubmit={handleSubmit(onSubmitSingUp)}>
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
            {...register("userId")}
            type="email"
            placeholder="Email"
            className="mdf__form__input"
          />
        </Form.Group>
        {errors.userId && (
          <span className="error-message">{errors.userId.message}</span>
        )}
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
            {...register("firstName")}
            type="text"
            placeholder="First Name"
            className="mdf__form__input"
          />
        </Form.Group>
        {errors.firstName && (
          <span className="error-message">{errors.firstName.message}</span>
        )}
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
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            className="mdf__form__input"
          />
        </Form.Group>
        {errors.lastName && (
          <span className="error-message">{errors.lastName.message}</span>
        )}
        <Form.Group
          className="mb-2 position-relative"
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
            {...register("passwordConfirmation")}
            type="password"
            placeholder="Retype Password"
            className="mdf__form__input"
          />
        </Form.Group>
        {errors.passwordConfirmation && (
          <span className="error-message">
            {errors.passwordConfirmation.message}
          </span>
        )}
        {/* <ReCAPTCHA
          ref={captcha}
          sitekey={captchaKey.siteKey}
          onChange={onVerifyCaptchaCallback}
          onExpired={onErrorInCaptcha}
          onErrored={onErrorInCaptcha}
        /> */}
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
          Sign Up
        </Button>
        <div className="text-center mt-3">
          <p>
            Already have an account ?{" "}
            <Link
              href="/account-security/login"
              className="text-primary text-decoration-none fw-bold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </section>
  );
};

export default RegisterBlock;

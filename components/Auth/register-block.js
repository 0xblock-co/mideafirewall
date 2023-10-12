/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail, HiUser } from "react-icons/hi";
import * as yup from "yup";
import style from "./auth.module.scss";

import { showToast } from "@/components/ToastContainer/toaster";
import { regex } from "@/constants/global.constants";
import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

//Validation Schema
const schema = yup.object().shape({
  email: yup
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
    setError,
  } = useForm({
    resolver: yupResolver(schema), // set the validation schema resolver
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  //google auth provider from firebase
  const googleAuth = new GoogleAuthProvider();

  //Handle method of google login
  const handleGoogleSignup = async () => {
    try {
      if (!executeRecaptcha) {
        setError("captcha", { message: "Please verify captcha" });
        return;
      }
      executeRecaptcha("signup").then(async (gReCaptchaToken) => {
        window.location.href = "/api/auth/google";
        // const result = await signInWithPopup(auth, googleAuth);
        // if (result && result.user) {
        //   const formData = {
        //     email: result.user.email,
        //     idToken: result._tokenResponse.idToken,
        //     authType: "google",
        //     gReCaptchaToken,
        //   };
        //   await handleSubmitSingUp(formData);
        // }
      });
    } catch (error) {
      showToast("error", error);
    }
  };

  //Form submit method
  const handleLinkedInLogin = () => {
    window.location.href = "/api/auth/linkedin";
  };
  const handleMicrosoftInLogin = () => {
    window.location.href = "/api/auth/microsoft";
  };
  const onSubmitSingUp = useCallback(
    (data) => {
      if (!executeRecaptcha) {
        setError("captcha", { message: "Please verify captcha" });
        return;
      }
      executeRecaptcha("signup").then(async (gReCaptchaToken) => {
        delete data.passwordConfirmation;
        await handleSubmitSingUp({
          ...data,
          authType: "email",
          gReCaptchaToken,
        });
      });
    },
    [executeRecaptcha, setError]
  );
  return (
    <section className={style.mdf__login_right_block}>
      <h1 className={`${style.text_blue} fw-bold`}>
        Welcome to Media <br></br> Firewall{" "}
      </h1>
      <p>Continue with</p>
      <div className={style.social_button__blocks}>
        <Button onClick={handleGoogleSignup}>
          <Image
            className={style.social__icons}
            layout="fill"
            src="/images/google-icon.png"
            alt=""
          />
          Google
        </Button>
        <Button className="ms-3" onClick={handleLinkedInLogin}>
          <Image
            className={style.social__icons}
            layout="fill"
            src="/images/linkedIn.svg"
            alt=""
          />
          LinkedIn
        </Button>
        <Button className="ms-3" onClick={handleMicrosoftInLogin}>
          <Image
            className={style.social__icons}
            layout="fill"
            src="/images/microsoft.svg"
            alt=""
          />
          Microsoft
        </Button>
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
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`mdf__form__input ${style.mdf__form__input}`}
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
            className={`mdf__form__input ${style.mdf__form__input}`}
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
            className={`mdf__form__input ${style.mdf__form__input}`}
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
            className={`mdf__form__input ${style.mdf__form__input}`}
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
            className={`mdf__form__input ${style.mdf__form__input}`}
          />
        </Form.Group>
        {errors.passwordConfirmation && (
          <span className="error-message">
            {errors.passwordConfirmation.message}
          </span>
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
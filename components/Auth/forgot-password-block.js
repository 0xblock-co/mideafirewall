/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Router from "next/router";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { HiMail } from "react-icons/hi";
import * as yup from "yup";

import style from "./auth.module.scss";
import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

//Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordBlock = ({ handleForgotPasswordSubmit }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  //useForm
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // set the validation schema resolver
  });

  //Form submit method
  const onSubmitLogin = useCallback(
    (data) => {
      if (!executeRecaptcha) {
        setError("captcha", { message: "Please verify captcha" });
        return;
      }
      executeRecaptcha("login").then(async (gReCaptchaToken) => {
        await handleForgotPasswordSubmit({
          ...data,
          authType: "email",
          gReCaptchaToken,
        });
      });
    },
    [executeRecaptcha, setError]
  );

  //render method
  return (
    <section className={style.mdf__login_right_block}>
      <h1 className={`${style.text_blue} fw-bold`}>Password forgotten?</h1>

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
            className={`mdf__form__input ${style.mdf__form__input}`}
          />
        </Form.Group>
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
        <Button type="submit" variant="primary" className="w-100 mt-3 py-3">
          Send Email
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

export default ForgotPasswordBlock;

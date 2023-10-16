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

//Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordBlock = () => {
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // set the validation schema resolver
  });

  //Form submit method
  const onSubmitLogin = () => Router.push("/account-security/login");

  //render method
  return (
    <section className={style.mdf__login_right_block}>
      <h1 className={`${style.text_blue} fw-bold`}>Password forgotten?</h1>

      <p className="mt-3">Your Email</p>
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

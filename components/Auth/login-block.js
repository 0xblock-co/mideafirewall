import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { HiLockClosed, HiMail } from "react-icons/hi";
import * as yup from "yup";
// import { auth } from "@/services/firebase";
import { showToast } from "@/components/ToastContainer/toaster";
import { regex } from "@/constants/global.constants";
import style from "./auth.module.scss";

// Validation Schema
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

  // Form methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema), // Set the validation schema resolver
  });

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      if (!executeRecaptcha) {
        setError("captcha", { message: "Please verify captcha" });
        return;
      }
      executeRecaptcha("login").then(async (gReCaptchaToken) => {
        window.location.href = "/api/auth/google";
      });
    } catch (error) {
      showToast("error", error);
    }
  };

  // Handle Form Submission
  const onSubmitLogin = useCallback(
    (data) => {
      if (!executeRecaptcha) {
        setError("captcha", { message: "Please verify captcha" });
        return;
      }
      executeRecaptcha("login").then(async (gReCaptchaToken) => {
        await handleLoginSubmit({
          ...data,
          authType: "email",
          gReCaptchaToken,
        });
      });
    },
    [executeRecaptcha, setError]
  );

  // Handle LinkedIn Login
  const handleLinkedInLogin = () => {
    window.location.href = "/api/auth/linkedin";
  };
  const handleMicrosoftInLogin = () => {
    window.location.href = "/api/auth/microsoft";
  };

  // Render Method
  return (
    <section className={style.mdf__login_right_block}>
      <h1 className={`${style.text_blue} fw-bold`}>
        Welcome to Media <br /> Firewall{" "}
      </h1>
      <p>Continue with</p>
      <div className={style.social_button__blocks}>
        <Button onClick={handleGoogleLogin}>
          <Image
            className={style.social__icons}
            layout="fill"
            src="/images/google-icon.png"
            alt=""
          />
          Google
        </Button>
        {/* <Button className="ms-3" onClick={handleLinkedInLogin}>
          <Image
            className={style.social__icons}
            layout="fill"
            src="/images/linkedIn.svg"
            alt=""
          />
          LinkedIn
        </Button> */}
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
      <p className="mt-3">Or, sign-in with your email</p>
      <Form onSubmit={handleSubmit(onSubmitLogin)}>
        <Form.Group className="mb-2 position-relative" controlId="email">
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
        <Form.Group className="mb-1 position-relative" controlId="password">
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

        {errors.captcha && (
          <span className="error-message">{errors.captcha.message}</span>
        )}
        <div className="text-end">
          <Link
            href="/account-security/forgot-password"
            className="text-primary text-decoration-none fw-bold"
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

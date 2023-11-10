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
import { useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
import CommonUtility from "@/utils/common.utils";
import { decodeJWTToekn } from "@/utils/globalFunctions";
import moment from "moment";

//Validation Schema
const schema = yup.object().shape({
    userId: yup.string().email("Invalid email address").required("Email is required"),
    password: yup
        .string()
        .required("Password is required.")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must not exceed 20 characters"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match.")
        .required("Confirm password is required."),
});

const ChangePasswordForm = ({ handleResetPasswordSubmit }) => {
    //useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema), // set the validation schema resolver
    });
    const router = useRouter();
    useEffect(() => {
        const handleInvalidLink = () => {
            showToast("error", "Link is not valid. Please try again.");
            router.push("/account-security/login");
        };

        if (CommonUtility.isNotEmptyObject(router.query) && CommonUtility.isNotEmpty(router.query?.email) && CommonUtility.isNotEmpty(router.query?.vcode)) {
            const decodedVCode = decodeJWTToekn(router.query.vcode);

            if (!decodedVCode) {
                handleInvalidLink();
                return;
            }

            const expirationTime = moment.unix(decodedVCode.exp);
            const currentTime = moment();

            if (expirationTime.isBefore(currentTime)) {
                showToast("error", "Token has expired. Please try again.");
                router.push("/account-security/login");
            } else if (decodedVCode.sub === router.query?.email) {
                setValue("userId", decodedVCode.sub);
            } else {
                handleInvalidLink();
            }
        }
    }, [router]);

    //Form submit method
    const onSubmitResetPassword = useCallback((data) => {
        delete data.passwordConfirmation;
        handleResetPasswordSubmit({
            ...data,
            token: router.query.vcode,
        });
    }, []);

    return (
        <section className={style.mdf__login_right_block}>
            <h1 className={`${style.text_blue} fw-bold`}>
                Change Password <br />
            </h1>
            <Form onSubmit={handleSubmit(onSubmitResetPassword)}>
                <Form.Group className="mb-2 position-relative" controlId="exampleForm.ControlInput1">
                    <HiMail size={22} color="#BDCBEC" className="position-absolute input__icon" />
                    <Form.Control {...register("userId")} type="userId" disabled placeholder="Email" className={`mdf__form__input ${style.mdf__form__input}`} />
                </Form.Group>
                {errors.userId && <span className="error-message">{errors.userId.message}</span>}
                <Form.Group className="mb-2 position-relative" controlId="exampleForm.ControlInput1">
                    <HiLockClosed size={22} color="#BDCBEC" className="position-absolute input__icon" />
                    <Form.Control {...register("password")} type="password" placeholder="Password" className={`mdf__form__input ${style.mdf__form__input}`} />
                </Form.Group>
                {errors.password && <span className="error-message">{errors.password.message}</span>}
                <Form.Group className="mb-1 position-relative" controlId="exampleForm.ControlInput1">
                    <HiLockClosed size={22} color="#BDCBEC" className="position-absolute input__icon" />
                    <Form.Control {...register("passwordConfirmation")} type="password" placeholder="Retype Password" className={`mdf__form__input ${style.mdf__form__input}`} />
                </Form.Group>
                {errors.passwordConfirmation && <span className="error-message">{errors.passwordConfirmation.message}</span>}

                {errors.captcha && <span className="error-message">{errors.captcha.message}</span>}
                <Button type="submit" variant="primary" className="w-100 mt-3 py-3">
                    Change Password
                </Button>
                <div className="text-center mt-3">
                    <p>
                        Already have an account ?{" "}
                        <Link href="/account-security/login" className="text-primary text-decoration-none fw-bold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Form>
        </section>
    );
};

export default ChangePasswordForm;

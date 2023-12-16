import style from "@/components/Auth/auth.module.scss";
import { Fragment } from "react";
import Form from "react-bootstrap/Form";

const InputTypeTextAreaComponent = ({ title, placeholder, register, name, errors, rows }) => {
    return (
        <Fragment>
            <Form.Label className="fs-4 fw-bold">{title}</Form.Label>
            <Form.Group className="mb-2 position-relative" controlId="exampleForm.ControlInput1">
                {/* <HiUser
          size={22}
          color="#BDCBEC"
          className={`position-absolute ${style.input__icon}`}
        /> */}
                <Form.Control rows={rows} as="textarea" placeholder={placeholder} className={`mdf__form__input ${style.mdf__form__input1}`} {...register(name)} />
            </Form.Group>
            {errors[name] && <span className="error-message">{errors[name].message}</span>}
        </Fragment>
    );
};

export default InputTypeTextAreaComponent;

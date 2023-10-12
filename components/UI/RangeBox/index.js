import React from "react";
import { Form } from "react-bootstrap";
import style from "@/components/Auth/auth.module.scss";

const RangeBox = ({ title, register, watch, name, errors, min, max }) => {
  const rangeValue = watch(name);
  return (
    <section className={style.mdf__serve_right_block}>
      <Form.Label className="fs-4 my-0 fw-bold mb-3">{title}</Form.Label>
      <div className="d-flex flex-wrap">
        <label
          className="btn btn-outline-primary checkbox__primary"
          htmlFor="btn-check-outlined012"
        >
          Rs. {rangeValue}
        </label>
        <Form.Range className="mt-3" {...register(name)} min={min} max={max} />
        {errors[name] && (
          <span className="error-message">{errors[name].message}</span>
        )}
      </div>
    </section>
  );
};

export default RangeBox;

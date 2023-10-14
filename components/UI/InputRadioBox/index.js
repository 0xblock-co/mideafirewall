import Image from "next/image";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import style from "@/components/Auth/auth.module.scss";

import { useAuth } from "@/contexts/AuthContext";

const InputRadioBoxComponent = ({ title, name, options, register, errors }) => {
  const { user } = useAuth();

  return (
    <section className={style.mdf__login__card_button}>
      <h5 className="text_blue fw-bold mt-3">
        Hello there{" "}
        {(user?.userDetails?.firstName || "") +
          " " +
          (user?.userDetails?.lastName || "")}{" "}
      </h5>
      <Form.Label className="fs-4 fw-bold">{title}</Form.Label>
      <Row>
        {options.map((item, index) => {
          return (
            <Col sm={4} className="mt-4" key={index}>
              <Form.Group>
                <Form.Control
                  type="radio"
                  className="btn-check"
                  name={name}
                  id={`${name}-${item.value}`}
                  autoComplete="off"
                  hidden
                  value={item.value}
                  {...register(name)}
                />
                <label
                  className={`btn btn-outline-primary ${style.raio__button__card}`}
                  htmlFor={`${name}-${item.value}`}
                >
                  {item.image && (
                    <Image layout="fill" src={item.image} alt="" />
                  )}
                  <h5 className="mt-3">{item.label}</h5>
                </label>
              </Form.Group>
            </Col>
          );
        })}
      </Row>
      {errors[name] && (
        <span className="error-message">{errors[name].message}</span>
      )}
    </section>
  );
};

export default InputRadioBoxComponent;

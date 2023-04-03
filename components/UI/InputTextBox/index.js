import { Fragment } from "react";
import Form from "react-bootstrap/Form";
import { HiUser } from "react-icons/hi";

const InputTypeTextComponent = ({
  title,
  placeholder,
  register,
  name,
  errors,
}) => {
  return (
    <Fragment>
      <Form.Label className="fs-4 fw-bold">{title}</Form.Label>
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
          type="text"
          placeholder={placeholder}
          className="mdf__form__input"
          {...register(name)}
        />
      </Form.Group>
      {errors[name] && (
        <span className="error-message">{errors[name].message}</span>
      )}
    </Fragment>
  );
};

export default InputTypeTextComponent;
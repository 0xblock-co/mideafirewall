import Form from "react-bootstrap/Form";
import { HiUser } from "react-icons/hi";

export const InputTypeTextComponent = () => {
  return (
    <>
        <Form.Label className="fs-4 fw-bold">What is your name?</Form.Label>
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
            placeholder="Your Name"
            className="mdf__form__input"
          />
        </Form.Group>
      </>
  );
};

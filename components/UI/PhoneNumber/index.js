import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberComponent = ({ title, name, control, errors }) => {
    return (
        <Fragment>
            <Form.Label className="fs-4 fw-bold">{title}</Form.Label>
            <Form.Group className="mb-2 position-relative" controlId={`exampleForm.ControlInput-${name}`}>
                <Controller name={name} control={control} defaultValue="" render={({ field }) => <PhoneInput {...field} country={"us"} />} />
            </Form.Group>
            {!errors?.[name] ? null : <span className="error-message">{`${"Invalid phone number"} `}</span>}
        </Fragment>
    );
};

export default PhoneNumberComponent;

import style from "@/components/Auth/auth.module.scss";
import Form from "react-bootstrap/Form";

export default function InputCheckBoxComponent({ title, register, name, options, errors }) {
    return (
        <section className={`${style.mdf__serve_right_block}`}>
            <Form.Label className="fs-4 my-0 fw-bold mb-3">{title}</Form.Label>
            <div className="d-flex flex-wrap">
                {options?.map((item, index) => {
                    return (
                        <Form.Group className="me-3 mb-3" key={index}>
                            <Form.Control
                                type="checkbox"
                                className="btn-check"
                                id={`${item.value}`}
                                hidden
                                {...register(name)}
                                value={item.value}
                                // defaultChecked={}
                            />
                            <label className={`btn btn-outline-primary checkbox__primary`} style={{ textAlign: "left" }} htmlFor={`${item.value}`}>
                                {item.label}
                            </label>
                        </Form.Group>
                    );
                })}
                {errors[name] && <span className="error-message">{errors[name].message}</span>}
            </div>
        </section>
    );
}

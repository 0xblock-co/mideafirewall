import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

import style from "./contact.module.scss";
import { TIME_ZONE } from "@/data";

//Validation Schema
const schema = yup.object().shape({
  attendees: yup.array().of(
    yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    })
  ),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  companyName: yup.string().required("Company Name is required"),
  websiteUrl: yup.string().required("Website Url is required"),
  timeZone: yup.string().required("TimeZone is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
});

export default function BookMeeting({
  defaultMeetingData,
  handleSubmitMeeting,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      attendees: [{ email: "" }],
    },
    resolver: yupResolver(schema), // set the validation schema resolver
  }); // Initializing useForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attendees",
  });

  const handleAddEmail = () => {
    append({ email: "" });
  };

  const onSubmit = async (data) => {
    const {
      companyName,
      firstName,
      lastName,
      websiteUrl,
      wantToCC,
      date,
      time,
      timeZone,
    } = data;
    const attendees = data.attendees.map((attendee) => attendee.email);
    let ccEmails = [];
    if (wantToCC) {
      ccEmails = attendees;
    }
    const params = {
      ...defaultMeetingData,
      companyName,
      firstname: firstName,
      lastName,
      websiteUrl,
      attendees,
      dateAndTime: `${date} ${time}:00`,
      ccEmails,
      timeZone,
    };
    await handleSubmitMeeting(params);
    reset();
  };

  return (
    <section className={style.mdf__book__meeting}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-5 text-center">
              <h2>Book a Meeting</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-around">
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="First Name*"
                        className="mdf__form__input"
                        {...register("firstName")}
                      />
                    </Form.Group>
                    {errors.firstName && (
                      <span className="error-message">
                        {errors.firstName.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Last Name*"
                        className="mdf__form__input"
                        {...register("lastName")}
                      />
                    </Form.Group>
                    {errors.lastName && (
                      <span className="error-message">
                        {errors.lastName.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5} className="d-flex">
                    {fields.map((email, index) => {
                      return (
                        <>
                          <Form.Group
                            className="mt-5"
                            controlId="exampleForm.ControlInput3"
                            key={email.id}
                          >
                            <Form.Control
                              key={email.id}
                              type="email"
                              name={`attendees[${index}].email`}
                              // defaultValue={email.value}
                              placeholder="Email*"
                              className="mdf__form__input"
                              {...register(`attendees[${index}].email`)}
                            />
                          </Form.Group>
                          {index !== 0 && (
                            <Button
                              type="button"
                              className="ms-2 px-3 py-2 mt-5"
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                          )}
                          {errors.attendees && (
                            <span className="error-message">
                              {errors.attendees?.[index]?.email?.message}
                            </span>
                          )}
                        </>
                      );
                    })}

                    <Button
                      type="button"
                      onClick={handleAddEmail}
                      className="ms-2 px-3 py-2 mt-5"
                    >
                      +
                    </Button>
                  </Col>

                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Company Name*"
                        className="mdf__form__input"
                        {...register("companyName")}
                      />
                    </Form.Group>
                    {errors.companyName && (
                      <span className="error-message">
                        {errors.companyName.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="url"
                        placeholder="Website Url*"
                        className="mdf__form__input"
                        {...register("websiteUrl")}
                      />
                    </Form.Group>
                    {errors.websiteUrl && (
                      <span className="error-message">
                        {errors.websiteUrl.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Select
                        aria-label="Default select example"
                        {...register("timeZone")}
                        className="mdf__form__input"
                      >
                        <option defaultValue="Asia/Kolkata">
                          Asia/Kolkata
                        </option>
                        {TIME_ZONE.map((zone, index) => {
                          return (
                            <option value={zone} key={index}>
                              {zone}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                    {errors.timeZone && (
                      <span className="error-message">
                        {errors.timeZone.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="time"
                        placeholder="Select time*"
                        className="mdf__form__input"
                        {...register("time")}
                      />
                    </Form.Group>
                    {errors.time && (
                      <span className="error-message">
                        {errors.time.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="date"
                        placeholder="Select Date*"
                        className="mdf__form__input"
                        {...register("date")}
                      />
                    </Form.Group>
                    {errors.date && (
                      <span className="error-message">
                        {errors.date.message}
                      </span>
                    )}
                  </Col>
                  <Col md={6} lg={5}>
                    <Form.Group
                      className="mt-5"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="checkbox"
                        id="ccEmail"
                        className="btn-check"
                        hidden
                        {...register("wantToCC")}
                      />
                      <label
                        className={`btn btn-outline-primary ${style.checkbox__primary}`}
                        htmlFor="ccEmail"
                      >
                        Want to CC?
                      </label>
                    </Form.Group>
                    {errors.wantToCC && (
                      <span className="error-message">
                        {errors.wantToCC.message}
                      </span>
                    )}
                  </Col>
                </Row>
                <Button
                  type="submit"
                  className="btn btn-primary mt-5 py-2 px-5"
                >
                  Book
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

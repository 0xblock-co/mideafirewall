import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import style from "@/styles/bookMeeting.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import React, { useState } from "react";
import { TIME_ZONE } from "@/data";
import { useAuth } from "@/contexts/AuthContext";
import crypto from "crypto";
import CommonUtility from "@/utils/common.utils";
import moment from "moment";
import { asyncCreateMeeting } from "@/services/product/product.service";
import { ToastMessage } from "@/utils/toastMessage.utils";

export default function BookMeetingScreen() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      participants: [{ Email: "", name: "" }],
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const handleAddFields = () => {
    append({ Email: "", name: "" });
  };

  const onSubmit = async (data) => {
    if (CommonUtility.isValidArray(data.participants)) {
      data.participants.map((item) => {
        item.invited = true;
        item.type = "string";
        item.participant = "string";
      });
    }
    const params = {
      participants: data.participants,
      virtualLocation: data.virtualLocation,
      timeZone: data.timeZone,
      meetingId: crypto.randomBytes(16).toString("hex"),
      dateAndTime: moment(
        data.date + " " + data.time,
        "YYYY-MM-DD HH:mm"
      ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    };
    setIsLoading(true);
    try {
      const response = await asyncCreateMeeting(params, user);
      if (response && response.isSuccess && response.data) {
        setIsLoading(false);
        ToastMessage.success("Meeting scheduled successfully");
      }
    } catch (error) {
      ToastMessage.error("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <section className={style.mdf__book__meeting}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-5 text-center book-meeting-card">
              <h2>Book a Meeting</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="g-3" style={{ marginBottom: "15px" }}>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Select
                        aria-label="Default select example"
                        {...register("virtualLocation")}
                        className="mdf__form__input"
                      >
                        <option defaultValue="GoogleMeet">Google Meet</option>
                        <option defaultValue="ZoomMeeting">Zoom Meet</option>
                        <option defaultValue="ZOHO">ZOHO </option>
                        <option defaultValue="MicrosoftTeams">
                          Microsoft Teams
                        </option>
                      </Form.Select>
                      {errors.virtualLocation && (
                        <span className="d-flex text-left error-message">
                          {errors.virtualLocation.message}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Control
                        type="date"
                        placeholder="Select Date"
                        className="mdf__form__input"
                        {...register("date")}
                      />
                      {errors.date && (
                        <span className="d-flex text-left error-message">
                          {errors.date.message}
                        </span>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={4}>
                    <Form.Group>
                      <Form.Control
                        type="time"
                        placeholder="Select time"
                        className="mdf__form__input"
                        {...register("time")}
                      />
                      {errors.time && (
                        <span className="d-flex text-left error-message">
                          {errors.time.message}
                        </span>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={12}>
                    <Form.Group controlId="exampleForm.ControlInput3">
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
                </Row>

                <Row className="g-3 x">
                  {fields.map((attendee, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Col md={6} lg={4}>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              key={attendee.id}
                              name={`participants[${index}].name`}
                              placeholder="Participant Name"
                              className="mdf__form__input"
                              {...register(`participants[${index}].name`)}
                            />
                            {errors.participants && (
                              <span className="error-message">
                                {errors.participants?.[index]?.name?.message}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6} lg={4}>
                          <Form.Group
                            controlId="exampleForm.ControlInput3"
                            key={attendee.id}
                          >
                            <Form.Control
                              key={attendee.id}
                              type="email"
                              name={`participants[${index}].Email`}
                              placeholder="Participant Email Address"
                              className="mdf__form__input"
                              {...register(`participants[${index}].Email`)}
                            />
                          </Form.Group>

                          {errors.participants && (
                            <span className="error-message">
                              {errors.participants?.[index]?.Email?.message}
                            </span>
                          )}
                        </Col>
                        <Col md={6} lg={4}>
                          {index === 0 && (
                            <Button
                              className="btn btn-primary  py-2 px-5 w-100 h-100"
                              onClick={handleAddFields}
                            >
                              Add More
                            </Button>
                          )}
                          {index !== 0 && (
                            <Button
                              className="btn btn-danger py-2 px-5 w-100 h-100"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </Col>
                      </React.Fragment>
                    );
                  })}
                </Row>
                <Button
                  type="submit"
                  className="btn btn-primary  mt-3 py-2 px-5"
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

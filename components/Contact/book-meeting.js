import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Select2 from "react-select2-wrapper";

import style from "./contact.module.scss";
import { SUPPORTED_LANGUAGES, TIME_ZONE } from "@/data";

const schema = yup.object().shape({
    // attendees: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       email: yup
    //         .string()
    //         .email("Please enter a valid email address")
    //         .required("Email address is required"),
    //     })
    //   )
    //   .required("Please add at least one attendee"),
    // firstName: yup.string().required("Please enter your first name"),
    // lastName: yup.string().required("Please enter your last name"),
    // companyName: yup.string().required("Please enter your company name"),
    // websiteUrl: yup.string().required("Please enter your website URL"),
    // organizer: yup.string().required("Please enter the organizer's name"),
    // timeZone: yup.string().required("Please select a time zone"),
    // date: yup.string().required("Please select a date"),
    // time: yup.string().required("Please select a time"),
    // duration: yup
    //   .number()
    //   .required("Please enter a duration")
    //   .positive("Duration must be a positive number")
    //   .integer("Duration must be a whole number"),
    // subject: yup.string().required("Please enter a meeting subject"),
    // virtualLocation: yup.string().required("Please enter a virtual location"),
    // preferredLanguage: yup
    //   .string()
    //   .required("Please select a preferred language"),
    // notes: yup.string(),
    // wantToCC: yup.boolean(),
});
export default function BookMeeting({ defaultMeetingData, handleSubmitMeeting }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const { companyName, firstName, lastName, websiteUrl, date, time, timeZone, virtualLocation, duration, organizer, notes, preferredLanguage, subject } = data;

        const attendees = data.attendees.map((attendee) => attendee.email);
        const ccEmails = data.ccEmails.map((cc) => cc.email);
        // const params = {
        //   ...defaultMeetingData,
        //   companyName,
        //   firstname: firstName,
        //   lastName,
        //   websiteUrl,
        //   attendees,
        //   dateAndTime: `${date} ${time}:00`,
        //   ccEmails,
        //   timeZone,
        // };
        const payload = {
            ...defaultMeetingData,
            meetingId: "",
            firstname: firstName,
            lastName,
            websiteUrl,
            companyName,
            dateAndTime: `${date} ${time}:00`,
            duration,
            virtualLocation,
            organizer,
            attendees,
            notes,
            preferredLanguage,
            timeZone,
            ccEmails,
            subject,
        };
        await handleSubmitMeeting(payload);
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
                                <Row>
                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="text" placeholder="First Name" className="mdf__form__input" {...register("firstName")} />
                                            {errors.firstName && <span className="d-flex text-left error-message">{errors.firstName.message}</span>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="text" placeholder="Last Name" className="mdf__form__input" {...register("lastName")} />
                                            {errors.lastName && <span className="d-flex text-left error-message">{errors.lastName.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="text" placeholder="Company Name" className="mdf__form__input" {...register("companyName")} />
                                            {errors.companyName && <span className="d-flex text-left error-message">{errors.companyName.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="text" placeholder="Organizer Name" className="mdf__form__input" {...register("organizer")} />
                                            {errors.organizer && <span className="d-flex text-left error-message">{errors.organizer.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="url" placeholder="Website Url" className="mdf__form__input" {...register("websiteUrl")} />
                                            {errors.websiteUrl && <span className="d-flex text-left error-message">{errors.websiteUrl.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Select aria-label="Default select example" {...register("timeZone")} className="mdf__form__input">
                                                <option defaultValue="Asia/Kolkata">Asia/Kolkata</option>
                                                {TIME_ZONE.map((zone, index) => (
                                                    <option value={zone} key={index}>
                                                        {zone}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.timeZone && <span className="d-flex text-left error-message">{errors.timeZone.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="time" placeholder="Select time" className="mdf__form__input" {...register("time")} />
                                            {errors.time && <span className="d-flex text-left error-message">{errors.time.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="date" placeholder="Select Date" className="mdf__form__input" {...register("date")} />
                                            {errors.date && <span className="d-flex text-left error-message">{errors.date.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="number" placeholder="Duration" className="mdf__form__input" {...register("duration")} />
                                            {errors.duration && <span className="d-flex text-left error-message">{errors.duration.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Control type="text" placeholder="Meeting Subject" className="mdf__form__input" {...register("subject")} />
                                            {errors.subject && <span className="d-flex text-left error-message">{errors.subject.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Select aria-label="Default select example" {...register("virtualLocation")} className="mdf__form__input">
                                                {/* <option defaultValue="Google Meet">Google Meet</option> */}
                                                {/* <option defaultValue="ZOHO">Microsoft Teams</option> */}
                                                <option defaultValue="Zoom Meet">Zoom Meet</option>
                                                <option defaultValue="ZOHO">Zoho Meet</option>
                                            </Form.Select>
                                            {errors.virtualLocation && <span className="d-flex text-left error-message">{errors.virtualLocation.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4">
                                            <Form.Select aria-label="Default select example" {...register("preferredLanguage")} className="mdf__form__input">
                                                <option defaultValue="English">English</option>{" "}
                                                {SUPPORTED_LANGUAGES.text.map((language) => (
                                                    <option value={language.language} key={language.language}>
                                                        {language.language}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.preferredLanguage && <span className="d-flex text-left error-message">{errors.preferredLanguage.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4 mfw_select2_wrapper">
                                            <Controller
                                                name="attendees"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select2
                                                        className="mdf__form__input form-control mdf__select2"
                                                        defaultValue="1"
                                                        multiple
                                                        options={{
                                                            tags: true,
                                                            placeholder: "Attendees email address",
                                                        }}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.attendees && <span className="d-flex text-left error-message">{errors.attendees.message}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} lg={6}>
                                        <Form.Group className="mt-4 mfw_select2_wrapper">
                                            <Controller
                                                name="ccEmails"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select2
                                                        className="mdf__form__input form-control mdf__select2"
                                                        defaultValue="1"
                                                        multiple
                                                        options={{
                                                            tags: true,
                                                            placeholder: "Want to add CC?",
                                                        }}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.ccEmails && <span className="d-flex text-left error-message">{errors.ccEmails.message}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button type="submit" className="btn btn-primary mt-4 py-2 px-5">
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

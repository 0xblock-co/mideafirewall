import Loader from "@/components/Loader";
import style from "@/styles/bookMeeting.module.scss";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { asyncCreateMeetingLink } from "../services/product/product.service";

export default function BookMeetingScreen() {
    const [selectedMeeting, setSelectedMeeting] = useState("GOOGLE_MEET"); // Default to Google Meet
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleMeetingSelection = (meeting) => {
        setSelectedMeeting(meeting);
    };

    const handleBookMeeting = async () => {
        setIsLoading(true);

        try {
            const result = await asyncCreateMeetingLink({ meetingTool: selectedMeeting, meetingFor: "DEMO" });
            if (result && result.isSuccess && result?.data !== "") {
                showSuccessAlert(result.data);
            } else {
                showErrorAlert();
            }
        } catch (error) {
            console.error("Error booking meeting:", error);
            showErrorAlert();
        } finally {
            setIsLoading(false);
        }
    };

    const showSuccessAlert = (redirectUrl) => {
        newInfoAlert("Ready for Meeting", "Your preferred meeting link has been generated. Click 'Proceed' to schedule the meeting at your convenience.", "Proceed", "success").then(() => {
            window.open(redirectUrl, "_self");
        });
    };

    const showErrorAlert = () => {
        newInfoAlert("Error", "An error occurred while scheduling the meeting. Please try again later.", "OK", "error");
    };
    return (
        <section className={style.mdf__book__meeting}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="p-5 text-center book-demo-card">
                            <div className="d-flex justify-content-start w-100 mb-4">
                                <div onClick={() => router.push("/contact-us")} style={{ cursor: "pointer" }}>
                                    <svg
                                        width="46"
                                        height="46"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M11.69 15.75 7.969 12l3.72-3.75"></path>
                                        <path d="M8.486 12h7.546"></path>
                                        <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"></path>
                                    </svg>
                                </div>
                                <h2
                                    className="d-flex align-items-center"
                                    style={{
                                        letterSpacing: "0.055em",
                                        textShadow: "3px 2px 7px rgba(0, 0, 0, 0.25)",
                                        margin: "0 auto",
                                    }}
                                >
                                    Schedule a Demo Meeting With
                                </h2>
                            </div>
                            <Row className="meeting-with-body">
                                {["GOOGLE_MEET", "ZOOM_MEETING", "MICROSOFT_TEAMS", "ZOHO_MEETING"].map((meeting, index) => (
                                    <Col key={index}>
                                        <Card className={`h-100 ${selectedMeeting === meeting ? "selected" : ""}`} onClick={() => handleMeetingSelection(meeting)}>
                                            <Card.Body>
                                                <img src={`/images/meetings/${meeting}.svg`} className="meeting-icon" />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Button className="mt-5 p-3" onClick={handleBookMeeting}>
                                Schedule Now
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Loader isLoading={isLoading} />
        </section>
    );
}

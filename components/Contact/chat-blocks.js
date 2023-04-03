import Image from "next/image";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
export default function ContactChatBlock() {
    return (
        <section className="mdf__contactus-chatcard">
            <Container>
                <Row className="justify-content-center">
                    <Col md={4} xl={3} xxl={2}>
                        <Card className="mdf__chatcard">
                                <Image
                                    className="chat__icons"
                                    layout="fill"
                                    src="/images/Whatsapp.png"
                                    alt="A globe icon with filter and text."
                                />
                                <h6 className="my-4">Whatsapp</h6>
                                <Button variant="primary">Send Message</Button>
                        </Card>
                    </Col>
                    <Col md={4} xl={3} xxl={2}>
                        <Card className="mdf__chatcard">
                                <Image
                                    className="chat__icons"
                                    layout="fill"
                                    src="/images/Messages.png"
                                    alt="A globe icon with filter and text."
                                />
                                <h6 className="my-4">Chat with our sales team</h6>
                                <Button variant="primary">Chat with Sales</Button>
                        </Card>
                    </Col>
                    <Col md={4} xl={3} xxl={2}>
                        <Card className="mdf__chatcard">
                                <Image
                                    className="chat__icons"
                                    layout="fill"
                                    src="/images/Play.png"
                                    alt="A globe icon with filter and text."
                                />
                                <h6 className="my-4">Get a product demo</h6>
                                <Button variant="primary">Get a demo</Button>
                        </Card>
                    </Col>
                    <Col md={4} xl={3} xxl={2}>
                        <Card className="mdf__chatcard">
                                <Image
                                    className="chat__icons"
                                    layout="fill"
                                    src="/images/calendar.png"
                                    alt="A globe icon with filter and text."
                                />
                                <h6 className="my-4">Book a Meeting</h6>
                                <Button variant="primary">Book</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
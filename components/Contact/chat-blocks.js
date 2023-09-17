import Image from "next/image";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import WhatsAppChat from "./UI/whatsapp";
export default function ContactChatBlock({ handleBookMeeting }) {
  return (
    <section className="mdf__contactus-chatcard">
      <Container>
        <Row className="justify-content-center">
          <Col md={4} lg={3} xxl={2} className="mb-3">
            <WhatsAppChat
              phone={process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
              message="Hello there!"
            />
          </Col>
          <Col md={4} lg={3} xxl={2}>
            <Card className="mdf__chatcard mb-3">
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
          <Col md={4} lg={3} xxl={2}>
            <Card className="mdf__chatcard mb-3">
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
          <Col md={4} lg={3} xxl={2}>
            <Card className="mdf__chatcard mb-3">
              <Image
                className="chat__icons"
                layout="fill"
                src="/images/calendar.png"
                alt="A globe icon with filter and text."
              />
              <h6 className="my-4">Book a Meeting</h6>
              <Button variant="primary" onClick={() => handleBookMeeting(true)}>
                Book
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import style from "./contact.module.scss";
import WhatsAppChat from "./UI/whatsapp";
import getConfig from "next/config";
import ContactWithSalesChat from "./UI/ChatWithSalesTeam";
import { useRouter } from "next/router";

export default function ContactChatBlock({ handleBookMeeting }) {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter()
  console.log("publicRuntimeConfig.whatsAppContactNumber", publicRuntimeConfig);
  return (
    <section className={style.mdf__contactus_chatcard}>
      <Container>
        <Row className="justify-content-center">
          <Col md={4} lg={3} xxl={3} className="mb-3">
            <WhatsAppChat
              phone={publicRuntimeConfig.whatsAppContactNumber}
              message="Hello there!"
            />
          </Col>
          <Col md={4} lg={3} xxl={3}>
            <ContactWithSalesChat />
          </Col>
          <Col md={4} lg={3} xxl={3}>
            <Card className={`${style.mdf__chatcard} mb-3`}>
              <Image
                className={style.chat__icons}
                layout="fill"
                src="/images/Play.png"
                alt="A globe icon with filter and text."
              />
              <h6 className="my-4">Get a product demo</h6>
              <Button
                variant="primary"
                onClick={() => router.push("/network-blog")}
              >
                Get a demo
              </Button>
            </Card>
          </Col>
          {/* <Col md={4} lg={3} xxl={3}>
            <Card className={`${style.mdf__chatcard} mb-3`}>
              <Image
                className={style.chat__icons}
                layout="fill"
                src="/images/calendar.png"
                alt="A globe icon with filter and text."
              />
              <h6 className="my-4">Book a Meeting</h6>
              <Button variant="primary" onClick={() => handleBookMeeting(true)}>
                Book
              </Button>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
}

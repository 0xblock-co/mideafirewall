import { Button, Col, Container, Row } from "react-bootstrap";
import WhatsAppChat from "./UI/whatsapp";
import getConfig from "next/config";
import ContactWithSalesChat from "./UI/ChatWithSalesTeam";
import { useRouter } from "next/router";

export default function ContactChatBlock() {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  return (
    <section
      className="three-block-section"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <Container>
        <Row>
          <Col lg={12}>
            <div className="three-block-title ">
              <h2
                style={{
                  letterSpacing: "0.055em",
                  textShadow: "3px 2px 7px rgba(0, 0, 0, 0.25)",
                }}
              >
                Contact us using the following methods
              </h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4} xl={3}>
            <WhatsAppChat
              phone={publicRuntimeConfig.whatsAppContactNumber}
              message="Hello there!"
            />
          </Col>
          <Col lg={4} xl={3}>
            <ContactWithSalesChat />
          </Col>
          <Col lg={4} xl={3}>
            <div className="box-block-main">
              <div className="img-wrapper">
                <img
                  src="/images/product-demo.jpg"
                  alt="Get a Product demo"
                  title="Get a Product demo"
                />
              </div>
              <div className="box-content-block">
                <h2>Schedule a Demo</h2>
                <p>Experience in action! Join us for a live demo.</p>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-3 py-3 common-btn"
                  // onClick={() => router.push("/network-blog")}
                  onClick={() => router.push("/schedule-demo")}
                  // onClick={() => setIsShowProductDemoFormModal(true)}
                >
                  Schedule now
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={4} xl={3}>
            <div className="box-block-main">
              <div className="img-wrapper">
                <img
                  src="/images/online-calendar.jpg"
                  alt="GiveUsACall"
                  title="give-call-icon"
                />
              </div>
              <div className="box-content-block">
                <h2>Get a Price Quote</h2>
                <p>We're here to help you with your personalized usage.</p>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-3 py-3 common-btn"
                  onClick={() => router.push("/price-quote")}
                >
                  Quote now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

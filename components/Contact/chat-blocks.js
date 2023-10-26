import { Button, Col, Container, Row } from "react-bootstrap";
import WhatsAppChat from "./UI/whatsapp";
import getConfig from "next/config";
import ContactWithSalesChat from "./UI/ChatWithSalesTeam";
import { useRouter } from "next/router";

export default function ContactChatBlock({ handleBookMeeting }) {
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
              <h2>Contact us using the following methods</h2>
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
                  onClick={() => router.push("/network-blog")}
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
                  onClick={() => handleBookMeeting(true)}
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

  // return (
  //   <section className={style.mdf__contactus_chatcard}>
  //     <Container>
  //       <Row className="justify-content-center">
  //         <Col md={4} lg={3} xxl={3} className="mb-3">
  //           <WhatsAppChat
  //             phone={publicRuntimeConfig.whatsAppContactNumber}
  //             message="Hello there!"
  //           />
  //         </Col>
  //         <Col md={4} lg={3} xxl={3}>
  //           <ContactWithSalesChat />
  //         </Col>
  //         <Col md={4} lg={3} xxl={3}>
  //           <Card className={`${style.mdf__chatcard} mb-3`}>
  //             <Image
  //               className={style.chat__icons}
  //               layout="fill"
  //               src="/images/Play.png"
  //               alt="A globe icon with filter and text."
  //             />
  //             <h6 className="my-4">Get a product demo</h6>
  //             <Button
  //               variant="primary"
  //               onClick={() => router.push("/network-blog")}
  //             >
  //               Get a demo
  //             </Button>
  //           </Card>
  //         </Col>
  //         {/* <Col md={4} lg={3} xxl={3}>
  //           <Card className={`${style.mdf__chatcard} mb-3`}>
  //             <Image
  //               className={style.chat__icons}
  //               layout="fill"
  //               src="/images/calendar.png"
  //               alt="A globe icon with filter and text."
  //             />
  //             <h6 className="my-4">Book a Meeting</h6>
  //             <Button variant="primary" onClick={() => handleBookMeeting(true)}>
  //               Book
  //             </Button>
  //           </Card>
  //         </Col> */}
  //       </Row>
  //     </Container>
  //   </section>
  // );
}

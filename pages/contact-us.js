import { Fragment } from "react";

import ContactBanner from "@/components/Contact/banner";
import ContactChatBlock from "@/components/Contact/chat-blocks";
import { Col, Container, Row } from "react-bootstrap";
const videos = [
  "https://video.wixstatic.com/video/b4a04e_06eae65ea0624c8d8488e2ab0dff54e1/1080p/mp4/file.mp4",
  "https://www.youtube.com/embed/VYIlt3iBtmU",
  "https://www.youtube.com/embed/i0yqhHKWY0A",
  "https://www.youtube.com/embed/PiOqMMOFQNw",
];
export default function ContactUsScreen() {
  return (
    <Fragment>
      <ContactBanner />
      <ContactChatBlock />
      <section className="video-block-wrapper">
        <Container>
          <div className="video-block-title">
            <h2>Effortless Onboarding</h2>
          </div>
          <Row>
            {videos.map((video, index) => (
              <Col key={index} lg={3} md={6} sm={6} className="video-col-item">
                <iframe
                  loading="lazy"
                  width="100%"
                  height={index === 6 ? "250" : "548"}
                  src={video}
                  frameBorder="0"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
}

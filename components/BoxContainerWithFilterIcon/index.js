import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

function BoxContainerWithFilterIconWrapper({ children }) {
  return (
    <section className="mdf__authpage__section">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={10}>
            <Row className="mdf__authpage__blocks justify-content-between">
              <Col lg={4} xl={5} className="ps-0">
                <Image
                  className="mdf__logo_auth"
                  layout="fill"
                  src="/images/auto_logo.png"
                  alt=""
                />
              </Col>
              <Col lg={8} xl={7}>
                <Image
                  className="mdf__logo_modal mx-3"
                  layout="fill"
                  src="/images/logo.png"
                  alt=""
                />
                {children}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default BoxContainerWithFilterIconWrapper;

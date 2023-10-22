import Router from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import style from "./offer.module.scss";

export default function OfferBlock() {
  return (
    <section className={style.mdf__offer__block}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xxl={7}>
            <h1 className="fw-bold text-shadow text-center">
              <FormattedMessage
                id="page.home.offerBlock.mainTitle"
                values={{
                  span: (chunks) => (
                    <span className="fw-bolder text_gredient">{chunks}</span>
                  ),
                }}
              />
            </h1>
          </Col>
        </Row>
        <Row className="flex flex-column align-items-center">
          <Col sm={4} lg={3} xl={2}>
            <Button
              variant="primary"
              className="mt-4 rounded-pill w-100"
              onClick={() => Router.push("/network-blog")}
            >
              <FormattedMessage id="button.See Demo" />
            </Button>
          </Col>
          <Col sm={4} lg={3} xl={2}>
            <Button
              variant="outline-primary"
              className="mt-4 rounded-pill w-100"
              onClick={() => Router.push("/pricing")}
            >
              <FormattedMessage id="button.See pricing" />
            </Button>
          </Col>
          <Col sm={4} lg={3} xl={2}>
            <Button
              variant="outline-primary"
              className="mt-4 rounded-pill w-100"
              onClick={() => Router.push("/contact-us")}
            >
              <FormattedMessage id="button.Contact Us" />
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

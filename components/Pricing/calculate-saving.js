import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import style from "./pricing.module.scss";

export default function CalculateSaving() {
  return (
    <section className={style.mdf__calculate__saving}>
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <h3>
              Discover the potential cost savings you can achieve by utilizing
              Media Firewall -
            </h3>
            <h1 className="text-primary text-uppercase">
              {" "}
              calculate your savings now!
            </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="mt-5">
            <h4>
              What is the average number of images or videos that are uploaded
              to your platform per hour?
            </h4>
            <div className="d-flex">
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined012"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined012"
                >
                  0-50
                </label>
              </Form.Group>
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined02365"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined02365"
                >
                  50-100
                </label>
              </Form.Group>
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined036545"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined036545"
                >
                  100-500
                </label>
              </Form.Group>
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined036545"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined036545"
                >
                  500 and more
                </label>
              </Form.Group>
            </div>
          </Col>
          <Col sm={12} className="mt-5">
            <h4>
              What is the average duration of the videos that are uploaded to
              your platform?
            </h4>
            <div className="d-flex">
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined012"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined012"
                >
                  0-1 min
                </label>
              </Form.Group>
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined02365"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined02365"
                >
                  1-5 min
                </label>
              </Form.Group>
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined036545"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined036545"
                >
                  5-10 min
                </label>
              </Form.Group>
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined036545"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined036545"
                >
                  more than 10 min
                </label>
              </Form.Group>
            </div>
          </Col>
          <Col sm={12} className="mt-5">
            <h4>
              How much money does your company currently spend on manual content
              moderation?
            </h4>
            <div className="d-flex align-items-center">
              <Form.Group className="me-3 mt-3">
                <Form.Control
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-outlined012"
                  hidden
                />
                <label
                  className={`btn btn-outline-primary ${style.checkbox__primary}`}
                  htmlFor="btn-check-outlined012"
                >
                  Rs. 0
                </label>
              </Form.Group>
              <Form.Range className="mt-3" />
            </div>
          </Col>
        </Row>
      </Container>
      <div className={`${style.mdf__bg__drak_banner} mt-5`}>
        <h3 className="m-0">With Media Firewall, you can save upto Rs. </h3>
      </div>
    </section>
  );
}

import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
export default function NeetworkBlock() {
  return (
    <section className="p-5 mdf__network__block_tabs">
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="pills" className="flex-row justify-content-around">
                <Nav.Item>
                  <Nav.Link eventKey="first">Micro Blogging</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Media Sharing</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Social Network</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="forth">Real State Broker </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Social Review Site </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined012"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined012"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined013"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined013"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined014"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined014"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined015"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined015"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined016"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined016"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined017"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined017"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined018"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined018"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined019"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined019"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                    <Col md={4} xl={3} className="mt-4">
                      <Form.Control
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined020"
                        hidden
                      />
                      <label
                        className="btn btn-outline-primary card__primary"
                        htmlFor="btn-check-outlined020"
                      >
                        <div>
                          <Image
                            className="mdf__card_img"
                            layout="fill"
                            src="/images/blog.png"
                            alt="A globe icon with filter and text."
                          />
                        </div>
                        <Button variant="primary" className="mt-3">
                          Nudity Filter
                        </Button>
                        <p className="fw-semibold mt-3">
                          Determine the nudity level, from explicit to mildly
                          suggestive
                        </p>
                        <Button variant="primary" size="sm">
                          See Demo
                        </Button>
                      </label>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
          <Col md={12} className="text-center">
            <Button
              variant="primary"
              className="shadow-lg px-5 py-2 mt-5 rounded-4"
            >
              Proceed
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
export default function PricingBlock({ priceData = [] }) {
  return (
    <section className="mdf__pricing-block">
      <Container fluid className="px-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Range />
              <div className="d-flex justify-content-center mt-3">
                <label>Monthly</label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="mx-3 mb-0"
                />
                <label>Yearly</label>
                <Badge pill bg="primary" className="ms-3 py-2 px-3">
                  20% OFF
                </Badge>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          {priceData &&
            priceData?.map((item, index) => {
              return (
                <Col sm={6} lg={3} xxl={2} key={index}>
                  <Card className="mdf__pricingcard card__price__yellow text-center p-3 h-100">
                    <div className="text mb-5 h-100">
                      <h3 className="title my-4">{item?.name}</h3>
                      <label className="display-5">${item?.price}</label>
                      <span>/Month</span>
                      <h4 className="my-4"> {item.operations} </h4>
                      <p>
                        operations per month (max {item?.parallelProcessing} per
                        day)
                      </p>
                      <h4>{item?.parallelProcessing}</h4>
                      {item?.support &&
                        item?.support?.supportAvailability != "NA" &&
                        item?.support?.supportTypes?.length > 0 &&
                        item?.support?.supportTypes?.map((item, index) => {
                          return <p key={index}>{item}</p>;
                        })}
                    </div>
                    <Button
                      variant="primary"
                      className="text-uppercase"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </Card>
                </Col>
              );
            })}

          {/* <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__purple text-center p-3 h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Starter</h3>
                <label className="display-5">$29</label>
                <span>/Month</span>
                <h4 className="my-4"> 10,000 </h4>
                <p>operations per month +$0.02 per additional op</p>
                <h4>1</h4>
                <p>simultaneous video stream</p>
                <p>Content Moderation</p>
              </div>
              <Button variant="primary" className="text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__orange text-center p-3 h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Medium</h3>
                <label className="display-5">$49</label>
                <span>/Month</span>
                <h4 className="my-4">20,000 </h4>
                <p>operations per month +$0.02 per additional op</p>
                <h4>1</h4>
                <p>simultaneous video stream</p>
                <p>Content Moderation</p>
                <p>Email support</p>
              </div>
              <Button variant="primary" className="text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__red text-center p-3 h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Growth</h3>
                <label className="display-5">$99</label>
                <span>/Month</span>
                <h4 className="my-4">50,000 </h4>
                <p>operations per month +$0.02 per additional op</p>
                <h4>2</h4>
                <p>simultaneous video stream</p>
                <p>Content Moderation</p>
                <p>Email support</p>
              </div>
              <Button variant="primary" className="text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__blue text-center p-3 h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Pro</h3>
                <label className="display-5">$299</label>
                <span>/Month</span>
                <h4 className="my-4">2,00,000 </h4>
                <p>operations per month +$0.0015 per additional op</p>
                <h4>5</h4>
                <p>simultaneous video stream</p>
                <p>Content Moderation</p>
                <p>Prioritized processing for Optimal Speed</p>
                <p>Prioritized Support</p>
              </div>
              <Button variant="primary" className="text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__primary border border-2 border-primary text-center p-3 h-100">
              <div className="text mb-5 h-100">
                <h3 className="title text-primary my-4">Enterprise</h3>
                <label className="fs-5">Custom Pricing</label>
                <h4 className="mt-4 mb-0">Contact Us </h4>
                <p>custom number of operations</p>
                <h4 className="mt-4 mb-0"> Contact Us</h4>
                <p>custom number of simultaneous streams</p>

                <p>Content Moderation</p>
                <p>Image, Video Anonymization</p>
                <p>Dedicated infrastructure for Unparalleled performance</p>
                <p>Dedicated Customer Support Engineer</p>
                <p>Enterprise-class SLA</p>
                <p>Exclusive Enterprise premium options</p>
              </div>
              <Button variant="primary" className="text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
}

import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
export default function PricingBlock() {
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
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__yellow text-center h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Free</h3>
                <div className="b_bottom">
                <label className="display-5 mb-4">$0</label>
                <span>/Month</span>
                </div>
                <h4 className="my-4"> 5,000 </h4>
                <p className="px-2">operations per month (max 500 per day)</p>
                <h4>1</h4>
                <p className="px-2">simultaneous video stream</p>
                <p className="px-2">Content Moderation</p>
              </div>
              <Button variant="primary" className="mx-3 mb-3 text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__purple text-center h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Starter</h3>
                <div className="b_bottom">
                <label className="display-5 mb-4">$29</label>
                <span>/Month</span>
                </div>
                <h4 className="my-4"> 10,000 </h4>
                <p className="px-2">operations per month +$0.02 per additional op</p>
                <h4>1</h4>
                <p className="px-2">simultaneous video stream</p>
                <p className="px-2">Content Moderation</p>
              </div>
              <Button variant="primary" className="mx-3 mb-3 text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__orange text-center h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Medium</h3>
                <div className="b_bottom">
                <label className="display-5 mb-4">$49</label>
                <span>/Month</span>
                </div>
                <h4 className="my-4">20,000 </h4>
                <p className="px-2">operations per month +$0.02 per additional op</p>
                <h4>1</h4>
                <p className="px-2">simultaneous video stream</p>
                <p className="px-2">Content Moderation</p>
                <p className="px-2">Email support</p>
              </div>
              <Button variant="primary" className="mx-3 mb-3 text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__red text-center h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Growth</h3>
                <div className="b_bottom">
                <label className="display-5 mb-4">$99</label>
                <span>/Month</span>
                </div>
                <h4 className="my-4">50,000 </h4>
                <p className="px-2">operations per month +$0.02 per additional op</p>
                <h4>2</h4>
                <p className="px-2">simultaneous video stream</p>
                <p className="px-2">Content Moderation</p>
                <p className="px-2">Email support</p>
              </div>
              <Button variant="primary" className="mx-3 mb-3 text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__blue text-center h-100">
              <div className="text mb-5 h-100">
                <h3 className="title my-4">Pro</h3>
                <div className="b_bottom">
                <label className="display-5 mb-4">$299</label>
                <span>/Month</span>
                </div>
                <h4 className="my-4">2,00,000 </h4>
                <p className="px-2">operations per month +$0.0015 per additional op</p>
                <h4>5</h4>
                <p className="px-2">simultaneous video stream</p>
                <p className="px-2">Content Moderation</p>
                <p className="px-2">Prioritized processing for Optimal Speed</p>
                <p className="px-2">Prioritized Support</p>
              </div>
              <Button variant="primary" className="mx-3 mb-3 text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
          <Col sm={6} lg={3} xxl={2}>
            <Card className="mdf__pricingcard card__price__primary border border-2 border-primary text-center h-100">
              <div className="text mb-5 h-100">
                <h3 className="title text-primary my-4">Enterprise</h3>
                <div className="b_bottom">
                <label className="fs-5">Custom Pricing</label>
                </div>
                <h4 className="mt-4 mb-0">Contact Us </h4>
                <p className="px-2">custom number of operations</p>
                <h4 className="mt-4 mb-0"> Contact Us</h4>
                <p className="px-2">custom number of simultaneous streams</p>

                <p className="px-2">Content Moderation</p>
                <p className="px-2">Image, Video Anonymization</p>
                <p className="px-2">Dedicated infrastructure for Unparalleled performance</p>
                <p className="px-2">Dedicated Customer Support Engineer</p>
                <p className="px-2">Enterprise-class SLA</p>
                <p className="px-2">Exclusive Enterprise premium options</p>
              </div>
              <Button variant="primary" className="mx-3 mb-3 text-uppercase" size="lg">
                Get Started
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

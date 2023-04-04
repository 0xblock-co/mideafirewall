import Router from "next/router";
import React from "react";
import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import { AuthContext } from "@/pages/_app";
import { colors } from "@/utils/constants";
export default function PricingBlock({ priceData = [] }) {
  const { isLogin } = useContext(AuthContext);

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
        <Row className="justify-content-center mt-2 mt-xxl-5">
          {priceData &&
            priceData?.map((item, index) => {
              let className = "yellow";
              if (index >= colors.length) {
                className = colors[index % colors.length];
              } else {
                className = colors[index];
              }
              return (
                <Col
                  sm={4}
                  lg={3}
                  xxl={2}
                  className="mt-3 mt-xxl-0"
                  key={index}
                >
                  <Card
                    className={`mdf__pricingcard card__price__${className} text-center h-100`}
                  >
                    <div className="text mb-5 h-100">
                      <h3 className="title my-4">{item?.name}</h3>
                      <div className="b_bottom">
                        <label className="display-5 mb-4">${item?.price}</label>
                        <span>/{item?.operationPeriod}</span>
                      </div>
                      <h4 className="my-4"> {item.operations} </h4>
                      <p className="px-2">
                        {item?.dailyOperationsLimit != "-1"
                          ? `operations per month  (max ${item?.dailyOperationsLimit} per day)`
                          : `operations per month +$${item?.additionalPricePerOperation} per additional op`}
                      </p>
                      <h4>{item?.parallelProcessing}</h4>
                      {item?.support &&
                        item?.support?.supportAvailability != "NA" &&
                        item?.support?.supportTypes?.length > 0 &&
                        item?.support?.supportTypes?.map((item, index) => {
                          return (
                            <p className="px-2" key={index}>
                              {item}
                            </p>
                          );
                        })}
                    </div>
                    <Button
                      variant="primary"
                      className="mx-3 mb-3 text-uppercase"
                      size="lg"
                      onClick={() =>
                        Router.push(
                          isLogin ? "/network-blog" : "/account-security/login"
                        )
                      }
                    >
                      Get Started
                    </Button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
}

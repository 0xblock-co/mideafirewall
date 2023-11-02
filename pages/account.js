import { Card, Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "@/components/Auth/auth.module.scss";

export default function Survey() {
  return (
    <section className={style.mdf__authpage__section}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} xl={8}>
            <Row className={`${style.mdf__authpage__blocks_v2} `}>
              <Col>
                <Card>
                  <Card.Body>
                    {" "}
                    <Tabs
                      defaultActiveKey="profile"
                      id="fill-tab-example"
                      className="mb-3"
                      fill
                    >
                      <Tab eventKey="home" title="Home">
                        Tab content for Home
                      </Tab>
                      <Tab eventKey="profile" title="Profile">
                        Tab content for Profile
                      </Tab>
                      <Tab eventKey="longer-tab" title="Loooonger Tab">
                        Tab content for Loooonger Tab
                      </Tab>
                      <Tab eventKey="contact" title="Contact" disabled>
                        Tab content for Contact
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

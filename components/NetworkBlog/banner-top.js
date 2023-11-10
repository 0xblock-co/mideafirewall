import { Col, Container, Row } from "react-bootstrap";

import style from "./network-blog.module.scss";
export default function NetworkBanner() {
    return (
        <section className={`${style.mdf__network_banner} p-3 p-lg-5`}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 className="text-blue fw-normal fw-bolder pt-5">Get started with Content Moderation</h2>
                        {/* <Breadcrumb className="mt-3">
              <Breadcrumb.Item href="#" active>
                Image Moderation
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#"> Video Moderation </Breadcrumb.Item>
            </Breadcrumb> */}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

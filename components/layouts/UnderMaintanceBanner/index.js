/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row } from "react-bootstrap";

import style from "./style.module.scss";

export default function UnderMaintenance() {
    return (
        <section className={style.mdf__banner__back}>
            <Container>
                <Row className="justify-content-between">
                    <Col xl={8} className="mt-4">
                        <div className={style.mdf__banner_text}>
                            <h1>
                                Website Under Routine Maintenance – We Will Be Back{" "}
                                <span className="text_gredient1" style={{ color: "rgb(232 125 48)" }}>
                                    Soon!
                                </span>
                            </h1>
                            <p className="fw-semibold mb-0" style={{ fontSize: "20px", marginTop: "20px" }}>
                                We&apos;re currently undergoing routine maintenance to revamp our website. Please leave us your email in the chat, and we&apos;ll get back to you soon. <br /> Thank you
                                for your understanding and patience!
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

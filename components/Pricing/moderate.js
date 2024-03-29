import Router from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useAuthV3 } from "@/contexts-v2/auth.context";
import style from "./pricing.module.scss";

export default function PricingModerate() {
    const { isLogin } = useAuthV3();

    return (
        <section className={style.mdf__moderate_banner}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} xl={4} className="text-center">
                        <p>FREE TRIAL</p>
                        <h1 className="display-5 text-white">Start content moderation right now</h1>
                        <Button onClick={() => Router.push(isLogin ? "/features-list" : "/account-security/login")} variant="primary" className="text-uppercase py-3 mx-3 mt-3">
                            Get Started
                        </Button>
                        <Button
                            onClick={() => Router.push(isLogin ? "/features-list" : "/account-security/login")}
                            variant="outline-primary"
                            className="text-uppercase py-3 mx-3 mt-3 border-white text-white"
                        >
                            SEE DEMO
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

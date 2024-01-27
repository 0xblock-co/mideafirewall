import { Col, Container, Row } from "react-bootstrap";
import style from "./featuresList.module.scss";

export default function FeaturesListScreenBanner() {
    return (
        <section className={`${style.mdf__network_banner} p-3 p-lg-5`}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={12}>
                        <h1 className="text-blue fw-normal fw-bolder pt-5">Get started with Content Moderation</h1>
                        <h2>Select filters you would like to evaluate and click the proceed button below</h2>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import style from "@/components/Auth/auth.module.scss";

function BoxContainerWithFilterIconWrapper({ children, lg = 12, xl = 7, xxl = 6 }) {
    return (
        <section className={style.mdf__authpage__section}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} xl={10}>
                        <Row className={`${style.mdf__authpage__blocks} justify-content-center justify-content-xl-between`}>
                            <Col lg={3} xl={5} className="ps-0 align-self-center d-none d-xl-block">
                                <Image className={style.mdf__logo_auth} layout="fill" src="/images/auto_logo.png" alt="" />
                            </Col>
                            <Col lg={lg} xl={xl} xxl={xxl}>
                                <div className="min-h-50v">
                                    <Image className="mx-3 mdf__logo_footer" layout="fill" src="/images/logo.png" alt="" />
                                    {children}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default BoxContainerWithFilterIconWrapper;

import Router from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";

import { FormattedMessage } from "react-intl";
import style from "./banner.module.scss";

export default function HomeBanner() {
    return (
        <section className={style.mdf__banner__back}>
            <Container>
                <Row className="justify-content-between">
                    <Col xl={6} className="mt-4">
                        <div className={style.mdf__banner_text}>
                            <h1>
                                <FormattedMessage
                                    id="page.home.banner.mainTitle"
                                    values={{
                                        span: (chunks) => <span className="text_gredient">{chunks}</span>,
                                    }}
                                />
                            </h1>
                            <p className="fw-semibold">
                                <FormattedMessage id="page.home.banner.paragraph" />
                            </p>
                            <Button variant="primary" className="rounded-pill button_primary py-2 px-4" onClick={() => Router.push("/network-blog")}>
                                <FormattedMessage id="button.See Demo" />
                            </Button>
                        </div>
                    </Col>
                    <Col xl={6} className="mt-4">
                        <div className={style.mdf__banner__video}>
                            <div className={style.mdf__video}>
                                <video className={style.video} src="https://mediafirewall.s3.ap-south-1.amazonaws.com/Display_videos/MFW_Demo.mp4" controls autoPlay={false} loop playsInline muted>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

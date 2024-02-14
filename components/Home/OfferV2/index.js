import Router from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import ResponsiveImage from "@/components/NextImageComponent/ResponsiveImage";
import { getPartnersData } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import Link from "next/link";
import style from "./offerV2.module.scss";

export default function OfferBlock() {
    const partnersDataFromStore = useAppSelector(getPartnersData);

    return (
        <>
            <section className={style.mdf__offer__block}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} xxl={7}>
                            <h1 className="fw-bold text-shadow text-center text_gradient_effect">
                                <FormattedMessage
                                    id="page.home.offerBlock.mainTitle"
                                    values={{
                                        span: (chunks) => <span className="fw-bolder">{chunks}</span>,
                                    }}
                                />
                            </h1>
                        </Col>
                    </Row>
                    <Row className="flex justify-content-center align-items-center">
                        <Col sm={4} lg={3} xl={2}>
                            <Button variant="primary" className="mt-4 rounded-pill w-100" onClick={() => Router.push("/features-list")}>
                                <FormattedMessage id="button.See Demo" />
                            </Button>
                        </Col>
                        <Col sm={4} lg={3} xl={2}>
                            <Button variant="outline-primary" className="mt-4 rounded-pill w-100" onClick={() => Router.push("/pricing")}>
                                <FormattedMessage id="button.See pricing" />
                            </Button>
                        </Col>
                        <Col sm={4} lg={3} xl={2}>
                            <Button variant="outline-primary" className="mt-4 rounded-pill w-100" onClick={() => Router.push("/contact-us")}>
                                <FormattedMessage id="button.Contact Us" />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            {CommonUtility.isValidArray(partnersDataFromStore) && (
                <section className="our-partner-section" data-aos="fade-up" data-aos-delay="100">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="our-partner-block-title mb-4">
                                    <h1 className="fw-bold text-shadow text-center text_gradient_effect">Our Partners & Accelerators {/* <h2>Our PARTNERS AND ACCELERATORS</h2> */}</h1>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            {partnersDataFromStore?.map((item) => {
                                return (
                                    <Col lg={3} md={4} key={item?.partnerId}>
                                        <Link href={item.contactInformation || "/"} target="_blank" title={"partner-" + item?.partnerId}>
                                            <div className="our-partner-img-block">
                                                <div className="our-partner-img">
                                                    <ResponsiveImage url={item.logoUrl} alt="Partners Logo" altUrlType="Partners Logo" imageQuality={75} />
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </section>
            )}
        </>
    );
}

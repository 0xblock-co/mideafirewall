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
                            <h1 className="fw-bold text-shadow text-center   ">
                                <FormattedMessage
                                    id="page.home.offerBlock.mainTitle"
                                    values={{
                                        span: (chunks) => <span className={`fw-bolder ${style.offer_main_text_percentage_style}`}>{chunks}</span>,
                                    }}
                                />
                            </h1>
                        </Col>
                    </Row>
                    <Row className="flex justify-content-center align-items-center">
                        <Col sm={4} lg={3} xl={2}>
                            <Button variant="primary" className={`mt-4 rounded-pill w-100 ${style.mdf__offer__btn}`} onClick={() => Router.push("/features-list")}>
                                <span>
                                    <FormattedMessage id="button.See Demo" />
                                </span>
                            </Button>
                        </Col>
                        <Col sm={4} lg={3} xl={2}>
                            <Button variant="outline-primary" className={`mt-4 rounded-pill w-100 ${style.mdf__offer__btn}`} onClick={() => Router.push("/pricing")}>
                                <span>
                                    <FormattedMessage id="button.See pricing" />
                                </span>
                            </Button>
                        </Col>
                        <Col sm={4} lg={3} xl={2}>
                            <Button variant="outline-primary" className={`mt-4 rounded-pill w-100 ${style.mdf__offer__btn}`} onClick={() => Router.push("/contact-us")}>
                                <span>
                                    <FormattedMessage id="button.Contact Us" />
                                </span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            {CommonUtility.isValidArray(partnersDataFromStore) && (
                <section className="our-partner-section" data-aos="fade-up" data-aos-delay="100" style={{ backgroundColor: "#fff" }}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="our-partner-block-title mb-4">
                                    <h1 className="fw-bold text-shadow text-center">Our Partners & Accelerators {/* <h2>Our PARTNERS AND ACCELERATORS</h2> */}</h1>
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

import Router from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import ResponsiveImage from "@/components/NextImageComponent/ResponsiveImage";
import Link from "next/link";
import style from "./offer.module.scss";
const partnersData = [
    {
        partnerId: "NVIDIA",
        name: "Nvidia Corporation",
        types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
        contactInformation: "https://www.nvidia.com/",
        description: "Description of Nvidia",
        logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/NVIDIA/nvidia.png",
        active: true,
    },
    {
        partnerId: "AWS",
        name: "Amazon Web Services",
        types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
        contactInformation: "https://aws.amazon.com/",
        description: "Description of AWS",
        logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/AWS/aws.png",
        active: true,
    },

    // {
    //     partnerId: "MICROSOFT",
    //     name: "Microsoft Corporation",
    //     types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
    //     contactInformation: "https://www.microsoft.com/",
    //     description: "Description of Microsoft",
    //     logoUrl: "/images/centered.png",
    //     active: true,
    // },
    {
        partnerId: "INTEL",
        name: "Intel Corporation",
        types: ["INVESTOR", "TECHNOLOGY_PARTNER", "STRATEGIC_PARTNER"],
        contactInformation: "https://www.intel.com/",
        description: "Description of Intel",
        logoUrl: "https://dsf360-web-media-bucket.s3.ap-south-1.amazonaws.com/partners/INTEL/intel.png",
        active: true,
    },
];
export default function OfferBlock() {
    return (
        <>
            <section className={style.mdf__offer__block}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} xxl={7}>
                            <h1 className="fw-bold text-shadow text-center">
                                <FormattedMessage
                                    id="page.home.offerBlock.mainTitle"
                                    values={{
                                        span: (chunks) => <span className="fw-bolder text_gredient">{chunks}</span>,
                                    }}
                                />
                            </h1>
                        </Col>
                    </Row>
                    <Row className="flex flex-column align-items-center">
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
            <section className="our-partner-section" data-aos="fade-up" data-aos-delay="100">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="our-partner-block-title">
                                <h1 className="fw-bold text-shadow text-center">Our Partners & Accelerators {/* <h2>Our PARTNERS AND ACCELERATORS</h2> */}</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        {partnersData?.map((item) => {
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
        </>
    );
}

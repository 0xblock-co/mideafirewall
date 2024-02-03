/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import RenderIf from "@/components/ConditionalRender/RenderIf";
import VideoModal from "@/components/VideoModal";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { useServiceStatus } from "@/contexts-v2/serviceStatusContext";
import { getAllHeaderDataOptions, getAllHeaderDataOptionsUpdated } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./footer.module.scss";

export default function FooterBottom() {
    const headerData = useAppSelector(getAllHeaderDataOptions);
    const headerDataV2 = useAppSelector(getAllHeaderDataOptionsUpdated);
    const { isServiceAvailable } = useServiceStatus();

    const { isLogin, user } = useAuthV3();
    const [isShowVideoModel, setIsShowVideoModel] = useState(false);
    const [selectedMediaContent, setSelectedMediaContent] = useState(null);

    useEffect(() => {
        if (!isShowVideoModel) setSelectedMediaContent(null);
    }, [isShowVideoModel]);

    const router = useRouter();
    const handleFeatureCardOnClick = (feature, id) => {
        if (!feature.active) {
            setSelectedMediaContent(feature);
            if (feature.webFeatureKey === "deepfake" || feature.featureId == "134") {
                newInfoAlert("Coming Soon", "", "Preview", "").then(() => {
                    setIsShowVideoModel(true);
                });
                return;
            }

            newInfoAlert(
                "Enterprise Feature",
                "Your request for the enterprise feature is appreciated; however, it's not enabled by default. Would you be interested in a live demonstration?",
                "Schedule a live demo",
                "",
                true,
                "Preview"
            )
                .then(() => {
                    if (isLogin) {
                        if (user?.meetingSurveyAnswered) {
                            router.push("/book-demo?type=DEMO");
                        } else {
                            router.push("/schedule-demo");
                        }
                    } else {
                        router.push("/account-security/login");
                    }
                })
                .catch(() => {
                    setIsShowVideoModel(true);
                });
        } else {
            setSelectedMediaContent(null);
            let selectedFeature = {
                selectedFeatureIds: [feature.webFeatureKey],
                selectedOptions: {},
            };
            if (feature.options && feature.options.length > 0) {
                selectedFeature = {
                    ...selectedFeature,
                    selectedOptions: {
                        [feature.webFeatureKey]: feature.options[0].name,
                    },
                };
            }
            localStorage.setItem("selectedDataForDemo", JSON.stringify(selectedFeature));
            router.push(`/features-list?key=${id}`);
        }
    };
    return (
        <>
            <RenderIf isTrue={isServiceAvailable}>
                <section className="banner-layers1">
                    <Container>
                        <div className="banner-layout-content">
                            <div className="img has-hover x5 md-x5 lg-x0 y50 md-y50 lg-y50" id="image_1733022604">
                                <img
                                    width="533"
                                    height="260"
                                    src="/images/svgs/nvidia-cloud-validated-lockup-rgb-wht-for-screen.svg"
                                    className="attachment-large size-large"
                                    alt="Nvidia Cloud validated"
                                    title="Nvidia Cloud validated"
                                    decoding="async"
                                    loading="lazy"
                                    sizes="(max-width: 533px) 100vw, 533px"
                                />
                            </div>
                        </div>
                    </Container>
                </section>
            </RenderIf>
            <footer className={style.mdf__footer}>
                <Container>
                    <Row>
                        <Col lg={3} md={6}>
                            <div className="footer-menu-block">
                                <div className="footer-logo-block">
                                    <Image className="mdf__logo_footer" layout="fill" src="/images/footer-logo.png" alt="Mediafirewall Footer Logo" title="Mediafirewall Footer Logo" />
                                </div>
                                <div className={style.footer_content_text}>
                                    <a href="https://www.themillionvisions.com/" title="Million Visions" target="_blank">
                                        <u>
                                            <b>Million Visions,</b>
                                        </u>
                                    </a>
                                    <RenderIf isTrue={isServiceAvailable}>
                                        <>
                                            <br /> Hustlehub Tech Park - #36/5,
                                            <br /> Somasandra Palya, <br />
                                            Haralukunte Village, Sector2, <br /> adjacent 27th MainRoad,
                                            <br />
                                            HSR Layout, Bengaluru,
                                            <br /> Karnataka 560102.
                                        </>
                                    </RenderIf>
                                    <div>
                                        <div className="d-flex flex-row align-items-center gap-3" style={{ color: "white", fontSize: "14px" }}>
                                            <span style={{ color: "#ca98e9", width: "auto" }}>
                                                <i className="fa fa-envelope" aria-hidden="true" style={{ fontSize: "16px" }}></i>
                                            </span>
                                            <a href="mailto:sales@mediafirewall.ai" title="Sales Mediafirewall Email">
                                                <u>sales@mediafirewall.ai</u>
                                            </a>
                                        </div>
                                        <div className="d-flex flex-row align-items-center gap-3" style={{ color: "white", fontSize: "14px" }}>
                                            <span style={{ color: "#ca98e9", width: "auto" }}>
                                                <i className="fa fa-envelope" aria-hidden="true" style={{ fontSize: "16px" }}></i>
                                            </span>
                                            <a href="mailto:support@mediafirewall.ai" title="Support Mediafirewall Email">
                                                <u>support@mediafirewall.ai</u>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <RenderIf isTrue={isServiceAvailable}>
                            <>
                                <Col lg={3} md={6}>
                                    <h5 className="mt-3">Products</h5>
                                    <ul className="list-unstyled">
                                        {CommonUtility.isValidArray(headerData) &&
                                            headerData.map((item, index) => {
                                                return (
                                                    <li style={{ color: "#fff" }} className="py-2" key={item.id + "_" + index}>
                                                        <Link href={`/features-list?key=${item.id}`} title={item.name}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </Col>
                                <Col lg={3} md={6}>
                                    <h5 className="mt-3">Features</h5>
                                    <ul className="list-unstyled">
                                        {CommonUtility.isValidArray(headerDataV2) &&
                                            CommonUtility.isValidArray(headerDataV2[0].features) &&
                                            headerDataV2[0].features.map((feature, index) => {
                                                if (index > 8) {
                                                    if (index === 9) {
                                                        return (
                                                            <li style={{ color: "#fff" }} className="py-2" key={`n_${index}`}>
                                                                <Link href={`/features-list?key=0`} title="All Demo Features">
                                                                    more...
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
                                                    return null; // Don't render additional "more..." items
                                                } else {
                                                    return (
                                                        feature?.active && (
                                                            <li style={{ color: "#fff" }} className="py-2" key={`n_${feature.name}`} onClick={() => handleFeatureCardOnClick(feature, 0)}>
                                                                {feature.name}
                                                            </li>
                                                        )
                                                    );
                                                }
                                            })}
                                    </ul>
                                </Col>
                                <Col lg={3} md={6}>
                                    <h5 className="mt-3">Useful Links</h5>
                                    <ul className="list-unstyled">
                                        {/* <li style={{ color: "#fff" }} className="py-2">
                <Link href="#">About</Link>
              </li> */}
                                        <li style={{ color: "#fff" }} className="py-2">
                                            <Link href="/contact-us" title="Contact Us">
                                                Contact us
                                            </Link>
                                        </li>
                                        <li style={{ color: "#fff" }} className="py-2">
                                            <Link href="/pricing" title="Pricing">
                                                Pricing
                                            </Link>
                                        </li>
                                        <li style={{ color: "#fff" }} className="py-2">
                                            <Link href="/features-list" title="Demo">
                                                Demo
                                            </Link>
                                        </li>
                                        <li style={{ color: "#fff" }} className="py-2">
                                            <Link href="/privacy-policy" title="Privacy Policy">
                                                Privacy policy
                                            </Link>
                                        </li>
                                        <li style={{ color: "#fff" }} className="py-2">
                                            <Link href="/terms-of-use" title="Terms Of Use">
                                                Terms Of Use
                                            </Link>
                                        </li>
                                        <li style={{ color: "#fff" }} className="py-2">
                                            <Link href="/cancellation-refund-policy" title="Subscription Cancellation Policy">
                                                Cancellation policy
                                            </Link>
                                        </li>
                                    </ul>
                                </Col>
                            </>
                        </RenderIf>
                    </Row>
                </Container>
                {selectedMediaContent && isShowVideoModel && (
                    <VideoModal
                        show={isShowVideoModel}
                        handleClose={setIsShowVideoModel}
                        videoUrl={CommonUtility.isNotEmpty(selectedMediaContent?.clipUrl) ? selectedMediaContent?.clipUrl : "https://www.youtube.com/embed/nafYaz7caGQ?si=vQKekrtF7fNITp4d"}
                        posterImage={selectedMediaContent?.imgUrl || ""}
                    />
                )}
            </footer>
        </>
    );
}

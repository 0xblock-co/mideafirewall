import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import VideoModal from "@/components/VideoModal";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { getAllHeaderDataOptions, getAllHeaderDataOptionsUpdated, getMFWMediaContents } from "@/store/defaultConfig.slice";
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
    const mediaContent = useAppSelector(getMFWMediaContents);

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
                newInfoAlert("Coming Soon", "", "Watch a Demo", "info", true, "Cancel").then(() => {
                    setIsShowVideoModel(true);
                });
                return;
            }

            newInfoAlert(
                "Enterprise Feature",
                "Your request for the enterprise feature is appreciated; however, it's not enabled by default. Would you be interested in a live demonstration?",
                "Schedule a live demo",
                "info",
                true,
                "Watch a Demo"
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
            router.push(`/network-blog?key=${id}`);
        }
    };
    return (
        <footer className={style.mdf__footer}>
            <Container>
                <Row>
                    <Col lg={3} md={6}>
                        <div className="footer-menu-block">
                            <div className="footer-logo-block">
                                <Image className="mdf__logo_footer" layout="fill" src="/images/footer-logo.png" alt="" />
                            </div>
                            <div className={style.footer_content_text}>
                                <a href="https://www.themillionvisions.com/" target="_blank">
                                    <u>
                                        <b>Million Visions,</b>
                                    </u>
                                </a>
                                <br /> Hustlehub Tech Park - #36/5,
                                <br /> Somasandra Palya, <br />
                                Haralukunte Village, Sector2, <br /> adjacent 27th MainRoad,
                                <br />
                                HSR Layout, Bengaluru,
                                <br /> Karnataka 560102.
                                <div>
                                    <div className="d-flex flex-row align-items-center gap-3" style={{ color: "white", fontSize: "14px" }}>
                                        <span style={{ color: "#ca98e9", width: "auto" }}>
                                            <i className="fa fa-envelope" aria-hidden="true" style={{ fontSize: "16px" }}></i>
                                        </span>
                                        <a href="mailto:sales@mediafirewall.ai">
                                            <u>sales@mediafirewall.ai</u>
                                        </a>
                                    </div>
                                    <div className="d-flex flex-row align-items-center gap-3" style={{ color: "white", fontSize: "14px" }}>
                                        <span style={{ color: "#ca98e9", width: "auto" }}>
                                            <i className="fa fa-envelope" aria-hidden="true" style={{ fontSize: "16px" }}></i>
                                        </span>
                                        <a href="mailto:support@mediafirewall.ai">
                                            <u>support@mediafirewall.ai</u>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6}>
                        <h5 className="mt-3">Products</h5>
                        <ul className="list-unstyled">
                            {CommonUtility.isValidArray(headerData) &&
                                headerData.map((item, index) => {
                                    return (
                                        <li style={{ color: "#fff" }} className="py-2" key={item.id + "_" + index}>
                                            <Link href={`/network-blog?key=${item.id}`}>{item.name}</Link>
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
                                    if (index > 4) {
                                        if (index === 5) {
                                            return (
                                                <li style={{ color: "#fff" }} className="py-2" key={`n_${index}`}>
                                                    <Link href={`/network-blog?key=0`}>more...</Link>
                                                </li>
                                            );
                                        }
                                        return null; // Don't render additional "more..." items
                                    } else {
                                        return (
                                            <li style={{ color: "#fff" }} className="py-2" key={`n_${feature.name}`} onClick={() => handleFeatureCardOnClick(feature, 0)}>
                                                {feature.name}
                                            </li>
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
                                <Link href="/contact-us">Contact us</Link>
                            </li>
                            <li style={{ color: "#fff" }} className="py-2">
                                <Link href="/pricing">Pricing</Link>
                            </li>
                            <li style={{ color: "#fff" }} className="py-2">
                                <Link href="/network-blog">Demo</Link>
                            </li>
                            <li style={{ color: "#fff" }} className="py-2">
                                <Link href="/privacy-policy">Privacy policy</Link>
                            </li>
                            <li style={{ color: "#fff" }} className="py-2">
                                <Link href="/terms-of-service">Terms of Use</Link>
                            </li>
                            <li style={{ color: "#fff" }} className="py-2">
                                <Link href="/cancellation">Cancellation</Link>
                            </li>
                        </ul>
                    </Col>
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
    );
}

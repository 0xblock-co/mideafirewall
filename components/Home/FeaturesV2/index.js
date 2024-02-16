/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Button, Card, Col, Container, Image, Modal, Nav, Row, Tab } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
import RenderIf from "@/components/ConditionalRender/RenderIf";
import Count from "@/components/Count";
import VideoModal from "@/components/VideoModal";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { getMFWSatisfactionMetricsCount } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { newInfoAlert } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import style from "./featureV2.module.scss";

export default function FeatureBlogV2({ headerData }) {
    const [activeTab, setActiveTab] = useState("0");
    const satisFactionMetricsCount = useAppSelector(getMFWSatisfactionMetricsCount);

    const [isShowVideoModel, setIsShowVideoModel] = useState(false);
    const [selectedMediaContent, setSelectedMediaContent] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [featureID, setFeatureID] = useState("");

    const handleReadMoreClick = (feature, id) => {
        setModalContent(feature);
        setFeatureID(id);
        setShowModal(true);
    };

    const handleTabChange = (key) => setActiveTab(key);
    const router = useRouter();
    useEffect(() => {
        if (!isShowVideoModel) setSelectedMediaContent(null);
    }, [isShowVideoModel]);

    const { isLogin, user } = useAuthV3();
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
            <section className={style.mdf__metrics_sec}>
                <Container fluid="md">
                    <Row className="justify-content-center" style={{ borderRadius: "1rem" }}>
                        <div className="my-5">
                            <ul style={{ listStyle: "none", paddingLeft: "unset", margin: "0px" }} className="d-flex justify-content-md-center justify-content-start flex-wrap align-items-center">
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3">
                                    <div className="section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="lead font-weight-bold trusted-text01 text_gradient_effect" style={{ fontWeight: 600, fontSize: "35px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfActiveCustomers?.toString() || "85"} />
                                        </span>
                                        <br />
                                        <span
                                            className="font-size-normal font-weight-normal p-3 d-inline-block text-shadow text_gradient_effect heading_text"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Active Customers
                                        </span>
                                    </div>
                                </li>
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3 ">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="lead font-weight-bold trusted-text01 text_gradient_effect" style={{ fontWeight: 600, fontSize: "35px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfOperationsProcessed?.toString() || "0"} />
                                        </span>
                                        <br />
                                        <span
                                            className="font-size-normal font-weight-normal p-3 d-inline-block text-shadow text_gradient_effect"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Total operations processed
                                        </span>
                                    </div>
                                </li>
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="lead font-weight-bold trusted-text02 text_gradient_effect" style={{ fontWeight: 600, fontSize: "35px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfContentModerated?.toString() || "0"} />
                                        </span>
                                        <span className="lead font-weight-bold trusted-text text_gradient_effect" style={{ fontWeight: 600, fontSize: "35px" }}>
                                            {" "}
                                            TB
                                        </span>{" "}
                                        <br />
                                        <span
                                            className="font-size-normal font-weight-normal p-3 d-inline-block text-shadow text_gradient_effect"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Total media Size
                                        </span>
                                    </div>
                                </li>
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="lead font-weight-bold trusted-text03 text_gradient_effect" style={{ fontWeight: 600, fontSize: "35px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfRegions?.toString() || "0"} />
                                        </span>{" "}
                                        <br />
                                        <span
                                            className="font-size-normal font-weight-normal p-3 d-inline-block text-shadow text_gradient_effect"
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Regions Located
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
            <section className={style.mdf__personalized_feature}>
                <Container fluid="md">
                    <Row className="d-flex justify-content-center pt-5">
                        <Col>
                            <h1 className="fw-bold text-shadow text-lg-center text_gradient_effect">
                                <FormattedMessage id="page.home.featureBlog.mainTitle" />
                            </h1>
                            <h2 className="d-flex justify-content-center text-center" style={{ color: "#555555", fontWeight: "400" }}>
                                Experiment the world&apos;s best media filters in action with your own uploaded media content below, Free up to 10000 operations
                            </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center pb-5">
                        <Col
                            xl={12}
                            // xxl={9}
                            className="mt-4"
                        >
                            <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
                                <Nav className="flex-row flex-wrap justify-content-lg-center gap-3">
                                    {headerData?.map(
                                        (headerOption) =>
                                            headerOption.active && (
                                                <Nav.Item key={headerOption.id}>
                                                    <Nav.Link className={`${style.mdf__btn_large} ${activeTab === headerOption.id ? style.mdf__btn_large_selected : ""}`} eventKey={headerOption.id}>
                                                        {headerOption.name}
                                                    </Nav.Link>
                                                </Nav.Item>
                                            )
                                    )}
                                </Nav>
                                <Tab.Content>
                                    {headerData?.map((headerOption) => (
                                        <Tab.Pane key={headerOption.id} eventKey={headerOption.id}>
                                            <Row className="justify-left-lg-left row">
                                                {headerOption.features.map((feature, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${style.mdf__feature__card_block} col-md-6 `}
                                                        // onClick={() =>
                                                        //   handleFeatureCardOnClick(feature, headerOption.id)
                                                        // }
                                                    >
                                                        <Card className={`${style.mdf__feature__card} ${!feature.active ? style.mdf__feature__card_inactive : ""} `}>
                                                            <Row>
                                                                <Col xs={4} xl={3}>
                                                                    <img src={feature.imgUrl} alt={feature.name} title={feature.name} loading="lazy" className="lazyload" />
                                                                </Col>
                                                                <Col xs={8} xl={9}>
                                                                    <div className="p-0">
                                                                        <span className="d-flex justify-content-between align-items-center mb-2">
                                                                            <h6 className={`text-primary m-0 ${style.later__spacing} text_gradient_effect`}>{feature.name} </h6>
                                                                            <div className="d-flex align-items-center gap-2">
                                                                                {/* <RenderIf isTrue={feature?.featureId == "134"}>
                                                                                    <div className="blink" style={{ color: "#5e0496", fontSize: "16px", fontWeight: 600 }}>
                                                                                        Coming Soon
                                                                                    </div>
                                                                                </RenderIf> */}

                                                                                <Button
                                                                                    className={`${style.mdf__demo_button} bn53`}
                                                                                    size="sm"
                                                                                    onClick={() => handleFeatureCardOnClick(feature, headerOption.id)}
                                                                                >
                                                                                    Demo
                                                                                </Button>
                                                                            </div>
                                                                        </span>
                                                                        <div className={`${style.button_read}`}>
                                                                            <p className={`${style.text_wrap}`}>
                                                                                {feature.description}
                                                                                {/* <Link title={feature.description} id={feature.index}></Link>{" "} */}
                                                                            </p>
                                                                            <Button className={style.read_more_button} onClick={() => handleReadMoreClick(feature, headerOption.id)}>
                                                                                Read More
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <RenderIf isTrue={!feature.active}>
                                                                <span className={style.mfw_permium_feature_badge}>
                                                                    <img src="images/Vector.png" />
                                                                </span>
                                                            </RenderIf>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </Row>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Tab.Container>
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

                {/* {mediaContent && CommonUtility.isNotEmptyObject(mediaContent) && CommonUtility.doesKeyExist(mediaContent, "deepfake") && isShowVideoModel && (
                <VideoModal
                    show={isShowVideoModel}
                    handleClose={setIsShowVideoModel}
                    videoUrl={
                        CommonUtility.isValidArray(mediaContent?.deepfake)
                            ? "https://mediastestbucket.s3.ap-south-1.amazonaws.com/DSFUIMEDIA/disturbing.gif"
                            : "https://www.youtube.com/embed/nafYaz7caGQ?si=vQKekrtF7fNITp4d"
                    }
                    posterImage={mediaContent?.deepfake[0]?.thumbnailUrl || ""}
                />
            )} */}
            </section>

            <Modal className={style.jay} show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{ borderBottom: "none" }} />
                <Modal.Body className={style.mdf__feature__model}>
                    <Image src={modalContent.imgUrl} alt={modalContent.name} />
                    <h2 className="d-flex justify-content-center mt-3">{modalContent.name}</h2>
                    <p className="d-flex justify-content-center mt-3">{modalContent.description}</p>
                    <Button onClick={() => handleFeatureCardOnClick(modalContent, featureID)}>Demo</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

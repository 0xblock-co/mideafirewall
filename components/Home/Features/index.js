/* eslint-disable @next/next/no-html-link-for-pages */
import { Button, Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";

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
import style from "./feature.module.scss";

export default function FeatureBlog({ headerData }) {
    const [activeTab, setActiveTab] = useState("0");
    const satisFactionMetricsCount = useAppSelector(getMFWSatisfactionMetricsCount);

    const [isShowVideoModel, setIsShowVideoModel] = useState(false);
    const [selectedMediaContent, setSelectedMediaContent] = useState(null);
    // const mediaContent = useAppSelector(getMFWMediaContents);

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
        <section className={style.mdf__personalized_feature}>
            <Container fluid="md">
                <Row className="justify-content-center mb-5 p-3" style={{ borderRadius: "1rem" }}>
                    <>
                        <div className="text-center">
                            <ul style={{ listStyle: "none", paddingLeft: "unset" }} className="d-flex justify-content-md-center justify-content-start flex-wrap align-items-center">
                                {/* <li className="text-center px-0 col-md-auto col-12 mt-3 px-xxl-3 px-lg-2 px-md-3">
                                    <div
                                        className=" text_gredient px-2 h1-size font-size-super font-weight-bold mb-3 mb-md-0 fw-bold text-shadow text-lg-center"
                                        style={{ lineHeight: "32px", fontWeight: "700", fontSize: "28px" }}
                                    >
                                        Trusted by over <br className="d-none d-md-block" />
                                        <Count number={satisFactionMetricsCount?.numberOfActiveCustomers.toString() || "85"} />+ users
                                    </div>
                                </li> */}
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3 section2-border-right ">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="mb-4 font-size-normal font-weight-normal pt-1 d-inline-block text-shadow" style={{ fontSize: "18px", fontWeight: 700 }}>
                                            Active Customers
                                        </span>
                                        <br />
                                        <span className="lead font-weight-bold trusted-text01" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px", height: "20px", width: "20px" }}>
                                            {/* <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                                                {(percentage) => <CircularProgressbar value={percentage} text={`${percentage}`} />}
                                            </ChangingProgressProvider> */}
                                            <Count number={satisFactionMetricsCount?.numberOfActiveCustomers?.toString() || "85"} />
                                        </span>
                                        {/* <span className="lead font-weight-bold trusted-text" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                                +
                                        </span> */}{" "}
                                    </div>
                                </li>
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3 section2-border-right section2-border-left">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="mb-4 font-size-normal font-weight-normal pt-1 d-inline-block text-shadow" style={{ fontSize: "18px", fontWeight: 700 }}>
                                            Total operations processed
                                        </span>
                                        <br />
                                        <span className="lead font-weight-bold trusted-text01" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfOperationsProcessed?.toString() || "0"} />
                                        </span>
                                        {/* <span className="lead font-weight-bold trusted-text" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                                +
                                        </span> */}{" "}
                                        {/* <br /> */}
                                    </div>
                                </li>
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3 section2-border-right">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="mb-4 font-size-normal font-weight-normal pt-1 d-inline-block text-shadow" style={{ fontSize: "18px", fontWeight: 700 }}>
                                            Total media Size
                                        </span>
                                        <br />
                                        <span className="lead font-weight-bold trusted-text02" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfContentModerated?.toString() || "0"} />
                                        </span>
                                        <span className="lead font-weight-bold trusted-text" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                            {" "}
                                            TB
                                        </span>{" "}
                                    </div>
                                </li>
                                <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3 ">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="mb-4 font-size-normal font-weight-normal pt-1 d-inline-block text-shadow" style={{ fontSize: "18px", fontWeight: 700 }}>
                                            Regions
                                        </span>
                                        <br />
                                        <span className="lead font-weight-bold trusted-text03" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                            <Count number={satisFactionMetricsCount?.numberOfRegions?.toString() || "0"} />
                                        </span>{" "}
                                    </div>
                                </li>

                                {/* <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3 ">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <div style={{ width: "150px", height: "70px" }}>
                                            <img src="images/svgs/nvidia-cloud-validated-lockup-rgb-blk-for-screen.svg" style={{ objectFit: "contain", width: "100%", height: "100%" }}></img>
                                        </div>{" "}
                                    </div>
                                </li> */}
                                {/* <li className="text-center px-0 col-md-auto col-6 mt-3 px-xxl-3 px-lg-2 px-md-3">
                                    <div className="px-2 section4-datashow" style={{ lineHeight: "16px" }}>
                                        <span className="lead font-weight-bold trusted-text04" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                            269
                                        </span>
                                        <span className="lead font-weight-bold" style={{ color: "#7A00DA", fontWeight: "700", fontSize: "24px" }}>
                                            + million
                                        </span>{" "}
                                        <br />
                                        <span className="font-size-normal font-weight-normal pt-1 d-inline-block" style={{ fontSize: "16px" }}>
                                            Videos created
                                        </span>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col>
                        {/* <h1 className="fw-bold text-shadow text-lg-center">
                            Active Customers{" "}
                            <span style={{ color: "#7b5b9e" }}>
                                <b>20+</b>
                            </span>{" "}
                            satisfied customers
                        </h1> */}
                        <h1 className="fw-bold text-shadow text-lg-center">
                            <FormattedMessage id="page.home.featureBlog.mainTitle" />
                        </h1>
                        <h4 className="d-flex justify-content-center text-center" style={{ color: "#7b5b9e" }}>
                            Experiment the world&apos;s best media filters in action with your own uploaded media content below, <br />
                            Free up to 10000 operations
                        </h4>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col
                        xl={12}
                        // xxl={9}
                        className="mt-4"
                    >
                        <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={handleTabChange}>
                            <Nav variant="pills" className="flex-row flex-wrap justify-content-lg-center gap-3">
                                {headerData?.map(
                                    (headerOption) =>
                                        headerOption.active && (
                                            <Nav.Item key={headerOption.id}>
                                                <Nav.Link className={style.mdf__btn_large} eventKey={headerOption.id}>
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
                                                                {/* <Image
                                  variant="top"
                                  src={feature.imgUrl}
                                  alt={feature.name}
                                /> */}
                                                                <img src={feature.imgUrl} alt={feature.name} loading="lazy" className="lazyload" />
                                                            </Col>
                                                            <Col xs={8} xl={9}>
                                                                <div className="p-0">
                                                                    <span className="d-flex justify-content-between align-items-center mb-2">
                                                                        <h6 className={`text-primary m-0 ${style.later__spacing}`}>{feature.name}</h6>

                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <RenderIf isTrue={feature?.featureId == "134"}>
                                                                                <div className="blink" style={{ color: "#5e0496", fontSize: "16px", fontWeight: 600 }}>
                                                                                    Coming Soon
                                                                                </div>
                                                                            </RenderIf>
                                                                            <Button className="bn53" size="sm" onClick={() => handleFeatureCardOnClick(feature, headerOption.id)}>
                                                                                Demo
                                                                            </Button>
                                                                        </div>
                                                                    </span>
                                                                    <p className={`${style.text_wrap}`}>
                                                                        {feature.description}
                                                                        {/* <Link title={feature.description} id={feature.index}>
                                     </Link>{' '} */}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        </Row>
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
    );
}

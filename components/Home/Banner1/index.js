import Router from "next/router";
import { Button, Col, Container, Row } from "react-bootstrap";

import { getMFWMediaContents } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { FormattedMessage } from "react-intl";
import style from "./banner.module.scss";

export default function HomeBanner() {
    const mediaContent = useAppSelector(getMFWMediaContents);
    return (
        <section className={style.mdf__banner__back}>
            <Container>
                <Row className="justify-content-between">
                    <Col xl={6} className="mt-4">
                        <div className={style.mdf__banner_text}>
                            <h1>
                                <span className="text_gredient">World&apos;s most accurate</span> and pure <span className="text_gredient">AI powered Content Moderation platform </span>
                            </h1>
                            {/* <p>
                                <span className="text_gredient">
                                    <strong>Mediafirewall</strong>
                                </span>{" "}
                                is now{" "}
                                <span className="text_gredient">
                                    <strong>NVIDIA Cloud Validated</strong>
                                </span>{" "}
                                for enhanced performance and reliability.
                            </p> */}
                            <p className="fw-semibold mb-0">
                                Mediafirewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content. Whether you run a
                                vibrant social network, a dynamic media sharing platform, a trusted social review website, or a popular dating platform, MediaFirewall empowers you to cultivate a
                                positive online environment. Elevate your platform with our advanced content moderation capabilities, allowing users to engage confidently while you maintain the
                                highest standards of safety and quality.
                            </p>

                            <div style={{ width: "150px", height: "70px" }}>
                                <img
                                    src="/images/svgs/nvidia-cloud-validated-lockup-rgb-blk-for-screen.svg"
                                    alt="nvidia-cloud-validated-lockup"
                                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                                ></img>
                            </div>

                            <Button variant="primary" className="rounded-pill button_primary py-2 px-4" onClick={() => Router.push("/features-list")}>
                                <FormattedMessage id="button.See Demo" />
                            </Button>
                            {/* <div style={{ width: "150px", height: "70px" }}>
                                <img src="images/svgs/nvidia-cloud-validated-lockup-rgb-blk-for-screen.svg" style={{ objectFit: "contain", width: "100%", height: "100%" }}></img>
                            </div> */}
                        </div>
                    </Col>
                    {mediaContent && CommonUtility.isNotEmptyObject(mediaContent) && CommonUtility.doesKeyExist(mediaContent, "Home") ? (
                        <>
                            <Col xl={6} className="mt-4">
                                <div className={style.mdf__banner__video}>
                                    <div className={style.mdf__video}>
                                        {CommonUtility.isValidArray(mediaContent.Home) &&
                                            mediaContent.Home.map((item, index) => {
                                                return (
                                                    <video key={index} className={style.video} src={item.mediaUrl} controls autoPlay={false} loop playsInline muted poster={item.thumbnailUrl}>
                                                        Your browser does not support the video tag.
                                                    </video>
                                                );
                                            })}
                                    </div>
                                </div>
                            </Col>
                        </>
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
        </section>
    );
}

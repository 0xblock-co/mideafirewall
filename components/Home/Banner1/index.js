/* eslint-disable @next/next/no-img-element */
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
                                World&apos;s{" "}
                                <span className="text_gredient1" style={{ color: "#5e0496" }}>
                                    most accurate and pure AI based{" "}
                                </span>{" "}
                                <span className="text_gredient1" style={{ color: "rgb(232 125 48)" }}>
                                    Voice, Image and Video
                                </span>{" "}
                                RealTime Content Moderation Service
                            </h1>
                            {/* <h1>
                                <span className="text_gredient">World&apos;s most accurate</span> and pure <span className="text_gredient">AI powered Content Moderation platform </span>
                            </h1> */}
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
                                Media Firewall is your ultimate solution for online safety. Our powerful AI-based content moderation tool specializes in image, voice, and video moderation, ensuring
                                your platform remains free from harmful content. With real-time detection of offensive material, our multimedia moderation platform serves as your first line of
                                defense, guaranteeing a secure digital environment for all users.
                            </p>

                            <div style={{ width: "150px", height: "70px" }}>
                                <img
                                    src="/images/svgs/nvidia-cloud-validated-lockup-rgb-blk-for-screen.svg"
                                    title="Nvidia Cloud validated"
                                    alt="Nvidia Cloud validated"
                                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                                ></img>
                            </div>

                            <Button variant="primary" className="rounded-pill button_primary py-2 px-4" onClick={() => Router.push("/features-list")}>
                                <FormattedMessage id="button.See Demo" />
                            </Button>
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

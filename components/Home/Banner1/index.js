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
                                {/* <FormattedMessage
                                    id="page.home.banner.mainTitle"
                                    values={{
                                        span: (chunks) => <span className="text_gredient">{chunks}</span>,
                                    }}
                                /> */}
                            </h1>
                            <p className="fw-semibold">
                                Mediafirewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content. Whether you run a
                                vibrant social network, a dynamic media sharing platform, a trusted social review website, or a popular dating platform, MediaFirewall empowers you to cultivate a
                                positive online environment. Elevate your platform with our advanced content moderation capabilities, allowing users to engage confidently while you maintain the
                                highest standards of safety and quality.
                            </p>
                            {/* <p className="fw-semibold">
                                Mediafirewall is a powerful AI-based content moderation tool that helps online communities keep their platforms safe and free from harmful content.
                            </p> */}
                            <Button variant="primary" className="rounded-pill button_primary py-2 px-4" onClick={() => Router.push("/network-blog")}>
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

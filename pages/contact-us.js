import { Fragment } from "react";

import ContactBanner from "@/components/Contact/banner";
import ContactChatBlock from "@/components/Contact/chat-blocks";
import { getMFWMediaContents } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { NextSeo } from "next-seo";
import { Col, Container, Row } from "react-bootstrap";

// const videos = [
//     "https://video.wixstatic.com/video/b4a04e_06eae65ea0624c8d8488e2ab0dff54e1/1080p/mp4/file.mp4",
//     "https://www.youtube.com/embed/VYIlt3iBtmU",
//     "https://www.youtube.com/embed/i0yqhHKWY0A",
//     "https://www.youtube.com/embed/nafYaz7caGQ?si=wYUu_oDRhWedrup7",
// ];

export default function ContactUsScreen() {
    const mediaContent = useAppSelector(getMFWMediaContents);
    return (
        <Fragment>
            <NextSeo
                title="Contact Us"
                description="Contact us effortlessly through WhatsApp, schedule a demo, or request a price quote. Explore our onboarding videos for a seamless experience. Connect with us for the latest in content moderation and platform safety."
                canonical="https://mediafirewall.ai/contact-us"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/contact-us",
                    title: "Contact Us",
                    description:
                        "Contact us effortlessly through WhatsApp, schedule a demo, or request a price quote. Explore our onboarding videos for a seamless experience. Connect with us for the latest in AI content moderation and platform safety.",
                    site_name: "MediaFirewall",
                }}
                // twitter={{
                //     cardType: "summary_large_image",
                //     handle: "@yourTwitterHandle", // Replace with your Twitter handle
                //     site: "@yourTwitterHandle", // Replace with your Twitter handle
                // }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "Contact Us, Contact Methods, WhatsApp, Schedule Demo, Price Quote, Onboarding Videos, AI Safety, Digital Safety, Platform Security, Seamless Communication, AI Content Moderation, Platform Safety, Customer Inquiry, content moderation",
                    },
                ]}
            />
            <ContactBanner />
            <ContactChatBlock />
            {mediaContent && CommonUtility.isNotEmptyObject(mediaContent) && CommonUtility.doesKeyExist(mediaContent, "ContactUs") && CommonUtility.isValidArray(mediaContent.ContactUs) && (
                <section className={`video-block-wrapper `}>
                    <Container>
                        <div className="video-block-title">
                            <h2>Effortless Onboarding</h2>
                        </div>
                        <Row>


                            {mediaContent && CommonUtility.isNotEmptyObject(mediaContent) && CommonUtility.doesKeyExist(mediaContent, "ContactUs") ? (
                                <>
                                    {CommonUtility.isValidArray(mediaContent.ContactUs) &&
                                        mediaContent.ContactUs.map((item, index) => {
                                            return (
                                                <Col key={index} lg={3} md={6} sm={6} className="video-col-item">
                                                    <iframe
                                                        key={index}
                                                        loading="lazy"
                                                        width="100%"
                                                        height={"548"}
                                                        src={item.mediaUrl}
                                                        frameBorder="0"
                                                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        poster={item.thumbnailUrl}
                                                    />
                                                </Col>
                                            );
                                        })}
                                </>
                            ) : (
                                <></>
                            )}
                            {/* {videos.map((video, index) => (
                            <Col key={index} lg={3} md={6} sm={6} className="video-col-item">
                                <iframe
                                    loading="lazy"
                                    width="100%"
                                    height={index === 6 ? "250" : "548"}
                                    src={video}
                                    frameBorder="0"
                                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </Col>
                        ))} */}
                        </Row>
                    </Container>
                </section>
            )}
        </Fragment>
    );
}

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
                title="Contact Media Firewall with Your Moderation Questions"
                description="Have questions or need assistance? Contact Media Firewall today. Reach us via email, phone, or our convenient contact form. Our dedicated support team is ready to help you with prompt and reliable assistance."
                canonical="https://mediafirewall.ai/contact-us"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/contact-us",
                    title: "Contact Media Firewall with Your Moderation Questions",
                    description:
                        "Have questions or need assistance? Contact Media Firewall today. Reach us via email, phone, or our convenient contact form. Our dedicated support team is ready to help you with prompt and reliable assistance.",
                    site_name: "Media Firewall",
                    images: [
                        {
                            url: "https://mediafirewall.ai/images/logo.png",
                            width: 1200,
                            height: 630,
                            alt: "Media Firewall Logo",
                        },
                    ],
                }}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content:
                            "Contact Us, Contact, Reach Out, Customer Support, Contact Information, Contact Details, Support, Assistance, Help Desk, Chat Support, Contact Options, Email, Phone Number.",
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

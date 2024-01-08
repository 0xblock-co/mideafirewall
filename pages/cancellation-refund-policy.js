import { NextSeo } from "next-seo";
import { Col, Container, Row } from "react-bootstrap";

const Cancellation = () => {
    return (
        <>
            <NextSeo
                title="Cancellation and Refund Policy"
                description="Understand MediaFirewall's Cancellation and Refund Policy for all services provided through www.mediafirewall.ai. Learn about cancellation terms for subscription and one-time services, refund conditions, and the process for requesting cancellations or refunds. Stay informed about changes to this policy and contact us for any questions."
                canonical="https://mediafirewall.ai/cancellation-refund-policy"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://mediafirewall.ai/cancellation-refund-policy",
                    title: "Cancellation and Refund Policy",
                    description:
                        "Understand MediaFirewall's Cancellation and Refund Policy for all services provided through www.mediafirewall.ai. Learn about cancellation terms for subscription and one-time services, refund conditions, and the process for requesting cancellations or refunds. Stay informed about changes to this policy and contact us for any questions.",
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
                            "Cancellation Policy, Refund Policy, MediaFirewall, Subscription Services, One-Time Services, Pro-Rata Refund, Cancellation Fee, Cancellation Request, Refund Request, Customer Support, Policy Changes, Contact Information, MediaFirewall",
                    },
                ]}
            />
            <div style={{ margin: "100px 0" }}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="terms">
                                <h1>Cancellation and Refund Policy</h1>
                                <p>
                                    <span>
                                        This Cancellation and Refund Policy (&quot;Policy&quot;) applies to all services provided by MediaFirewall through our website at{" "}
                                        <a href="http://www.mediafirewall.ai/" target="_blank" rel="noreferrer">
                                            www.mediafirewall.ai
                                        </a>
                                        .
                                    </span>
                                </p>
                                <ol>
                                    <li style={{ listStyle: "none" }}>
                                        <span>
                                            <span>
                                                <strong>1. Cancellation Policy</strong>
                                            </span>
                                        </span>
                                        <ol>
                                            <li style={{ listStyle: "none" }}>
                                                <span>
                                                    <span>
                                                        <strong>1.1 Subscription Services:</strong>
                                                    </span>
                                                </span>
                                                <br />
                                                Customers subscribing to our services may cancel their subscription at any time. The cancellation will be effective at the end of the current billing
                                                period. No pro-rata refunds will be provided for the remaining unused days of the subscription.
                                            </li>
                                        </ol>
                                    </li>
                                    <li style={{ listStyle: "none" }}>
                                        <span>
                                            <span>
                                                <strong>2. Refund Policy:</strong>
                                            </span>
                                        </span>
                                        <ol>
                                            <li style={{ listStyle: "none" }}>
                                                <span>
                                                    <span>
                                                        <strong>2.1 Subscription Services:</strong>
                                                    </span>
                                                </span>
                                                <br />
                                                Refunds for subscription services are generally not provided. However, in exceptional cases, such as billing errors or service disruptions attributable
                                                to MediaFirewall, a pro-rata refund for the affected period may be considered.
                                            </li>
                                            <li style={{ listStyle: "none" }}>
                                                <span>
                                                    <span>
                                                        <strong>2.2 One-Time Services:</strong>
                                                    </span>
                                                </span>
                                                <br />
                                                Refunds for one-time services are subject to the following conditions:
                                                <ul>
                                                    <li>Full refund: If the cancellation is made within 1 days before the scheduled service date.</li>
                                                    <li>Partial refund: If the cancellation is made within 10 days before the scheduled service date, a 50% cancellation fee may apply.</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </li>
                                    <li style={{ listStyle: "none" }}>
                                        <span>
                                            <span>
                                                <strong>3. How to Request a Cancellation or Refund:</strong>
                                            </span>
                                        </span>
                                        <br />
                                        Customers can request cancellations or refunds by contacting our customer support team at <a href="mailto:support@mediafirewall.ai">support@mediafirewall.ai</a>
                                        . Please provide relevant details, such as your order number and the reason for the cancellation or refund request.
                                    </li>
                                    <li style={{ listStyle: "none" }}>
                                        <span>
                                            <span>
                                                <strong>4. Changes to this Policy:</strong>
                                            </span>
                                        </span>
                                        <br />
                                        MediaFirewall reserves the right to modify or update this Cancellation and Refund Policy at any time. Customers will be notified of any changes through our
                                        website or via email.
                                    </li>
                                    <li style={{ listStyle: "none" }}>
                                        <span>
                                            <span>
                                                <strong>5. Contact Us:</strong>
                                            </span>
                                        </span>
                                        <br />
                                        If you have any questions about this Cancellation and Refund Policy, please contact us at <a href="mailto:info@mediafirewall.ai">
                                            info@mediafirewall.ai
                                        </a> Or <a href="mailto:info@mediafirewall.ai">+91 99001 19968</a>.
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Cancellation;

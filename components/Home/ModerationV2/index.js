import { Card, Col, Container, Row } from "react-bootstrap";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";

import { FormattedMessage } from "react-intl";
import style from "./moderationV2.module.scss";

export default function ModerationV2() {
    return (
        <section className={style.mdf__moderation__back}>
            <Container fluid="md">
                <Row className="justify-content-center">
                    <Col lg={10} xxl={7}>
                        <h1 className="fw-bold text-shadow text-center text_gradient_effect">
                            <FormattedMessage id="page.home.moderation.mainTitle" />
                        </h1>
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{ position: "relative" }}>
                    <Col sm={6} className="mt-3 mt-lg-5">
                        <Card className={`p-3 p-lg-5 ${style.card_custom_1}`}>
                            <Card.Title className="text-center text-primary text_gradient_effect">
                                <h2>
                                    <FormattedMessage id="page.home.moderation.Traditional Manual moderation" />
                                </h2>
                            </Card.Title>

                            <ul className="list-unstyled mb-0 p-3">
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" /> <strong>Time and Efficiency:</strong> Involves time-consuming, individual content review.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" /> <strong>Consistency:</strong> Prone to inconsistency among human moderators.
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" /> <strong>Scale:</strong> Faces difficulty scaling with growing content volume.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" /> <strong>Cost:</strong> Proves costly with dedicated human moderators.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" /> <strong>Human Error:</strong> Susceptible to oversight, fatigue, and subjective judgment.{" "}
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col sm={6} className="mt-3 mt-lg-5  ">
                        {/* TODO:: Need to update the features list based on the market competitors  */}
                        <Card className={`p-3 p-lg-5  ${style.card_custom_2}`}>
                            <Card.Title className="text-center">
                                <h2>
                                    <FormattedMessage id="page.home.moderation.MediaFirewall Content Moderation" />
                                </h2>
                            </Card.Title>
                            <ul className="list-unstyled mt-3 mt-lg-5 mb-0">
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Time and Efficiency:</strong> Enables real-time analysis and efficient processing of large volumes.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Consistency:</strong> Ensures consistent application of predefined rules.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Scale:</strong> Easily scales for handling large amounts of content.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Cost:</strong> Achieves cost savings due to its efficiency, scalability, and reduced reliance on human
                                    resources.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Human Error:</strong> AI, following algorithms and standards, tirelessly ensures accurate content processing
                                    with standard tools..{" "}
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

import { Card, Col, Container, Row } from "react-bootstrap";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";

import { FormattedMessage } from "react-intl";
import style from "./moderation.module.scss";

export default function Moderation() {
    return (
        <section className={style.mdf__moderation__back}>
            <Container fluid="md">
                <Row className="justify-content-center">
                    <Col lg={10} xxl={7}>
                        <h1 className="fw-bold text-shadow text-center">
                            <FormattedMessage id="page.home.moderation.mainTitle" />
                        </h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm={6} className="mt-3 mt-lg-5">
                            <Card className={`p-3 p-lg-5 h-100 ${style.card_custom}`}>
                            <Card.Title className="text-center mb-3 mb-lg-5 text-primary">
                                <FormattedMessage id="page.home.moderation.Traditional Manual moderation" />
                            </Card.Title>
                            <Card.Img loading="lazy" variant="top" src="/images/moderation-1.png" className={`lazyload ${style.mdf__img__rounded}`} />
                            <ul className="list-unstyled mt-3 mt-lg-5 mb-0">
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <strong>Time and Efficiency:</strong> Involves time-consuming, individual content review.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "} <strong>Consistency:</strong> Prone to inconsistency among human moderators.
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <strong>Scale:</strong> Faces difficulty scaling with growing content volume.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <strong>Cost:</strong> Proves costly with dedicated human moderators.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <strong>Human Error:</strong> Susceptible to oversight, fatigue, and subjective judgment.{" "}
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col sm={6} className="mt-3 mt-lg-5">
                        {/* TODO:: Need to update the features list based on the market competitors  */}
                        <Card className={`p-3 p-lg-5 h-100 ${style.card_custom}`}>
                            <Card.Title className="text-center mb-3 mb-lg-5 text-primary">
                                <FormattedMessage id="page.home.moderation.MediaFirewall Content Moderation" />
                            </Card.Title>
                            <Card.Img variant="top" loading="lazy" src="/images/AI-moderation.png" className={`lazyload ${style.mdf__img__rounded}`} />
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

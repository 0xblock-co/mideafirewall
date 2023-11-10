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
                                    <FormattedMessage
                                        id="page.home.moderation.listItem.Time-consuming"
                                        values={{
                                            strong: (chunks) => <strong>{chunks}</strong>,
                                        }}
                                    />
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <FormattedMessage
                                        id="page.home.moderation.listItem.Inconsistent"
                                        values={{
                                            strong: (chunks) => <strong>{chunks}</strong>,
                                        }}
                                    />
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <FormattedMessage
                                        id="page.home.moderation.listItem.Limited Scale"
                                        values={{
                                            strong: (chunks) => <strong>{chunks}</strong>,
                                        }}
                                    />
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />
                                    <FormattedMessage
                                        id="page.home.moderation.listItem.Costly"
                                        values={{
                                            strong: (chunks) => <strong>{chunks}</strong>,
                                        }}
                                    />
                                </li>
                                <li className="mb-3">
                                    <IoClose size={24} color="#FF3407" />{" "}
                                    <FormattedMessage
                                        id="page.home.moderation.listItem.Human Error"
                                        values={{
                                            strong: (chunks) => <strong>{chunks}</strong>,
                                        }}
                                    />
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
                            <Card.Img variant="top" loading="lazy" src="/images/moderation-2.png" className="lazyload mdf__img__rounded" />
                            <ul className="list-unstyled mt-3 mt-lg-5 mb-0">
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Time-consuming:</strong> It requires significant time and effort.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Inconsistent:</strong> Moderation decisions can vary between moderators.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Limited Scale:</strong> Manual moderation becomes difficult at scale.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Costly:</strong> It requires dedicated moderators, adding costs.{" "}
                                </li>
                                <li className="mb-3">
                                    <IoCheckmarkSharp size={24} color="#5E0496" /> <strong>Human Error:</strong>Moderators are susceptible to making mistakes.{" "}
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

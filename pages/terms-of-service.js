import { Col, Container, Row } from "react-bootstrap";

const ContentPage = () => {
    return (
        <div style={{ margin: "100px 0", minHeight: "50vh" }}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="terms">
                            <h1>Terms of Use</h1>
                            <p>
                                <span>
                                    This terms-of-service agreement is entered into between you and MediaFirewall.ai, a [Your Jurisdiction] corporation (“<strong>MediaFirewall.ai</strong>,” “
                                    <strong>we</strong>,”
                                    <strong> </strong>or “<strong>us</strong>”). The following agreement, together with any documents it expressly incorporates by reference (collectively, “
                                    <strong>agreement</strong>”), governs your access to and use of
                                    <a href="http://www.mediafirewall.ai/" target="_blank" rel="noreferrer">
                                        www.mediafirewall.ai
                                    </a>
                                    , including any content, functionality, and services offered on or through &nbsp;
                                    <a href="http://www.mediafirewall.ai/" target="_blank" rel="noreferrer">
                                        www.mediafirewall.ai
                                    </a>
                                    &nbsp; (“<strong>Website</strong>”), whether as a guest or a registered user.
                                </span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ContentPage;

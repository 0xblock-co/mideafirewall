import ProtectRoute from "@/contexts-v2/protectedRoute";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const PaymentFailure = () => {
    const router = useRouter();

    return (
        <Fragment>
            <section className="payment__success__block">
                <Container className="h-100">
                    <Row className="h-100 justify-content-start align-items-center">
                        <Col md={10} className="text-start">
                            <h2 className="text-white">
                                Thank you for considering MediaFirewall.
                                <br />
                            </h2>
                            <h4 className="text-white">Unfortunately, we were unable to process your payment at this time. Please check your payment details and try again.</h4>
                            <Button variant="primary" className=" mt-3 py-3" onClick={() => router.push("/pricing")}>
                                Go To Pricing
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default ProtectRoute(PaymentFailure);

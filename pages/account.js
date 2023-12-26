import style from "@/components/Auth/auth.module.scss";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import { asyncCancelSubscription } from "@/services/product/product.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { ToastMessage, newInfoAlert } from "@/utils/toastMessage.utils";
import moment from "moment";
import Router from "next/router";
import { useState } from "react";
import { BsFillClipboardFill } from "react-icons/bs";
const AccountDetails = () => {
    const { user } = useAuthV3();
    const dispatch = useAppDispatch();

    const ContactInformationSection = () => {
        return (
            <Card className="mb-4 mt-2">
                <Card.Header>Contact Information</Card.Header>
                <Card.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Email:
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" value={user?.userDetails?.email} disabled />
                            <p style={{ fontSize: "12px" }}>*Please contact support if you need to change your contact email.</p>
                        </Col>
                    </Form.Group>
                </Card.Body>
            </Card>
        );
    };

    const BillingSection = ({ subscriptionDetails }) => {
        const [isLoading, setIsLoading] = useState(false);

        const cancelSubscription = async () => {
            newInfoAlert("Cancel Subscription", "Are you sure you want to cancel this subscription?", "Continue", "warning", true).then(async () => {
                try {
                    setIsLoading(true);
                    // setShowModal(true);

                    const payload = {
                        subscriptionId: subscriptionDetails?.subscriptionId,
                        userId: user?.userDetails?.email,
                    };

                    const response = await asyncCancelSubscription(payload);

                    if (response.isSuccess && CommonUtility.isNotEmptyObject(response.data)) {
                        ToastMessage.success("Subscription is canceled");
                        dispatch(
                            authActions.setUserData({
                                ...user,
                                priceSurveyAnswered: false,
                                subscriptionDetails: {
                                    ...response.data,
                                },
                            })
                        );
                    }
                    // else {
                    // newInfoAlert(
                    //     "Scheduled Service Interruption",
                    //     "Due to scheduled maintenance, our service is temporarily interrupted. We appreciate your understanding, and everything will be back to normal on January 8, 2024.",
                    //     "Okay",
                    //     "error",
                    //     true,
                    //     "Cancel",
                    //     false
                    // ).then(() => {});
                    // ToastMessage.error("Something went wrong");
                    // }
                } catch (error) {
                } finally {
                    setIsLoading(false);
                }
            });
        };

        return (
            <Card className="mb-4">
                <Card.Header>Billing</Card.Header>

                <Card.Body>
                    {subscriptionDetails?.active && subscriptionDetails?.tireName !== "demo" ? (
                        <>
                            <Card.Title>Current Plan</Card.Title>
                            <Card.Text>Tier Name: {subscriptionDetails?.tireName} </Card.Text>
                            <Card.Text>Status: {subscriptionDetails?.active ? "Active" : "Canceled"}</Card.Text>
                            <Card.Text>
                                Start Date:
                                {moment.unix(subscriptionDetails?.current_period_start).format("YYYY-MM-DD")}
                            </Card.Text>
                            <Card.Text>
                                End Date:
                                {moment.unix(subscriptionDetails?.current_period_end).format("YYYY-MM-DD")}
                            </Card.Text>
                            <Button variant="primary" onClick={() => Router.push(`/pricing?isUpgrade=true`)} className="me-2">
                                Upgrade
                            </Button>
                            <Button variant="danger" onClick={() => cancelSubscription()}>
                                Cancel Subscription
                            </Button>
                        </>
                    ) : (
                        <>
                            <Card.Text>You are on a free trial. Please choose a plan.</Card.Text>
                            <Button variant="primary" onClick={() => Router.push("/pricing")}>
                                Choose
                            </Button>
                        </>
                    )}
                </Card.Body>
                {/* {showModal && (
          <DeleteConfirmationModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onDelete={cancelSubscription}
            title="Cancel Subscription"
            confirmText="Are you sure you want to cancel this subscription?"
            confirmButtonText="Cancel"
          />
        )} */}
                {isLoading && <Loader isLoading={isLoading} />}
            </Card>
        );
    };

    const ApiKeysSection = () => {
        const copyApiKey = () => {
            navigator.clipboard.writeText(apiKey);
            ToastMessage.success("API key copied successfully");
        };
        const apiKey = user?.api_secret;

        const [showApiKey, setShowApiKey] = useState(false);

        const maskApiKey = (apiKey) => {
            return apiKey?.replace(/./g, "*");
        };

        const handleReveal = () => {
            setShowApiKey(true);
        };

        const handleHide = () => {
            setShowApiKey(false);
        };

        return (
            <Card className="mb-4">
                <Card.Header>API Keys</Card.Header>
                <Card.Body>
                    <Card.Title>Your API Key</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Text className="mb-0">
                            API Secret: <span id="apiKey">{showApiKey ? apiKey : maskApiKey(apiKey)}</span>
                        </Card.Text>

                        <Button variant="outline-secondary" onClick={copyApiKey}>
                            <BsFillClipboardFill />
                        </Button>
                        <Button variant="primary" onClick={() => (showApiKey ? handleHide() : handleReveal())}>
                            {showApiKey ? "HIDE SECRET" : "REVEAL SECRET"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    return (
        <>
            <section className={style.mdf__authpage__section}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={12} xl={8}>
                            <ContactInformationSection />
                        </Col>
                    </Row>
                    {user?.subscriptionDetails && (
                        <Row className="justify-content-center">
                            <Col lg={12} xl={8}>
                                <BillingSection subscriptionDetails={user?.subscriptionDetails} />
                            </Col>
                        </Row>
                    )}
                    <Row className="justify-content-center">
                        <Col lg={12} xl={8}>
                            <ApiKeysSection />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
// export default AccountDetails;
export default ProtectRoute(AccountDetails);

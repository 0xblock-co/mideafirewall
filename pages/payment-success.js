import { useAuthV3 } from "@/contexts-v2/auth.context";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import { asyncGetCustomerSubscriptionData } from "@/services/product/product.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const PaymentSuccess = () => {
    const { isLogin, user } = useAuthV3();
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        async function getPricingDetails() {
            const response = await asyncGetCustomerSubscriptionData();
            if (response.isSuccess && CommonUtility.isNotEmptyObject(response.data)) {
                dispatch(
                    authActions.setUserData({
                        ...user,
                        priceSurveyAnswered: true,
                        subscriptionDetails: {
                            ...response.data,
                        },
                    })
                );
            } else {
                // ToastMessage.error("Something went wrong");
                router.reload();
            }
        }

        if (user && isLogin) getPricingDetails();
    }, [isLogin]);

    return (
        <Fragment>
            <section className="payment__success__block">
                <Container className="h-100">
                    <Row className="h-100 justify-content-start align-items-center">
                        <Col md={10} className="text-start">
                            <h2 className="text-white">
                                Thank you for considering Media Firewall.
                                <br />
                            </h2>
                            <h4 className="text-white">Your payment has been successfully processed.</h4>
                            <Button variant="primary" className=" mt-3 py-3" onClick={() => router.push("/features-list")}>
                                Start Moderating Content
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};
export default ProtectRoute(PaymentSuccess);

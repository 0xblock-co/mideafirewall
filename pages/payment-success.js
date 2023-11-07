import { useAuth } from "@/contexts/AuthContext";
import { asyncGetCustomerSubscriptionData } from "@/services/product/product.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { ToastMessage } from "@/utils/toastMessage.utils";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function PaymentSuccess() {
  const { isLogin, user } = useAuth();
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
        ToastMessage.error("Something went wrong");
        // router.push("/");
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
              <h1 className="text-white">
                Thank you for choosing Media Firewall. <br />
                Your payment has been successfully processed.
              </h1>
              <Button
                variant="primary"
                className=" mt-3 py-3"
                onClick={() => router.push("/network-blog")}
              >
                Start Moderating Content
              </Button>
            </Col>
            {/* <Col md={6} xxl={5} className="text-center">
              <Image
                className="mb-3 w-75"
                layout="fill"
                src="/images/success.svg"
                alt=""
              />
              <div className="stepper-wrapper">
                <div className="stepper-item completed">
                  <div className="step-counter">
                    <HiCheck />
                  </div>
                  <div className="step-name">Plan Selected</div>
                </div>
                <div className="stepper-item completed">
                  <div className="step-counter">
                    <HiCheck />
                  </div>
                  <div className="step-name">Card Added</div>
                </div>
                <div className="stepper-item  completed">
                  <div className="step-counter">
                    <HiCheck />
                  </div>
                  <div className="step-name">Payment Received</div>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
}

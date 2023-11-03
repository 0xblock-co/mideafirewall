import { useAuth } from "@/contexts/AuthContext";
import { asyncGetCustomerSubscriptionData } from "@/services/product/product.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { ToastMessage } from "@/utils/toastMessage.utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { HiCheck } from "react-icons/hi";

export default function PaymentSuccess() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    async function getPricingDetails() {
      const response = await asyncGetCustomerSubscriptionData();
      if (response.isSuccess && CommonUtility.isNotEmptyObject(response.data)) {
        dispatch(
          authActions.setUserData({
            ...user,
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
    if (user && user.isLoggedIn) getPricingDetails();
  }, []);

  return (
    <Fragment>
      <section className="payment__success__block">
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md={6} xxl={5}>
              <h1 className="text-white">
                Thank You for choosing Midea Firewall
              </h1>
              <Button
                variant="primary"
                className=" mt-3 py-3"
                onClick={() => router.push("/network-blog")}
              >
                Start Moderating Content
              </Button>
            </Col>
            <Col md={6} xxl={5} className="text-center">
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
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
}

import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Loader from "@/components/Loader";
import PaymentLeftBlock from "@/components/Payment/payment-left-block";
import PaymentRightBlock from "@/components/Payment/payment-right-block";
import style from "@/components/Payment/payment.module.scss";
import { getSelectedPlan } from "@/store/defaultConfig.slice";
import { useAppSelector } from "@/store/hooks";

export default function Payment() {
  // const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const selectedPlan = useAppSelector(getSelectedPlan);
  useEffect(() => {
    setPriceData(selectedPlan);
  }, [selectedPlan]);
  useEffect(() => {
    // function getSelectedPlan() {
    //   const plan = localStorage.getItem("pricingSelectedPlan");
    //   setPriceData(JSON.parse(plan));
    // }
    // getSelectedPlan();
    // const token = readCookie(localStorageKeys.priceData);
    // if (!token) {
    //   Router.push("/pricing");
    //   return;
    // }
    // const priceData = decodeData(token, localStorageKeys.priceData);
    // setPriceData(priceData);
    // return () => {
    //   dispatch(setSelectedPricingPlan(null));
    //   // localStorage.removeItem("pricingSelectedPlan");
    // };
  }, []);

  const handlePaymentSubmit = async (params) => {
    // setIsLoading(true);
    // const { name, cardElement, email, address, priceId } = params;
    // await stripe
    //   .createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //     billing_details: {
    //       name,
    //       email,
    //       address,
    //     },
    //   })
    //   .then(async function (result) {
    //     if (result) {
    //       if (result.paymentMethod) {
    //         const customerBody = {
    //           email,
    //           name,
    //           payment_method: result.paymentMethod?.id,
    //           priceId: priceId,
    //         };
    //         try {
    //           const result = await axios.post(
    //             "http://localhost:3000/api/createSubscription",
    //             customerBody
    //           );
    //           setIsLoading(false);
    //           showToast("success", "Your transaction has been successful");
    //           Router.push("/network-blog");
    //         } catch (error) {
    //           setIsLoading(false);
    //           showToast("error", error?.message || "Something went wrong");
    //         }
    //       } else if (result?.error) {
    //         setIsLoading(false);
    //         showToast(
    //           "error",
    //           result?.error?.message || "Something went wrong"
    //         );
    //       }
    //       return;
    //     }
    //   });
  };

  return (
    <Fragment>
      <Container>
        <section className={style.payment__main__block}>
          <Row className="justify-content-center ">
            <Col md={6} xxl={5} className="p-0">
              <PaymentLeftBlock priceData={priceData} />
            </Col>
            <Col md={6} xxl={5} className="h-100 shadow-lg p-0">
              <PaymentRightBlock handlePaymentSubmit={handlePaymentSubmit} />
            </Col>
          </Row>
        </section>
      </Container>
      <Loader isLoading={isLoading} />
    </Fragment>
  );
}

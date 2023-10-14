import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Loader from "@/components/Loader";
import PaymentLeftBlock from "@/components/Payment/payment-left-block";
import PaymentRightBlock from "@/components/Payment/payment-right-block";
import style from "@/components/Payment/payment.module.scss";
import { showToast } from "@/components/ToastContainer/toaster";
import { localStorageKeys } from "@/constants/global.constants";
import { readCookie } from "@/utils/cookieCreator";
import { decodeData } from "@/utils/globalFunctions";

export default function Payment() {
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const token = readCookie(localStorageKeys.priceData);
    if (!token) {
      Router.push("/pricing");
      return;
    }
    const priceData = decodeData(token, localStorageKeys.priceData);
    setPriceData(priceData);
  }, []);

  const handlePaymentSubmit = async (params) => {
    setIsLoading(true);
    const { name, cardElement, email, address, priceId } = params;
    await stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
          address,
        },
      })
      .then(async function (result) {
        if (result) {
          if (result.paymentMethod) {
            const customerBody = {
              email,
              name,
              payment_method: result.paymentMethod?.id,
              priceId: priceId,
            };
            try {
              const result = await axios.post(
                "http://localhost:3000/api/createSubscription",
                customerBody
              );
              setIsLoading(false);
              showToast("success", "Your transaction has been successful");
              Router.push("/network-blog");
              console.log("result :>> ", result);
            } catch (error) {
              setIsLoading(false);
              console.log("error :>> ", error);
              showToast("error", error?.message || "Something went wrong");
            }
          } else if (result?.error) {
            setIsLoading(false);
            showToast(
              "error",
              result?.error?.message || "Something went wrong"
            );
          }
          return;
        }
      });
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

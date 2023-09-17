import Image from "next/image";
import React from "react";
import { HiCheck } from "react-icons/hi";
export default function PaymentLeftBlock({ priceData }) {
  return (
    <div className="mdf__payment-left-banner">
      <div className="mdf__image__content p-5">
        <Image
          className="mb-3 mdf__logo_footer"
          layout="fill"
          src="/images/logo.png"
          alt=""
        />
        <div className="text-white">
          <p className="mb-0">Subscribe to {priceData?.name}</p>
          <div className="d-flex align-content-center">
            <h1 className="fw-normal">${priceData?.price}</h1>
            <span className="ms-2 text-sm">
              per <br></br>
              {priceData?.operationPeriod}
            </span>
          </div>
        </div>
      </div>
      <div className="stepbar__div">
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
          <div className="stepper-item">
            <div className="step-counter"></div>
            <div className="step-name">Payment Received</div>
          </div>
        </div>
      </div>
    </div>
  );
}

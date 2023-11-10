import Image from "next/image";
import { HiCheck } from "react-icons/hi";

import style from "./payment.module.scss";
export default function PaymentLeftBlock({ priceData }) {
    return (
        <div className={style.mdf__payment_left_banner}>
            <div className={`mdf__image__content p-5`}>
                <div className="d-flex justify-content-between align-items-center">
                    <Image className={`mb-3 mdf__logo_footer`} layout="fill" src="/images/logo.png" alt="" />
                    <span className="Footer-PoweredBy-Text Text Text-color--gray400 Text-fontSize--12 Text-fontWeight--400">
                        Powered by{" "}
                        <svg className="InlineSVG Icon Footer-PoweredBy-Icon Icon--md" focusable="false" width="33" height="15" role="img" aria-labelledby="stripe-title">
                            <title id="stripe-title">Stripe</title>
                            <g fillRule="evenodd">
                                <path d="M32.956 7.925c0-2.313-1.12-4.138-3.261-4.138-2.15 0-3.451 1.825-3.451 4.12 0 2.719 1.535 4.092 3.74 4.092 1.075 0 1.888-.244 2.502-.587V9.605c-.614.307-1.319.497-2.213.497-.876 0-1.653-.307-1.753-1.373h4.418c0-.118.018-.588.018-.804zm-4.463-.859c0-1.02.624-1.445 1.193-1.445.55 0 1.138.424 1.138 1.445h-2.33zM22.756 3.787c-.885 0-1.454.415-1.77.704l-.118-.56H18.88v10.535l2.259-.48.009-2.556c.325.235.804.57 1.6.57 1.616 0 3.089-1.302 3.089-4.166-.01-2.62-1.5-4.047-3.08-4.047zm-.542 6.225c-.533 0-.85-.19-1.066-.425l-.009-3.352c.235-.262.56-.443 1.075-.443.822 0 1.391.922 1.391 2.105 0 1.211-.56 2.115-1.39 2.115zM18.04 2.766V.932l-2.268.479v1.843zM15.772 3.94h2.268v7.905h-2.268zM13.342 4.609l-.144-.669h-1.952v7.906h2.259V6.488c.533-.696 1.436-.57 1.716-.47V3.94c-.289-.108-1.346-.307-1.879.669zM8.825 1.98l-2.205.47-.009 7.236c0 1.337 1.003 2.322 2.34 2.322.741 0 1.283-.135 1.581-.298V9.876c-.289.117-1.716.533-1.716-.804V5.865h1.716V3.94H8.816l.009-1.96zM2.718 6.235c0-.352.289-.488.767-.488.687 0 1.554.208 2.241.578V4.202a5.958 5.958 0 0 0-2.24-.415c-1.835 0-3.054.957-3.054 2.557 0 2.493 3.433 2.096 3.433 3.17 0 .416-.361.552-.867.552-.75 0-1.708-.307-2.467-.723v2.15c.84.362 1.69.515 2.467.515 1.879 0 3.17-.93 3.17-2.548-.008-2.692-3.45-2.213-3.45-3.225z"></path>
                            </g>
                        </svg>
                    </span>
                </div>

                <div className="text-white">
                    <p className="mb-0">Subscribe to {priceData?.tierName}</p>
                    <div className="d-flex align-content-center">
                        <h1 className="fw-normal">${priceData?.basePrice?.value}</h1>
                        <span className="ms-2 text-sm">
                            per <br></br>
                            {priceData?.period.toLowerCase()}
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

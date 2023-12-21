/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";

import { useAuthV3 } from "@/contexts-v2/auth.context";
import { asyncChangeSubscription } from "@/services/product/product.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { ToastMessage, newInfoAlert } from "@/utils/toastMessage.utils";
import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import style from "./pricing.module.scss";

const PricingBlock = ({ priceData = [], setIsLoading }) => {
    const [isUpgrade, setIsUpgrade] = useState(false);
    // const mfw_customersList = useAppSelector(getMfwTestCustomersSelector);

    const router = useRouter();
    const { isLogin, user } = useAuthV3();

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query?.isUpgrade || user?.subscriptionDetails?.active) {
            setIsUpgrade(true);
        }
    }, [router]);

    const upgradeSubscription = async (selectedPricing) => {
        setIsLoading(true);
        const payload = {
            customerId: user?.subscriptionDetails?.customer,
            email: user?.userDetails?.email,
            newProductId: selectedPricing?.productId,
        };

        try {
            const response = await asyncChangeSubscription(payload);

            if (response.isSuccess && CommonUtility.isNotEmptyObject(response.data)) {
                dispatch(
                    authActions.setUserData({
                        ...user,
                        subscriptionDetails: {
                            ...response.data,
                        },
                    })
                );
                router.push("/account");
            } else {
                ToastMessage.error("Something went wrong");
                router.back();
            }
        } catch (error) {
            console.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetStartedClick = async (e, selectedPricing) => {
        e.preventDefault();
        if (!isLogin) {
            newInfoAlert(
                "Signup Required for Subscription",
                "To access the demo, you need to either log in or sign up for an account. Please proceed with login or sign-up.",
                "Continue",
                "warning"
            ).then(() => {
                router.push("/account-security/signup");
            });
            return;
        }
        const currentUserEmail = user?.userDetails?.email;
        if (currentUserEmail !== "") {
            // if (mfw_customersList && !mfw_customersList.includes(currentUserEmail)) {
            //             newInfoAlertWithHtmlBody(
            //                 "Thank you for your interest in our services!",
            //                 `<div style="text-align:left"> <p><strong>We're thrilled to announce that our services are now available for a select group of early birds! 🚀</strong></p>
            // <p>However, due to overwhelming demand, we've had to limit access initially. Not to worry, though!</p>
            // <p><em>Starting from <strong>January 7th</strong>, our services will be open to everyone! 🗓️</em> Mark your calendars and get ready to unlock the full potential of our offerings.</p>
            // <p>Thank you for your interest, and we can't wait to welcome you to our community in the new year!</p></div>`,
            //                 "Okay",
            //                 "warning"
            //             ).then(() => {
            //                 router.push("/features-list");
            //             });
            // newInfoAlert(
            //     "Thank you for your interest in our services!",
            //     "Currently we have restricted access to our services to limited early birds. Services will be open to all from 7th  of January! Come back then for subscriptions and enjoy our offerings.",
            //     "Okay",
            //     "warning"
            // ).then(() => {
            //     router.push("/features-list");
            // });
            // return;
            // }
        }

        if (isUpgrade) {
            await upgradeSubscription(selectedPricing);
            return;
        }

        if (
            user &&
            user.userDetails.email &&
            CommonUtility.isNotEmpty(user.userDetails.email) &&
            !user.subscriptionDetails.active &&
            (!user.subscriptionDetails.priceSurveyAnswered || !user.priceSurveyAnswered)
        ) {
            router.push(`/pricing-survey?id=${selectedPricing?.productId}`);
        }
    };

    return (
        <section className={style.mdf__pricing_block}>
            <Container className="">
                <div className="mfw__pricing-card-wrapper">
                    {priceData &&
                        priceData.map((item, index) => (
                            <PricingCard key={index} item={item} index={index} handleGetStartedClick={handleGetStartedClick} subscriptionDetails={user?.subscriptionDetails} isUpgrade={isUpgrade} />
                        ))}
                    <div className={`mfw__pricing-col ${style.mdf__pricingcard} ${style.card__price__primary}`}>
                        <div className={`mfw__pricing-main-heading ${style.b_bottom}`}>
                            <span className={`name ${style.title}`}>ENTERPRISE</span>
                            <span className="price">Custom pricing</span>
                        </div>
                        <div className="mfw__pricing-card-body">
                            <ul className="fist-list">
                                <li>
                                    <span className="pb-left"></span>
                                    <span className="pb-title">Contact us</span>
                                    <span className="pb-sub">Custom number of operations</span>
                                </li>
                            </ul>
                            <ul className="features support-list">
                                <li>
                                    <span className="pb-left"></span>
                                    <span className="pb-title">Content Moderation</span>
                                </li>
                                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">Image, Video Anonymization</li>
                                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">Dedicated infrastructure for Unparalleled performance</li>
                                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">Dedicated Customer Support Engineer</li>
                                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">Enterprise-class SLA</li>
                                <li className="w-100 ms-auto gap-2 d-flex justify-content-center align-items-center text-center">Exclusive enterprise premium options</li>
                            </ul>

                            <Button
                                variant="success"
                                className="mx-3 mb-3 text-uppercase d-flex align-items-center justify-content-center"
                                size="lg"
                                onClick={() => router.push("/book-demo?type=ENTERPRISE")}
                                // onClick={() => router.push("/contact-us")}
                                style={{
                                    position: "absolute",
                                    bottom: "20px",
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                Book a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PricingBlock;

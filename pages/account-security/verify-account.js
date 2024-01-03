import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import Loader from "@/components/Loader";
import CommonUtility from "@/utils/common.utils";
import { ToastMessage } from "@/utils/toastMessage.utils";
import axios from "axios";
import { useRouter } from "next/router";

// Function to verify account by email and token
const asyncVerifyAccountByEmailAndToken = async (params) => {
    try {
        const expToken = params.expToken;
        const email = params.email;

        if (!expToken || !email) {
            ToastMessage.error("Email or token are not valid.");
            return { error: "Email or token are not valid." };
        }

        const queryString = CommonUtility.objectToParams(params);
        const response = await axios.post(`https://mediafirewall-ai.millionvisions.ai/verify/email?${queryString}`, {});

        if (response?.data) {
            return { success: true };
        } else {
            return { error: "Your account is not verified, Please contact the administrator." };
        }
    } catch (error) {
        ToastMessage.error(error.message);
        return { error: error.message };
    }
};

const VerifyAccountScreen = ({ verificationData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [screenTitle, setScreenTitle] = useState("Your account verification!!!");
    const [screenDescription, setScreenDescription] = useState("Your account verification is under process, Please wait for a while.");
    const router = useRouter();

    const getEmailFromStorage = () => {
        // Attempt to get email from localStorage
        const storedEmail = localStorage.getItem("verificationFailedEmail");
        return storedEmail || "";
    };
    const saveEmailToStorage = (email) => {
        // Save email to localStorage
        localStorage.setItem("verificationFailedEmail", email);
    };

    const renderButtons = () => {
        if (verificationData?.success) {
            return (
                <Button variant="primary" className=" mt-3 py-3" onClick={() => router.push("/account-security/login")}>
                    Login
                </Button>
            );
        } else {
            return (
                <div className="d-flex gap-4">
                    <Button variant="primary" className=" mt-3 py-3" onClick={() => asyncHandleRetryVerification()}>
                        Retry Verification Code
                    </Button>
                    <Button variant="primary" className=" mt-3 py-3" onClick={() => router.push("/contact-us")}>
                        Contact Us
                    </Button>
                </div>
            );
        }
    };

    const asyncHandleRetryVerification = async () => {
        try {
            const email = getEmailFromStorage() || router?.query?.email;

            if (!email) {
                ToastMessage.error("Email is not found.");
                return;
            }

            // Save email to localStorage in case verification fails
            saveEmailToStorage(email);

            setIsLoading(true);
            const response = await axios.post(`https://mediafirewall-ai.millionvisions.ai/verify/resend/email?email=${email}`, {});

            if (response?.data) {
                setScreenTitle("Verification link has been shared to the email address!!");
                setScreenDescription("");
                setTimeout(() => {
                    router.replace("/account-security/login");
                }, 3000);
            } else {
                setScreenTitle("Provided Email is not valid.");
                setScreenDescription("Your account is not verified, Please contact the administrator.");
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            ToastMessage.error(error.message);
        }
    };

    useEffect(() => {
        if (!verificationData) {
            // Display message before verification
            setScreenTitle("Your account verification is pending...");
            setScreenDescription("Your account verification is under process. Please wait for a while.");
        } else if (verificationData?.error) {
            // Display message after failed verification
            setScreenTitle("Your account verification failed!");
            setScreenDescription(verificationData.error);
        } else if (verificationData?.success) {
            // Display message after successful verification
            setScreenTitle("Your account has been successfully verified!");
            setScreenDescription("You can now log in and proceed to complete your registration.");
        }
    }, [verificationData]);

    return (
        <Fragment>
            <section className="payment__success__block">
                <Container className="h-100">
                    <Row className="h-100 justify-content-start align-items-center">
                        <Col md={10} className="text-start">
                            <h2 className="text-white">{screenTitle}</h2>
                            <h3 className="text-white">{screenDescription}</h3>
                            {renderButtons()}
                        </Col>
                    </Row>
                </Container>
            </section>
            <Loader isLoading={isLoading} />
        </Fragment>
    );
};

// Fetch data server-side for initial rendering
export async function getServerSideProps({ query }) {
    try {
        const verificationData = await asyncVerifyAccountByEmailAndToken(query);

        return {
            props: { verificationData },
        };
    } catch (error) {
        return {
            props: { verificationData: { error: error.message } },
        };
    }
}

export default VerifyAccountScreen;

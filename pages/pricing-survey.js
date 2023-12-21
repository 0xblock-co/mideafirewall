import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { asyncPostSignedUpSurveySubmitAnswersV2 } from "@/services/auth/auth.service";
import { asyncCreateStripeCustomer, asyncGetCheckoutSessionUrl, asyncGetPricingQuestions } from "@/services/product/product.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import CommonUtility from "@/utils/common.utils";
import { getFilteredData } from "@/utils/globalFunctions";
import { newInfoAlert } from "@/utils/toastMessage.utils";

const processQuestion = (data, questionObj) => {
    let ans = data[questionObj.name];
    if (questionObj.type === "radio") {
        const radioSelectedValue = questionObj.options.find((item) => item.value === ans)?.label;
        ans = radioSelectedValue;
    }
    return {
        id: questionObj.id,
        title: questionObj.label,
        question: questionObj.title,
        answers: Array.isArray(ans) ? ans : [ans],
    };
};

const PricingSurvey = () => {
    const [formData, setFormData] = useState([]);
    const [defaultValue, setDefaultValue] = useState({});
    const [formAnswerData, setFormAnswerData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAuthV3();
    // const mfw_customersList = useAppSelector(getMfwTestCustomersSelector);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const response = await asyncGetPricingQuestions();
        if (response && response.isSuccess && response.data) {
            const data = getFilteredData(response.data.questions);
            if (data) {
                const defaultValue = {};
                data.forEach((element) => {
                    if (element.type == "checkbox") {
                        defaultValue[element.name] = [];
                    } else {
                        defaultValue[element.name] = element.defaultValues;
                    }
                });
                setDefaultValue(defaultValue);
                setFormData(data);
            }
        }
        setIsLoading(false);
    };

    const submitAnswers = async (answers, user, router) => {
        return dispatch(asyncPostSignedUpSurveySubmitAnswersV2({ answers: answers, userEmail: user?.userDetails?.email, surveyType: "Payment" }))
            .unwrap()
            .then(async (response) => {
                if (response && response.isSuccess) {
                    dispatch(
                        authActions.setUserData({
                            ...user,
                            priceSurveyAnswered: true,
                        })
                    );
                    // if (mfw_customersList && !mfw_customersList.includes(user?.userDetails?.email)) {
                    //     newInfoAlert(
                    //         "Thank you for your interest in our services!",
                    //         "Currently we have restricted access to our services to limited early birds .Services will be open to all from 7th  of January  ! Come back then for subscriptions and enjoy our offerings.",
                    //         "Okay",
                    //         "warning"
                    //     ).then(() => {
                    //         router.push("/features-list");
                    //     });
                    //     return null;
                    // }

                    if (CommonUtility.isNotEmpty(user.userDetails.fullName) && CommonUtility.isNotEmpty(user.userDetails.email)) {
                        try {
                            const res = await asyncCreateStripeCustomer({
                                name: user.userDetails.fullName,
                                email: user.userDetails.email,
                            });
                            if (res && res.isSuccess && CommonUtility.isNotEmpty(res.data)) {
                                const checkoutResponse = await asyncGetCheckoutSessionUrl(res.data, router.query.id);
                                if (checkoutResponse.isSuccess && CommonUtility.isNotEmpty(checkoutResponse.data)) {
                                    return checkoutResponse.data;
                                }
                            }
                        } catch (error) {
                            return { error: "Error processing payment" };
                        }
                    }
                    return { error: "Error creating Stripe customer" };
                } else {
                    return { error: response?.message || "Something went wrong" };
                }
            })
            .catch((e) => {
                setIsLoading(false);
            });
    };

    const onSubmitForm = async (data, id) => {
        const questionObj = formData.find((value) => value.id === id);
        const cloneFormAnswerData = cloneDeep(formAnswerData);
        const lastElement = formData[formData?.length - 1];

        const answerObj = processQuestion(data, questionObj);
        cloneFormAnswerData.push(answerObj);
        setFormAnswerData(cloneFormAnswerData);

        const newFormData = formData?.map((value) => ({
            ...value,
            isRender: value.id === id ? false : value.id === id + 1 ? true : value.isRender,
        }));

        if (id === lastElement.id) {
            setIsLoading(true);
            const paymentUrl = await submitAnswers(cloneFormAnswerData, user, router);
            if (paymentUrl) {
                setIsLoading(false);
                newInfoAlert("Thank you for submitting questions.", "By clicking on the subscribe button you will be redirected to the payment screen.", "Subscribe", "success").then(() => {
                    setIsLoading(false);
                    window.open(paymentUrl, "_self");
                });
            } else {
                setIsLoading(false);
                ToastMessage.error("Error processing payment");
                router.reload();
            }
        }

        setFormData(newFormData);
    };

    return (
        <BoxContainerWithFilterIconWrapper>
            <SurveyForm elements={formData} defaultValue={defaultValue} onSubmit={onSubmitForm} />
            <Loader isLoading={isLoading} />
        </BoxContainerWithFilterIconWrapper>
    );
};
export default PricingSurvey;

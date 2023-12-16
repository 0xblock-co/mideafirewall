import { cloneDeep } from "lodash";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import { asyncPostSignedUpSurveySubmitAnswersV2 } from "@/services/auth/auth.service";
import { asyncGetPricingQuoteQuestions } from "@/services/product/product.service";
import { useAppDispatch } from "@/store/hooks";
import { getFilteredData } from "@/utils/globalFunctions";
import { ToastMessage, newInfoAlert } from "@/utils/toastMessage.utils";

export default function Survey() {
    const [formData, setFormData] = useState([]);
    const [defaultValue, setDefaultValue] = useState({});
    const [formAnswerData, setFormAnswerData] = useState([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useAppDispatch();
    const { user, isLogin } = useAuthV3();
    useEffect(() => {
        if (isLogin && user?.priceQuoteAnswered) {
            router.push("/book-demo?type=DEMO");
            return;
        }
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const response = await asyncGetPricingQuoteQuestions();
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

    const onSubmitForm = async (data, id) => {
        const questionObj = formData.find((value) => value.id === id);
        const cloneFormAnswerData = cloneDeep(formAnswerData);
        const lastElement = formData[formData?.length - 1];

        let ans = data[questionObj.name];
        if (questionObj.type == "radio") {
            const radioSelectedValue = questionObj.options.find((item) => item.value == ans)?.label;
            ans = radioSelectedValue;
        }

        const answerObj = {
            id: questionObj.id,
            title: questionObj.label,
            question: questionObj.title,
            answers: Array.isArray(ans) ? ans : [ans],
        };

        cloneFormAnswerData.push(answerObj);
        setFormAnswerData(cloneFormAnswerData);

        const newFormData = formData?.map((value) => ({
            ...value,
            isRender: value.id === id ? false : value.id === id + 1 ? true : value.isRender,
        }));

        if (id === lastElement.id) {
            setFormData(newFormData);
            dispatch(asyncPostSignedUpSurveySubmitAnswersV2({ answers: cloneFormAnswerData, userEmail: user?.userDetails?.email, surveyType: "PriceQuote" }))
                .unwrap()
                .then((response) => {
                    setIsLoading(false);
                    if (response) {
                        if (response.isSuccess) {
                            // ToastMessage.success(
                            //   "The price quote will be sent to your email address. "
                            // );
                            newInfoAlert(
                                "Thank you for your interest!",
                                "We'll email you a detailed price quote. If you'd like a demo, please feel free to schedule one. We appreciate your consideration!",
                                "Schedule a Demo",
                                "success",
                                true,
                                "No"
                            )
                                .then(() => {
                                    router.push("/book-demo?type=DEMO");
                                })
                                .catch(() => {
                                    router.push("/contact-us");
                                });
                            return;
                        } else {
                            ToastMessage.error(response?.message || "Something went wrong");
                            Router.reload();
                        }
                    }
                })
                .catch((e) => {
                    setIsLoading(false);
                });
        }
        setFormData(newFormData);
    };

    return (
        <BoxContainerWithFilterIconWrapper>
            <SurveyForm elements={formData} defaultValue={defaultValue} onSubmit={onSubmitForm} />
            {isLoading && <Loader isLoading={isLoading} />}
        </BoxContainerWithFilterIconWrapper>
    );
}

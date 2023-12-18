import { cloneDeep } from "lodash";
import Router from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import Loader from "@/components/Loader";
import { useAuthV3 } from "@/contexts-v2/auth.context";
import ProtectRoute from "@/contexts-v2/protectedRoute";
import { asyncGetSignedUpSurveyQuestionsV2, asyncPostSignedUpSurveySubmitAnswersV2 } from "@/services/auth/auth.service";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";
import { getFilteredData } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";

const NewUserSurvey = () => {
    const [formData, setFormData] = useState([]);
    const [defaultValue, setDefaultValue] = useState({});
    const [formAnswerData, setFormAnswerData] = useState([]);
    const dispatch = useAppDispatch();
    const { user } = useAuthV3();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        dispatch(asyncGetSignedUpSurveyQuestionsV2())
            .unwrap()
            .then((response) => {
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
            });
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
            setIsLoading(true);
            dispatch(asyncPostSignedUpSurveySubmitAnswersV2({ answers: cloneFormAnswerData, userEmail: user?.userDetails?.email, surveyType: "User" }))
                .unwrap()
                .then((response) => {
                    setIsLoading(false);
                    if (response) {
                        if (response.isSuccess) {
                            ToastMessage.success("Thank you for submitting answer.");
                            dispatch(authActions.setUserData({ ...user, surveyAnswered: true }));
                            Router.push("/features-list");
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
            setFormData(newFormData);
        }
        setFormData(newFormData);
    };

    return (
        <BoxContainerWithFilterIconWrapper>
            <SurveyForm elements={formData} defaultValue={defaultValue} onSubmit={onSubmitForm} />
            {isLoading && <Loader isLoading={isLoading} />}
        </BoxContainerWithFilterIconWrapper>
    );
};
export default ProtectRoute(NewUserSurvey);

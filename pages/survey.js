import { cloneDeep } from "lodash";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { useAuth } from "@/contexts/AuthContext";
import {
  asyncGetSignedUpSurveyQuestions,
  asyncPostSignedUpSurveySubmitAnswers,
} from "@/services/auth/auth.service";
import { getFilteredData } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
import { authActions } from "@/store/auth.slice";
import { useAppDispatch } from "@/store/hooks";

export default function Survey() {
  const [formData, setFormData] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [formAnswerData, setFormAnswerData] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin, user, checkAuthRouteV2 } = useAuth();

  useEffect(() => {
    // const { isActive, route } = checkAuthRouteV2();
    // if (!isLogin && !isActive) {
    //   router.push(route);
    //   return;
    // }
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const response = await asyncGetSignedUpSurveyQuestions();
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
  };

  const onSubmitForm = async (data, id) => {
    const questionObj = formData.find((value) => value.id === id);
    const cloneFormAnswerData = cloneDeep(formAnswerData);
    const lastElement = formData[formData?.length - 1];

    let ans = data[questionObj.name];
    if (questionObj.type == "radio") {
      const radioSelectedValue = questionObj.options.find(
        (item) => item.value == ans
      )?.label;
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
      isRender:
        value.id === id ? false : value.id === id + 1 ? true : value.isRender,
    }));

    if (id === lastElement.id) {
      const response = await asyncPostSignedUpSurveySubmitAnswers(
        cloneFormAnswerData,
        user
      );
      if (response) {
        if (response.isSuccess) {
          ToastMessage.success("Thank you for submitting answer.");
          dispatch(authActions.setUserData({ ...user, surveyAnswered: true }));
          Router.push("/network-blog");
          return;
        } else {
          ToastMessage.error(response?.message || "Something went wrong");
          Router.reload();
        }
      }
    }
    setFormData(newFormData);
  };

  return (
    <BoxContainerWithFilterIconWrapper>
      <SurveyForm
        elements={formData}
        defaultValue={defaultValue}
        onSubmit={onSubmitForm}
      />
    </BoxContainerWithFilterIconWrapper>
  );
}

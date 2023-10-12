import { cloneDeep } from "lodash";
import Router from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { useAuth } from "@/contexts/AuthContext";
import { asyncSurveySubmitAnswers } from "@/services/auth/auth.service";
import { asyncGetQuestions } from "@/services/product/product.service";
import { showToast } from "@/components/ToastContainer/toaster";
import { checkAuthRoute, getFilteredData } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
export default function Survey() {
  const [formData, setFormData] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [formAnswerData, setFormAnswerData] = useState([]);

  const { user } = useAuth();
  console.log("user: ", user);

  useEffect(() => {
    // const { isActive, route } = checkAuthRoute();
    // if (!isActive) {
    //   Router.push(route);
    //   return;
    // }
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const response = await asyncGetQuestions();
    if (response && response.isSuccess && response.data) {
      const data = getFilteredData(response.data.questions);
      // console.log("data :>> ", data);
      // console.log("formElements 1 :>> ", formElements);
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
    // console.log("id: ", id);
    // console.log("data: ", data);

    const questionObj = formData.find((value) => value.id === id);
    const cloneFormAnswerData = cloneDeep(formAnswerData);
    const lastElement = formData[formData?.length - 1];

    let ans = data[questionObj.name];
    if (questionObj.type == "radio") {
      const radioSelectedValue = questionObj.options.find(
        (item) => item.value == ans
      )?.label;
      ans = radioSelectedValue;
      // console.log("radioObj: ", radioSelectedValue);
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
      // console.log("cloneFormAnswerData: Finall ", cloneFormAnswerData);
      const response = await asyncSurveySubmitAnswers(
        cloneFormAnswerData,
        user
      );
      if (response) {
        if (response.isSuccess) {
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

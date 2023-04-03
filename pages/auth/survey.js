import { cloneDeep } from "lodash";
import Router from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth/Layout/surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { asyncSurveySubmitAnswers } from "@/services/auth/auth.service";
import { asyncGetQuestions } from "@/services/product/product.service";
import { checkIsAuth, getFilteredData } from "@/utils/globalFunctions";
export default function Survey() {
  const [formData, setFormData] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [formAnswerData, setFormAnswerData] = useState([]);

  useEffect(() => {
    if (!checkIsAuth()) {
      Router.push("/");
      return;
    }
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const response = await asyncGetQuestions();
    if (response && response.isSuccess && response.data) {
      const data = getFilteredData(response.data.items[0].questions);
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
  const onSubmitForm = (data, id) => {
    console.log("id: ", id);
    console.log("data: ", data);

    const questionObj = formData.find((value) => value.id === id);
    const cloneFormAnswerData = cloneDeep(formAnswerData);
    const lastElement = formData[formData?.length - 1];

    let ans = data[questionObj.name];
    if (questionObj.type == "radio") {
      const radioSelectedValue = questionObj.options.find(
        (item) => item.value == ans
      )?.label;
      ans = radioSelectedValue;
      console.log("radioObj: ", radioSelectedValue);
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
      console.log("cloneFormAnswerData: Finall ", cloneFormAnswerData);
      asyncSurveySubmitAnswers(cloneFormAnswerData);
      Router.push("/upload");
      return;
    }
    setFormData(newFormData);
  };

  // const onSubmitForm = (data, id) => {
  //   console.log("id: ", id);
  //   console.log("data: ", data);
  //   const cloneFormAnswerData = cloneDeep(formAnswerData);
  //   const lastElement = formData[formData?.length - 1];
  //   console.log("formData: ", formData);
  //   const newFormData = formData?.map((value) =>
  //     value.id === id
  //       ? { ...value, isRender: false }
  //       : value.id === id + 1
  //       ? { ...value, isRender: true }
  //       : { ...value }
  //   );

  //   if (newFormData && newFormData.length > 0) {
  //     const questionObj = newFormData.find((item) => {
  //       return item.id == id;
  //     });

  //     let ans = data[questionObj.name];
  //     if (questionObj.type == "radio") {
  //       const radioSelectedValue = questionObj.options.find((item) => {
  //         return item.value == ans;
  //       }).label;
  //       ans = radioSelectedValue;
  //       console.log("radioObj: ", radioSelectedValue);
  //     }
  //     const answerObj = {
  //       id: questionObj.id,
  //       title: questionObj.label,
  //       question: questionObj.title,
  //       answers: Array.isArray(ans) ? ans : [ans],
  //     };
  //     cloneFormAnswerData.push(answerObj);
  //     setFormAnswerData(cloneFormAnswerData);
  //   }
  //   if (id === lastElement.id) {
  //     console.log("cloneFormAnswerData: Finall ", cloneFormAnswerData);
  //   }
  //   setFormData(newFormData);
  // };

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

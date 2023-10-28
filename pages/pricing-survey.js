import { cloneDeep } from "lodash";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { useAuth } from "@/contexts/AuthContext";
import { asyncGetPricingQuestions } from "@/services/product/product.service";
import { getComponentType, getFilteredData } from "@/utils/globalFunctions";
import { ToastMessage } from "@/utils/toastMessage.utils";
import CommonUtility from "@/utils/common.utils";

export default function Survey() {
  const [formData, setFormData] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [formAnswerData, setFormAnswerData] = useState([]);
  const router = useRouter();
  const { user, checkAuthRouteV2 } = useAuth();

  useEffect(() => {
    const { isActive, route } = checkAuthRouteV2();
    if (!isActive) {
      Router.push(route);
      return;
    }
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
  };
  const onSubmitForm = async (data, id) => {
    const questionObj = formData.find((value) => value.id === id);
    const cloneFormAnswerData = cloneDeep(formAnswerData);
    const lastElement = formData[formData?.length - 1];

    let ans = data[questionObj.name];
    if (questionObj.type == "radio") {
      const radioSelectedValue = questionObj.options.find(
        (item) => item.value == ans
      );
      ans = [radioSelectedValue?.startValue, radioSelectedValue?.endValue];
    }

    const answerObj = {
      id: questionObj.id,
      title: questionObj.label,
      question: questionObj.title,
      answers: Array.isArray(ans) ? ans : [ans],
      type: getComponentType(questionObj.type),
    };

    cloneFormAnswerData.push(answerObj);
    setFormAnswerData(cloneFormAnswerData);

    const newFormData = formData?.map((value) => ({
      ...value,
      isRender:
        value.id === id ? false : value.id === id + 1 ? true : value.isRender,
    }));

    if (id === lastElement.id) {
      ToastMessage.success("Thank you for submitting answer.");
      router.push(`/payment?${CommonUtility.objectToParams(router?.query)}`);
      return;
      // const response = await asyncSurveySubmitAnswers(
      //   cloneFormAnswerData,
      //   user
      // );
      // if (response) {
      //   if (response.isSuccess) {
      //     ToastMessage.success("Thank you for submitting answer.");
      //     router.push(
      //       `/payment?${CommonUtility.objectToParams(router?.query)}`
      //     );
      //     return;
      //   } else {
      //     ToastMessage.error(response?.message || "Something went wrong");
      //     router.reload();
      //   }
      // }
      // Router.push("/network-blog");
      // return;
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

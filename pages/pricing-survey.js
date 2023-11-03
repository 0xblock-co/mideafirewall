import { cloneDeep } from "lodash";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth//surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { useAuth } from "@/contexts/AuthContext";
import { asyncPostSignedUpSurveySubmitAnswers } from "@/services/auth/auth.service";
import {
  asyncCreateStripeCustomer,
  asyncGetCheckoutSessionUrl,
  asyncGetPricingQuestions,
} from "@/services/product/product.service";
import CommonUtility from "@/utils/common.utils";
import { getFilteredData } from "@/utils/globalFunctions";
import { ToastMessage, newInfoAlert } from "@/utils/toastMessage.utils";

const processQuestion = (data, questionObj) => {
  let ans = data[questionObj.name];
  if (questionObj.type === "radio") {
    const radioSelectedValue = questionObj.options.find(
      (item) => item.value === ans
    )?.label;
    ans = radioSelectedValue;
  }
  return {
    id: questionObj.id,
    title: questionObj.label,
    question: questionObj.title,
    answers: Array.isArray(ans) ? ans : [ans],
  };
};

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

  const submitAnswers = async (answers, user, router) => {
    const response = await asyncPostSignedUpSurveySubmitAnswers(answers, user);

    if (response && response.isSuccess) {
      if (
        CommonUtility.isNotEmpty(user.userDetails.fullName) &&
        CommonUtility.isNotEmpty(user.userDetails.email)
      ) {
        try {
          const res = await asyncCreateStripeCustomer({
            name: user.userDetails.fullName,
            email: user.userDetails.email,
          });

          if (res && res.isSuccess && CommonUtility.isNotEmpty(res.data)) {
            const checkoutResponse = await asyncGetCheckoutSessionUrl(
              res.data,
              router.query.id
            );

            if (
              checkoutResponse.isSuccess &&
              CommonUtility.isNotEmpty(checkoutResponse.data)
            ) {
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
  };

  const onSubmitForm = async (
    data,
    id
  ) => {
    const questionObj = formData.find((value) => value.id === id);
    const cloneFormAnswerData = cloneDeep(formAnswerData);
    const lastElement = formData[formData?.length - 1];

    const answerObj = processQuestion(data, questionObj);
    cloneFormAnswerData.push(answerObj);
    setFormAnswerData(cloneFormAnswerData);

    const newFormData = formData?.map((value) => ({
      ...value,
      isRender:
        value.id === id ? false : value.id === id + 1 ? true : value.isRender,
    }));

    if (id === lastElement.id) {
      const paymentUrl = await submitAnswers(cloneFormAnswerData, user, router);

      if (paymentUrl) {
        newInfoAlert(
          "Thank you for submitting questions.",
          "By clicking on the subscribe button you will be redirected to the payment screen.",
          "Subscribe",
          "success"
        ).then(() => {
          window.open(paymentUrl, "_self");
        });
      } else {
        ToastMessage.error("Error processing payment");
        Router.reload();
      }
    }

    setFormData(newFormData);
  };

  const onSubmitForm1 = async (data, id) => {
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
          if (
            CommonUtility.isNotEmpty(user.userDetails.fullName) &&
            CommonUtility.isNotEmpty(user.userDetails.fullName)
          ) {
            const res = await asyncCreateStripeCustomer({
              name: user.userDetails.fullName,
              email: user.userDetails.email,
            });
            if (res && res.isSuccess && CommonUtility.isNotEmpty(res.data)) {
              const response = await asyncGetCheckoutSessionUrl(
                res.data,
                router.query.id
              );

              if (
                response.isSuccess &&
                CommonUtility.isNotEmpty(response.data)
              ) {
                newInfoAlert(
                  "Thank you for submitting questions.",
                  "By clicking on the subscribe button you will be redirect to payment screen.",
                  "Subscribe",
                  "success"
                ).then(() => {
                  window.open(response.data, "_self");
                });
              }
            }
          }
          return;
        } else {
          ToastMessage.error("Something went wrong");
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

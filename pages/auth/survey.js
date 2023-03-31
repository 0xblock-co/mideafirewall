import Router from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth/Layout/surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { asyncGetQuestions } from "@/services/product/product.service";
import { checkIsAuth, getFilteredData } from "@/utils/globalFunctions";

export default function Survey() {
  const [formData, setFormData] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});

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
    console.log("data :>> ", data);
    const lastElement = formData[formData?.length - 1];
    if (id === lastElement.id) {
      Router.push("/");
      return;
    }
    const newFormData = formData?.map((value) =>
      value.id === id
        ? { ...value, isRender: false }
        : value.id === id + 1
        ? { ...value, isRender: true }
        : { ...value }
    );
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

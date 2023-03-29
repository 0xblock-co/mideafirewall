import Router from "next/router";
import { useEffect, useState } from "react";

import SurveyForm from "@/components/Auth/Layout/surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { asyncGetQuestions } from "@/services/product/product.service";
import { formElements } from "@/utils/constants";
import { getFilteredData } from "@/utils/globalFunctions";

export default function Survey() {
  const [formData, setFormData] = useState(formElements);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const response = await asyncGetQuestions();
    if (response && response.isSuccess && response.data) {
      const data = getFilteredData(response.data.items[0].questions);
      // if (data) {
      //   setFormData(data);
      // }
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
      <SurveyForm elements={formData} onSubmit={onSubmitForm} />
    </BoxContainerWithFilterIconWrapper>
  );
}

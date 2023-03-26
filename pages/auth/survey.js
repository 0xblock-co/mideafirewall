import Router from "next/router";
import { useState } from "react";

import SurveyForm from "@/components/Auth/Layout/surveyForm";
import BoxContainerWithFilterIconWrapper from "@/components/BoxContainerWithFilterIcon";
import { formElements } from "@/utils/constants";

export default function Survey() {
  const [formData, setFormData] = useState(formElements);

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

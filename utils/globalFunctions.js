/* eslint-disable no-case-declarations */
import * as yup from "yup";

import { localStorageKeys } from "./constants";
import { readCookie } from "./cookieCreator";

export const getFilteredData = (dataObj) => {
  const formElements = [];
  let counter = 0;
  for (const category in dataObj) {
    for (const question of dataObj[category]) {
      const component = JSON.parse(question.component.customAttributes);

      switch (component.type) {
        case "text-box":
          formElements.push({
            id: counter++,
            name: component.label.toLowerCase(),
            label: component.label,
            title: question.question,
            placeholder: component.placeholder,
            type: "text",
            isRender: false,
            validation: yup.string().required(`${component.label} is required`),
          });
          break;

        case "email":
          formElements.push({
            id: counter++,
            name: component.label.toLowerCase(),
            label: component.label,
            title: question.question,
            placeholder: component.placeholder,
            type: "text",
            isRender: false,
            defaultValues: "",
            validation: yup
              .string()
              .email("Invalid email address")
              .required(`${component.label} is required`),
          });
          break;

        case "radio":
          const options = question.options.map((option) => ({
            image: option.urlToIcon,
            value: option.id,
            label: option.label,
          }));
          formElements.push({
            id: counter++,
            name: component.label.toLowerCase(),
            label: component.label,
            title: question.question,
            type: "radio",
            isRender: false,
            options,
            defaultValues: "",
            validation: yup
              .string()
              .oneOf(
                options.map((option) => option.value),
                `Please select a valid option`
              )
              .required(`Please select an option`),
          });
          break;

        case "checkbox":
          const checkboxOptions = question.options.map((option) => ({
            image: option.urlToIcon,
            value: option.id,
            label: option.label,
          }));
          formElements.push({
            id: counter++,
            name: component.label.toLowerCase(),
            label: component.label,
            title: question.question,
            type: "checkbox",
            isRender: false,
            options: checkboxOptions,
            defaultValues: [],
            validation: yup
              .array()
              .min(1, `Please select at least one option`)
              .required(`Please select at least one option`),
          });
          break;

        default:
          break;
      }
    }
  }

  formElements[0].isRender = true;
  return formElements;
};

export const checkIsAuth = () => {
  if (typeof window !== "undefined") {
    const user = readCookie(localStorageKeys.authKey);
    if (user) {
      return true;
    }
    return false;
  }
  return false;
};

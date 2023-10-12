/* eslint-disable no-case-declarations */
import * as yup from "yup";

import { localStorageKeys } from "@/constants/global.constants";
import { readCookie } from "./cookieCreator";
const jwt = require("jwt-simple");

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
          const options =
            question.options && question.options.length > 0
              ? question.options.map((option) => ({
                  image: option.urlToIcon,
                  value: option.id,
                  label: option.label,
                }))
              : question.ranges.map((option) => ({
                  endValue: option.endValue,
                  startValue: option.startValue,
                  label: option.label,
                  value: option.label,
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
        case "scroller":
          formElements.push({
            id: counter++,
            name: component.label.toLowerCase(),
            label: component.label,
            title: question.question,
            type: "scroller",
            isRender: false,
            options: [],
            defaultValues: component.defaultValue,
            validation: yup
              .number()
              .typeError("Please enter a number")
              .min(
                component.minValue,
                `Value must be greater than ${component.minValue}`
              )
              .max(
                component.maxValue,
                `Value must be less than ${component.maxValue}`
              ),
            minValue: component.minValue,
            maxValue: component.maxValue,
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

export const checkAuthRoute = () => {
  if (typeof window !== "undefined") {
    const user = readCookie(localStorageKeys.authKey);
    if (user) {
      return {
        isActive: true,
        route: "/network-blog",
      };
    }
  }
  return { isActive: false, route: "/" };
};

export const encodeData = (data, key) => {
  return jwt.encode(data, key);
};

export const decodeData = (token, key) => {
  if (token) {
    return jwt.decode(token, key);
  } else {
    return null;
  }
};

export const getComponentType = (type) => {
  switch (type) {
    case "text-box":
    case "email":
      return "TEXTBOX";
    case "checkbox":
      return "CHECK_BOX";
    case "radio":
      return "CHOICE_BOX";
    case "scroller":
      return "SCROLLER";
    default:
      return "";
  }
};

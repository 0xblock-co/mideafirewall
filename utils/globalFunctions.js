import * as yup from "yup";
export const getFilteredData = (dataObj) => {
  const formElements = Object.values(dataObj).flatMap((objArray) =>
    objArray.map((obj) => {
      const component = JSON.parse(obj.component.customAttributes);

      switch (obj.component.type) {
        case "CHOICE_BOX":
          return {
            id: parseInt(obj.id),
            name: `choice-${obj.id}`,
            label: obj.component.label,
            title: obj.question,
            placeholder: "",
            type: "radio",
            isRender: false,
            options: component.choices.map((choice) => ({
              value: choice,
              label: choice,
            })),
            validation: yup
              .string()
              .oneOf(
                component.choices,
                `Please select a valid ${obj.component.label}`
              )
              .required(`${obj.component.label} is required`),
          };
        case "TEXTBOX":
          return {
            id: parseInt(obj.id),
            name: `text-${obj.id}`,
            label: obj.component.label,
            title: obj.question,
            placeholder: component.placeholder,
            type: "text",
            isRender: false,
            defaultValues: "",
            validation: yup
              .string()
              .max(
                component.maxLength || 255,
                `Maximum length exceeded (${component.maxLength || 255})`
              )
              .required(`${obj.component.label} is required`),
          };
        case "CHECK_BOX":
          return {
            id: parseInt(obj.id),
            name: `check-${obj.id}`,
            label: obj.component.label,
            title: obj.question,
            placeholder: "",
            type: "checkbox",
            isRender: false,
            defaultValues: [],
            validation: yup
              .array()
              .min(1, "Please select at least one option")
              .required("Please select at least one option"),
          };
        case "BUTTON":
          return {
            id: obj.id,
            name: `button-${obj.id}`,
            label: obj.component.label,
            title: obj.question,
            placeholder: "",
            type: "button",
            isRender: true,
            defaultValues: "",
            validation: yup.mixed(),
          };

        default:
          return null;
      }
    })
  );

  formElements[0].isRender = true;
  return formElements;
};

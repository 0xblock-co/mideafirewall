import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import InputCheckBoxComponent from "@/components/UI/InputCheckBox";
import InputRadioBoxComponent from "@/components/UI/InputRadioBox";
import InputTypeTextComponent from "@/components/UI/InputTextBox";
import RangeBox from "@/components/UI/RangeBox";
import InputTypeTextAreaComponent from "../UI/InputTextAreaBox";

const SurveyForm = ({ elements, defaultValue, onSubmit }) => {
    const validationSchema = yup.object().shape(Object.fromEntries(elements.filter((element) => element.isRender).map((element) => [element.name, element.validation])));

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValue,
    });

    useEffect(() => {
        for (const key in defaultValue) {
            setValue(key, defaultValue[key]);
        }
    }, [defaultValue, setValue]);

    const onFormSubmit = (data) => {
        const currentElement = elements.find((element) => element.isRender);
        onSubmit(data, currentElement?.id);
    };

    return (
        <Form onSubmit={handleSubmit(onFormSubmit)} className="px-4">
            {elements.map((element, index) => {
                if (element.isRender) {
                    switch (element.type) {
                        case "text":
                        case "email":
                        case "password":
                            return (
                                <div key={index}>
                                    <InputTypeTextComponent title={element.title} placeholder={element.placeholder} register={register} name={element.name} errors={errors} />
                                </div>
                            );
                        case "text-area":
                            return (
                                <div key={index}>
                                    <InputTypeTextAreaComponent
                                        InputTypeTextAreaComponent
                                        title={element.title}
                                        placeholder={element.placeholder}
                                        register={register}
                                        name={element.name}
                                        rows={element.rows}
                                        errors={errors}
                                    />
                                </div>
                            );
                        case "radio":
                            return <InputRadioBoxComponent key={index} title={element.title} register={register} name={element.name} errors={errors} options={element.options} />;
                        case "checkbox":
                            return (
                                <div key={index}>
                                    <InputCheckBoxComponent title={element.title} register={register} name={element.name} errors={errors} options={element.options} />
                                </div>
                            );
                        case "scroller":
                            return (
                                <div key={index}>
                                    <RangeBox title={element.title} register={register} watch={watch} name={element.name} errors={errors} min={element.minValue} max={element.maxValue} />
                                </div>
                            );
                        default:
                            return null;
                    }
                }
            })}
            <div className="mb-4">
                <Button variant="primary" className="w-100 mt-3 py-3" type="submit">
                    Next
                </Button>
            </div>
        </Form>
    );
};

export default SurveyForm;

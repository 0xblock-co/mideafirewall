/* eslint-disable no-case-declarations */
import * as yup from "yup";

import { localStorageKeys } from "@/constants/global.constants";
import axios from "axios";
import jwt from "jwt-decode";
import CommonUtility from "./common.utils";
import { readCookie } from "./cookieCreator";
const jwt_simple = require("jwt-simple");
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

                case "text-area":
                    formElements.push({
                        id: counter++,
                        name: component.label.toLowerCase(),
                        label: component.label,
                        title: question.question,
                        placeholder: component.placeholder,
                        rows: component.rows,
                        type: "text-area",
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
                        validation: yup.string().email("Invalid email address").required(`${component.label} is required`),
                    });
                    break;

                case "radio":
                    const options =
                        question.options && question.options.length > 0
                            ? question.options.map((option) => ({
                                  image: option.urlToIcon,
                                  value: option.label,
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
                        value: option.label,
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
                        validation: yup.array().min(1, `Please select at least one option`).required(`Please select at least one option`),
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
                            .min(component.minValue, `Value must be greater than ${component.minValue}`)
                            .max(component.maxValue, `Value must be less than ${component.maxValue}`),
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

export const encodeData = (data, key) => {
    return jwt_simple.encode(data, key);
};

export const decodeData = (token, key) => {
    if (token) {
        return jwt_simple.decode(token, key);
    } else {
        return null;
    }
};

export const decodeJWTToken = (token) => {
    return jwt(token);
};
export function setCookieWithExpiration(name, value) {
    try {
        const decodedData = decodeJWTToken(value);

        if (!decodedData.exp) {
            throw new Error("Token does not have an expiration time.");
        }

        const expirationTime = new Date(decodedData.exp * 1000);
        document.cookie = `${name}=${value};expires=${expirationTime.toUTCString()};path=/`;
    } catch (error) {
        console.error("Error setting cookie with expiration:", error);
    }
}

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

export const asyncGetAccessToken = async () => {
    try {
        const refreshToken = readCookie(localStorageKeys.userRefreshToken);
        const email = readCookie(localStorageKeys.userEmail);

        if (!refreshToken || !email) {
            return {
                isSuccess: false,
                error: "Email or refreshToken not found in cookies",
            };
        }

        const response = await axios.post("https://mediafirewall-ai.themillionvisions.com/user/refreshToken", { token: refreshToken, email });

        if (response.data) {
            setCookieWithExpiration(localStorageKeys.userRefreshToken, response.data.refreshToken);
            setCookieWithExpiration(localStorageKeys.userAccessToken, response.data.accessToken);
            return {
                data: response.data,
                isSuccess: true,
            };
        } else {
            eraseCookie(localStorageKeys.userEmail);
            eraseCookie(localStorageKeys.userRefreshToken);
            localStorage.clear();
        }

        return response;
    } catch (error) {
        console.error("Error in asyncGetAccessToken:", error.message);
        return { isSuccess: false, error: error.message };
    }
};

export function getUrlVars() {
    var vars = {};
    if (window !== undefined) {
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
    }
    return vars;
}

export function getUserProfileTextByUserName(fName, lName) {
    const firstInitial = CommonUtility.isNotEmpty(fName) ? fName.charAt(0) : "";
    const lastInitial = CommonUtility.isNotEmpty(lName) ? lName.charAt(0) : "";
    return (firstInitial + lastInitial).toUpperCase();
}
function getRandomColor() {
    // Generate a random hex color code, e.g., "#RRGGBB"
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getUserBadgeByUserName(fName, lName) {
    const firstInitial = CommonUtility.isNotEmpty(fName) ? fName.charAt(0) : "";
    const lastInitial = CommonUtility.isNotEmpty(lName) ? lName.charAt(0) : "";

    const userBadgeText = (firstInitial + lastInitial).toUpperCase();
    const randomColor = getRandomColor(); // Assuming you have a function to generate a random color

    return { text: userBadgeText, color: randomColor };
}

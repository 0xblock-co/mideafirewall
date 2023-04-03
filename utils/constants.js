/* eslint-disable no-useless-escape */
import * as yup from "yup";
export const localStorageKeys = {
  authKey: "token",
  userEmail: "user-email",
};

export const errorString = {
  catchError: "Something went wrong.",
  authError: "Invalid auth credential, Please login.",
};

export const staticImagesUrl = {
  siteLogo: "",
};

export const captchaKey = {
  siteKey: "6Ldd6xolAAAAAKdJCeABbANGhFTLvs8q2lEClIWS", //v3
  secretKey: "6Ldd6xolAAAAAJNLD9gHX0TsBm3zZkDNMYyK3gbv", //v3
};

export const regex = {
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/,
};

export const colors = ["yellow", "purple", "orange", "red", "blue", "primary"];

export const formElements = [
  {
    id: 0,
    name: "name",
    label: "name",
    title: "What is your name?",
    placeholder: "Your Name",
    type: "text",
    isRender: true,
    // defaultValues: "",
    validation: yup.string().required(`Name is required`),
  },
  {
    id: 1,
    name: "email",
    label: "email",
    title: " What is your business email?",
    placeholder: "Your email",
    type: "text",
    isRender: false,
    defaultValues: "",
    validation: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  },
  {
    id: 2,
    name: "describe",
    label: "describe",
    title: "Which best describes you?",
    type: "radio",
    isRender: false,
    options: [
      {
        image: "/images/freelancer.png",
        value: "0",
        label: "I’m a freelancer",
      },
      {
        image: "/images/founder.png",
        value: "1",
        label: "I’m lead",
      },
      {
        image: "/images/contibutor.png",
        value: "2",
        label: "I’m contributor",
      },
      {
        image: "/images/director.png",
        value: "3",
        label: "I’m director",
      },
    ],
    defaultValues: "",
    validation: yup
      .string()
      .oneOf(["0", "1", "2", "3"], "Please select a valid option")
      .required("Please select an option"),
  },
  {
    id: 3,
    name: "companyDescribe",
    label: "companyDescribe",
    title: "Which category best describes your company?",
    type: "radio",
    isRender: false,
    options: [
      {
        image: "/images/midea-sharing.png",
        value: "0",
        label: "Media Sharing",
      },
      {
        image: "/images/realstate-broker.png",
        value: "1",
        label: "Real Stock Broker",
      },
      {
        image: "/images/Online-reviews.png",
        value: "2",
        label: "Social Review Site",
      },
      {
        image: "/images/blogging.png",
        value: "3",
        label: "Blogging",
      },
      {
        image: "/images/social-network.png",
        value: "4",
        label: "Social Network",
      },
    ],
    defaultValues: "",
    validation: yup
      .string()
      .oneOf(["0", "1", "2", "3", "4"], "Please select a valid option")
      .required("Please select an option"),
  },
  {
    id: 4,
    name: "features",
    label: "features",
    title: "What are the most important features you look for in a platform?",
    type: "checkbox",
    isRender: false,
    options: [
      {
        value: "ImageQualityDetection",
        label: "Image Quality Detection",
      },
      {
        value: "GDPR",
        label: "GDPR",
      },
      {
        value: "ViolenceDetection",
        label: "Violence Detection",
      },
      {
        value: "AbusiveTextDetection",
        label: "Abusive Text Detection",
      },
      {
        value: "AbuseDetection",
        label: "Abuse Detection",
      },
      {
        value: "NudityDetection",
        label: "Nudity Detection",
      },
    ],
    defaultValues: [],
    validation: yup
      .array()
      .min(1, "Please select at least one option")
      .required("Please select at least one option"),
  },
];

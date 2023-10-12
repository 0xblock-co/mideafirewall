export const errorString = {
  catchError: "Something went wrong.",
  authError: "Invalid auth credential, Please login.",
  userIsNotLoggedIn: "Authentication is required.",
  serverError: "Server error message",
  unknownError: "unknown Error message",
};

export const localStorageKeys = {
  authKey: "token",
  userEmail: "user-email",
  priceData: "priceData",
};

export const PRICING_CARD_BG = [
  "yellow",
  "purple",
  "orange",
  "red",
  "blue",
  "primary",
];

export const regex = {
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/,
  imageExt: /.(jpe?g|png)$/i,
  imageVideoExt: /.(jpe?g|png|mp4|mov|3gp|avi)$/i,
  videoExt: /.(mp4|mov|3gp|avi)$/i,
  checkPassword: `.{8,}`,
  checkStrongPassword: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`,
};

export const regexMessage = {
  imageExtMsg: "Only jpg, jpeg and png image files are allowed",
  imageVideoExtMsg:
    "Only jpg, jpeg, png, mp4, mov, 3gp and avi files are allowed",
};
export const fileLimit = {
  MAX_UPLOAD_SIZE: 250000000, //6000000
  MAX_UPLOAD_SIZE_PREMIUM: 1000000000, // 1000000000, //8000000,
};

export const durationLimit = {
  MAX_VIDEO_DURATION: 300,
  MAX_VIDEO_DURATION_PREMIUM: 600,
};

export const contentUploadStaticObj = {
  file: null,
  index: 0,
  isLoading: true,
  isUpload: false,
};

export const FeatureRequestType = Object.freeze({
  ASYNC: "ASYNC",
  SYNC: "SYNC",
});

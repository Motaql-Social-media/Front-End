function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

export default getUser;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const currentYear = new Date().getFullYear();
export const last120Years: number[] = [];

for (let i = 0; i < 120; i++) {
    const year = currentYear - i;
    last120Years.push(year);
}
export const DefaultCoverPage = "https://wallpaperaccess.com/full/2969070.jpg";

export const getColor = (themeColor: number) => {
  let c;
  switch (themeColor) {
    case 1:
      c = "primary";
      break;
    case 2:
      c = "secondColor";
      break;
    case 3:
      c = "thirdColor";
      break;
    case 4:
      c = "forthColor";
      break;
    case 5:
      c = "fifthColor";
      break;
    case 6:
      c = "sixthColor";
      break;
    default:
      c = "primary";
  }

  return c;
};

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
export const UPPER_CASE_LETTER_REGEX = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{1,}$/;
export const LOWER_CASE_LETTER_REGEX = /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*()]{1,}$/;
export const SPECIAL_CHARACTER_REGEX =
  /^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{1,}$/;
export const NUMBER_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{1,}$/;
export const LENGTH_REGEX = /^[a-zA-Z0-9!@#$%^&*()]{8,}$/;
export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const APIs = {
  mock: {
    emailExistAPI:
      "httpss://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail",
    checkBirthdateAPI:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/checkBirthDate",
    signupAPI:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/signup",
    resendConfirmationEmail:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/resendConfirmEmail",
    confirmEmail:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/confirmEmail",
    assignPassword:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/AssignPassword",
    checkUsername:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/checkAvailableUsername",
    assignUsername:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/AssignUsername",
    changeProfilePicture:
      "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/profile/image",
  },
  actual: {
    emailExistAPI:
      "https://backend.gigachat.cloudns.org/api/user/existedEmailORusername",
    checkBirthdateAPI:
      "https://backend.gigachat.cloudns.org/api/user/checkBirthDate",
    signupAPI: "https://backend.gigachat.cloudns.org/api/user/signup",
    resendConfirmationEmail:
      "https://backend.gigachat.cloudns.org/api/user/resendConfirmEmail",
    confirmEmail: "https://backend.gigachat.cloudns.org/api/user/confirmEmail",
    assignPassword:
      "https://backend.gigachat.cloudns.org/api/user/AssignPassword",
    checkUsername:
      "https://backend.gigachat.cloudns.org/api/user/checkAvailableUsername",
    assignUsername:
      "https://backend.gigachat.cloudns.org/api/user/AssignUsername",
    changeProfilePicture:
      "https://backend.gigachat.cloudns.org/api/user/profile/image",
    getProfile: "https://backend.gigachat.cloudns.org/api/user/profile/",
    uploadMedia: "https://backend.gigachat.cloudns.org/api/media",
    googleAuth: "https://backend.gigachat.cloudns.org/api/user/googleAuth",
    forgotPassword:
      "https://backend.gigachat.cloudns.org/api/user/forgotpassword",
    resetPassword:
      "https://backend.gigachat.cloudns.org/api/user/resetpassword",
    getNotifications:
      "https://backend.gigachat.cloudns.org/api/notification/all",
    loginAPI: "https://backend.gigachat.cloudns.org/api/user/login",
    searchUsers: "https://backend.gigachat.cloudns.org/api/user/search",
    searchTweets: "https://backend.gigachat.cloudns.org/api/tweets/search",
    searchTrends: "https://backend.gigachat.cloudns.org/api/trends/search",
    getTrends: "https://backend.gigachat.cloudns.org/api/trends/",
    getAllNotifications:
      "https://backend.gigachat.cloudns.org/api/user/notifications",
    getNotificationUnseenCount:
      "https://backend.gigachat.cloudns.org/api/user/notifications/unseenCount",
    markNotificationSeen:
      "https://backend.gigachat.cloudns.org/api/user/notifications/markAllAsSeen",
    getMentions: "https://backend.gigachat.cloudns.org/api/homepage/mention",
    getProfileByID:
      "https://backend.gigachat.cloudns.org/api/user/profileById/",
  },
};

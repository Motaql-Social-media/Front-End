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
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
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

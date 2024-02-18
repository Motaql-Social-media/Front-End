import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/mainLogo.png";
import { styles } from "../../styles/styles";

import { Alert } from "@mui/material";

import axios from "axios";
import { APIs } from "../../constants/index";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { loginUser } from "../../store/UserSlice";
import { ThemeState } from "../../store/ThemeSlice";

import {
  PASSWORD_REGEX,
  UPPER_CASE_LETTER_REGEX,
  LOWER_CASE_LETTER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  NUMBER_REGEX,
  LENGTH_REGEX,
} from "../../constants/index";

import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { getColor } from "../../constants";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const PasswordReset = ({ setLocation }: { setLocation: any }) => {
  const mock = false;

  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [changedSuccessfully, setChangedSuccessfully] = useState(false);

  const [emailExistError, setEmailExistError] = useState(false);

  const navigate = useNavigate();

  const [choosed, setChoosed] = useState("email");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoosed(event.target.value);
  };

  const nextShow = (select: number, emailExist = true) => {
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");

    switch (select) {
      case 1:
        if (emailExist) {
          if (page1 && page2) {
            page1.style.display = "none";
            page2.style.display = "block";
          }
        } else {
          setEmailExistError(true);
          setTimeout(() => {
            setEmailExistError(false);
          }, 3000);
        }
        break;
      case 2:
        if (page2 && page3) {
          page2.style.display = "none";
          page3.style.display = "block";
        }

        break;
      case 3:
      default:
    }
  };

  const handleEmailExistCheck = () => {
    axios
      .post(mock ? APIs.mock.emailExistAPI : APIs.actual.emailExistAPI, {
        email: email,
      })
      .then((res) => {
        setEmailExistError(res.data.message === "Email is existed");
        setMaskedEmail(maskEmail());
        nextShow(1);
      })
      .catch((err) => {
        // setEmailExistError(false)
        // nextShow(1, false);// uncomment
        // console.log(err)

        // for testing and will be removed
        setEmailExistError(true);
        setMaskedEmail(maskEmail());
        nextShow(1);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function checkPassword(password: string): boolean {
    return !PASSWORD_REGEX.test(password);
  }
  function hasUpperCaseLetter(password: string) {
    return UPPER_CASE_LETTER_REGEX.test(password);
  }
  function hasLowerCaseLetter(password: string) {
    return LOWER_CASE_LETTER_REGEX.test(password);
  }
  function hasSpecialCharachter(password: string) {
    return SPECIAL_CHARACTER_REGEX.test(password);
  }
  function hasNumber(password: string) {
    return NUMBER_REGEX.test(password);
  }
  function hasCorrectLength(password: string) {
    return LENGTH_REGEX.test(password);
  }

  function maskEmail() {
    // Split the email address into local and domain parts
    const [localPart, domainPart] = email.split("@");

    // Mask the local part
    const maskedLocalPart =
      localPart.substring(0, 2) +
      "*".repeat(localPart.length - 4) +
      localPart.slice(-2);

    // Mask the domain part
    const maskedDomainPart =
      domainPart.substring(0, 1) +
      "*".repeat(domainPart.length - 2) +
      domainPart.slice(-1);

    // Combine the masked local and domain parts with '@' in between
    const maskedEmail = `${maskedLocalPart}@${maskedDomainPart}`;

    return maskedEmail;
  }

  const handleForgotPassword = () => {
    console.log({
      query: email,
    });
    axios
      .post(APIs.actual.forgotPassword, {
        query: email,
      })
      .then((res) => {
        console.log(res);
        nextShow(2);
      })
      .catch((err) => {
        console.log(err);

        // for testing and will be removed
        nextShow(2);
      });
  };

  const handleResetPassword = () => {
    console.log({
      password: password,
      passwordResetToken: code,
    });
    axios
      .patch(APIs.actual.resetPassword, {
        password: password,
        passwordResetToken: code,
      })
      .then((res) => {
        setChangedSuccessfully(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  type RootState = {
    theme: ThemeState;
  };

  const themeColor = useSelector((state: RootState) => state.theme.color);

  const { t } = useTranslation();

  return (
    <div className="flex h-[100vh] w-full bg-[#21292f]">
      <div className=" m-auto w-[35%] h-[80%] min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
        <Link to="/" className="!text-white">
          <button
            className="relative  top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
            onClick={() => {
              setLocation("/");
              navigate("/");
            }}
          >
            x
          </button>
        </Link>

        <img
          src={Logo}
          alt="Logo"
          className={`-mt-4 ${
            i18next.language === "ar" ? "mr-[45%]" : "ml-[45%]"
          }  w-[40px]`}
        />

        {/* --------------------------------------First Password Reset Page------------------------------------- */}
        <div id="page1" className="m-auto w-[320px] flex flex-col h-full">
          <h1 className="mb-2 mt-3 text-3xl font-bold">
            {t("reset_password_heading")}
          </h1>
          <p className="text-sm text-zinc-600 mb-3">
            {t("reset_password_message")}
          </p>
          <TextField
            id="outlined-basic"
            label={t("login_email_placeholder")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": {
                borderColor: "#40e5da",
                "&$focused": {
                  borderColor: "#40e5da",
                },
                color: "#40e5da",
              },
              width: "100%",
              "& .MuiOutlinedInput-root:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#40e5da",
                },
              },
              "& .MuiOutlinedInput-root": {
                borderColor: "#40e5da",
                "&$focused": {
                  borderColor: "#40e5da",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  "&$focused": {
                    borderColor: "#40e5da",
                  },
                  borderColor: "#40e5da",
                },
              },
              marginBottom: "10px",
            }}
          />

          <button
            type="button"
            id="next"
            className={`${styles.coloredButton}`}
            onClick={handleEmailExistCheck}
            disabled={email === ""}
          >
            {t("next")}
          </button>

          <div className={`${emailExistError ? "" : "hidden"}`}>
            <Alert
              severity="error"
              data-testid="emailExistError"
              className={`${emailExistError ? "" : "hidden"}`}
            >
              {t("account_not_found")}
            </Alert>
          </div>
        </div>

        {/* --------------------------------------Second Password Reset Page------------------------------------- */}
        <div id="page2" className="m-auto hidden w-[320px]">
          <h1 className="mb-2 mt-3 text-3xl font-bold">
            {t("confirmation_code_question")}
          </h1>
          <p className="text-sm text-zinc-600 mb-3">
            {t("reset_password_message2")}
          </p>
          <FormControl>
            <RadioGroup
              onChange={handleOptionChange}
              value={choosed}
              sx={{
                ".MuiButtonBase-root": {
                  color: "#1d9bf0",
                },
              }}
              name="options"
            >
              <FormControlLabel
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 15,
                  },
                }}
                value="email"
                control={<Radio />}
                label={`${t("sent_email")}${maskedEmail}`}
              />
              <FormControlLabel
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 15,
                  },
                }}
                value="phone"
                control={<Radio />}
                label={`${t("sent_sms")}27`}
              />
            </RadioGroup>
          </FormControl>

          <button
            type="button"
            id="next"
            className={`${styles.coloredButton}`}
            onClick={() => {
              handleForgotPassword();
              // nextShow(2)
            }}
            disabled={email === ""}
          >
            {t("next")}
          </button>
        </div>
        {/* --------------------------------------Third Password Reset Page------------------------------------- */}

        <div id="page3" className="m-auto hidden w-[320px]">
          <div>
            <h1>{t("reset_password_message3")}</h1>
            {/* <p className="text-sm text-zinc-600 ">Verify your identity by entering the username associated with your X account.</p> */}
            <TextField
              id="outlined-basic"
              label={t("code")}
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  borderColor: "#40e5da",
                  "&$focused": {
                    borderColor: "#40e5da",
                  },
                  color: "#40e5da",
                },
                width: "100%",
                "& .MuiOutlinedInput-root:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  borderColor: "#40e5da",

                  "& .MuiOutlinedInput-notchedOutline": {
                    "&$focused": {
                      borderColor: "#40e5da",
                    },
                    borderColor: "#40e5da",
                  },
                },
                marginBottom: "10px",
              }}
            />

            <div className="relative">
              <TextField
                id="outlined-basic"
                label={t("new_password")}
                variant="outlined"
                type={showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  style: { color: "#40e5da" },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    borderColor: "#40e5da",

                    color: "#40e5da",
                  },
                  width: "100%",
                  "& .MuiOutlinedInput-root:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#40e5da",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    borderColor: "#40e5da",
                    "&$focused": {
                      borderColor: "#40e5da",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      "&$focused": {
                        borderColor: "#40e5da",
                      },
                      borderColor: "#40e5da",
                    },
                  },
                  marginBottom: "10px",
                }}
              />

              <span
                className={`toggle-password text-primary absolute ${
                  i18next.language === "en" || !password ? "right-4" : "left-4"
                } top-4 cursor-pointer ${showPassword ? "active" : ""}`}
                onClick={togglePasswordVisibility}
              >
                <VisibilityIcon
                  className={`${"text-" + getColor(themeColor)}`}
                />
              </span>
            </div>
            <div>
              <div
              // severity={`${checkPassword(password) ? "error" : "success"}`}
              >
                <Alert
                  severity={`${
                    hasUpperCaseLetter(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleTop}
                >
                  {t("uppercase")}
                </Alert>
                <Alert
                  severity={`${
                    hasLowerCaseLetter(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleMiddle}
                >
                  {t("lowercase")}
                </Alert>
                <Alert
                  severity={`${
                    hasSpecialCharachter(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleMiddle}
                >
                  {t("special")}
                </Alert>
                <Alert
                  severity={`${hasNumber(password) ? "success" : "error"}`}
                  sx={styles.signupPasswordCheckStyleMiddle}
                >
                  {t("number")}
                </Alert>
                <Alert
                  severity={`${
                    hasCorrectLength(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleBottom}
                >
                  {t("min_length")}
                </Alert>
              </div>
              <div
                className={`${
                  changedSuccessfully ? "" : "hidden"
                } -mb-9 mt-2 text-xs`}
              >
                <Alert severity="success">{t("password_changed")}</Alert>
              </div>
              <button
                type="button"
                className={`${styles.coloredButton}`}
                onClick={handleResetPassword}
                disabled={checkPassword(password) || code === ""}
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

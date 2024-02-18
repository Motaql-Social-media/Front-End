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
        nextShow(1, false);
        // console.log(err)
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

  return (
    <div className="flex h-[100vh] w-full bg-[#21292f]">
      <div className="pop-up m-auto w-[35%] h-[80%] min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
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
        <img src={Logo} alt="Logo" className="-mt-4 ml-[45%] w-[40px]" />

        {/* --------------------------------------First Password Reset Page------------------------------------- */}
        <div id="page1" className="m-auto w-[320px]">
          <div>
            <h1>Find your Gigachat account</h1>
            <p className="text-sm text-zinc-600 ">
              Enter the email, phone number, or username associated with your
              account to change your password.
            </p>
            <div className="input-container">
              <input
                className={
                  email === "" ? "form-input" : "form-input filled-input"
                }
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="input-label" htmlFor="username">
                Phone, email or username
              </label>
            </div>
            <button
              type="button"
              id="next1"
              className="btn  dark:!bg-white"
              onClick={handleEmailExistCheck}
              disabled={email === ""}
            >
              Next
            </button>
            <Alert
              severity="error"
              data-testid="emailExistError"
              className={`${emailExistError ? "" : "hidden"}`}
            >
              sorry we couldn't find your email
            </Alert>
          </div>
        </div>

        {/* --------------------------------------Second Password Reset Page------------------------------------- */}
        <div id="page2" className="m-auto hidden w-[320px]">
          <div id="mahmoud_signature">
            <h1>Where should we send a confirmation code?</h1>
            <p className="text-sm text-zinc-600 ">
              Before you can change your password, we need to make sure
              it&apos;s really you.
            </p>
            {/* <p className="text-sm text-zinc-600 ">Start by choosing where to send a confirmation code.</p> */}
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                className="text-secondary"
              >
                Start by choosing where to send a confirmation code.
              </FormLabel>
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
                  label={`Send an email to ${maskedEmail}`}
                />
                <FormControlLabel
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: 15,
                    },
                  }}
                  value="phone"
                  control={<Radio />}
                  label={`Send a message to phone number ending with 27`}
                />
              </RadioGroup>
            </FormControl>

            <button
              type="button"
              id="next3"
              className="btn dark:!bg-white"
              onClick={() => {
                handleForgotPassword();
                // nextShow(2)
              }}
            >
              Next
            </button>
          </div>
        </div>
        {/* --------------------------------------Third Password Reset Page------------------------------------- */}

        <div id="page3" className="m-auto hidden w-[320px]">
          <div>
            <h1>We sent a code to you email</h1>
            {/* <p className="text-sm text-zinc-600 ">Verify your identity by entering the username associated with your X account.</p> */}
            <div className="input-container">
              <input
                className={
                  code === "" ? "form-input" : "form-input filled-input"
                }
                name="code"
                id="code"
                autoComplete="off"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <label className="input-label" htmlFor="code">
                Code
              </label>
            </div>
            <div className="relative">
              <div className="input-container">
                <input
                  className={
                    password === "" ? "form-input" : "form-input filled-input"
                  }
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="input-label" htmlFor="password">
                  New Password
                </label>
              </div>
              <span
                className={`toggle-password absolute right-4 top-4 cursor-pointer ${
                  showPassword ? "active" : ""
                }`}
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
                  Require uppercase letter
                </Alert>
                <Alert
                  severity={`${
                    hasLowerCaseLetter(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleMiddle}
                >
                  Require lowercase letter
                </Alert>
                <Alert
                  severity={`${
                    hasSpecialCharachter(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleMiddle}
                >
                  Require special character !@#$%^&*()
                </Alert>
                <Alert
                  severity={`${hasNumber(password) ? "success" : "error"}`}
                  sx={styles.signupPasswordCheckStyleMiddle}
                >
                  Require number
                </Alert>
                <Alert
                  severity={`${
                    hasCorrectLength(password) ? "success" : "error"
                  }`}
                  sx={styles.signupPasswordCheckStyleBottom}
                >
                  Require at least 8 characters
                </Alert>
              </div>
              <Alert
                severity="success"
                className={`${
                  changedSuccessfully ? "" : "hidden"
                } -mb-9 mt-2 text-xs`}
              >
                Password Changed Successfully, Navigating to Login...
              </Alert>
              <button
                className="btn mt-16 dark:!bg-white"
                disabled={checkPassword(password) || code === ""}
                onClick={handleResetPassword}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

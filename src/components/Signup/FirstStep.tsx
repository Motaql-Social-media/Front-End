import Alert from "@mui/material/Alert";

import axios from "axios";

import { APIs } from "../../constants/index";
import { styles } from "../../styles/styles";

import Birthdate from "./Birthdate";

import { TextField } from "@mui/material";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";

const FirstStep = ({
  nickName,
  setNickName,
  email,
  setEmail,
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
  setPosition,
  emailExistError,
  setEmailExistError,
  validEmail,
  mock,
}: {
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  month: string;
  setMonth: (value: string) => void;
  day: string;
  setDay: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  setPosition: any;
  emailExistError: boolean;
  setEmailExistError: React.Dispatch<React.SetStateAction<boolean>>;
  validEmail: (email: string) => boolean;
  mock: boolean;
}) => {
  const handleEmailBlur = () => {
    // let emailExist
    axios
      .post(mock ? APIs.mock.emailExistAPI : APIs.actual.emailExistAPI, {
        email: email,
      })
      .then((res) => {
        setEmailExistError(res.data.message === "Email is existed");
        // emailExist = res.data.message === "Email is existed"
      })
      // .then(() => {
      //   if (emailExist) {
      //     setEmailExistError(true)
      //   } else {
      //     setEmailExistError(false)
      //   }
      // })
      .catch((err) => {
        setEmailExistError(false);

        // console.log(err)
      });
  };

  const { t } = useTranslation();

  const [captchaIsDone, setCaptchaIsDone] = useState(false);
  const siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; //testing

  const handleCaptchaVerification = () => {
    setCaptchaIsDone(true);
  };

  const [birthdateError, setBirthdateError] = useState(false);

    const handleCheckBirthdate = () => {
    const currentDate = new Date();
    const selectedDate = new Date(`${year}-${month}-${day}`);
    const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
    const dayDiff = currentDate.getDate() - selectedDate.getDate();

    console.log("ageDiff", ageDiff);

    if (
      ageDiff < 13 ||
      (ageDiff === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      const FirstStep = document.getElementById("First Step");
      const ErrorPage = document.getElementById("Error Page");
      if (FirstStep) {
        FirstStep.style.display = "none";
      }
      if (ErrorPage) {
        ErrorPage.style.display = "block";
      }
    } else {
      setPosition((prev: number) => prev + 1);
    }
  };


  return (
    <div id="First Step" className=" m-auto w-[300px] dark:text-white hidden">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">Create your account</h1>

        <TextField
          id="outlined-basic"
          label={"Name"}
          variant="outlined"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
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
                borderColor: "#40e5da",
                "&$focused": {
                  borderColor: "#40e5da",
                },
              },
            },
            marginBottom: "10px",
          }}
        />
        <div>
          <TextField
            id="outlined-basic"
            label={"Email"}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            inputProps={{
              onBlur: handleEmailBlur,
              style: {
                border: emailExistError ? "1px solid red" : "",
              },
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
                  borderColor: "#40e5da",
                  "&$focused": {
                    borderColor: "#40e5da",
                  },
                },
              },
              marginBottom: "10px",
            }}
          />
          {!validEmail(email) && (
            <div className={`${email ? "flex" : "hidden"}`}>
              <Alert
                severity="error"
                sx={styles.signupPasswordCheckStyleMiddle}
              >
                Please enter a valid email
              </Alert>
            </div>
          )}
          <span
            className={`ml-3 text-sm text-red-600 ${
              emailExistError ? "" : "hidden"
            }`}
          >
            Email has already been taken
          </span>
        </div>

        {/* <div className="input-container">
          <input
            className={`${emailExistError ? "border border-red-600" : ""}`}
            type="text"
            data-testid="emailInput"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
          />
          <label
            className={`input-label ${
              emailExistError ? "text-red-600" : "text-secondary"
            }`}
            htmlFor="email"
          >
            Email
          </label>
          {!validEmail(email) && (
            <Alert
              severity="error"
              className={`${email ? "flex" : "hidden"}`}
              sx={styles.signupPasswordCheckStyleMiddle}
            >
              Please enter a valid email
            </Alert>
          )}
          <span
            className={`ml-3 text-sm text-red-600 ${
              emailExistError ? "" : "hidden"
            }`}
          >
            Email has already been taken
          </span>
        </div> */}
        <div className={`${emailExistError ? "-mt-5" : ""}`}>
          <div className="mes mb-1">
            <p className="font-bold text-lg">Date of birth </p>
            <p className="dark:text-gray-400 text-xs">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
          </div>
          <Birthdate
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            year={year}
            setYear={setYear}
            monthwidth={"120px"}
            yearwidth={"100px"}
          />
        </div>
        <ReCAPTCHA
          className="mt-2"
          sitekey={siteKey}
          onChange={handleCaptchaVerification}
        />
        <button
          type="button"
          id="next"
          className={`${styles.coloredButton}`}
          onClick={handleCheckBirthdate}
          disabled={
            email === "" ||
            nickName === "" ||
            year === "" ||
            month === "" ||
            day === "" ||
            !validEmail(email) ||
            emailExistError ||
            !captchaIsDone
          }
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default FirstStep;

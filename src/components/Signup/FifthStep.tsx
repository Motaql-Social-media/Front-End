import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { styles } from "../../styles/styles";

import { useTranslation } from "react-i18next";

const FifthStep = ({
  email,
  setPosition,
}: {
  email: string;
  setPosition: any;
}) => {
  const [code, setCode] = useState("");

  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);

  const { t } = useTranslation();

  const handleResendConfirmationEmail = () => {
    //   axios
    //     .post(
    //       mock
    //         ? APIs.mock.resendConfirmationEmail
    //         : APIs.actual.resendConfirmationEmail,
    //       {
    //         email: email,
    //       }
    //     )
    //     .then(() => {
    //       setIsResending(true);
    //     })
    //     .catch((err) => {
    //       if (mock) {
    //         setIsResending(true);
    //       }

    //       console.log(err);
    //     });
    setIsResending(true);
  };

  useEffect(() => {
    let timer: any;

    if (isResending) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsResending(false);
      setCountdown(30);
    }

    return () => clearTimeout(timer);
  }, [countdown, isResending]);
  return (
    <div id="Fifth Step" className=" m-auto w-[350px] dark:text-white hidden">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-1 mt-3 text-3xl font-bold">{t("signup_welcome6")}</h1>
        <p className="text-gray-500 mb-4">
          {t("email_otp_message")} <span className="text-primary">{email}</span>
          <p
            className="text-primary cursor-pointer mt-2 w-fit"
            onClick={() => {
              setPosition((prev: number) => prev - 1);
            }}
          >
            {t("change_email")}
          </p>
        </p>
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
                borderColor: "#40e5da",
                "&$focused": {
                  borderColor: "#40e5da",
                },
              },
            },
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleResendConfirmationEmail}
          className="w-fit cursor-pointer !bg-transparent"
        >
          <span
            className={`${
              isResending
                ? "text-white cursor-default"
                : "text-primary cursor-pointer"
            }  mt-2 w-fit`}
          >
            {isResending
              ? `${t("resending", { time: countdown.toString() })}`
              : t("redend_email")}{" "}
          </span>
        </button>
        <button
          type="button"
          id="next"
          className={`${styles.coloredButton}`}
          onClick={() => {
            setPosition((prev: number) => prev + 1);
          }}
          disabled={code.length === 0}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default FifthStep;

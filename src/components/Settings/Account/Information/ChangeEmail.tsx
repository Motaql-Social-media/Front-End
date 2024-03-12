import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { TextField } from "@mui/material"

import { EMAIL_REGEX } from "../../../../constants"
import { styles } from "../../../../styles/styles"
import { changeEmail } from "../../../../store/UserSlice"
import SubpageNavbar from "../../../General/SubpageNavbar"
import Widgets from "../../../Widgets/Widgets"

const ChangeEmail = () => {
  const user = useSelector((state: any) => state.user.user)
  const [email, setEmail] = useState(user.email)
  const [emailExistError, setEmailExistError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userToken = useSelector((state: any) => state.user.token)
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const [code, setCode] = useState("")
  const [otpError, setOtpError] = useState(false)
  const [otpChecked, setOtpChecked] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleCheckEmailExist = () => {
    API.post("/users/is-user-found", {
      input: email,
    })
      .then((res) => {
        // console.log(res.data.isFound);
        if (email !== user.email) setEmailExistError(res.data.isFound)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function validEmail(emeil: string) {
    return EMAIL_REGEX.test(emeil)
  }

  useEffect(() => {
    let timer: any

    if (isResending) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }

    if (countdown === 0) {
      setIsResending(false)
      setCountdown(30)
    }

    return () => clearTimeout(timer)
  }, [countdown, isResending])

  useEffect(() => {
    if (validEmail(email)) {
      handleCheckEmailExist()
    }
  }, [email])

  const handleResendOTP = () => {
    API.post("auth/send-otpverification", {
      provider: "email",
      input: email,
      name: user.name,
    })
      .then((res) => {
        // console.log(res);
        setIsResending(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleCheckOTP = () => {
    API.post("auth/check-otpverification", {
      provider: "email",
      input: email,
      otp: code,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err)

        setOtpError(true)
      })
  }

  const handleButtonClick = () => {
    if (!otpSent) {
      handleSendOTP()
    } else handleCheckOTP()
  }

  const handleSendOTP = () => {
    API.post("auth/send-otpverification", {
      provider: "email",
      input: email,
      name: user.name,
    })
      .then((res) => {
        // console.log(res);
        setOtpSent(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeEmail = () => {
    API.patch(
      `users/current/change-email`,
      {
        newEmail: email,
      },
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((res) => {
        setEmailChanged(true)
        dispatch(changeEmail(email))
        setTimeout(() => {
          navigate(-1)
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (otpChecked) {
      handleChangeEmail()
    }
  }, [otpChecked])

  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder px-4 dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className="mb-4">
          <SubpageNavbar title="change_email" />
        </div>
        {!otpSent && (
          <div>
            <TextField
              label={t("email")}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              inputProps={{
                onBlur: handleCheckEmailExist,
                style: {
                  border: emailExistError ? "1px solid red" : "",
                },
                onPaste: (e) => e.preventDefault(),
              }}
              sx={{
                borderColor: "#40e5da",
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
            {!validEmail(email) && <div className="text-red-600"> {t("valid_email")}</div>}
          </div>
        )}
        {otpSent && (
          <div>
            <div className="mb-4 text-gray-500">
              {t("email_otp_message")} <span className="text-primary">{email}</span>
              <p
                className="mt-2 w-fit cursor-pointer text-primary"
                onClick={() => {
                  setOtpSent(false)
                }}
              >
                {t("change_email")}
              </p>
            </div>
            <TextField
              inputProps={{ onPaste: (e) => e.preventDefault() }}
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
            <button onClick={handleResendOTP} className="w-fit cursor-pointer !bg-transparent">
              <span className={`${isResending ? "cursor-default text-white" : "cursor-pointer text-primary"}  mt-2 w-fit`}>{isResending ? `${t("resending", { time: countdown.toString() })}` : t("redend_email")} </span>
            </button>
            {otpError && <div className="text-red-600">{t("otp_error")}</div>}
          </div>
        )}
        <div>
          <button className={`${styles.coloredButton}`} onClick={handleButtonClick} disabled={email === user.email || (code.length === 0 && otpSent)}>
            {otpSent ? t("confirm_email") : t("send_otp")}
          </button>
        </div>
        {emailChanged && <div className="text-green-600">{t("email_changed")}</div>}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default ChangeEmail

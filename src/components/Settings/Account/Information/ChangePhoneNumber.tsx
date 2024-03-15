import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { TextField } from "@mui/material"

import { MuiPhone } from "../../../Signup/CustomPhoneInput"

import { PhoneNumberUtil } from "google-libphonenumber"
import { styles } from "../../../../styles/styles"
import { changePhone } from "../../../../store/UserSlice"
import Widgets from "../../../Widgets/Widgets"
import SubpageNavbar from "../../../General/SubpageNavbar"
import i18next from "i18next"

const phoneUtil = PhoneNumberUtil.getInstance()

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    return false
  }
}

const ChangePhoneNumber = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  const [phoneChanged, setPhoneChanged] = useState(false)
  const [otpChecked, setOtpChecked] = useState(false)

  const { t } = useTranslation()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const [phoneExistError, setPhoneExistError] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleCheckPhoneExist = () => {
    API.post("users/is-user-found", {
      input: phoneNumber,
    })
      .then((res) => {
        // console.log(res.data.isFound);
        if (phoneNumber !== user.phoneNumber) setPhoneExistError(res.data.isFound)
        else setPhoneExistError(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)

  useEffect(() => {
    if (isPhoneValid(phoneNumber)) {
      handleCheckPhoneExist()
    }
  }, [phoneNumber])

  const handleSendOTP = () => {
    API.post(
      "auth/send-otpverification",
      {
        provider: "phone",
        input: phoneNumber,
        name: user.name,
      },
      {
        headers: {
          "accept-language": i18next.language,
        },
      }
    )
      .then((res) => {
        // console.log(res);
        setOtpSent(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleButtonClick = () => {
    if (!otpSent) {
      handleSendOTP()
    } else handleCheckOTP()
  }
  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const [code, setCode] = useState("")
  const [otpError, setOtpError] = useState(false)

  const handleResendOTP = () => {
    API.post(
      "auth/send-otpverification",
      {
        provider: "phone",
        input: phoneNumber,
        name: user.name,
      },
      {
        headers: {
          "accept-language": i18next.language,
        },
      }
    )
      .then((res) => {
        // console.log(res);
        setIsResending(true)
      })
      .catch((err) => {
        console.log(err)
      })
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

  const handleCheckOTP = () => {
    API.post("auth/check-otpverification", {
      provider: "phone",
      input: phoneNumber,
      otp: code,
    })
      .then((res) => {
        // console.log(res);
        setOtpChecked(true)
      })
      .catch((err) => {
        console.log(err)

        setOtpError(true)
      })
  }

  const handleChangePhoneNumber = () => {
    API.patch(`users/current/change-phonenumber`, {
      newPhoneNumber: phoneNumber,
    })
      .then((res) => {
        setPhoneChanged(true)
        dispatch(changePhone(phoneNumber))
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
      handleChangePhoneNumber()
    }
  }, [otpChecked])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder px-4 dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className="mb-4">
          <SubpageNavbar title="change_phone" />
        </div>
        {!otpSent && (
          <div style={{ zIndex: 3 }}>
            <MuiPhone value={phoneNumber} onChange={setPhoneNumber} />
            {!isPhoneValid(phoneNumber) && phoneNumber.length > 0 && <div className="text-red-600">{t("valid_phone")}</div>}
            {phoneExistError && <div className="text-red-600">{t("phone_exist")}</div>}
          </div>
        )}
        {otpSent && (
          <div>
            <div className="mb-4 text-gray-500">
              {t("phone_otp_message")} <span className="text-primary">{phoneNumber}</span>
              <p
                className="mt-2 w-fit cursor-pointer text-primary"
                onClick={() => {
                  setOtpSent(false)
                }}
              >
                {t("change_phone")}
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
              <span className={`${isResending ? "cursor-default text-white" : "cursor-pointer text-primary"}  mt-2 w-fit`}>{isResending ? `${t("resending", { time: countdown.toString() })}` : t("resend_sms")}</span>
            </button>
            {otpError && <div className="text-red-600">{t("otp_error")}</div>}
          </div>
        )}
        <div>
          <button className={`${styles.coloredButton}`} onClick={handleButtonClick} disabled={phoneNumber === user.phoneNumber || (!otpSent && phoneExistError) || (code.length === 0 && otpSent)}>
            {otpSent ? t("confirm_phone") : t("send_otp")}
          </button>
        </div>
        {phoneChanged && <div className="text-green-600">{t("phone_changed")}</div>}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default ChangePhoneNumber

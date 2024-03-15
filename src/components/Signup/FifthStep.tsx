import { TextField } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import { styles } from "../../styles/styles"

import { useTranslation } from "react-i18next"
import { useRef } from "react"
import i18next from "i18next"

const FifthStep = ({ nickName, email, setPosition, position }: { nickName: string; email: string; setPosition: any; position: number }) => {
  const [code, setCode] = useState("")

  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)

  const { t } = useTranslation()

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

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "accept-language": i18next.language,
    },
  })

  const [otpError, setOtpError] = useState(false)
  const handleResendOTP = () => {
    API.post(
      "auth/send-otpverification",
      {
        provider: "email",
        input: email,
        name: nickName,
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
  const handleCheckOTP = () => {
    API.post("auth/check-otpverification", {
      provider: "email",
      input: email,
      otp: code,
    })
      .then((res) => {
        // console.log(res);
        setPosition((prev: number) => prev + 1)
      })
      .catch((err) => {
        console.log(err)
        nextButton.current?.removeAttribute("disabled")

        setOtpError(true)
      })
  }

  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButton.current?.removeAttribute("disabled")
  }, [position])

  return (
    <div id="Fifth Step" className=" m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-1 mt-3 text-3xl font-bold">{t("signup_welcome6")}</h1>
        <div className="mb-4 text-gray-500">
          {t("email_otp_message")} <span className="text-primary">{email}</span>
          <p
            className="mt-2 w-fit cursor-pointer text-primary"
            onClick={() => {
              setPosition((prev: number) => prev - 1)
            }}
          >
            {t("change_email")}
          </p>
        </div>
        <TextField
          label={t("code")}
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          InputLabelProps={{
            style: { color: "#40e5da", textAlign: "right" },
          }}
          sx={styles.textField}
        />
        <button onClick={handleResendOTP} className="w-fit cursor-pointer !bg-transparent">
          <span className={`${isResending ? "cursor-default text-white" : "cursor-pointer text-primary"}  mt-2 w-fit`}>{isResending ? `${t("resending", { time: countdown.toString() })}` : t("redend_email")} </span>
        </button>
        {otpError && <div className="text-red-600">{t("otp_error")}</div>}

        <button
          type="button"
          id="next"
          ref={nextButton}
          className={`${styles.coloredButton}`}
          onClick={() => {
            nextButton.current?.setAttribute("disabled", "true")

            handleCheckOTP()
          }}
          disabled={code.length === 0}
        >
          {t("next")}
        </button>
      </div>
    </div>
  )
}

export default FifthStep

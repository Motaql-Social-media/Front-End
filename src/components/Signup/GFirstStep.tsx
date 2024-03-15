import { useRef, useEffect, useState } from "react"

import axios from "axios"

import { styles } from "../../styles/styles"

import Birthdate from "./Birthdate"

import { TextField } from "@mui/material"

import { useTranslation } from "react-i18next"

import { MuiPhone } from "./CustomPhoneInput"

import useRecaptchaV3 from "../hooks/reCaptchaV3"

import { PhoneNumberUtil } from "google-libphonenumber"

import i18next from "i18next"

const phoneUtil = PhoneNumberUtil.getInstance()

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    return false
  }
}

const GFirstStep = ({ name, phoneNumber, setPhoneNumber, speciality, setSpeciality, month, setMonth, day, setDay, year, setYear, setPosition, position }: { name: string; phoneNumber: string; setPhoneNumber: any; speciality: string; setSpeciality: React.Dispatch<React.SetStateAction<string>>; month: string; setMonth: (value: string) => void; day: string; setDay: (value: string) => void; year: string; setYear: (value: string) => void; setPosition: any; position: number }) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const executeRecaptcha = useRecaptchaV3(process.env.REACT_APP_RECAPTCHA_KEY)

  const { t } = useTranslation()

  const [phoneExistError, setPhoneExistError] = useState(false)

  const handleCheckPhoneExist = () => {
    API.post("/users/is-user-found", {
      input: phoneNumber,
    })
      .then((res) => {
        // console.log(res.data.isFound);
        setPhoneExistError(res.data.isFound)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isPhoneValid(phoneNumber)) {
      handleCheckPhoneExist()
    }
  }, [phoneNumber])

  const handleSendOTP = () => {
    // console.log({
    //   provider: "phone",
    //   input: phoneNumber,
    //   name: nickName,
    // });
    API.post(
      "auth/send-otpverification",
      {
        provider: "phone",
        input: phoneNumber,
        name: name,
      },
      {
        headers: {
          "accept-language": i18next.language,
        },
      }
    )
      .then((res) => {
        // console.log(res);
        setPosition((prev: number) => prev + 1)
      })
      .catch((err) => {
        nextButton.current?.removeAttribute("disabled")

        console.log(err)
      })
  }

  const handleCheckBirthdate = () => {
    const currentDate = new Date()
    const selectedDate = new Date(`${year}-${month}-${day}`)
    const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear()
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth()
    const dayDiff = currentDate.getDate() - selectedDate.getDate()

    if (ageDiff < 13 || (ageDiff === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      const FirstStep = document.getElementById("Google First Step")
      const ErrorPage = document.getElementById("Error Page")
      if (FirstStep) {
        FirstStep.style.display = "none"
      }
      if (ErrorPage) {
        ErrorPage.style.display = "block"
      }
    } else {
      handleSendOTP()
    }
  }

  const handleRecaptcha = async () => {
    const token = await executeRecaptcha("login")

    API.post("auth/validate-recaptcha", {
      gRecaptchaResponse: token,
    })
      .then((res) => {
        handleCheckBirthdate()
      })
      .catch((err) => {
        nextButton.current?.removeAttribute("disabled")

        console.log(err)
      })
  }

  const nextButton = useRef<HTMLButtonElement>(null)

  //   useEffect(() => {
  //     nextButton.current?.removeAttribute("disabled")
  //   }, [position])

  return (
    <div id="Google First Step" className=" m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("google_sign_message1")}</h1>
        <div className="z-[3] mb-3">
          <MuiPhone value={phoneNumber} onChange={setPhoneNumber} />
          {!isPhoneValid(phoneNumber) && phoneNumber.length > 0 && <div className="text-red-600">{t("valid_phone")}</div>}
          {phoneExistError && <div className="text-red-600">{t("phone_exist")}</div>}
        </div>

        <div>
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("speciality")}
            variant="outlined"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={styles.textField}
          />
        </div>

        <div>
          <div className="mes mb-4">
            <p className="text-lg font-bold">{t("birthdate")} </p>
            <p className="text-xs dark:text-gray-400">{t("birthdate_message")}</p>
          </div>
          <Birthdate month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} monthwidth={"120px"} yearwidth={"100px"} />
        </div>

        <button
          type="button"
          id="next"
          ref={nextButton}
          className={`${styles.coloredButton}`}
          onClick={() => {
            nextButton.current?.setAttribute("disabled", "true")
            handleRecaptcha()
          }}
          disabled={speciality === "" || year === "" || month === "" || day === ""}
        >
          {t("next")}
        </button>
      </div>
    </div>
  )
}

export default GFirstStep

import { MuiPhone } from "./CustomPhoneInput"

import { PhoneNumberUtil } from "google-libphonenumber"
import { useRef } from "react"

import { styles } from "../../styles/styles"

import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

import axios from "axios"

const phoneUtil = PhoneNumberUtil.getInstance()

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    return false
  }
}

const GSecondStep = ({ nickName, setPosition, phoneNumber, setPhoneNumber, position }: { nickName: string; setPosition: any; phoneNumber: string; setPhoneNumber: any; position: number }) => {
  const { t } = useTranslation()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

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
    API.post("auth/send-otpverification", {
      provider: "phone",
      input: phoneNumber,
      name: nickName,
    })
      .then((res) => {
        // console.log(res);
        setPosition((prev: number) => prev + 1)
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
    <div id="Google Second Step" className="m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome3")}</h1>
        <div style={{ zIndex: 3 }}>
          <MuiPhone value={phoneNumber} onChange={setPhoneNumber} />
          {!isPhoneValid(phoneNumber) && phoneNumber.length > 0 && <div className="text-red-600">{t("valid_phone")}</div>}
          {phoneExistError && <div className="text-red-600">{t("phone_exist")}</div>}
        </div>
        <button
          type="button"
          id="next"
          ref={nextButton}
          className={`${styles.coloredButton}`}
          onClick={() => {
            nextButton.current?.setAttribute("disabled", "true")

            handleSendOTP()
          }}
          disabled={!isPhoneValid(phoneNumber) || phoneExistError}
        >
          {t("next")}
        </button>
      </div>
    </div>
  )
}

export default GSecondStep

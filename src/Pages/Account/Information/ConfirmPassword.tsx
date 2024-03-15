import React, { useEffect, useState } from "react"
import i18next from "i18next"
import { TextField } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useTranslation } from "react-i18next"
import { styles } from "../../../styles/styles"
import axios from "axios"
import { useSelector } from "react-redux"

const ConfirmPassword = ({ setPasswordConfirmed }: { setPasswordConfirmed: any }) => {
  const { t } = useTranslation()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "accept-language": i18next.language,
    },
  })

  const user = useSelector((state: any) => state.user.user)

  const [passwordError, setPasswordError] = useState(false)

  const handleConfirm = () => {
    API.post(`auth/signin`, {
      input: user.username,
      password,
    })
      .then((res) => {
        sessionStorage.setItem("passwordConfirmed", "true")
        setPasswordConfirmed(true)
      })
      .catch((err) => {
        setPasswordError(true)

        console.log(err)
      })
  }

  useEffect(() => {
    if (passwordError) {
      setTimeout(() => {
        setPasswordError(false)
      }, 3000)
    }
  }, [passwordError])

  return (
    <div className=" flex flex-col items-center">
      <div className="w-full">
        <div className="p-3 text-xl font-semibold text-white">{t("confirm_password_message1")}</div>
      </div>
      <div className="w-full">
        <p className="p-3 text-sm text-gray-500">{t("confirm_password_message2")}</p>
      </div>
      <hr className="mb-4 border border-darkBorder" />
      <div className={`relative w-[95%]`}>
        <TextField
          inputProps={{ onPaste: (e) => e.preventDefault() }}
          label={t("login_password_placeholder")}
          variant="outlined"
          type={!showPassword ? "password" : "text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: { color: "#40e5da" },
          }}
          sx={styles.textField}
        />

        <span className={`toggle-password absolute text-primary ${i18next.language === "en" || !password ? "right-4" : "left-4"} top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
          <VisibilityIcon />
        </span>
        <div className={`${passwordError ? "" : "hidden"} text-red-600`}>{t("wrong_password")}</div>
        <a className="text-primary hover:underline" href="/password_reset">
          {t("forgot_password")}
        </a>
      </div>
      <div className="flex w-full items-center justify-end p-3">
        <button disabled={password === ""} className={`${styles.coloredButton} !w-fit px-3 py-2`} onClick={handleConfirm}>
          {t("confirm")}
        </button>
      </div>
    </div>
  )
}

export default ConfirmPassword

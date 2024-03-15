import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useSelector } from "react-redux"
import { TextField } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import i18next from "i18next"
import { styles } from "../../styles/styles"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import Widgets from "../../components/Widgets/Widgets"

const PasswordChange = () => {
  const navigate = useNavigate()

  const userToken = useSelector((state: any) => state.user.token)
  const user = useSelector((state: any) => state.user.user)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const { t } = useTranslation()

  const [passwordError, setPasswordError] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [passwordChanged, setPasswordChanged] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    if (newPassword !== confirmPassword && newPassword && confirmPassword) {
      setPasswordMatch(false)
    } else {
      setPasswordMatch(true)
    }
  }, [newPassword, confirmPassword])

  const handleChangePassword = () => {
    API.patch(
      `users/current/change-password`,
      {
        currPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirm: confirmPassword,
      },
      {
        headers: {
          authorization: "Bearer " + userToken,
        },
      }
    )
      .then((res) => {
        setPasswordChanged(true)
        setTimeout(() => {
          navigate(-1)
        }, 3000)
      })
      .catch((err) => {
        setPasswordError(true)
      })
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder px-4 dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="change_password" />
        <div className=" relative mt-4 flex flex-col gap-2">
          <div className={`relative mb-5`}>
            <TextField
              inputProps={{ onPaste: (e) => e.preventDefault() }}
              label={t("current_password")}
              variant="outlined"
              type={!showPassword ? "password" : "text"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da" },
              }}
              sx={styles.textField}
            />

            <span className={`toggle-password absolute text-primary ${i18next.language === "en" || !currentPassword ? "right-4" : "left-4"} top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={() => setShowPassword(!showPassword)}>
              <VisibilityIcon />
            </span>
            <a className="text-primary hover:underline" href="/password_reset">
              {t("forgot_password")}
            </a>
          </div>

          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("new_password")}
            variant="outlined"
            type={"password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da" },
            }}
            sx={styles.textField}
          />
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("confirm_password")}
            variant="outlined"
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da" },
            }}
            sx={styles.textField}
          />
          <div className={`${passwordError ? "" : "hidden"} text-red-600`}>The password you entered was incorrect.</div>
          {!passwordMatch && <div className={` text-red-600`}>The passwords you entered don't match.</div>}
          <button type="button" className={`w-full ${styles.coloredButton}`} onClick={handleChangePassword} disabled={!currentPassword || !newPassword || !confirmPassword || !passwordMatch}>
            {t("confirm")}
          </button>
        </div>
        {passwordChanged && <div className="text-green-600">Password changed successfully</div>}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default PasswordChange

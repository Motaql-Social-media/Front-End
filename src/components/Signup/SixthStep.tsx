import { TextField } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import i18next from "i18next"
import { Alert } from "@mui/material"
import { styles } from "../../styles/styles"
import axios from "axios"
import { months } from "../../constants/index"
import { useRef, useEffect } from "react"

import { LENGTH_REGEX, NUMBER_REGEX, PASSWORD_REGEX, SPECIAL_CHARACTER_REGEX, UPPER_CASE_LETTER_REGEX, LOWER_CASE_LETTER_REGEX } from "../../constants/index"

const SixthStep = ({ nickName, email, phoneNumber, speciality, month, day, year, password, setPassword, setUserToken, setUser, setOriginalUsername, setPosition, position }: { nickName: string; email: string; phoneNumber: string; speciality: string; month: string; day: string; year: string; password: string; setPassword: any; setUserToken: any; setUser: any; setOriginalUsername: any; setPosition: any; position: number }) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  function checkPassword(password: string): boolean {
    return !PASSWORD_REGEX.test(password)
  }
  function hasUpperCaseLetter(password: string) {
    return UPPER_CASE_LETTER_REGEX.test(password)
  }
  function hasLowerCaseLetter(password: string) {
    return LOWER_CASE_LETTER_REGEX.test(password)
  }
  function hasSpecialCharachter(password: string) {
    return SPECIAL_CHARACTER_REGEX.test(password)
  }
  function hasNumber(password: string) {
    return NUMBER_REGEX.test(password)
  }
  function hasCorrectLength(password: string) {
    return LENGTH_REGEX.test(password)
  }
  const { t } = useTranslation()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    
  })

  const handleSignup = () => {
    // console.log({
    //   name: nickName,
    //   email: email,
    //   phoneNumber: phoneNumber,
    //   password: password,
    //   passwordConfirm: password,
    //   jobtitle: speciality,
    //   dateOfBirth: `${year}-${months.indexOf(month)}-${day}`,
    // });
    API.post("auth/signup", {
      name: nickName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      passwordConfirm: password,
      jobtitle: speciality,
      dateOfBirth: `${year}-${months.indexOf(month)}-${day}`,
    })
      .then((res) => {
        // console.log(res.data.data.token);
        setUserToken(res.data.data.token)
        setUser(res.data.data.user)
        setOriginalUsername(res.data.data.user.username)
        setPosition((prev: number) => prev + 1)
      })
      .catch((err) => {
        nextButton.current?.removeAttribute("disabled")

        console.log(err)
      })
  }

  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButton.current?.removeAttribute("disabled")
  }, [position])

  return (
    <div id="Sixth Step" className=" m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome7")}</h1>
        <div className="relative">
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("new_password")}
            variant="outlined"
            type={!showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da" },
            }}
            sx={styles.textField}
          />

          <span className={`toggle-password absolute text-primary ${i18next.language === "en"  ? "right-4" : "left-4"} top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
            <VisibilityIcon className={`text-primary`} />
          </span>
        </div>
        <div>
          <div
          // severity={`${checkPassword(password) ? "error" : "success"}`}
          >
            <Alert severity={`${hasUpperCaseLetter(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleTop}>
              {t("uppercase")}
            </Alert>
            <Alert severity={`${hasLowerCaseLetter(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              {t("lowercase")}
            </Alert>
            <Alert severity={`${hasSpecialCharachter(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              {t("special")}
            </Alert>
            <Alert severity={`${hasNumber(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              {t("number")}
            </Alert>
            <Alert severity={`${hasCorrectLength(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleBottom}>
              {t("min_length")}
            </Alert>
          </div>
          <button
            type="button"
            ref={nextButton}
            className={`${styles.coloredButton}`}
            onClick={() => {
              nextButton.current?.setAttribute("disabled", "true")

              handleSignup()
            }}
            disabled={checkPassword(password)}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SixthStep

import React, { useEffect } from "react"
import Logo from "../../assets/images/mainLogo.svg"
import { t } from "i18next"
import { useState } from "react"
import { styles } from "../../styles/styles"
import { TextField } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import i18next from "i18next"
import { useSelector } from "react-redux"
import { Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../../store/AdminUserSlice"

function AdminLanding() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const [loginError, setLoginError] = useState(false)

  const navigate = useNavigate()

  const cnu = useSelector((state: any) => state.cnu.cnu)
  useEffect(() => {
    if (cnu) {
      navigate("/control_panel")
    }
  }, [cnu])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const dispatch = useDispatch()

  const handleLogin = () => {
    setLoading(true)
    API.post("auth/signin-emp", {
      input: userName,
      password: password,
    })
      .then((res) => {
        setLoading(false)
        dispatch(login(res.data.data))
        navigate("/control_panel")
      })
      .catch((err) => {
        setLoading(false)
        setLoginError(true)
        console.log(err)
      })
  }

  return (
    <div className="relative mx-auto mt-16 flex h-[100vh] flex-col items-center sm:mt-0 sm:justify-center lg:flex-row">
      <div className="flex w-[50%] items-center justify-center lg:pb-[10%] lg:pl-[10%]">
        <img src={Logo} alt="logo" className="w-26 h-20 lg:h-[60%] lg:w-[60%]" />
      </div>
      <div className="flex flex-col items-start gap-8 p-10 lg:w-[40%] lg:self-start lg:pt-16">
        <h1 className="text-2xl font-bold  dark:text-white min-[575px]:text-3xl md:text-4xl lg:text-5xl">{t("admin_landing_welcome")}</h1>
        <h3 className="min-[575px]:text-md text-sm font-bold dark:text-white md:text-lg lg:text-xl">{t("admin_landing_welcome2")}.</h3>
        <div className="flex w-full flex-col gap-5 rounded-2xl border border-darkBorder p-5">
          <TextField
            label={t("login_email_placeholder")}
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={styles.textField}
          />
          <div className={`relative ${loginError ? "-mb-4" : ""}`}>
            <TextField
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

            <span className={`toggle-password absolute text-primary ${i18next.language === "en" ? "right-4" : "left-4"} top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
              <VisibilityIcon />
            </span>
          </div>
          <div className={`${loginError ? "" : "hidden"}`}>
            <Alert severity="error" sx={styles.signupPasswordCheckStyleMiddle}>
              {t("invalid_credentials")}
            </Alert>
          </div>
          <button className={`${styles.coloredButton}`} disabled={password === "" || userName === "" || loading} onClick={handleLogin}>
            {loading ? "Loading..." : t("signin")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLanding

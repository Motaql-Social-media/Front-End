import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import i18next from "i18next"
import { styles } from "../../../styles/styles"

const PasswordChange = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userToken = useSelector((state: any) => state.user.token)
  const user = useSelector((state: any) => state.user.user)

  const [userTag, setUserTag] = useState(user.username)

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos
      setPrevScrollPos(currentScrollPos)

      // Check if scrolling down
      if (isScrollingDown) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const [isVisible, setIsVisible] = useState(true)

  const handleBack = () => {
    navigate(-1)
  }

  const [usernameError, setUsernameError] = useState(false)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
    <div className="flex justify-center ">
      <div className="w-[95%]">
        <div className="mb-5 flex items-center justify-start gap-7 pl-2">
          <div onClick={handleBack} className="cursor-pointer">
            <ArrowBackIcon fontSize="small" />
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            Change your password
          </div>
        </div>
        <div className=" relative flex flex-col gap-2">
          <div className={`relative mb-5`}>
            <TextField
              label={"Current Password"}
              variant="outlined"
              type={!showPassword ? "password" : "text"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da" },
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

            <span className={`toggle-password absolute text-primary ${i18next.language === "en" || !currentPassword ? "right-4" : "left-4"} top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={() => setShowPassword(!showPassword)}>
              <VisibilityIcon />
            </span>
            <a className="text-primary hover:underline" href="/password_reset">
              Forget Password?
            </a>
          </div>

          <TextField
            label={"New Password"}
            variant="outlined"
            type={"password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da" },
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
          <TextField
            label={"Confirm Password"}
            variant="outlined"
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da" },
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
          <div className={`${passwordError ? "" : "hidden"} text-red-600`}>The password you entered was incorrect.</div>
          {!passwordMatch && <div className={` text-red-600`}>The passwords you entered don't match.</div>}
          <button type="button" className={`w-full ${styles.coloredButton}`} onClick={handleChangePassword} disabled={!currentPassword || !newPassword || !confirmPassword || !passwordMatch}>
            {t("confirm")}
          </button>
        </div>
        {passwordChanged && <div className="text-green-600">Password changed successfully</div>}
      </div>
    </div>
  )
}

export default PasswordChange

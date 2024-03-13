import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../../assets/images/mainLogo.svg"
import { styles } from "../../styles/styles"

import { Alert } from "@mui/material"

import axios from "axios"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"

import React from "react"

import { useNavigate } from "react-router"

import { ThemeState } from "../../store/ThemeSlice"

import { PASSWORD_REGEX, UPPER_CASE_LETTER_REGEX, LOWER_CASE_LETTER_REGEX, SPECIAL_CHARACTER_REGEX, NUMBER_REGEX, LENGTH_REGEX } from "../../constants/index"

import VisibilityIcon from "@mui/icons-material/Visibility"

import { useSelector } from "react-redux"
import { getColor } from "../../constants"
import { TextField } from "@mui/material"
import { useTranslation } from "react-i18next"
import i18next from "i18next"

const PasswordReset = ({ setLocation }: { setLocation: any }) => {
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [nickName, setNickName] = useState("")
  const [maskedEmail, setMaskedEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [changedSuccessfully, setChangedSuccessfully] = useState(false)
  const [resetToken, setResetToken] = useState("")
  const [otpError, setOtpError] = useState(false)

  const [emailExistError, setEmailExistError] = useState(false)

  const navigate = useNavigate()

  const [choosed, setChoosed] = useState("email")
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoosed(event.target.value)
  }

  const nextShow = (select: number, emailExist = true) => {
    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")
    const page3 = document.getElementById("page3")
    const page4 = document.getElementById("page4")

    if (page1) page1.style.display = "none"
    if (page2) page2.style.display = "none"
    if (page3) page3.style.display = "none"
    if (page4) page4.style.display = "none"

    switch (select) {
      case 1:
        if (emailExist) {
          if (page2) {
            page2.style.display = "block"
          }
        } else {
          setEmailExistError(true)
          setTimeout(() => {
            setEmailExistError(false)
          }, 3000)
        }
        break
      case 2:
        if (page3) {
          page3.style.display = "block"
        }

        break
      case 3:
        if (page4) {
          page4.style.display = "block"
        }
        break
      default:
    }
  }
  const [lastPhoneDigits, setLastPhoneDigits] = useState("")

  const handleEmailExistCheck = () => {
    // console.log({ input: email });
    API.post("users/is-user-found", { input: email })
      .then((res) => {
        setEmailExistError(!res.data.isFound)
        setMaskedEmail(maskEmail(res.data.data.email))
        setLastPhoneDigits(res.data.data.phoneNumber.slice(-2))
        setPhoneNumber(res.data.data.phoneNumber)
        setEmail(res.data.data.email)
        setNickName(res.data.data.name)
        nextShow(1)
        // console.log(res);
      })
      .catch((err) => {
        console.log(err)
        setEmailExistError(!(err.message === "Request failed with status code 404"))
        nextShow(1, false)
        // handleNext(!(err.message === "Request failed with status code 404"));
      })
  }

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

  function maskEmail(email: string) {
    // Split the email address into local and domain parts
    const [localPart, domainPart] = email.split("@")

    // Mask the local part
    const maskedLocalPart = localPart.length > 4 ? localPart.substring(0, 2) + "*".repeat(localPart.length - 4) + localPart.slice(-2) : localPart

    // Mask the domain part
    const maskedDomainPart = domainPart.length > 3 ? domainPart.substring(0, 1) + "*".repeat(domainPart.length - 2) + domainPart.slice(-1) : domainPart

    // Combine the masked local and domain parts with '@' in between
    const maskedEmail = `${maskedLocalPart}@${maskedDomainPart}`

    return maskedEmail
  }

  const handleSendPhoneOTP = () => {
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
        name: nickName,
      },
      {
        headers: {
          "accept-language": i18next.language,
        },
      }
    )
      .then((res) => {
        nextShow(2)
        // console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSendEmailOTP = () => {
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
        nextShow(2)
        // console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleForgotPassword = () => {
    if (choosed === "email") {
      handleSendEmailOTP()
    } else {
      handleSendPhoneOTP()
    }
  }

  const handleResetPassword = () => {
    API.patch(
      "users/current/reset-password",
      {
        newPassword: password,
        newPasswordConfirm: password,
      },
      {
        headers: {
          Authorization: `Bearer ${resetToken}`,
        },
      }
    )
      .then((res) => {
        setChangedSuccessfully(true)
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  type RootState = {
    theme: ThemeState
  }

  const themeColor = useSelector((state: RootState) => state.theme.color)

  const { t } = useTranslation()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleCheckEmailOTP = () => {
    API.post("auth/check-otpverification-send-resettoken", {
      provider: "email",
      input: email,
      otp: code,
    })
      .then((res) => {
        // console.log(res);
        setResetToken(res.data.data.token)
        nextShow(3)
      })
      .catch((err) => {
        console.log(err)
        setOtpError(true)
      })
  }

  const handleCheckPhoneOTP = () => {
    API.post("auth/check-otpverification-send-resettoken", {
      provider: "phone",
      input: phoneNumber,
      otp: code,
    })
      .then((res) => {
        // console.log(res);
        setResetToken(res.data.data.token)

        nextShow(3)
      })
      .catch((err) => {
        console.log(err)
        setOtpError(true)
      })
  }

  const handleCheckOTP = () => {
    if (choosed === "email") {
      handleCheckEmailOTP()
    } else {
      handleCheckPhoneOTP()
    }
  }

  return (
    <div className="flex h-[100vh] w-full bg-[#21292f]">
      <div className=" m-auto h-[80%] w-[35%] min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
        <Link to="/" className="!text-white">
          <button
            className="relative  top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
            onClick={() => {
              setLocation("/")
              navigate("/")
            }}
          >
            x
          </button>
        </Link>

        <img src={Logo} alt="Logo" className={`-mt-4 ${i18next.language === "ar" ? "mr-[45%]" : "ml-[45%]"}  w-[40px]`} />

        {/* --------------------------------------First Password Reset Page------------------------------------- */}
        <div id="page1" className="m-auto flex h-full w-[320px] flex-col">
          <h1 className="mb-2 mt-3 text-3xl font-bold">{t("reset_password_heading")}</h1>
          <p className="mb-3 text-sm text-zinc-600">{t("reset_password_message")}</p>
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("login_email_placeholder")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
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
                "&$focused": {
                  borderColor: "#40e5da",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  "&$focused": {
                    borderColor: "#40e5da",
                  },
                  borderColor: "#40e5da",
                },
              },
              marginBottom: "10px",
            }}
          />

          <button type="button" id="next" className={`${styles.coloredButton}`} onClick={handleEmailExistCheck} disabled={email === ""}>
            {t("next")}
          </button>

          <div className={`${emailExistError ? "" : "hidden"}`}>
            <Alert severity="error" data-testid="emailExistError" className={`${emailExistError ? "" : "hidden"}`}>
              {t("account_not_found")}
            </Alert>
          </div>
        </div>

        {/* --------------------------------------Second Password Reset Page------------------------------------- */}
        <div id="page2" className="m-auto hidden w-[320px]">
          <h1 className="mb-2 mt-3 text-3xl font-bold">{t("confirmation_code_question")}</h1>
          <p className="mb-3 text-sm text-zinc-600">{t("reset_password_message2")}</p>
          <FormControl>
            <RadioGroup
              onChange={handleOptionChange}
              value={choosed}
              sx={{
                ".MuiButtonBase-root": {
                  color: "#40e5da",
                },
              }}
              name="options"
            >
              <FormControlLabel
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 15,
                  },
                }}
                value="email"
                control={<Radio />}
                label={`${t("sent_email")}${maskedEmail}`}
              />
              <FormControlLabel
                sx={{
                  ".MuiTypography-root": {
                    fontSize: 15,
                  },
                }}
                value="phone"
                control={<Radio />}
                label={`${t("sent_sms")}${lastPhoneDigits}`}
              />
            </RadioGroup>
          </FormControl>

          <button
            type="button"
            id="next"
            className={`${styles.coloredButton}`}
            onClick={() => {
              handleForgotPassword()
              // nextShow(2)
            }}
            disabled={email === ""}
          >
            {t("next")}
          </button>
        </div>
        {/* --------------------------------------Third Password Reset Page------------------------------------- */}

        <div id="page3" className="m-auto hidden w-[320px]">
          <div>
            <h1 className="mb-5 mt-3 text-3xl font-bold">{t("reset_password_message3")}</h1>
            {choosed !== "email" && (
              <div className="mb-4 text-gray-500">
                {t("phone_otp_message")} <span className="text-primary">{phoneNumber}</span>
                <p
                  className="mt-2 w-fit cursor-pointer text-primary"
                  onClick={() => {
                    nextShow(2)
                  }}
                >
                  {t("change_phone")}
                </p>
              </div>
            )}
            {choosed === "email" && (
              <div className="mb-4 text-gray-500">
                {t("email_otp_message")} <span className="text-primary">{email}</span>
                <p
                  className="mt-2 w-fit cursor-pointer text-primary"
                  onClick={() => {
                    nextShow(1)
                  }}
                >
                  {t("change_email")}
                </p>
              </div>
            )}
            {/* <p className="text-sm text-zinc-600 ">Verify your identity by entering the username associated with your X account.</p> */}
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
                    "&$focused": {
                      borderColor: "#40e5da",
                    },
                    borderColor: "#40e5da",
                  },
                },
                marginBottom: "10px",
              }}
            />
            {otpError && <div className="text-red-600">{t("otp_error")}</div>}

            <button type="button" className={`${styles.coloredButton}`} onClick={handleCheckOTP} disabled={code === ""}>
              {t("next")}
            </button>
          </div>
        </div>
        <div id="page4" className="m-auto hidden w-[320px]">
          <div>
            <h1 className="mb-5 mt-3 text-3xl font-bold">{t("new_password")}</h1>
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
                sx={{
                  "& .MuiInputBase-input": {
                    borderColor: "#40e5da",

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
                    "&$focused": {
                      borderColor: "#40e5da",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      "&$focused": {
                        borderColor: "#40e5da",
                      },
                      borderColor: "#40e5da",
                    },
                  },
                  marginBottom: "10px",
                }}
              />

              <span className={`toggle-password absolute text-primary ${i18next.language === "en" || !password ? "right-4" : "left-4"} top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
                <VisibilityIcon className={`${"text-" + getColor(themeColor)}`} />
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
              <div className={`${changedSuccessfully ? "" : "hidden"}  mt-2 text-xs`}>
                <Alert severity="success">{t("password_changed")}</Alert>
              </div>
            </div>
            <button type="button" className={`${styles.coloredButton}`} onClick={handleResetPassword} disabled={checkPassword(password)}>
              {t("confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset

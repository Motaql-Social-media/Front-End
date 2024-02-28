import { TextField } from "@mui/material"
import { Alert } from "@mui/material"
import { styles } from "../../styles/styles"

import { useTranslation } from "react-i18next"
import axios from "axios"
import { useEffect } from "react"
import { useRef } from "react"

const ForthStep = ({ nickName, email, setEmail, emailExistError, setEmailExistError, validEmail, setPosition, position }: { nickName: string; email: string; setEmail: (value: string) => void; emailExistError: boolean; setEmailExistError: React.Dispatch<React.SetStateAction<boolean>>; validEmail: (email: string) => boolean; setPosition: any; position: number }) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleCheckEmailExist = () => {
    API.post("/users/is-user-found", {
      input: email,
    })
      .then((res) => {
        // console.log(res.data.isFound);
        setEmailExistError(res.data.isFound)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (validEmail(email)) {
      handleCheckEmailExist()
    }
  }, [email])

  const handleSendOTP = () => {
    // console.log({
    //   provider: "phone",
    //   input: phoneNumber,
    //   name: nickName,
    // });
    API.post("auth/send-otpverification", {
      provider: "email",
      input: email,
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

  const { t } = useTranslation()

  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButton.current?.removeAttribute("disabled")
  }, [position])

  return (
    <div id="Forth Step" className=" m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome5")}</h1>

        <TextField
          label={t("email")}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: { color: "#40e5da", textAlign: "right" },
          }}
          inputProps={{
            onBlur: handleCheckEmailExist,
            style: {
              border: emailExistError ? "1px solid red" : "",
            },
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
        {!validEmail(email) && <div className="text-red-600"> {t("valid_email")}</div>}
        {/* {!validEmail(email) && (
          <div className={`${email ? "flex" : "hidden"}`}>
            <Alert
              severity="error"
              sx={styles.signupPasswordCheckStyleMiddle}
            ></Alert>
          </div>
        )} */}
        <span className={`ml-3 text-sm text-red-600 ${emailExistError ? "" : "hidden"}`}>{t("email_exist")}</span>
        <button
          type="button"
          id="next"
          ref={nextButton}
          className={`${styles.coloredButton}`}
          onClick={() => {
            nextButton.current?.setAttribute("disabled", "true")

            handleSendOTP()
          }}
          disabled={!validEmail(email) || emailExistError}
        >
          {t("next")}
        </button>
      </div>
    </div>
  )
}

export default ForthStep

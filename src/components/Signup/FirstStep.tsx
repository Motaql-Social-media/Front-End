import { useRef, useEffect } from "react"

import axios from "axios"

import { styles } from "../../styles/styles"

import Birthdate from "./Birthdate"

import { TextField } from "@mui/material"

import { useTranslation } from "react-i18next"

import useRecaptchaV3 from "../hooks/reCaptchaV3"

const FirstStep = ({ nickName, setNickName, speciality, setSpeciality, month, setMonth, day, setDay, year, setYear, setPosition, position }: { nickName: string; setNickName: React.Dispatch<React.SetStateAction<string>>; speciality: string; setSpeciality: React.Dispatch<React.SetStateAction<string>>; month: string; setMonth: (value: string) => void; day: string; setDay: (value: string) => void; year: string; setYear: (value: string) => void; setPosition: any; position: number }) => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const executeRecaptcha = useRecaptchaV3(process.env.REACT_APP_RECAPTCHA_KEY)

  const { t } = useTranslation()

  const handleCheckBirthdate = () => {
    const currentDate = new Date()
    const selectedDate = new Date(`${year}-${month}-${day}`)
    const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear()
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth()
    const dayDiff = currentDate.getDate() - selectedDate.getDate()

    if (ageDiff < 13 || (ageDiff === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      const FirstStep = document.getElementById("First Step")
      const ErrorPage = document.getElementById("Error Page")
      if (FirstStep) {
        FirstStep.style.display = "none"
      }
      if (ErrorPage) {
        ErrorPage.style.display = "block"
      }
    } else {
      setPosition((prev: number) => prev + 1)
    }
  }

  const handleRecaptcha = async () => {
    const token = await executeRecaptcha("login")
    // console.log(token);

    API.post("auth/validate-recaptcha", {
      gRecaptchaResponse: token,
    })
      .then((res) => {
        // console.log(res);
        handleCheckBirthdate()
      })
      .catch((err) => {
        nextButton.current?.removeAttribute("disabled")

        console.log(err)
        // handleCheckBirthdate();
      })
  }

  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButton.current?.removeAttribute("disabled")
  }, [position])

  return (
    <div id="First Step" className="First_Step m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome2")}</h1>
        <div className="relative">
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("name")}
            variant="outlined"
            value={nickName}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 25) // Limit to 25 characters

              setNickName(newValue)
            }}
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
          <div className="absolute right-4 top-1 w-fit text-sm text-gray-500">{nickName ? nickName.length : 0}/25</div>
        </div>
        <div className="relative">
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("speciality")}
            variant="outlined"
            value={speciality}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 30)

              setSpeciality(newValue)
            }}
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
          <div className="absolute right-4 top-1 w-fit text-sm text-gray-500">{speciality ? speciality.length : 0}/30</div>
        </div>

        <div>
          <div className="mes mb-1">
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
          disabled={
            speciality === "" || nickName === "" || year === "" || month === "" || day === ""
            // !validEmail(email) ||
            // emailExistError ||
            // !captchaIsDone
          }
        >
          {t("next")}
        </button>
      </div>
    </div>
  )
}

export default FirstStep

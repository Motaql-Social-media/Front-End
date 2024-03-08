import { useRef, useEffect } from "react"

import axios from "axios"

import { styles } from "../../styles/styles"

import Birthdate from "./Birthdate"

import { TextField } from "@mui/material"

import { useTranslation } from "react-i18next"

import useRecaptchaV3 from "../hooks/reCaptchaV3"

const GFirstStep = ({ nickName, setNickName, speciality, setSpeciality, month, setMonth, day, setDay, year, setYear, setPosition, position }: { nickName: string; setNickName: React.Dispatch<React.SetStateAction<string>>; speciality: string; setSpeciality: React.Dispatch<React.SetStateAction<string>>; month: string; setMonth: (value: string) => void; day: string; setDay: (value: string) => void; year: string; setYear: (value: string) => void; setPosition: any; position: number }) => {
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
      const FirstStep = document.getElementById("Google First Step")
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
        <h1 className="mb-4 mt-3 text-3xl font-bold">Complete some data</h1>
        <TextField
          label={t("name")}
          variant="outlined"
          type="name"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
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
        <div>
          <TextField
            label={t("speciality")}
            variant="outlined"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
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
          disabled={speciality === "" || nickName === "" || year === "" || month === "" || day === ""}
        >
          {t("next")}
        </button>
      </div>
    </div>
  )
}

export default GFirstStep

import { TextField } from "@mui/material"
import { useEffect, useState } from "react"

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"

import { useTranslation } from "react-i18next"
import { styles } from "../../styles/styles"

import i18next from "i18next"
import axios from "axios"
import { useRef } from "react"

const TagStep = ({ userTag, setUserTag, originalUsername, userToken, user, setUser, setPosition, position }: { userTag: string; setUserTag: (userTag: string) => void; originalUsername: string; userToken: string; user: {}; setUser: any; setPosition: any; position: number }) => {
  const [usernameError, setUsernameError] = useState(false)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleCheckUsernameExist = () => {
    if (userTag !== originalUsername)
      API.post("/users/is-user-found", {
        input: userTag,
      })
        .then((res) => {
          // console.log(res.data.isFound);
          setUsernameError(res.data.isFound)
        })
        .catch((err) => {
          console.log(err)
        })
    else setUsernameError(false)
  }

  const handleAssignUsername = () => {
    if (userTag !== originalUsername)
      API.patch(
        "users/current/change-username",
        {
          newUsername: userTag,
        },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      )
        .then((res) => {
          const newuser = {
            ...user,
            username: userTag,
          }
          setUser(newuser)
          setPosition((prev: number) => prev + 1)
        })
        .catch((err) => {
          nextButton.current?.removeAttribute("disabled")

          console.log(err)
        })
    else setPosition((prev: number) => prev + 1)
  }
  const { t } = useTranslation()
  useEffect(() => {
    setUserTag(originalUsername)
  }, [originalUsername])

  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButton.current?.removeAttribute("disabled")
  }, [position])

  return (
    <div id="Tag Step" className=" m-auto hidden w-[350px] dark:text-white">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome8")}</h1>
        <p className="mb-4 text-gray-500">{t("signup_welcome9")}</p>
        <div className="relative">
          <TextField
            label={t("username")}
            variant="outlined"
            value={userTag}
            onChange={(e) => {
              setUserTag(e.target.value.slice(0,25))
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            inputProps={{
              onPaste: (e) => e.preventDefault(),
              onBlur: handleCheckUsernameExist,
              style: {
                border: usernameError ? "1px solid red" : "0px",
              },
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
                  borderColor: "#40e5da",
                  "&$focused": {
                    borderColor: "#40e5da",
                  },
                },
              },
              marginBottom: "10px",
            }}
          />
          {!usernameError && <CheckCircleIcon className={`absolute top-0 ${i18next.language === "en" || !userTag ? "right-4" : "left-4"} -translate-x-2 translate-y-4 text-[18px] text-green-600`} />}
          {usernameError && <ErrorIcon className={`absolute bottom-0 ${i18next.language === "en" || !userTag ? "right-4" : "left-4"} -translate-x-2 -translate-y-8 text-[18px] text-red-600`} />}
          {usernameError && <span className="ml-3 text-sm text-red-600">{t("username_taken")}</span>}
          <button
            type="button"
            id="next"
            ref={nextButton}
            className={`${styles.coloredButton}`}
            onClick={() => {
              nextButton.current?.setAttribute("disabled", "true")

              handleAssignUsername()
            }}
            disabled={!userTag || usernameError}
          >
            {originalUsername === userTag ? t("Skip") : t("next")}
          </button>
          <div className="absolute right-4 top-1 w-fit text-sm text-gray-500">{userTag ? userTag.length : 0}/25</div>
        </div>
      </div>
    </div>
  )
}

export default TagStep

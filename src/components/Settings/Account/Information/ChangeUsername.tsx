import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useTranslation } from "react-i18next"
import axios from "axios"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { changeUsername } from "../../../../store/UserSlice"

import { TextField } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import { styles } from "../../../../styles/styles"

import i18next from "i18next"
import SubpageNavbar from "../../../General/SubpageNavbar"
import Widgets from "../../../Widgets/Widgets"

const ChangeUsername = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userToken = useSelector((state: any) => state.user.token)
  const user = useSelector((state: any) => state.user.user)

  const [userTag, setUserTag] = useState(user.username)

  const handleBack = () => {
    navigate(-1)
  }

  const [usernameError, setUsernameError] = useState(false)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const handleCheckUsernameExist = () => {
    API.post("users/is-user-found", {
      input: userTag,
    })
      .then((res) => {
        // console.log(res.data.isFound)
        setUsernameError(res.data.isFound)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAssignUsername = () => {
    API.post("users/is-user-found", {
      input: userTag,
    })
      .then((res) => {
        setUsernameError(res.data.isFound)
        if (!res.data.isFound)
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
              dispatch(changeUsername(userTag))
              handleBack()
            })
            .catch((err) => {
              console.log(err)
            })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder px-4 dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="change_username" />
        <div className="relative mt-5">
          <TextField
            label={t("username")}
            variant="outlined"
            value={userTag}
            onChange={(e) => {
              setUserTag(e.target.value.slice(0, 25))
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            inputProps={{
              onPaste: (e) => e.preventDefault(),
              onBlur: handleCheckUsernameExist,
              style: {
                border: usernameError && userTag !== user.username ? "1px solid red" : "0px",
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
          {!usernameError && userTag && <CheckCircleIcon className={`absolute top-0 ${i18next.language === "en" || !userTag ? "right-4" : "left-4"}  -translate-x-2 translate-y-4 text-[18px] text-green-600`} />}
          {/* {usernameError && <ErrorIcon className={`absolute bottom-0 ${i18next.language === "en" || !userTag ? "right-4" : "left-4"} -translate-x-2 -translate-y-8 text-[18px] text-red-600`} />} */}
          {usernameError && userTag !== user.username && <span className="mb-5 ml-3 text-sm text-red-600">{t("username_taken")}</span>}
          <button
            type="button"
            className={`${styles.coloredButton}`}
            onClick={() => {
              handleAssignUsername()
            }}
            disabled={!userTag || usernameError || userTag === user.username}
          >
            {t("confirm")}
          </button>
          <div className="absolute right-4 top-1 w-fit text-sm text-gray-500">{userTag ? userTag.length : 0}/25</div>
        </div>
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default ChangeUsername

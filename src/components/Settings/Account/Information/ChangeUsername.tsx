import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

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

const ChangeUsername = () => {
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

  const handleCheckUsernameExist = () => {
    API.post("users/is-user-found", {
      input: userTag,
    })
      .then((res) => {
        console.log(res.data.isFound)
        setUsernameError(res.data.isFound)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAssignUsername = () => {
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
  }
  const { t } = useTranslation()

  return (
    <div className="flex justify-center ">
      <div className="w-[95%]">
        <div className="flex items-center justify-start gap-7 pl-2">
          <div onClick={handleBack} className="cursor-pointer">
            <ArrowBackIcon fontSize="small" />
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            Change Username
          </div>
        </div>
        <div className="relative mt-5">
          <TextField
            label={t("username")}
            variant="outlined"
            value={userTag}
            onChange={(e) => {
              setUserTag(e.target.value)
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            inputProps={{
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
            className={`${styles.coloredButton}`}
            onClick={() => {
              handleAssignUsername()
            }}
            disabled={!userTag || usernameError || userTag === user.username}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeUsername

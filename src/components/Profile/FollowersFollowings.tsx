import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import axios from "axios"
import { useTranslation } from "react-i18next"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useParams } from "react-router"
import i18next from "i18next"
import { ArrowForward } from "@mui/icons-material"
import useCheckAuthentication from "../hooks/useCheckAuthentication"

const FollowersFollowings = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  useCheckAuthentication()

  const { tag } = useParams()

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const { t } = useTranslation()

  const FollowersFollowingsRef = useRef<any>(null)

  useEffect(() => {
    FollowersFollowingsRef.current.scrollTop += scroll
  }, [scroll])

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

  const [name, setName] = useState("")

  useEffect(() => {
    if (tag) {
      API.get(`/users/${tag}/profile`)
        .then((res) => {
          setName(res.data.data.user.name)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [tag])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={FollowersFollowingsRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className="flex items-center justify-start gap-7 px-2">
          <div onClick={handleBack} className="cursor-pointer">
            {i18next.language === "en" && <ArrowBackIcon fontSize="small" />}
            {i18next.language !== "en" && <ArrowForward fontSize="small" />}
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            {name}
            <div className="text-sm text-gray-500">@{tag}</div>
          </div>
        </div>
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("followers"), location: "followers" },
              { title: t("followings"), location: "followings" },
            ]}
            originalUrl={`/${tag}/followers_followings`}
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default FollowersFollowings

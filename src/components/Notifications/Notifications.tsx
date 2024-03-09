import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"
import axios from "axios"
import { useTranslation } from "react-i18next"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router-dom"
import Widgets from "../Widgets/Widgets"
import SubpageNavbar from "../General/SubpageNavbar"

const Notifications = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const { t } = useTranslation()

  const notificationsRef = useRef<any>(null)

  useEffect(() => {
    notificationsRef.current.scrollTop += scroll
  }, [scroll])

  

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={notificationsRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="notifications" />
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("all"), location: "all" },
              { title: t("mentions"), location: "mentions" },
            ]}
            originalUrl={`/notifications`}
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Notifications

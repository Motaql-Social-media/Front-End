import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import axios from "axios"
import { useTranslation } from "react-i18next"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { Outlet } from "react-router-dom"

const Mentions = ({ scroll }: { scroll: number }) => {
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

  const mentionsRef = useRef<any>(null)

  useEffect(() => {
    mentionsRef.current.scrollTop += scroll
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

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={mentionsRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("diaries"), location: "diaries" },
              { title: t("reels"), location: "reels" },
            ]}
            originalUrl={`/notifications/mentions`}
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Mentions

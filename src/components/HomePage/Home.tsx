import { useSelector } from "react-redux"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import ComposePost from "./ComposePost/ComposePost"
import { useTranslation } from "react-i18next"

import { useRef } from "react"

const Home = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user)
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const { t } = useTranslation()

  const homeRef = useRef<any>(null)

  useEffect(() => {
    homeRef.current.scrollTop += scroll
  }, [scroll])

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleWheel = (event: any) => {
      setIsVisible(event.deltaY < 0)
    }

    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  useEffect(() => {
    const handleTouch = (event: any) => {
      setIsVisible(event.deltaY < 0)
    }

    window.addEventListener("touchmove", handleTouch)

    return () => window.removeEventListener("touchmove", handleTouch)
  }, [])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={homeRef} className="home no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div
          className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer border-b bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300 dark:border-b-darkBorder max-[540px]:hidden`}
          onClick={() => {
            window.location.reload()
          }}
        >
          {t("home")}
        </div>
        <ComposePost buttonName="Post" handleNewPost={() => {}} postType="tweet" />
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("diaries"), location: "diaries" },
              { title: t("reels"), location: "reels" },
            ]}
            originalUrl="/home"
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Home

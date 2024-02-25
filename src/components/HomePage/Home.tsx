import { useSelector } from "react-redux"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { useEffect } from "react"
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

  return (
    <div className="flex flex-1 flex-grow-[8]">
      <div ref={homeRef} className="home no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-xs:border-l-0 max-xs:border-r-0 sm:w-[600px]">
        <div
          className="sticky top-0 z-50 cursor-pointer border-b bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md dark:border-b-darkBorder"
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

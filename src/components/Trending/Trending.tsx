import React, { useEffect, useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import SearchComponent from "./SearchComponent"
import HorizontalNavbar from "../General/HorizontalNavbar"
import SubpageNavbar from "../General/SubpageNavbar"
import useCheckAuthentication from "../hooks/useCheckAuthentication"

const Trending = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user)

  useCheckAuthentication()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const { t } = useTranslation()

  const engagementRef = useRef<any>(null)

  useEffect(() => {
    engagementRef.current.scrollTop += scroll
  }, [scroll])

  const [query, setQuery] = useState("")
  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={engagementRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="trending" />
        <div>
          <SearchComponent
            query={query}
            callback={(query: string) => {
              setQuery(query)
            }}
            fromMessage={false}
          />
        </div>
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("diaries"), location: `${query ? query + "/diaries" : "search/diaries"}` },
              { title: t("reels"), location: `${query ? query + "/reels" : "search/reels"}` },
            ]}
            originalUrl="/trending"
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Trending

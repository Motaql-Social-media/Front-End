import React, { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SearchComponent from "../../components/Trending/SearchComponent"
import HorizontalNavbar from "../../components/General/HorizontalNavbar"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import useCheckAuthentication from "../../components/hooks/useCheckAuthentication"

const Trending = ({ scroll }: { scroll: number }) => {
  useCheckAuthentication()

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

import { useEffect, useRef } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import HorizontalNavbar from "../../components/General/HorizontalNavbar"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import useCheckAuthentication from "../../components/hooks/useCheckAuthentication"

const PostEngagement = ({ scroll }: { scroll: number }) => {
  const user = useSelector((state: any) => state.user)

  useCheckAuthentication()

  const { t } = useTranslation()

  const engagementRef = useRef<any>(null)

  useEffect(() => {
    engagementRef.current.scrollTop += scroll
  }, [scroll])

  const { id, tag, type } = useParams()

  //   useEffect(() => {
  //     console.log(id, tag)
  //   }, [id, tag])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={engagementRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="post_engagement" />
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("quotes"), location: "quotes" },
              { title: t("reposts"), location: "reposts" },
              { title: t("likes"), location: "likes" },
            ]}
            originalUrl={`/${tag}/${type}/${id}/engagement`}
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default PostEngagement

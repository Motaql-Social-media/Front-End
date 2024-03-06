import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Reel from "../HomePage/Posts/Reel"
import QuoteReel from "../HomePage/Posts/QuoteReel"
import ComposePost from "../HomePage/ComposePost/ComposePost"
import Replies from "./Replies"

const ReelPage = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  const { id, tag } = useParams()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const { t } = useTranslation()

  const reelPageRef = useRef<any>(null)

  useEffect(() => {
    reelPageRef.current.scrollTop += scroll
  }, [scroll])

  const [isVisible, setIsVisible] = useState(true)

  const handleBack = () => {
    navigate(-1)
  }

  const [reel, setReel] = useState<Reel | null>(null)

  useEffect(() => {
    API.get(`reels/${id}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res)
        setReel(res.data.data.reel)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const addReplyCallback = (reply: any) => {
    setReplies((prev) => [reply, ...prev])
  }

  const [replies, setReplies] = useState<any[]>([])

  const [muted, setMuted] = useState(false)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={reelPageRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className="flex items-center justify-start gap-7 pl-2 max-[540px]:hidden">
          <div onClick={handleBack} className="cursor-pointer">
            <ArrowBackIcon fontSize="small" />
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            Reel
          </div>
        </div>
        {reel &&
          (reel.type !== "Quote" ? (
            <Reel
              inPostPage={false}
              content={reel.type === "Repost" ? reel.originalReel.content : reel.content}
              createdAt={reel.type === "Repost" ? reel.originalReel.createdAt : reel.createdAt}
              isBookmarked={reel.type === "Repost" ? reel.originalReel.isBookmarked : reel.isBookmarked}
              isReacted={reel.type === "Repost" ? reel.originalReel.isReacted : reel.isReacted}
              isRereeled={reel.type === "Repost" ? reel.originalReel.isRereeled : reel.isRereeled}
              mentions={reel.type === "Repost" ? reel.originalReel.mentions : reel.mentions}
              originalReel={reel.originalReel}
              originalReeler={reel.originalReeler}
              reReelCount={reel.type === "Repost" ? reel.originalReel.reReelCount : reel.reReelCount}
              reactCount={reel.type === "Repost" ? reel.originalReel.reactCount : reel.reactCount}
              reelUrl={reel.type === "Repost" ? reel.originalReel.reelUrl : reel.reelUrl}
              reeler={reel.reeler}
              repliesCount={reel.type === "Repost" ? reel.originalReel.repliesCount : reel.repliesCount}
              postType={reel.type}
              id={reel.type === "Repost" ? reel.originalReel.reelId : reel.reelId}
              topic={reel.type === "Repost" ? reel.originalReel.topics[0] : reel.topics[0]}
              reels={[]}
              setReels={() => {}}
              muted={muted}
              setMuted={setMuted}
            />
          ) : (
            <QuoteReel muted={muted} setMuted={setMuted} inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} id={reel.reelId} topic={""} reels={[]} setReels={() => {}} />
          ))}
        <div className="border-b border-darkBorder">
          <div className="p-2 text-gray-500">
            Replying to <span className="text-primary hover:underline ">@{tag}</span>
          </div>
          <ComposePost buttonName="Post" postId={id} postType="reply_reel" addTweetCallback={addReplyCallback} addReelCallback={() => {}} />
        </div>
        <div>
          {/* <Replies replies={replies} setReplies={setReplies} id={id} type="reel" /> */}
        </div>
      </div>
    </div>
  )
}

export default ReelPage

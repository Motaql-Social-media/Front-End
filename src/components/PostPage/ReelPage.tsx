import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import Reel from "../HomePage/Posts/Reel"
import QuoteReel from "../HomePage/Posts/QuoteReel"
import ComposePost from "../HomePage/ComposePost/ComposePost"
import Replies from "./Replies"
import SubpageNavbar from "../General/SubpageNavbar"
import useCheckAuthentication from "../hooks/useCheckAuthentication"
import Loading from "../General/Loading"
import FetchPostError from "../General/FetchPostError"
import i18next from "i18next"

const ReelPage = ({ scroll }: { scroll: number }) => {
  useCheckAuthentication()

  const user = useSelector((state: any) => state.user.user)

  const userToken = useSelector((state: any) => state.user.token)

  const { id, tag } = useParams()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const { t } = useTranslation()

  const reelPageRef = useRef<any>(null)

  useEffect(() => {
    reelPageRef.current.scrollTop += scroll
  }, [scroll])

  const [reel, setReel] = useState<Reel | null>(null)

  const [loading, setLoading] = useState(true)

  const [fetchReelError, setFetchReelError] = useState(false)

  useEffect(() => {
    API.get(`reels/${id}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res)
        setReel(res.data.data.reel)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 400) {
          setFetchReelError(true)
        }
      })
  }, [id])

  const addReplyCallback = (reply: any) => {
    const r = { ...reply, isBookmarked: false, isReacted: false, isRereeled: false, originalReeler: { username: tag }, reReelCount: 0, reactCount: 0, repliesCount: 0, replier: { bio: user.bio, followersCount: user.followersCount, followingsCount: user.followingsCount, imageUrl: user.imageUrl, isBlocked: false, isFollowed: false, isMuted: false, jobtitle: user.jobtitle, name: user.name, username: user.username, userId: user.userId }, type: "Reply" }
    setReplies((prev) => [r, ...prev])
  }

  const [replies, setReplies] = useState<any[]>([])

  const [muted, setMuted] = useState(false)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      {fetchReelError && <FetchPostError type="reel" />}
      {!fetchReelError && (
        <div ref={reelPageRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
          <SubpageNavbar title="reel" />
          {loading && <Loading />}
          {!loading &&
            reel &&
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
              {t("replying")} <span className="text-primary hover:underline ">@{tag}</span>
            </div>
            <ComposePost buttonName="Post" postId={id} postType="reply_reel" addTweetCallback={addReplyCallback} addReelCallback={() => {}} />
          </div>
          <div>
            <Replies replies={replies} setReplies={setReplies} id={id} type="reel" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ReelPage

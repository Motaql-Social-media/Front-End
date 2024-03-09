import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Reel from "../HomePage/Posts/Reel"
import QuoteReel from "../HomePage/Posts/QuoteReel"

const ProfileReels = () => {
  const [reels, setReels] = useState<Diary[]>([])

  const userToken = useSelector((state: any) => state.user.token)

  const { tag } = useParams()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  useEffect(() => {
    if (tag)
      API.get(`users/${tag}/reels`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data.data.reels)
          setReels(res.data.data.reels)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [tag])

  const [muted, setMuted] = useState(false)

  return (
    <div>
      {reels &&
        reels.length > 0 &&
        reels.map((reel: any) => {
          return (
            <div key={reel.reelId}>
              {reel.type !== "Quote" ? (
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
                  reels={reels}
                  setReels={setReels}
                  muted={muted}
                  setMuted={setMuted}
                />
              ) : (
                <QuoteReel muted={muted} setMuted={setMuted} inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} id={reel.reelId} topic={""} reels={reels} setReels={setReels} />
              )}
            </div>
          )
        })}
    </div>
  )
}

export default ProfileReels

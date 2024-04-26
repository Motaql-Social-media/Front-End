import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Reel from "../HomePage/Posts/Reel"
import QuoteReel from "../HomePage/Posts/QuoteReel"
import { t } from "i18next"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"
import i18next from "i18next"

const ProfileReels = () => {
  const [reels, setReels] = useState<Diary[]>([])

  const userToken = useSelector((state: any) => state.user.token)

  const { tag } = useParams()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const user = useSelector((state: any) => state.user.user)

  const fetchReels = () => {
    if (tag)
      API.get(`users/${tag}/reels?page=${page}&limit=20`)
        .then((res) => {
          // console.log(res.data.data.reels)
          if (res.data.data.reels.length < 20) setFinished(true)
          setLoading(false)
          setReels((prev) => [...prev, ...res.data.data.reels])
        })
        .catch((err) => {
          console.log(err)
        })
  }

  useEffect(() => {
    fetchReels()
  }, [tag, user, page])

  useEffect(() => {
    setReels([])
    setPage(1)
    setFinished(false)
    setLoading(true)
  }, [tag, user])

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  const [muted, setMuted] = useState(false)

  return (
    <>
      {loading && <Loading />}
      {!loading && (
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
          {reels.length === 0 && <div className="mt-5 text-center text-2xl font-bold text-primary">{t("no_reels_profile", { name: tag })}</div>}
          {reels.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default ProfileReels

import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import Reel from "../HomePage/Posts/Reel"
import QuoteReel from "../HomePage/Posts/QuoteReel"
import { t } from "i18next"
import Loading from "../General/Loading"
import ElementVisibleObserver from "../General/ElementVisibleObserver"

const TrendReels = () => {
  const [reels, setReels] = useState<Diary[]>([])

  const { query } = useParams()

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const fetchReels = () => {
    API.get(`reels/supporting/${query}?page=${page}&limit=20`)
      .then((res) => {
        console.log(res.data.data.reels)
        setReels(res.data.data.reels)
        setLoading(false)
        if (res.data.data.reels.length < 20) setFinished(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchReels()
  }, [query, page])

  const [muted, setMuted] = useState(false)

  const handleFetchMore = () => { 
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

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
          {reels.length === 0 && <div className=" flex h-96 items-center justify-center text-center text-2xl font-bold text-primary">{t("no_reels")}</div>}
          {reels.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default TrendReels

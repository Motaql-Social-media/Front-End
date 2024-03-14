import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Reel from "../HomePage/Posts/Reel"
import QuoteReel from "../HomePage/Posts/QuoteReel"
import { t } from "i18next"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

const ReelsMentions = () => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)
  const [reels, setReels] = useState<Reel[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchReels = () => {
    API.get(`users/current/reel-mentions?page=${page}&limit=20`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.data.data.mentions.length < 20) setFinished(true)
        setLoading(false)
        setReels((prev) => [...prev, ...res.data.data.mentions])

        // console.log(res.data.data.mentions)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchReels()
  }, [page])

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
          {reels.map((reel: any) => {
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
          {reels.length === 0 && <div className="flex h-96 items-center justify-center text-2xl font-bold text-primary">{t("no_reels_mentions")}</div>}
          {reels.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default ReelsMentions

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import QuotePost from "../HomePage/Posts/QuotePost"
import NoQuotes from "./NoQuotes"
import QuoteReel from "../HomePage/Posts/QuoteReel"
import Loading from "../General/Loading"
import ElementVisibleObserver from "../General/ElementVisibleObserver"

const Quotes = () => {
  const { id, type } = useParams()
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [diaryQuotes, setDiaryQuotes] = useState<any[]>([])
  const [reelQuotes, setReelQuotes] = useState<any[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchQuotes = () => {
    if (id) {
      if (type === "diary") {
        API.get(`/tweets/${id}/quotes?page${page}&limit=20`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            // console.log(res.data.data.retweets)
            if (res.data.data.retweets.length < 20) setFinished(true)
            setLoading(false)

            setDiaryQuotes((prev) => [...prev, ...res.data.data.retweets])
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        API.get(`reels/${id}/rereels?page${page}&limit=20`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            // console.log(res.data.data.rereels)
            if (res.data.data.rereels.length < 20) setFinished(true)
            setReelQuotes((prev) => [...prev, ...res.data.data.rereels])
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [id, page])

  const [muted, setMuted] = useState(false)

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <>
      {
        loading && <Loading />  
      }
      {!loading && (
        <div>
          {diaryQuotes &&
            diaryQuotes.length > 0 &&
            type === "diary" &&
            diaryQuotes.map((q: any) => (
              <div key={q.tweetId}>
                <QuotePost content={q.content} media={q.media.map((m: any) => m.url)} createdAt={q.createdAt} isBookmarked={q.isBookmarked} isReacted={q.isReacted} isRetweeted={q.isRetweeted} reTweetCount={q.reTweetCount} reactCount={q.reactCount} repliesCount={q.repliesCount} retweetId={q.tweetId} retweeter={q.tweeter} tweet={q.originalTweet} tweeter={q.originalTweeter} quotes={diaryQuotes} setQuotes={setDiaryQuotes} mentions={q.mentions} />
              </div>
            ))}
          {reelQuotes &&
            reelQuotes.length > 0 &&
            type === "reel" &&
            reelQuotes.map((q: any) => (
              <div key={q.reelId}>
                <QuoteReel muted={muted} setMuted={setMuted} inPostPage={false} content={q.content} createdAt={q.createdAt} isBookmarked={q.isBookmarked} isReacted={q.isReacted} isRereeled={q.isRereeled} mentions={q.mentions} originalReel={q.originalReel} originalReeler={q.originalReeler} reReelCount={q.reReelCount} reactCount={q.reactCount} reelUrl={q.reelUrl} reeler={q.reeler} repliesCount={q.repliesCount} id={q.reelId} topic={""} reels={setReelQuotes} setReels={reelQuotes} />
              </div>
            ))}
          {diaryQuotes.length === 0 && reelQuotes.length === 0 && <NoQuotes />}
          {diaryQuotes.length === 0 && reelQuotes.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default Quotes

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import QuotePost from "../HomePage/Posts/QuotePost"
import NoQuotes from "./NoQuotes"

const Quotes = () => {
  const { id, type } = useParams()
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [diaryQuotes, setDiaryQuotes] = useState([])
  const [reelQuotes, setReelQuotes] = useState([])
  

  useEffect(() => {
    if (id) {
      if (type === "diary") {
        API.get(`/tweets/${id}/quotes`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            console.log(res.data.data.retweets)
            setDiaryQuotes(res.data.data.retweets)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        API.get(`reels/${id}/rereels`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((res) => {
            // console.log(res.data.data)
            setReelQuotes(res.data.data.rereels)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }, [id])

  return (
    <div>
      {diaryQuotes &&
        diaryQuotes.length > 0 &&
        diaryQuotes.map((q: any) => (
          <div key={q.retweetId}>
            <QuotePost content={q.content} media={q.media.map((m: any) => m.url)} createdAt={q.createdAt} isBookmarked={q.isBookmarked} isReacted={q.isReacted} isRetweeted={q.isRetweeted} reTweetCount={q.reTweetCount} reactCount={q.reactCount} repliesCount={q.repliesCount} retweetId={q.tweetId} retweeter={q.tweeter} tweet={q.originalTweet} tweeter={q.originalTweeter} quotes={diaryQuotes} setQuotes={setDiaryQuotes} mentions={q.mentions} />
          </div>
        ))}
      {diaryQuotes.length === 0 && <NoQuotes />}
    </div>
  )
}

export default Quotes

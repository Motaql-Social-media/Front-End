import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import QuotePost from "../HomePage/Posts/QuotePost"
import NoQuotes from "./NoQuotes"

const Quotes = () => {
  const { id } = useParams()
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    if (id) {
      API.get(`/tweets/${id}/quotes`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((res) => {
          console.log(res.data.data.retweets)
          setQuotes(res.data.data.retweets)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [id])
  return (
    <div>
      {quotes &&
        quotes.length > 0 &&
        quotes.map((q: any) => (
          <div key={q.retweetId}>
            <QuotePost content={q.content} gifUrl={q.gifUrl} imageUrls={q.imageUrls} createdAt={q.createdAt} isBookmarked={q.isBookmarked} isReacted={q.isReacted} isRetweeted={q.isRetweeted} reTweetCount={q.reTweetCount} reactCount={q.reactCount} repliesCount={q.repliesCount} retweetId={q.retweetId} retweeter={q.tweeter} tweet={q.originalTweet} tweeter={q.originalTweeter} quotes={quotes} setQuotes={setQuotes} />

            {/* <QuotePost content={q.content} gifUrl={q.gifUrl} imageUrls={q.imageUrls} createdAt={q.createdAt} isBookmarked={q.isBookmarked} isReacted={q.isReacted} isRetweeted={q.isRetweeted} reTweetCount={q.reTweetCount} reactCount={q.reactCount} repliesCount={q.repliesCount} retweetId={q.retweetId} retweeter={q.retweeter} tweet={q.tweet} tweeter={q.tweeter} quotes={quotes} setQuotes={setQuotes} /> */}
          </div>
        ))}
      {quotes.length === 0 && <NoQuotes />}
    </div>
  )
}

export default Quotes

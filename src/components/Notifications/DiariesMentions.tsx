import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Post from "../HomePage/Posts/Post"
import QuotePost from "../HomePage/Posts/QuotePost"
import { t } from "i18next"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

const DiariesMentions = () => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)
  const [diaries, setDiaries] = useState<Diary[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchDiaries = () => {
    API.get(`users/current/tweet-mentions?page=${page}&limit=20`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.data.data.mentions.length < 20) setFinished(true)
        setDiaries((prev) => [...prev, ...res.data.data.mentions])
        setLoading(false)

        // console.log(res.data.data.mentions)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchDiaries()
  }, [page])

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
          {diaries.map((post: any) => {
            return (
              <div key={post.tweetId}>
                {post.type !== "Quote" ? (
                  <Post
                    cascade={false}
                    inPostPage={false}
                    postType={post.type}
                    id={post.type === "Repost" ? post.originalTweet.tweetId : post.tweetId}
                    date={post.type === "Repost" ? post.originalTweet.createdAt : post.createdAt}
                    description={post.type === "Repost" ? post.originalTweet.content : post.content}
                    media={post.type === "Repost" ? post.originalTweet.media.map((m: any) => m.url) : post.media.map((m: any) => m.url)}
                    replyCount={post.type === "Repost" ? post.originalTweet.repliesCount : post.repliesCount}
                    repostCount={post.type === "Repost" ? post.originalTweet.reTweetCount : post.reTweetCount}
                    likeCount={post.type === "Repost" ? post.originalTweet.reactCount : post.reactCount}
                    isLiked={post.type === "Repost" ? post.originalTweet.isReacted : post.isReacted}
                    isReposted={post.type === "Repost" ? post.originalTweet.isRetweeted : post.isRetweeted}
                    isBookmarked={post.type === "Repost" ? post.originalTweet.isBookmarked : post.isBookmarked}
                    tweeter={post.tweeter}
                    posts={diaries}
                    setPosts={setDiaries}
                    displayFooter={true}
                    mentions={post.type === "Repost" ? post.originalTweet.mentions : post.mentions}
                    originalTweet={post.originalTweet}
                    originalTweeter={post.originalTweeter}
                    poll={post.poll}
                  />
                ) : (
                  <QuotePost mentions={post.mentions} content={post.content} media={post.media.map((m: any) => m.url)} createdAt={post.createdAt} isBookmarked={post.isBookmarked} isReacted={post.isReacted} isRetweeted={post.isRetweeted} reTweetCount={post.reTweetCount} reactCount={post.reactCount} repliesCount={post.repliesCount} retweetId={post.tweetId} retweeter={post.tweeter} tweet={post.originalTweet} tweeter={post.originalTweeter} quotes={[]} setQuotes={() => {}} />
                )}
              </div>
            )
          })}
          {diaries.length === 0 && <div className="flex h-96 items-center justify-center text-2xl font-bold text-primary">{t("no_diaries_mentions")}</div>}
          {diaries.length === 0 && <div className="h-[150vh]"></div>}
          <ElementVisibleObserver handler={handleFetchMore} />
        </div>
      )}
    </>
  )
}

export default DiariesMentions

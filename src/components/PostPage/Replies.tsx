import { useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Post from "../HomePage/Posts/Post"
import Reel from "../HomePage/Posts/Reel"
import { useState } from "react"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"
import i18next from "i18next"

const Replies = ({ replies, setReplies, id, type }: { replies: any; setReplies: any; id: string | undefined; type: string }) => {
  const userToken = useSelector((state: any) => state.user.token)
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const [repliesPage, setRepliesPage] = useState<number>(1)
  const [finishedReplies, setFinishedReplies] = useState<boolean>(false)

  const [loading, setLoading] = useState(true)

  const fetchReplies = () => {
    // console.log("fetching replies")
    if (type === "diary") {
      API.get(`tweets/${id}/replies?page=${repliesPage}&limit=20`)
        .then((res) => {
          // console.log(res.data.data.replies)
          if (res.data.data.replies.length < 20) setFinishedReplies(true)
          setLoading(false)
          setReplies((prev: any) => [...prev, ...res.data.data.replies])
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      API.get(`reels/${id}/replies?page=${repliesPage}&limit=20`)
        .then((res) => {
          // console.log(res.data.data.replies)
          if (res.data.data.replies.length < 20) setFinishedReplies(true)
          setLoading(false)

          setReplies((prev: any) => [...prev, ...res.data.data.replies])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    fetchReplies()
  }, [repliesPage, id])

  useEffect(() => {
    if (id) {
      setReplies([])
      setLoading(true)
      setRepliesPage(1)
    }
  }, [id])

  const [muted, setMuted] = useState(false)

  const handleFetchMore = () => {
    if (!finishedReplies) {
      setRepliesPage((prev) => prev + 1)
    }
  }

  const getProcessedDescription = (description: string) => {
    return description?.replace(/(?:\r\n|\r|\n)/g, " <br> ")
  }

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          {type === "diary" && (
            <div>
              {replies.map((reply: any) => (
                <div key={reply.replyId} className="border-b border-darkBorder hover:dark:bg-darkHover">
                  <Post cascade={false} inPostPage={true} postType={reply.type} id={reply.replyId} date={reply.createdAt} description={getProcessedDescription(reply.content)} media={reply.media.map((m: any) => m.url)} replyCount={reply.repliesCount} repostCount={reply.reTweetCount} likeCount={reply.reactCount} isLiked={reply.isReacted} isReposted={reply.isRetweeted} isBookmarked={reply.isBookmarked} tweeter={reply.replier} posts={replies} setPosts={setReplies} displayFooter={true} mentions={reply.mentions} originalTweet={{}} originalTweeter={{}} poll={null} />
                  {reply.replies.replyId && (
                    <div className="relative ml-[5%] w-[95%]">
                      <Post
                        cascade={false}
                        inPostPage={true}
                        postType={reply.replies.type}
                        id={reply.replies.replyId}
                        date={reply.replies.createdAt}
                        description={getProcessedDescription(reply.replies.content)}
                        media={reply.replies.media.map((m: any) => m.url)}
                        replyCount={reply.replies.repliesCount}
                        repostCount={reply.replies.reTweetCount}
                        likeCount={reply.replies.reactCount}
                        isLiked={reply.replies.isReacted}
                        isReposted={reply.replies.isRetweeted}
                        isBookmarked={reply.replies.isBookmarked}
                        tweeter={reply.replies.replier}
                        posts={replies}
                        setPosts={setReplies}
                        displayFooter={true}
                        mentions={reply.replies.mentions}
                        originalTweet={{}}
                        originalTweeter={{}}
                        poll={null}
                      />
                      <div className="absolute -left-[1%] -top-5 flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <div className="h-12 w-[2px] bg-primary"></div>
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && replies.length === 0 && <div className="h-[150vh]"></div>}
              <ElementVisibleObserver handler={handleFetchMore} />
            </div>
          )}
          {type === "reel" && (
            <div>
              {replies &&
                replies.length > 0 &&
                replies.map((reel: any) => (
                  <div key={reel.replyId}>
                    <Reel inPostPage={true} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={""} reeler={reel.replier} repliesCount={reel.repliesCount} postType={reel.type} id={reel.replyId} topic={""} reels={replies} setReels={setReplies} muted={muted} setMuted={setMuted} />
                  </div>
                ))}
              {loading && replies.length === 0 && <div className="h-[150vh]"></div>}
              <ElementVisibleObserver handler={handleFetchMore} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Replies

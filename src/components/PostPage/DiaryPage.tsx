import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useParams } from "react-router-dom"
import Post from "../HomePage/Posts/Post"
import QuotePost from "../HomePage/Posts/QuotePost"
import ComposePost from "../HomePage/ComposePost/ComposePost"
import Replies from "./Replies"

const PostPage = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  const { id, tag } = useParams()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const { t } = useTranslation()

  const diaryPageRef = useRef<any>(null)

  useEffect(() => {
    diaryPageRef.current.scrollTop += scroll
  }, [scroll])

  const [isVisible, setIsVisible] = useState(true)

  const handleBack = () => {
    navigate(-1)
  }

  const [diary, setDiary] = useState<Diary | null>(null)

  useEffect(() => {
    API.get(`tweets/${id}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data.data.tweet)
        setDiary(res.data.data.tweet)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const addReplyCallback = (reply: any) => {
    setReplies((prev) => [reply, ...prev])
  }

  const [replies, setReplies] = useState<any[]>([])

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={diaryPageRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className="flex items-center justify-start gap-7 pl-2 max-[540px]:hidden">
          <div onClick={handleBack} className="cursor-pointer">
            <ArrowBackIcon fontSize="small" />
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            Diary
          </div>
        </div>
        {diary &&
          (diary.type !== "Quote" ? (
            <Post
              cascade={false}
              inPostPage={true}
              postType={diary.type}
              id={diary.type === "Repost" ? diary.originalTweet.tweetId : diary.tweetId}
              date={diary.type === "Repost" ? diary.originalTweet.createdAt : diary.createdAt}
              description={diary.type === "Repost" ? diary.originalTweet.content : diary.content}
              media={diary.type === "Repost" ? diary.originalTweet.media.map((m: any) => m.url) : diary.media.map((m: any) => m.url)}
              replyCount={diary.type === "Repost" ? diary.originalTweet.repliesCount : diary.repliesCount}
              repostCount={diary.type === "Repost" ? diary.originalTweet.reTweetCount : diary.reTweetCount}
              likeCount={diary.type === "Repost" ? diary.originalTweet.reactCount : diary.reactCount}
              isLiked={diary.type === "Repost" ? diary.originalTweet.isReacted : diary.isReacted}
              isReposted={diary.type === "Repost" ? diary.originalTweet.isRetweeted : diary.isRetweeted}
              isBookmarked={diary.type === "Repost" ? diary.originalTweet.isBookmarked : diary.isBookmarked}
              tweeter={diary.tweeter}
              posts={{}}
              setPosts={() => {}}
              displayFooter={true}
              mentions={diary.type === "Repost" ? diary.originalTweet.mentions : diary.mentions}
              originalTweet={diary.originalTweet}
              originalTweeter={diary.originalTweeter}
              poll={diary.poll}
            />
          ) : (
            <QuotePost mentions={diary.mentions} content={diary.content} media={diary.media.map((m: any) => m.url)} createdAt={diary.createdAt} isBookmarked={diary.isBookmarked} isReacted={diary.isReacted} isRetweeted={diary.isRetweeted} reTweetCount={diary.reTweetCount} reactCount={diary.reactCount} repliesCount={diary.repliesCount} retweetId={diary.tweetId} retweeter={diary.tweeter} tweet={diary.originalTweet} tweeter={diary.originalTweeter} quotes={[]} setQuotes={() => {}} />
          ))}
        <div className="border-b border-darkBorder">
          <div className="p-2 text-gray-500">
            Replying to <span className="text-primary hover:underline ">@{tag}</span>
          </div>
          <ComposePost buttonName="Post" postId={id} postType="reply" addTweetCallback={addReplyCallback} addReelCallback={() => {}} />
        </div>
        <div>
          <Replies replies={replies} setReplies={setReplies} id={id} type='diary'/>
        </div>
      </div>
    </div>
  )
}

export default PostPage

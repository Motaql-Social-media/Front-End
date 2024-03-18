import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useParams } from "react-router-dom"
import Post from "../../components/HomePage/Posts/Post"
import QuotePost from "../../components/HomePage/Posts/QuotePost"
import ComposePost from "../../components/HomePage/ComposePost/ComposePost"
import Replies from "../../components/PostPage/Replies"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import useCheckAuthentication from "../../components/hooks/useCheckAuthentication"
import Loading from "../../components/General/Loading"
import { t } from "i18next"
import FetchPostError from "../../components/General/FetchPostError"
import i18next from "i18next"

const PostPage = ({ scroll }: { scroll: number }) => {
  useCheckAuthentication()

  const userToken = useSelector((state: any) => state.user.token)

  const { id, tag } = useParams()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const diaryPageRef = useRef<any>(null)

  const [fetchDiaryError, setFetchDiaryError] = useState(false)

  useEffect(() => {
    diaryPageRef.current.scrollTop += scroll
  }, [scroll])

  const [diary, setDiary] = useState<Diary | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // console.log(id, tag)

    API.get(`tweets/${id}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data.data.tweet)
        setDiary(res.data.data.tweet)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 400) {
          setFetchDiaryError(true)
        }
      })
  }, [id, tag])

  const addReplyCallback = (reply: any) => {
    setReplies((prev) => [reply, ...prev])
  }

  const [replies, setReplies] = useState<any[]>([])

  const handleAddReply = () => {
    setDiary((prev) => {
      if (prev) {
        return {
          ...prev,
          repliesCount: prev.repliesCount + 1,
        }
      }
      return prev
    })
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      {fetchDiaryError && <FetchPostError type="diary" />}
      {!fetchDiaryError && (
        <div ref={diaryPageRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
          <SubpageNavbar title="diary" />
          {loading && <Loading />}
          {!loading &&
            diary &&
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
              {t("replying")}
              <span className="text-primary hover:underline ">@{tag}</span>
            </div>
            <ComposePost addReplyCallback={handleAddReply} buttonName="Post" postId={id} postType="reply" addTweetCallback={addReplyCallback} addReelCallback={() => {}} />
          </div>
          <div>
            <Replies replies={replies} setReplies={setReplies} id={id} type="diary" />
          </div>
        </div>
      )}
    </div>
  )
}

export default PostPage

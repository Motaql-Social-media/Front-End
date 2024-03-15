import { Skeleton } from "@mui/material"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import React, { useEffect, useState } from "react"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import i18next from "i18next"
import HoveredProfile from "./HoveredProfile"
import { useNavigate } from "react-router-dom"
import PollBody from "./PollBody"
import { t } from "i18next"
const Post = ({
  cascade,
  inPostPage,
  postType,
  id,
  date,
  description,
  media,
  replyCount,
  repostCount,
  likeCount,
  isLiked,
  isReposted,
  isBookmarked,
  tweeter,
  posts,
  setPosts,
  displayFooter,
  mentions,
  originalTweet,
  originalTweeter,
  poll,
}: {
  cascade: boolean
  inPostPage: boolean
  postType: string
  id: string
  date: string
  description: string
  media: any
  replyCount: number
  repostCount: number
  likeCount: number
  isLiked: boolean
  isReposted: boolean
  isBookmarked: boolean
  tweeter: any
  posts: any
  setPosts: any
  displayFooter: boolean
  mentions: any
  originalTweet: any
  originalTweeter: any
  poll: any
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const [timeoutRef, setTimeoutRef] = useState<any>(null)

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef)
    const timer = setTimeout(() => setIsVisible(true), 1000) // Change 1000 to desired delay
    setTimeoutRef(timer)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef)
    setIsVisible(false)
  }

  const [followState, setFollowState] = useState<boolean>(tweeter.isFollowed)
  const navigate = useNavigate()

  const handlePostClick = () => {
    navigate(`/${tweeter.username}/diary/${id}`)
  }

  const getProcessedDescription = (description: string) => {
    return description?.replace(/(?:\r\n|\r|\n)/g, " <br> ")
  }

  return (
    <div className={`cursor-pointer ${postType !== "retweet" ? "border-b" : ""} border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover`} onClick={handlePostClick}>
      <div className={`relative text-sm ${postType === "Repost" ? "" : "hidden"} text-primary no-underline hover:underline`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigate(`/${tweeter.username}`)}>
        <CachedOutlinedIcon
          className={`${i18next.language === "en" ? "mr-2" : "ml-2"}  text-primary`}
          sx={{
            fontSize: 25,
          }}
        />
        <span>
          {tweeter.username} {t("reposted")}
        </span>
        {isVisible && <HoveredProfile hoveredUser={tweeter} state={followState} setState={setFollowState} />}
      </div>
      {postType === "Reply" && !inPostPage && (
        <div className="mb-2 text-primary">
          {t("replying")} @{originalTweeter.username}
        </div>
      )}
      <div>
        <PostHeader base={"diary"} tweeter={postType === "Repost" ? originalTweeter : tweeter} date={date} id={id} type={postType === "Repost" ? originalTweet.type : postType} posts={posts} setPosts={setPosts} parent="diary" />
      </div>
      {displayFooter && !poll?.pollId && (
        <div>
          <PostBody description={getProcessedDescription(description)} media={media} mentions={mentions} />
        </div>
      )}
      {poll?.pollId && (
        <div>
          <PollBody poll={poll} mentions={mentions} id={id} />
        </div>
      )}
      {/* {!displayFooter && (
        <Skeleton
          sx={{
            width: "70%",
            height: "70%",
          }}
        />
      )} */}
      {displayFooter && postType !== "fromQuote" && (
        <div>
          <PostFooter id={id} replyCount={replyCount} reposted={isReposted} repostsNum={repostCount} liked={isLiked} likesNum={likeCount} isBookmarked={isBookmarked} username={postType === "Repost" ? originalTweeter.username : tweeter.username} />
        </div>
      )}
    </div>
  )
}

export default Post

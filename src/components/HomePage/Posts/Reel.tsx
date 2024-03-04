import PostHeader from "./PostHeader"
import ReelBar from "./ReelBar"
import ReelBody from "./ReelBody"
import { useTranslation } from "react-i18next"
import i18next from "i18next"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import HoveredProfile from "./HoveredProfile"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Reel = ({ inPostPage, content, createdAt, isBookmarked, isReacted, isRereeled, mentions, originalReel, originalReeler, reReelCount, reactCount, reelUrl, reeler, repliesCount, postType, id, topic, reels, setReels }: { inPostPage: boolean; content: string; createdAt: string; isBookmarked: boolean; isReacted: boolean; isRereeled: boolean; mentions: any; originalReel: any; originalReeler: any; reReelCount: number; reactCount: number; reelUrl: string; reeler: any; repliesCount: number; postType: string; id: string; topic: string; reels: any; setReels: any }) => {
  const handleReelClick = () => {
    console.log("Reel")
  }

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

  const [followState, setFollowState] = useState<boolean>(reeler.isFollowed)
  const navigate = useNavigate()
  return (
    <div className="cursor-pointer border-b border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover max-xs:p-2" onClick={handleReelClick}>
      <div className={`relative text-sm ${postType === "Repost" ? "" : "hidden"} text-primary no-underline hover:underline`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigate(`/${reeler.username}`)}>
        <CachedOutlinedIcon
          className={`${i18next.language === "en" ? "mr-2" : "ml-2"}  text-primary`}
          sx={{
            fontSize: 25,
          }}
        />
        <span>{reeler.username} reposted</span>
        {isVisible && <HoveredProfile hoveredUser={reeler} state={followState} setState={setFollowState} />}
      </div>
      <div>
        <PostHeader base={"reel"} tweeter={postType === "Repost" ? originalReeler : reeler} date={createdAt} id={id} type={postType} posts={reels} setPosts={setReels} parent="reel" />
      </div>
      <div className="flex w-full">
        {postType !== "fromQuote" && <ReelBar id={id} replyCount={repliesCount} reposted={isRereeled} repostsNum={reReelCount} liked={isReacted} likesNum={reactCount} topic={topic} isBookmarked={isBookmarked} username={postType === "ReReel" ? originalReeler.username : reeler.username} />}
        <ReelBody media={reelUrl} mentions={mentions} content={content} displayReel={true} />
      </div>
    </div>
  )
}

export default Reel

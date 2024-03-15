import PostHeader from "./PostHeader"
import ReelBody from "./ReelBody"
import Reel from "./Reel"
import ReelBar from "./ReelBar"
import { useNavigate } from "react-router-dom"

const QuoteReel = ({ muted, setMuted, inPostPage, content, createdAt, isBookmarked, isReacted, isRereeled, mentions, originalReel, originalReeler, reReelCount, reactCount, reelUrl, reeler, repliesCount, id, topic, reels, setReels }: { muted: boolean; setMuted: any; inPostPage: boolean; content: string; createdAt: string; isBookmarked: boolean; isReacted: boolean; isRereeled: boolean; mentions: any; originalReel: any; originalReeler: any; reReelCount: number; reactCount: number; reelUrl: string; reeler: any; repliesCount: number; id: string; topic: string; reels: any; setReels: any }) => {
  const navigate = useNavigate()

  const handleReelClick = () => {
    // console.log("Reel")
    navigate(`/${reeler.username}/reel/${id}`)
  }

  const getProcessedDescription = (description: string) => {
    return description.replace(/(?:\r\n|\r|\n)/g, " <br> ")
  }

  return (
    <div className="cursor-pointer border-b border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover" onClick={handleReelClick}>
      <div className="mb-3">
        <PostHeader base={"Quote"} tweeter={reeler} date={createdAt} id={id} type={"reel"} posts={reels} setPosts={setReels} parent="reel" />
      </div>
      <div className="mb-2">
        <ReelBody muted={muted} setMuted={setMuted} media={reelUrl} mentions={mentions} content={getProcessedDescription(content)} displayReel={false} />
      </div>
      <div className=" w-full">
        <div className="min-xs:w-[90%] min-xs:ml-[10%] ml-[5%] w-[95%] overflow-hidden rounded-3xl border-2 border-darkBorder">
          <Reel
            muted={muted}
            setMuted={setMuted}
            inPostPage={false}
            content={originalReel.content}
            createdAt={originalReel.createdAt}
            isBookmarked={originalReel.isBookmarked}
            isReacted={originalReel.isReacted}
            isRereeled={originalReel.isRereeled}
            mentions={originalReel.mentions}
            originalReel={{}}
            originalReeler={originalReeler}
            reReelCount={originalReel.reReelCount}
            reactCount={originalReel.reactCount}
            reelUrl={originalReel.reelUrl}
            reeler={originalReeler}
            repliesCount={originalReel.repliesCount}
            postType={"fromQuote"}
            id={originalReel.reelId}
            topic={originalReel.topics[0]}
            reels={[]}
            setReels={() => {}}
          />
        </div>
        <ReelBar id={id} replyCount={repliesCount} reposted={isRereeled} repostsNum={reReelCount} liked={isReacted} likesNum={reactCount} topic={topic} isBookmarked={isBookmarked} username={reeler.username} />
      </div>
    </div>
  )
}

export default QuoteReel

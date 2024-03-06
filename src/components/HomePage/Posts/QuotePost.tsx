import Post from "./Post"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import PostBody from "./PostBody"
import { useNavigate } from "react-router-dom"

const QuotePost = ({ content, mentions, media, createdAt, isBookmarked, isReacted, isRetweeted, reTweetCount, reactCount, repliesCount, retweetId, retweeter, tweet, tweeter, quotes, setQuotes }: { content: string;  mentions: string[]; media: any; createdAt: string; isBookmarked: boolean; isReacted: boolean; isRetweeted: boolean; reTweetCount: number; reactCount: number; repliesCount: number; retweetId: string; retweeter: any; tweet: any; tweeter: any; quotes: any; setQuotes: any }) => {
  const navigate = useNavigate()
  
  const handlePostClick = () => {
    navigate(`/${retweeter.username}/diary/${retweetId}`)
  }

  return (
    <div className="cursor-pointer border-b border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover" onClick={handlePostClick}>
      <div className="mb-3">
        <PostHeader base={"Quote"} tweeter={retweeter} date={createdAt} id={retweetId} type={"tweet"} posts={quotes} setPosts={setQuotes} parent ='diary'/>
      </div>
      <div className="mb-2">
        <PostBody description={content} media={media} mentions={mentions} />
      </div>
      <div className="min-xs:w-[90%] min-xs:ml-[10%] ml-[5%] w-[95%] rounded-3xl border-2 border-darkBorder">
        <Post cascade={false} inPostPage={false} postType={"fromQuote"} id={tweet.tweetId} date={tweet.createdAt} description={tweet.content} media={tweet.media.map((m:any)=>m.url)} replyCount={0} repostCount={0} likeCount={0} isLiked={false} isReposted={false} isBookmarked={false} tweeter={tweeter} posts={[]} setPosts={() => {}} displayFooter={true} mentions={tweet.mentions} originalTweet={tweet} originalTweeter={tweeter} poll={tweet.poll} />
      </div>
      <div className="mt-3">
        <PostFooter id={retweetId} replyCount={repliesCount} reposted={isRetweeted} repostsNum={reTweetCount} liked={isReacted} likesNum={reactCount} isBookmarked={isBookmarked} username={retweeter.username} />
      </div>
    </div>
  )
}

export default QuotePost

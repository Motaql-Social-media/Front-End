import Post from "./Post"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import PostBody from "./PostBody"
import { useEffect } from "react"

const QuotePost = ({ content, gifUrl, imageUrls, createdAt, isBookmarked, isReacted, isRetweeted, reTweetCount, reactCount, repliesCount, retweetId, retweeter, tweet, tweeter, quotes, setQuotes }: { content: string; gifUrl: string; imageUrls: any; createdAt: string; isBookmarked: boolean; isReacted: boolean; isRetweeted: boolean; reTweetCount: number; reactCount: number; repliesCount: number; retweetId: string; retweeter: any; tweet: any; tweeter: any; quotes: any; setQuotes: any }) => {
  const handlePostClick = () => {
    console.log("post")
  }

  return (
    <div className="cursor-pointer border-b border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover" onClick={handlePostClick}>
      <div className="mb-3">
        <PostHeader tweeter={retweeter} date={createdAt} id={retweetId} type={"tweet"} posts={quotes} setPosts={setQuotes} />
      </div>
      <div className="mb-2">
        <PostBody description={content} media={gifUrl !== "" ? gifUrl : imageUrls} />
      </div>
      <div className="ml-[10%] w-[90%] rounded-3xl border-2 border-darkBorder">
        <Post cascade={false} inPostPage={false} postType={"fromQuote"} id={tweet.tweetId} date={tweet.createdAt} description={tweet.content} media={tweet.imageUrls.length > 0 ? tweet.imageUrls : tweet.gifUrl !== "" ? [tweet.gifUrl] : []} replyCount={0} repostCount={0} likeCount={0} isLiked={false} isReposted={false} isBookmarked={false} tweeter={tweeter} posts={[]} setPosts={() => {}} displayFooter={true} mentions={tweet.mentions} originalTweet={tweet} originalTweeter={tweeter} poll={tweet.poll} />
      </div>
      <div className="mt-3">
        <PostFooter id={retweetId} replyCount={repliesCount} reposted={isRetweeted} repostsNum={reTweetCount} liked={isReacted} likesNum={reactCount} isBookmarked={isBookmarked} username={retweeter.username} />
      </div>
    </div>
  )
}

export default QuotePost

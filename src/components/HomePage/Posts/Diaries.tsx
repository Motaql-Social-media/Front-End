import Post from "./Post"

import { useContext } from "react"
import { HomeContext } from "../../../Pages/Home/Home"
import { BookmarksContext } from "../../../Pages/Bookmarks/Bookmarks"
import QuotePost from "./QuotePost"
import { t } from "i18next"

const Diaries = () => {
  const { diaries: homediaries, setDiaries: homesetDiaries } = useContext(HomeContext) || {}
  const { diaries: bookmarksdiaries, setDiaries: bookmarkssetDiaries } = useContext(BookmarksContext) || {}

  return (
    <div>
      {homediaries &&
        homediaries?.length > 0 &&
        homediaries.map((post: any) => {
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
                  posts={homediaries}
                  setPosts={homesetDiaries}
                  displayFooter={true}
                  mentions={post.type === "Repost" ? post.originalTweet.mentions : post.mentions}
                  originalTweet={post.originalTweet}
                  originalTweeter={post.originalTweeter}
                  poll={post.poll}
                />
              ) : (
                <QuotePost inPostPage={false} mentions={post.mentions} content={post.content} media={post.media.map((m: any) => m.url)} createdAt={post.createdAt} isBookmarked={post.isBookmarked} isReacted={post.isReacted} isRetweeted={post.isRetweeted} reTweetCount={post.reTweetCount} reactCount={post.reactCount} repliesCount={post.repliesCount} retweetId={post.tweetId} retweeter={post.tweeter} tweet={post.originalTweet} tweeter={post.originalTweeter} quotes={[]} setQuotes={() => {}} />
              )}
            </div>
          )
        })}
      {homediaries && homediaries.length === 0 && <div className="h-[150vw]"></div>}
      {bookmarksdiaries &&
        bookmarksdiaries.length > 0 &&
        bookmarksdiaries.map((post: any) => {
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
                  posts={bookmarksdiaries}
                  setPosts={bookmarkssetDiaries}
                  displayFooter={true}
                  mentions={post.type === "Repost" ? post.originalTweet.mentions : post.mentions}
                  originalTweet={post.originalTweet}
                  originalTweeter={post.originalTweeter}
                  poll={post.poll}
                />
              ) : (
                <QuotePost inPostPage={false} mentions={post.mentions} content={post.content} media={post.media.map((m: any) => m.url)} createdAt={post.createdAt} isBookmarked={post.isBookmarked} isReacted={post.isReacted} isRetweeted={post.isRetweeted} reTweetCount={post.reTweetCount} reactCount={post.reactCount} repliesCount={post.repliesCount} retweetId={post.tweetId} retweeter={post.tweeter} tweet={post.originalTweet} tweeter={post.originalTweeter} quotes={[]} setQuotes={() => {}} />
              )}
            </div>
          )
        })}
      {bookmarksdiaries && bookmarksdiaries.length === 0 && <div className="flex h-96 items-center justify-center text-2xl font-bold text-primary">{t("no_bookmark_diaries")}</div>}
    </div>
  )
}

export default Diaries

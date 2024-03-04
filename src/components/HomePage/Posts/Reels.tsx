// import ElementVisibleObserver from "../../General/ElementVisibleObserver"
import Reel from "./Reel"
import { HomeContext } from "../Home"
import { BookmarksContext } from "../../Bookmarks/Bookmarks"
import { useContext, useEffect } from "react"
import QuoteReel from "./QuoteReel"

const Reels = () => {
  // const handleFetchMore = () => {
  //   console.log("fetch more Reels")
  // }

  const { reels: homereels, setReels: homesetReels } = useContext(HomeContext) || {}
  const { reels: bookmarksreels, setReels: bookmarkssetReels } = useContext(BookmarksContext) || {}

  // useEffect(() => {
  //   console.log(bookmarksreels)
  // }, [bookmarksreels])

  return (
    <div>
      {homereels &&
        homereels?.length > 0 &&
        homereels.map((reel: any) => (
          <div key={reel.reelId}>
            {reel.type !== "Quote" ? (
              <Reel
                inPostPage={false}
                content={reel.type === "Repost" ? reel.originalReel.content : reel.content}
                createdAt={reel.type === "Repost" ? reel.originalReel.createdAt : reel.createdAt}
                isBookmarked={reel.type === "Repost" ? reel.originalReel.isBookmarked : reel.isBookmarked}
                isReacted={reel.type === "Repost" ? reel.originalReel.isReacted : reel.isReacted}
                isRereeled={reel.type === "Repost" ? reel.originalReel.isRereeled : reel.isRereeled}
                mentions={reel.type === "Repost" ? reel.originalReel.mentions : reel.mentions}
                originalReel={reel.originalReel}
                originalReeler={reel.originalReeler}
                reReelCount={reel.type === "Repost" ? reel.originalReel.reReelCount : reel.reReelCount}
                reactCount={reel.type === "Repost" ? reel.originalReel.reactCount : reel.reactCount}
                reelUrl={reel.type === "Repost" ? reel.originalReel.reelUrl : reel.reelUrl}
                reeler={reel.reeler}
                repliesCount={reel.type === "Repost" ? reel.originalReel.repliesCount : reel.repliesCount}
                postType={reel.type}
                id={reel.type === "Repost" ? reel.originalReel.reelId : reel.reelId}
                topic={reel.type === "Repost" ? reel.originalReel.topics[0] : reel.topics[0]}
                reels={homereels}
                setReels={homesetReels}
              />
            ) : (
              <QuoteReel inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} id={reel.reelId} topic={""} reels={homereels} setReels={homesetReels} />
            )}
          </div>
        ))}
      {bookmarksreels &&
        bookmarksreels.length > 0 &&
        bookmarksreels.map((reel: any) => {
          return (
            <div key={reel.reelId}>
              {reel.type !== "Quote" ? (
                <Reel
                  inPostPage={false}
                  content={reel.type === "Repost" ? reel.originalReel.content : reel.content}
                  createdAt={reel.type === "Repost" ? reel.originalReel.createdAt : reel.createdAt}
                  isBookmarked={reel.type === "Repost" ? reel.originalReel.isBookmarked : reel.isBookmarked}
                  isReacted={reel.type === "Repost" ? reel.originalReel.isReacted : reel.isReacted}
                  isRereeled={reel.type === "Repost" ? reel.originalReel.isRereeled : reel.isRereeled}
                  mentions={reel.type === "Repost" ? reel.originalReel.mentions : reel.mentions}
                  originalReel={reel.originalReel}
                  originalReeler={reel.originalReeler}
                  reReelCount={reel.type === "Repost" ? reel.originalReel.reReelCount : reel.reReelCount}
                  reactCount={reel.type === "Repost" ? reel.originalReel.reactCount : reel.reactCount}
                  reelUrl={reel.type === "Repost" ? reel.originalReel.reelUrl : reel.reelUrl}
                  reeler={reel.reeler}
                  repliesCount={reel.type === "Repost" ? reel.originalReel.repliesCount : reel.repliesCount}
                  postType={reel.type}
                  id={reel.type === "Repost" ? reel.originalReel.reelId : reel.reelId}
                  topic={reel.type === "Repost" ? reel.originalReel.topics[0] : reel.topics[0]}
                  reels={homereels}
                  setReels={homesetReels}
                />
              ) : (
                <QuoteReel inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} id={reel.reelId} topic={""} reels={homereels} setReels={homesetReels} />
              )}
            </div>
          )
        })}
      {/* <ElementVisibleObserver handler={handleFetchMore} /> */}
    </div>
  )
}

export default Reels

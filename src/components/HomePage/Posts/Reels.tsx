// import ElementVisibleObserver from "../../General/ElementVisibleObserver"
import Reel from "./Reel"
import { HomeContext } from "../Home"
import { BookmarksContext } from "../../Bookmarks/Bookmarks"
import { useContext, useEffect } from "react"

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
            <Reel inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} postType={reel.type} id={reel.reelId} topic={reel.topics[0]} reels={homereels} setReels={homesetReels} />
          </div>
        ))}
      {bookmarksreels &&
        bookmarksreels.length > 0 &&
        bookmarksreels.map((reel: any) => {
          return (
            <div key={reel.reelId}>
              <Reel inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} postType={reel.type} id={reel.reelId} topic={reel.topics[0]} reels={bookmarksreels} setReels={bookmarkssetReels} />
            </div>
          )
        })}
      {/* <ElementVisibleObserver handler={handleFetchMore} /> */}
    </div>
  )
}

export default Reels

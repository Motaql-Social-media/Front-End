import ElementVisibleObserver from "../../General/ElementVisibleObserver"
import Reel from "./Reel"
import { HomeContext } from "../Home"
import { useContext } from "react"

const Reels = () => {
  const handleFetchMore = () => {
    console.log("fetch more Reels")
  }

  const { diaries, setDiaries, reels, setReels } = useContext(HomeContext)

  return (
    <div>
      {reels.map((post: any) => (
        <div key={post.id}>
          <Reel inPostPage={post.inPostPage} userProfilePicture={post.userProfilePicture} postType={post.postType} isFollowed={post.isFollowed} replyReferredTweetId={post.replyReferredTweetId} bio={post.bio} id={post.id} name={post.name} username={post.username} date={post.date} speciality={post.speciality} description={post.description} media={post.media} replyCount={post.replyCount} repostCount={post.repostCount} likeCount={post.likeCount} isLiked={post.isLiked} followingUser={post.followingUser} isReposted={post.isReposted} reels={post.reels} setReels={post.setReels} topic={post.topic} />
        </div>
      ))}
      <ElementVisibleObserver handler={handleFetchMore} />
    </div>
  )
}

export default Reels

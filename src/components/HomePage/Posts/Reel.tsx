import PostHeader from "./PostHeader"
import ReelBar from "./ReelBar"
import ReelBody from "./ReelBody"

const Reel = ({
  inPostPage,
  userProfilePicture,
  postType,
  isFollowed,
  replyReferredTweetId,
  bio,
  id,
  name,
  username,
  date,
  speciality,
  description,
  media,
  replyCount,
  repostCount,
  likeCount,
  isLiked,
  isReposted,
  followingUser,
  reels,
  setReels,
  topic,
}: {
  inPostPage: boolean
  userProfilePicture: string
  postType: string
  isFollowed: boolean
  replyReferredTweetId: string
  bio: string
  id: string
  name: string
  username: string
  date: string
  speciality: string
  description: string
  media: any
  replyCount: number
  repostCount: number
  likeCount: number
  isLiked: boolean
  isReposted: boolean
  followingUser: {}
  reels: any
  setReels: any
  topic: string
}) => {
  const handleReelClick = () => {
    console.log("Reel")
  }
  return (
    <div className="cursor-pointer border-b border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover" onClick={handleReelClick}>
      <div>
        <PostHeader tweeter={{}} date={date}  id={id} type="reel" posts={reels} setPosts={setReels} />
      </div>
      <div className="flex w-full">
        <ReelBar id={id} replyCount={replyCount} reposted={isReposted} repostsNum={repostCount} liked={isLiked} likesNum={likeCount} topic={topic} />
        <ReelBody media={media} />
      </div>
    </div>
  )
}

export default Reel

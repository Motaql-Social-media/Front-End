import ElementVisibleObserver from "../../General/ElementVisibleObserver"
import Reel from "./Reel"
const RealTest = require("../../../assets/ReelTest.mp4")

const Reels = () => {
  const p = [
    {
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "1",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "Building the future with code! #programming is not just about lines, it's about creativity, problem-solving, and making a difference. What are you building today?",
      media: RealTest,
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
      topic: "Life",
    },
    {
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "4",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "The web connects us all. Join the conversation, share your ideas, and make a global impact.  #webdev #community #openweb",
      media: RealTest,
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      reels: [],
      setReels: () => {},
      topic: "Life",
    },
    {
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "2",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "Data science: the art of asking the right questions.  Uncover hidden insights and unlock the power of your data. #datascience #machinelearning",
      media: RealTest,
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      reels: [],
      setReels: () => {},
      topic: "Life",
    },
    {
      cascade: false,
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "3",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "Data science: the art of asking the right questions.  Uncover hidden insights and unlock the power of your data. #datascience #machinelearning",
      media: RealTest,
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      reels: [],
      setReels: () => {},
      topic: "Life",
    },
  ]

  const handleFetchMore = () => {
    console.log("fetch more Reels")
  }

  return (
    <div>
      {p.map((post) => (
        <div key={post.id}>
          <Reel inPostPage={post.inPostPage} userProfilePicture={post.userProfilePicture} postType={post.postType} isFollowed={post.isFollowed} replyReferredTweetId={post.replyReferredTweetId} bio={post.bio} id={post.id} name={post.name} username={post.username} date={post.date} speciality={post.speciality} description={post.description} media={post.media} replyCount={post.replyCount} repostCount={post.repostCount} likeCount={post.likeCount} isLiked={post.isLiked} followingUser={post.followingUser} isReposted={post.isReposted} reels={post.reels} setReels={post.setReels} topic={post.topic} />
        </div>
      ))}
      <ElementVisibleObserver handler={handleFetchMore} />
    </div>
  )
}

export default Reels

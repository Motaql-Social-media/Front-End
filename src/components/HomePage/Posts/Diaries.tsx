import Post from "./Post"
import ElementVisibleObserver from "../../General/ElementVisibleObserver"
const Diaries = () => {
  const p = [
    {
      cascade: false,
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
      media: [
        {
          img: "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg",
          title: "image1",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
    },
    {
      cascade: false,
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
      description: "The web connects us all. Join the conversation, share your ideas, and make a global impact.  #webdev #community #openweb",
      media: [
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image1",
          type: "jpg",
        },
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image2",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
    },

    {
      cascade: false,
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "5",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "The web connects us all. Join the conversation, share your ideas, and make a global impact.  #webdev #community #openweb",
      media: [
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image1",
          type: "jpg",
        },
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image2",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
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
      media: [
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image1",
          type: "jpg",
        },
        {
          img: "https://th.bing.com/th/id/OIG.MxQxUggA0RKmKdTjwAqw",
          title: "image2",
          type: "jpg",
        },
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image3",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
    },
    {
      cascade: false,
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "6",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "Data science: the art of asking the right questions.  Uncover hidden insights and unlock the power of your data. #datascience #machinelearning",
      media: [
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image1",
          type: "jpg",
        },
        {
          img: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "image2",
          type: "jpg",
        },
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image3",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
    },
    {
      cascade: false,
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
      description: "Data science: the art of asking the right questions.  Uncover hidden insights and unlock the power of your data. #datascience #machinelearning",
      media: [
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image1",
          type: "jpg",
        },
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image2",
          type: "jpg",
        },
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image3",
          type: "jpg",
        },
        {
          img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
          title: "image4",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
    },
    {
      cascade: false,
      inPostPage: false,
      userProfilePicture: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      postType: "tweet",
      isFollowed: false,
      replyReferredTweetId: "1",
      bio: "bio",
      id: "7",
      name: "Mohamed Samir",
      username: "mohamedsamir",
      date: "2h",
      speciality: "Engineer",
      description: "Data science: the art of asking the right questions.  Uncover hidden insights and unlock the power of your data. #datascience #machinelearning",
      media: [
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image1",
          type: "jpg",
        },
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image2",
          type: "jpg",
        },
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image3",
          type: "jpg",
        },
        {
          img: "https://imgupscaler.com/images/samples/animal-before.webp",
          title: "image4",
          type: "jpg",
        },
      ],
      replyCount: 50,
      repostCount: 50,
      likeCount: 50,
      isLiked: false,
      isReposted: false,
      followingUser: {},
      posts: [],
      setPosts: () => {},
    },
  ]

  const handleFetchMore = () => {
    console.log("fetch more Diaries")
  }

  return (
    <div>
      {p.map((post) => {
        return (
          <div key={post.id}>
            <Post
              cascade={post.cascade}
              inPostPage={post.inPostPage}
              userProfilePicture={post.userProfilePicture}
              postType={post.postType}
              isFollowed={post.isFollowed}
              replyReferredTweetId={post.replyReferredTweetId}
              bio={post.bio}
              id={post.id}
              name={post.name}
              username={post.username}
              date={post.date}
              speciality={post.speciality}
              description={post.description}
              media={post.media}
              replyCount={post.replyCount}
              repostCount={post.repostCount}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              isReposted={post.isReposted}
              followingUser={post.followingUser}
              posts={post.posts}
              setPosts={post.setPosts}
            />
          </div>
        )
      })}
      <ElementVisibleObserver handler={handleFetchMore} />
    </div>
  )
}

export default Diaries

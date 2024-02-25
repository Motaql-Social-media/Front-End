import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import React, { useEffect, useState } from "react"

const Post = ({
  cascade,
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
  posts,
  setPosts,
}: {
  cascade: boolean
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
  posts: any
  setPosts: any
}) => {
  const [mediaUrls, setMediaUrls] = useState([])
  const [mediaTypes, setMediaTypes] = useState([])

  //   const descriptionLines = description.split("\n"); //need check for writing \n in description
  useEffect(() => {
    const urls = media.map((item: any) => item.img)
    const types = media.map((item: any) => item.type)

    // console.log("urls from post comp", urls)
    // console.log("types from post comp", types)
    setMediaUrls(urls)
    setMediaTypes(types)
  }, [media])

  
 

  const handlePostClick = () => {
    console.log("post")
  }
  return (
    <div className="cursor-pointer border-b border-b-darkBorder p-4 hover:bg-lightHover dark:hover:bg-darkHover" onClick={handlePostClick}>
      <div>
        <PostHeader userProfilePicture={userProfilePicture} name={name} username={username} date={date} speciality={speciality} isFollowed={isFollowed} id={id} type="diary" />
      </div>
      <div>
        <PostBody description={description} mediaUrls={mediaUrls} mediaTypes={mediaTypes} media={media} />
      </div>
      <div>
        <PostFooter id={id} replyCount={replyCount} reposted={isReposted} repostsNum={repostCount} liked={isLiked} likesNum={likeCount} />
      </div>
    </div>
  )
}

export default Post

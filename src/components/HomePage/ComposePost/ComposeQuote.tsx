import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useTranslation } from "react-i18next"
import i18next from "i18next"
import { Avatar, TextField } from "@mui/material"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import ComposePostFooter from "./ComposePostFooter"
import { Link } from "react-router-dom"
import Post from "../Posts/Post"
import { styles } from "../../../styles/styles"

const ComposeQuote = ({ id, handleClose, setRepost, repost, repostCount, setRepostCount, type }: { id: any; handleClose: any; setRepost: any; repost: boolean; repostCount: number; setRepostCount: any; type: string }) => {
  const [description, setDescription] = useState("")
  const [charsCount, setCharsCount] = useState(0)
  const [charsProgressColor, setCharsProgressColor] = useState("#1D9BF0")
  const [progressCircleSize, setProgressCircleSize] = useState(24)
  const [progressCircleValue, setProgressCircleValue] = useState<number | null>(null)
  const [media, setMedia] = useState<any[]>([])
  const [mediaNames, setMediaNames] = useState<string[]>([])

  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [mediaDisabled, setMediaDisabled] = useState(false)
  const [GIFDisabled, setGIFDisabled] = useState(false)
  const [postDisabled, setPostDisabled] = useState(true)

  const darkMode = useSelector((state: any) => state.theme.darkMode)
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  useEffect(() => {
    setPostDisabled(((description.length === 0 || (description.match(/\s/g) && description.match(/\s/g)?.length === description.length)) && media.length === 0) || description.length > 280)
  }, [description, media])

  const handleDeleteMediaCallback = (index: number) => {
    setMedia(media.filter((i, ind) => ind !== index))
    // setMediaDisabled(false)
  }

  const publishButton = useRef<HTMLButtonElement>(null)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleSubmit = (e: any) => {
    e.stopPropagation()
    const mediaFormData = new FormData()
    // console.log(description)

    if (type === "diary") {
      mediaFormData.append("content", description)

      media.forEach((m) => {
        if (!(mediaNames[0] === "gif")) mediaFormData.append("images", m.file)
        else mediaFormData.append("gif", m.file)
      })
    }
    if (type === "diary") {
      API.post(`tweets/${id}/retweet`, mediaFormData, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
        .then((res) => {
          console.log(res)
          setRepostCount(repost ? repostCount - 1 : repostCount + 1)

          setRepost(!repost)
          handleClose()
        })
        .catch((err) => console.log(err))
    } else {
      API.post(
        `reels/${id}/rereel`,
        {
          content: description,
        },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      )
        .then((res) => {
          console.log(res)
          setRepostCount(repost ? repostCount - 1 : repostCount + 1)

          setRepost(!repost)
          handleClose()
        })
        .catch((err) => console.log(err))
    }
  }

  const handleDescriptionChange = (e: any) => {
    if (e.target.value.length < 280) setDescription(e.target.value)
    setCharsCount((e.target.value.length * 100) / 280)
    setCharsProgressColor(e.target.value.length < 260 ? "#1D9BF0" : e.target.value.length < 280 ? "#fdd81f" : "#f4212e")
    setProgressCircleSize(e.target.value.length < 260 ? 24 : 32)
    setProgressCircleValue(e.target.value.length >= 260 ? 280 - e.target.value.length : null)
  }

  const handleUploadMedia = (uploadedMedia: any) => {
    const file = uploadedMedia.target.files[0]
    const imageUrl = URL.createObjectURL(file)

    // console.log(uploadedMedia.target.files[0])
    setMedia([
      ...media,
      {
        file: file,
        name: file.name.split(".").pop(),
        imageUrl: imageUrl,
      },
    ])

    uploadedMedia.target.value = null
    // const mediaFormData = new FormData()
    // mediaFormData.append("media", file)
  }

  useEffect(() => {
    setMediaUrls(media.map((m) => m.imageUrl))
    setMediaNames(media.map((m) => m.name))
  }, [media])

  useEffect(() => {
    if (mediaNames.length === 0) {
      setMediaDisabled(false)
      setGIFDisabled(false)
    } else if (mediaNames.length === 1) {
      if (mediaNames[0] === "gif") {
        setMediaDisabled(true)
        setGIFDisabled(true)
      } else {
        setGIFDisabled(true)
      }
    } else if (mediaNames.length > 3) {
      setMediaDisabled(true)
    } else {
      setMediaDisabled(false)
    }
  }, [mediaNames])

  const { t } = useTranslation()

  const buttonName = "Post"

  const [post, setPost] = useState<any>(null)

  const fetchTweet = () => {
    API.get(`tweets/${id}`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        //  console.log(res)
        setPost(res.data.data.tweet)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchTweet()
  }, [])

  return (
    <div className={`ComposePost flex h-fit border-b pb-5 ${buttonName === "Post" ? "border-t" : ""} !w-full border-lightBorder p-3 text-black dark:border-darkBorder dark:text-white max-xs:hidden`}>
      <div data-testid="profileImage" className={`h-10 w-10 ${i18next.language === "en" ? "sm:mr-3" : "sm:ml-3"} `}>
        <Link className="hover:underline" to={`/${user.username}`}>
          <Avatar alt={user.name} src={`${process.env.REACT_APP_USERS_MEDIA_URL}${user.imageUrl.split("/").pop()}`} sx={{ width: 40, height: 40 }} />
        </Link>
      </div>
      <div className="mt-1.5 h-fit w-full">
        <TextField
          id="description"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={`Add a comment`}
          onChange={(e) => handleDescriptionChange(e)}
          multiline
          value={description}
          fullWidth
          maxRows={23}
          sx={{
            border: "0px",
            "& .MuiInputBase-root": {
              color: darkMode ? "#ffffff" : "#000000",
            },
          }}
        ></TextField>
        {type === "diary" && <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={setMediaUrls} margin={1.5} showCancelButton={true} deleteCallback={handleDeleteMediaCallback} />}{" "}
        {/* {post && (
          <Post
            cascade={false}
            inPostPage={false}
            userProfilePicture={post.tweeter?.imageUrl}
            postType={"tweet"}
            isFollowed={false}
            replyReferredTweetId={post.replyReferredTweetId ? post.replyReferredTweetId : ""}
            bio={"bio"}
            id={post.tweetId}
            name={post.tweeter?.name}
            username={post.tweeter?.username}
            date={post.createdAt}
            speciality={""}
            description={post.content}
            media={post.imageUrls.length > 0 ? post.imageUrls : post.gifUrl !== "" ? [post.gifUrl] : []}
            replyCount={post.repliesCount}
            repostCount={post.reTweetCount}
            likeCount={post.reactCount}
            isLiked={post.isReacted}
            isReposted={post.isRetweeted}
            isBookmarked={post.isBookmarked}
            tweeter={post.tweeter}
            posts={post.posts}
            setPosts={post.setPosts}
            displayFooter={false}
          />
        )} */}
        <hr className={`h-px border-0 bg-lightBorder dark:bg-darkBorder ${buttonName === "Post" ? "" : "hidden"}`} />
        {type === "diary" && <ComposePostFooter buttonName={buttonName} handleUploadMedia={handleUploadMedia} mediaDisabled={mediaDisabled} GIFDisabled={GIFDisabled} pollDisabled={true} postDisabled={postDisabled} progressCircleSize={progressCircleSize} charsCount={charsCount} charsProgressColor={charsProgressColor} handleSubmit={handleSubmit} handlePollClick={() => {}} poll={{}} publishButton={publishButton} fromQuote={true} description={description} media={media} addReelCallback={() => {}} />}
        {type === "reel" && (
          <button className={`${styles.coloredButton}`} disabled={description.length === 0} onClick={handleSubmit}>
            {t("publish")}
          </button>
        )}
      </div>
    </div>
  )
}

export default ComposeQuote

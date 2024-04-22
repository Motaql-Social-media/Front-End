import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import axios from "axios"

import ComposePostFooter from "./ComposePostFooter"
import { useTranslation } from "react-i18next"
import i18next from "i18next"

import Poll from "./Poll"
import MentionSearch from "./MentionSearch"
import Loading from "../../General/Loading"

function ComposePost({ buttonName, postId, postType, addTweetCallback, addReelCallback, addReplyCallback }: { buttonName: string; postId: string | undefined; postType: string; addTweetCallback: any; addReelCallback: any; addReplyCallback: any }) {
  const [description, setDescription] = useState("")
  const [charsCount, setCharsCount] = useState(0)
  const [charsProgressColor, setCharsProgressColor] = useState("#1D9BF0")
  const [progressCircleSize, setProgressCircleSize] = useState(24)
  const [media, setMedia] = useState<any[]>([])
  const [mediaNames, setMediaNames] = useState<string[]>([])

  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [mediaDisabled, setMediaDisabled] = useState(false)
  const [GIFDisabled, setGIFDisabled] = useState(false)
  const [poll, setPoll] = useState<any>(null)
  const [pollDisabled, setPollDisabled] = useState(false)
  const [postDisabled, setPostDisabled] = useState(true)

  const darkMode = useSelector((state: any) => state.theme.darkMode)
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  const [loading, setLoading] = useState(false)

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
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const handleAddTweet = (mediaFormData: any) => {
    // console.log(description.length)

    media.forEach((m) => {
      if (!(mediaNames[0] === "gif")) mediaFormData.append("images", m.file)
      else mediaFormData.append("gif", m.file)
    })

    if (postType === "reply") {
      API.post(`tweets/${postId}/add-reply`, mediaFormData, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
        .then((res) => {
          const t = { ...res.data.data.tweetReply, repliesCount: 0, reTweetCount: 0, reactCount: 0, isReacted: false, isRetweeted: false, isBookmarked: false, replier: { bio: user?.bio, followersCount: user?.followersCount, followingsCount: user?.followingsCount, imageUrl: user?.imageUrl, isBlocked: false, isFollowed: false, isMuted: false, jobtitle: user?.jobtitle, name: user?.name, username: user?.username, userId: user?.userId }, replies: {}, type: "Reply" }

          // console.log(res)
          addTweetCallback(t)
          addReplyCallback()
          setMedia([])
          setDescription("")
          setMediaUrls([])
          setMediaDisabled(false)
          setGIFDisabled(false)
          setPollDisabled(false)
          setCharsCount(0)
          setCharsProgressColor("#1D9BF0")
          setProgressCircleSize(24)
          publishButton.current?.removeAttribute("disabled")
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)

          publishButton.current?.removeAttribute("disabled")
        })
    } else if (postType === "reply_reel") {
      API.post(
        `reels/${postId}/add-reply`,
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
          // const t = { ...res.data.data.reelReply, repliesCount: 0, reReelCount: 0, reactCount: 0, isReacted: false, isReReeled: false, isBookmarked: false, replier: { bio: user.bio, followersCount: user.followersCount, followingsCount: user.followingsCount, imageUrl: user.imageUrl, isBlocked: false, isFollowed: false, isMuted: false, jobtitle: user.jobtitle, name: user.name, username: user.username, userId: user.userId }, replies: {} }
          // const r = { ...res.data.data.reelReply, isBookmarked: false, isReacted: false, isRereeled: false, originalReeler: { username: tag }, reReelCount: 0, reactCount: 0, repliesCount: 0, replier: user, type: "Reply" }

          // console.log(res)
          addTweetCallback(res.data.data.reelReply)
          addReplyCallback()

          setMedia([])
          setDescription("")
          setMediaUrls([])
          setMediaDisabled(false)
          setGIFDisabled(false)
          setPollDisabled(false)
          setCharsCount(0)
          setCharsProgressColor("#1D9BF0")
          setProgressCircleSize(24)
          publishButton.current?.removeAttribute("disabled")
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          publishButton.current?.removeAttribute("disabled")
          setLoading(false)
        })
    } else {
      API.post("tweets/add-tweet", mediaFormData, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
        .then((res) => {
          // console.log(res)
          const t = { ...res.data.data.tweet, repliesCount: 0, reTweetCount: 0, reactCount: 0, isReacted: false, isRetweeted: false, isBookmarked: false, tweeter: { bio: user?.bio, followersCount: user?.followersCount, followingsCount: user?.followingsCount, imageUrl: user?.imageUrl, isBlocked: false, isFollowed: false, isMuted: false, jobtitle: user?.jobtitle, name: user?.name, username: user?.username, userId: user?.userId } }
          // console.log(t)

          addTweetCallback(t)
          setMedia([])
          setDescription("")
          setMediaUrls([])
          setMediaDisabled(false)
          setGIFDisabled(false)
          setPollDisabled(false)
          setCharsCount(0)
          setCharsProgressColor("#1D9BF0")
          setProgressCircleSize(24)
          publishButton.current?.removeAttribute("disabled")
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          publishButton.current?.removeAttribute("disabled")
          setLoading(false)
        })
    }
  }

  const handleAddPool = () => {
    // console.log("poll ", poll)
    // console.log("question ", description)

    const now = new Date()

    now.setDate(now.getDate() + parseInt(poll.days))
    now.setHours(now.getHours() + parseInt(poll.hours))
    now.setMinutes(now.getMinutes() + parseInt(poll.minutes))

    const options = []
    if (poll.choice1) options.push(poll.choice1)
    if (poll.choice2) options.push(poll.choice2)
    if (poll.choice3) options.push(poll.choice3)
    if (poll.choice4) options.push(poll.choice4)

    const t = {
      question: description,
      length: now.toISOString(),
      options,
    }
    // console.log(t)

    API.post("tweets/add-poll", t, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        // console.log(res)
        const t = { ...res.data.data.tweet, repliesCount: 0, reTweetCount: 0, reactCount: 0, isReacted: false, isRetweeted: false, isBookmarked: false, content: "", media: [], tweeter: { bio: user?.bio, followersCount: user?.followersCount, followingsCount: user?.followingsCount, imageUrl: user?.imageUrl, isBlocked: false, isFollowed: false, isMuted: false, jobtitle: user?.jobtitle, name: user?.name, username: user?.username, userId: user?.userId } }
        // console.log(t)

        addTweetCallback(t)
        setMedia([])
        setDescription("")
        setMediaUrls([])
        setMediaDisabled(false)
        setGIFDisabled(false)
        setPollDisabled(false)
        setCharsCount(0)
        setCharsProgressColor("#1D9BF0")
        setProgressCircleSize(24)
        publishButton.current?.removeAttribute("disabled")
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        publishButton.current?.removeAttribute("disabled")
        setLoading(false)
      })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const mediaFormData = new FormData()
    mediaFormData.append("content", description)

    setLoading(true)

    if (poll) {
      handleAddPool()
    } else {
      // console.log("no poll")
      handleAddTweet(mediaFormData)
    }
  }

  useEffect(() => {
    if (!pollDisabled) setPoll(null)
  }, [pollDisabled])

  const handleDescriptionChange = (e: any) => {
    if (!/(\n){3,}/.test(e.target.value)) setDescription(e.target.value.slice(0, 280))
  }

  const mentionCallback = (username: string) => {
    if (description.length + username.length > 280) {
      setMentionError(true)
    } else {
      const newDescription = description.split("@").slice(0, -1).join("@") + `@${username} `
      setDescription(newDescription)
      setOpenMentionSearch(false)
    }
  }

  useEffect(() => {
    if (description.split(" ").pop()?.startsWith("@")) setOpenMentionSearch(true)
    else setOpenMentionSearch(false)

    setCharsCount((description.length * 100) / 280)
    setCharsProgressColor(description.length < 260 ? "#1D9BF0" : description.length < 280 ? "#fdd81f" : "#f4212e")
    setProgressCircleSize(description.length < 260 ? 24 : 32)
  }, [description])

  const handleUploadMedia = (uploadedMedia: any) => {
    const file = uploadedMedia.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    // console.log(file)

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
    // console.log(media)
    setMediaUrls(media.map((m) => m.imageUrl))
    setMediaNames(media.map((m) => m.name))
  }, [media])

  useEffect(() => {
    if (mediaNames.length === 0) {
      setMediaDisabled(false)
      setGIFDisabled(false)
      setPollDisabled(false)
    } else if (mediaNames.length === 1) {
      if (mediaNames[0] === "gif") {
        setMediaDisabled(true)
        setGIFDisabled(true)
      } else {
        setGIFDisabled(true)
      }
      setPollDisabled(true)
    } else if (mediaNames.length > 3) {
      setMediaDisabled(true)
      setPollDisabled(true)
    } else {
      setMediaDisabled(false)
      setPollDisabled(true)
    }
  }, [mediaNames])

  const handlePollClick = (newOption: any) => {
    setPollDisabled(newOption)
    setGIFDisabled(newOption)
    setMediaDisabled(newOption)
  }

  const { t } = useTranslation()

  const [openMentionSearch, setOpenMentionSearch] = useState(false)

  const [mentionError, setMentionError] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMentionError(false)
    }, 5000)
  }, [mentionError])

  return (
    <div className={`relative flex h-fit border-b pb-5 ${buttonName === "Post" ? "border-t" : ""} !w-full flex-col border-lightBorder p-3 text-black dark:border-darkBorder dark:text-white `}>
      <div className={`h-10 w-10 ${i18next.language === "en" ? "sm:mr-3" : "sm:ml-3"} `}>
        <Link className="hover:underline" to={`/${user?.username}`}>
          <Avatar alt={user?.name} src={`${user?.imageUrl.split(":")[0] === "https" ? user?.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + user?.imageUrl}`} sx={{ width: 40, height: 40 }} />
        </Link>
      </div>
      <div className="relative mt-1.5 h-fit w-full">
        <TextField
          inputProps={{ onPaste: (e) => handleDescriptionChange(e) }}
          id="description"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={`${pollDisabled && mediaDisabled && media.length !== 4 && GIFDisabled && media.length === 0 ? t("ask_question") : postType !== "reply" && postType !== "reply_reel" ? t("compose_post") : t("compose_reply")}`}
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
        <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={setMediaUrls} margin={1.5} showCancelButton={true} deleteCallback={handleDeleteMediaCallback} />
        {pollDisabled && mediaDisabled && media.length === 0 && <Poll handlePollClick={handlePollClick} poll={poll} setPoll={setPoll} />}
        <hr className={`h-px border-0 bg-lightBorder dark:bg-darkBorder ${buttonName === "Post" ? "" : "hidden"}`} />
        {openMentionSearch && (
          <div className="absolute left-1/2 top-24 z-[99] -translate-x-1/2 overflow-hidden rounded-2xl">
            <MentionSearch username={description.split("@").pop()?.split(" ")[0]} callback={mentionCallback} />
          </div>
        )}
        {mentionError && <div className="text-xs text-red-600 ">{t("mention_error")}</div>}
        <ComposePostFooter postType={postType} handleUploadMedia={handleUploadMedia} mediaDisabled={mediaDisabled} GIFDisabled={GIFDisabled} pollDisabled={pollDisabled} postDisabled={postDisabled} progressCircleSize={progressCircleSize} charsCount={charsCount} charsProgressColor={charsProgressColor} handleSubmit={handleSubmit} handlePollClick={handlePollClick} poll={poll} publishButton={publishButton} fromQuote={false} description={description} media={media} addReelCallback={addReelCallback} />
      </div>
      {loading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-1">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default ComposePost

import { useTranslation } from "react-i18next"
import { styles } from "../../../styles/styles"
import i18next from "i18next"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import { useEffect, useRef, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import upload from "../../../assets/images/upload.png"
import Loading from "../../General/Loading"

import axios from "axios"
import { Cancel } from "@mui/icons-material"
import MentionSearch from "./MentionSearch"

const ComposeReel = ({ handleClose, addReelCallback }: { handleClose: any; addReelCallback: any }) => {
  const { t } = useTranslation()
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)
  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const [description, setDescription] = useState("")
  const [charsCount, setCharsCount] = useState(0)
  const [charsProgressColor, setCharsProgressColor] = useState("#1D9BF0")
  const [progressCircleSize, setProgressCircleSize] = useState(24)

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

  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDescription, setSelectedDescription] = useState(t("compose_reel_message"))

  const handleChooseTopic = (topic: string) => {
    setSelectedTopic(topic)
    setSelectedDescription((topics.find((t: any) => t.topic === topic) as any)?.description)
  }

  const [topics, setTopics] = useState<any[]>([])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  useEffect(() => {
    API.get("topics", {
      headers: {
        authorization: "Bearer " + userToken,
        "accept-language": i18next.language,
      },
    })
      .then((res) => {
        // console.log(res.data.data.topics)
        setTopics(res.data.data.topics)
      })
      .catch((err) => console.log(err))
  }, [])

  const reelInput = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (reelInput.current) {
      reelInput.current.click()
    }
  }

  const [fileSizeError, setFileSizeError] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [reel, setReel] = useState<any>(null)
  const [reelUrl, setReelUrl] = useState("")

  const maxFileSize = 50 * 1024 * 1024

  const handleUploadReel = (e: any) => {
    const file = e.target.files[0]
    // console.log(e.target.files[0])
    if (file && file.size > maxFileSize) {
      setFileSizeError(true)
    } else if (file) {
      setFileSizeError(false)
      setFileUploaded(true)
      setReel(file)
      const url = URL.createObjectURL(file)
      setReelUrl(url)
    }
    // console.log(file)
    e.target.value = null
  }

  useEffect(() => {
    if (fileSizeError) {
      setTimeout(() => {
        setFileSizeError(false)
      }, 3000)
    }
  }, [fileSizeError])

  const handleVideoClick = (e: any) => {
    e.stopPropagation()
  }

  const handleRemoveReel = () => {
    setFileUploaded(false)
    setReel(null)
    setReelUrl("")
  }

  const [loading, setLoading] = useState(false)

  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    // console.log(e.target.files[0])
    if (file && file.size > maxFileSize) {
      setFileSizeError(true)
    } else if (file) {
      setFileSizeError(false)
      setFileUploaded(true)
      setReel(file)
      const url = URL.createObjectURL(file)
      setReelUrl(url)
    }
    // console.log(file)
    e.target.value = null
  }

  const handleAddReel = () => {
    const mediaFormData = new FormData()
    console.log(description)
    console.log(selectedTopic)
    console.log(reel)
    mediaFormData.append("content", description)
    mediaFormData.append("topics", selectedTopic)
    mediaFormData.append("reel", reel)

    API.post("reels/add-reel", mediaFormData)
      .then((res) => {
        // console.log(res)
        const t = { ...res.data.data.reel, isBookmarked: false, isReacted: false, isRereeled: false, reactCount: 0, reReelCount: 0, repliesCount: 0, reeler: user }
        if (publishRef.current) publishRef.current.disabled = false
        setLoading(false)

        addReelCallback(t)
        handleClose()
      })
      .catch((err) => {
        if (publishRef.current) publishRef.current.disabled = false
        setLoading(false)

        console.log(err)
      })
  }

  const publishRef = useRef<HTMLButtonElement>(null)

  const [openMentionSearch, setOpenMentionSearch] = useState(false)

  const [mentionError, setMentionError] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMentionError(false)
    }, 5000)
  }, [mentionError])

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex w-full gap-2 ">
        <div className={`my-2  w-[80%] rounded-2xl border border-primary p-3 `}>
          <div className={`flex items-center justify-between gap-2 ${i18next.language === "en" ? "sm:mr-3" : "sm:ml-3"} `}>
            <div className="flex flex-col items-center justify-center gap-2">
              <Link className="hover:underline" to={`/${user.username}`}>
                <Avatar alt={user.name} src={`${user.imageUrl.split(":")[0] === "https" ? user.imageUrl :  user.imageUrl}`} sx={{ width: 40, height: 40 }} />
              </Link>
              <CircularProgress variant="determinate" value={charsCount} size={progressCircleSize} sx={{ color: charsProgressColor }} />
            </div>
            <div className="relative w-full">
              <TextField
                inputProps={{ onPaste: (e) => handleDescriptionChange(e) }}
                id="description"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder={t("compose_reel_placeholder")}
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
              />
              {openMentionSearch && (
                <div className="absolute left-1/2 z-[99] -translate-x-1/2 translate-y-[13%] overflow-hidden rounded-2xl">
                  <MentionSearch username={description.split("@").pop()?.split(" ")[0]} callback={mentionCallback} />
                </div>
              )}
              {mentionError && <div className="text-xs text-red-600 ">{t("mention_error")}</div>}
            </div>
          </div>
        </div>
        <div className={`flex w-[20%] flex-col justify-center gap-2 max-xs:text-xs`}>
          <button className={`${styles.normalButton} !border-primary`} onClick={handleClose}>
            {t("cancel")}
          </button>
          <button
            className={`${styles.coloredButton}`}
            disabled={description === "" || selectedTopic === "" || !fileUploaded}
            onClick={() => {
              if (publishRef.current) publishRef.current.disabled = true
              setLoading(true)
              handleAddReel()
            }}
            ref={publishRef}
          >
            {t("publish")}
          </button>
        </div>
      </div>
      <div className={`mt-2  flex flex-grow flex-col justify-around gap-2 composeReelFifth:h-[66%]  composeReelFifth:flex-row composeReelThird:h-[72%] composeReelSecond:h-[75%] composeReelFirst:h-[78%]`}>
        <div className="relative composeReelFifth:w-[47%]">
          {!fileUploaded && (
            <div className={`flex h-full cursor-pointer items-center justify-center rounded-2xl  border border-primary bg-gray-500 p-5`} onClick={handleUploadClick} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
              <div className="flex flex-col items-center justify-center">
                <img src={upload} alt="" className={` `} />
                <div className="text-3xl font-semibold text-black">{t("drag_reel")}</div>
                <div className="text-lg font-semibold text-black">
                  {t("limit")}. {t("supported_files")}
                </div>
              </div>
              <input ref={reelInput} style={{ display: "none" }} accept="video/*" type="file" onChange={handleUploadReel} />
            </div>
          )}
          {fileUploaded && <video controls className={`h-full w-full rounded-2xl `} src={reelUrl} onClick={handleVideoClick} />}
          {fileUploaded && (
            <div className="absolute right-1 top-1 cursor-pointer text-primary" onClick={handleRemoveReel}>
              <Cancel fontSize="large" />
            </div>
          )}
        </div>

        <div className={` mb-3 flex flex-col gap-2 rounded-2xl border border-primary p-3 composeReelFifth:w-[47%]`}>
          <div className="mb-3 border-b border-b-primary pb-1 text-center text-xl font-bold dark:text-white">{t("select_topic")}</div>

          <div className=" flex flex-wrap gap-1 ">
            {topics.map((topic: any) => (
              <div key={topic.topic} className={` w-fit cursor-pointer rounded-full bg-primary px-2 py-1 font-semibold text-black  ${topic.topic === selectedTopic ? "brightness-100" : "brightness-50"}`} onClick={() => handleChooseTopic(topic.topic)}>
                {topic.topic}
              </div>
            ))}
          </div>
          <div className="flex flex-grow"></div>
          <div className="flex flex-grow items-center justify-center rounded-2xl border border-primary p-3 text-white  ">{selectedDescription}</div>
          <div className="flex flex-grow"></div>
        </div>
      </div>
      <div className={`${fileSizeError ? "" : "hidden"} absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl bg-primary p-2 text-xl font-semibold text-black`}>{t("limit_error")}</div>
      {loading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-1">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default ComposeReel

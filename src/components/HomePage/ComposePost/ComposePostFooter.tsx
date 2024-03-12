import React, { useEffect, useRef, useState } from "react"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined"
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined"
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"
import CircularProgress from "@mui/material/CircularProgress"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import AddIcon from "@mui/icons-material/Add"
import { Modal } from "@mui/material"

import { useSelector } from "react-redux"
import { styles } from "../../../styles/styles"
import { useTranslation } from "react-i18next"
import i18next from "i18next"
import ComposeReel from "./ComposeReel"
function ComposePostFooter({
  postType,
  handleUploadMedia,
  mediaDisabled,
  GIFDisabled,
  pollDisabled,
  postDisabled,
  progressCircleSize,
  charsCount,
  charsProgressColor,
  handleSubmit,
  handlePollClick,
  poll,
  publishButton,
  fromQuote,
  description,
  media,
  addReelCallback,
}: {
  postType: string
  handleUploadMedia: (event: React.ChangeEvent<HTMLInputElement>) => void
  mediaDisabled: boolean
  GIFDisabled: boolean
  pollDisabled: boolean
  postDisabled: boolean
  progressCircleSize: number
  charsCount: number
  charsProgressColor: string
  handleSubmit: any
  handlePollClick: any
  poll: any
  publishButton: any
  fromQuote: boolean
  description: string
  media: any
  addReelCallback: any
}) {
  const inputMedia = useRef<HTMLInputElement>(null)
  const inputGif = useRef<HTMLInputElement>(null)

  const handleUploadButton = () => {
    if (inputMedia.current) {
      inputMedia.current.click()
    }
  }

  const handleUploadGif = () => {
    if (inputGif.current) {
      inputGif.current.click()
    }
  }

  const { t } = useTranslation()
  const [pollError, setPollError] = useState(true)

  useEffect(() => {
    if (poll === null || !("days" in poll) || !("minutes" in poll) || !("hours" in poll) || !("choice1" in poll) || !("choice2" in poll)) {
      setPollError(true)
    } else {
      setPollError(false)
    }
  }, [poll])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="mt-3 flex items-center justify-between">
      {!fromQuote && postType !== "reply" && postType !== "reply_reel" && (
        <div className="flex bg-transparent">
          <div className="flex cursor-pointer items-center justify-center gap-2 " onClick={handleOpen}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary p-1 max-[400px]:h-6 max-[400px]:w-6 ">
              <AddIcon />
            </div>
            <span className="text-xl max-[400px]:text-sm max-[320px]:text-xs">
              {t("publish")} {i18next.language === "ar" ? t("reel").slice(2) : t("reel")}
            </span>
          </div>
        </div>
      )}
      {postType !== "reply_reel" && (
        <div className="flex bg-transparent">
          <button onClick={handleUploadButton} title="Media" className="h-10 w-10 cursor-pointer rounded-full p-1 text-primary disabled:cursor-default disabled:brightness-50 dark:hover:bg-gray-800 max-[320px]:h-7 max-[320px]:w-7" disabled={mediaDisabled}>
            <InsertPhotoOutlinedIcon />
          </button>
          <input type="file" accept="image/, .jpg, .jpeg, .png, .webp, .bmp, .svg, .ico, .tiff" onChange={handleUploadMedia} ref={inputMedia} style={{ display: "none" }} />
          <button title="Gif" className="h-10 w-10 cursor-pointer rounded-full p-1 text-primary disabled:cursor-default disabled:brightness-50 dark:hover:bg-gray-800 max-[320px]:h-7 max-[320px]:w-7" onClick={handleUploadGif} disabled={GIFDisabled}>
            <GifBoxOutlinedIcon />
          </button>
          <input type="file" accept="image/gif" onChange={handleUploadMedia} ref={inputGif} style={{ display: "none" }} />
          {postType !== "reply" && postType !== "reply_reel" && (
            <button
              title="Poll"
              className="h-10 w-10 cursor-pointer rounded-full p-1 text-primary disabled:cursor-default disabled:brightness-50 dark:hover:bg-gray-800 max-[320px]:h-7 max-[320px]:w-7"
              disabled={pollDisabled}
              onClick={() => {
                handlePollClick(true)
              }}
            >
              <BallotOutlinedIcon />
            </button>
          )}
        </div>
      )}
      <CircularProgress variant="determinate" value={charsCount} size={progressCircleSize} sx={{ color: charsProgressColor }} />

      <button
        ref={publishButton}
        className={`${styles.coloredButton} !h-9 !w-fit px-2 max-[400px]:text-sm`}
        disabled={(postDisabled && pollError) || (description.length === 0 && media.length === 0)}
        onClick={(e) => {
          publishButton.current?.setAttribute("disabled", "true")
          handleSubmit(e)
        }}
      >
        <span className="font-bold">{t("publish")}</span>
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute left-1/2 top-1/2 h-full w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-3xl border p-4 shadow-card dark:border-darkBorder dark:bg-black ">
          <ComposeReel handleClose={handleClose} addReelCallback={addReelCallback} />
        </div>
      </Modal>
    </div>
  )
}

export default ComposePostFooter

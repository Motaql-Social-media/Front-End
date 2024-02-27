import React, { useEffect, useRef } from "react"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined"
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined"
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"
import CircularProgress from "@mui/material/CircularProgress"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"

import { useSelector } from "react-redux"
import { styles } from "../../../styles/styles"
import { useTranslation } from "react-i18next"
import i18next from "i18next"
function ComposePostFooter({ buttonName, handleUploadMediaClick, handleUploadMedia, hiddenUploadMediaInput, mediaDisabled, GIFDisabled, pollDisabled, postDisabled, progressCircleSize, charsCount, charsProgressColor, handleSubmit }: { buttonName: string; handleUploadMediaClick: any; handleUploadMedia: (event: React.ChangeEvent<HTMLInputElement>) => void; hiddenUploadMediaInput: any; mediaDisabled: boolean; GIFDisabled: boolean; pollDisabled: boolean; postDisabled: boolean; progressCircleSize: number; charsCount: number; charsProgressColor: string; handleSubmit: any }) {
  const themeColor = useSelector((state: any) => state.theme.color)

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

  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex bg-transparent">
        <div className="flex cursor-pointer items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary p-1">
            <AddIcon fontSize="large" />
          </div>
          <span className="text-xl">
            {t("publish")} {i18next.language === "ar" ? t("reel").slice(2) : t("reel")}
          </span>
        </div>
      </div>
      <div className="flex bg-transparent">
        <button onClick={handleUploadButton} title="Media" className="h-10 w-10 rounded-full p-1 text-primary dark:hover:bg-gray-800" disabled={mediaDisabled}>
          <InsertPhotoOutlinedIcon />
        </button>
        <input type="file" accept="image/, .jpg, .jpeg, .png, .webp, .bmp, .svg, .ico, .tiff" onChange={handleUploadMedia} ref={inputMedia} style={{ display: "none" }} />
        <button title="Gif" className="h-10 w-10 rounded-full p-1 text-primary dark:hover:bg-gray-800" onClick={handleUploadGif} disabled={GIFDisabled}>
          <GifBoxOutlinedIcon />
        </button>
        <input type="file" accept="image/gif" onChange={handleUploadMedia} ref={inputGif} style={{ display: "none" }} />
        <button title="Poll" className="h-10 w-10 rounded-full p-1 text-primary dark:hover:bg-gray-800" disabled={pollDisabled}>
          <BallotOutlinedIcon />
        </button>
        <button title="Emoji" className="h-10 w-10 rounded-full p-1 text-primary dark:hover:bg-gray-800">
          <SentimentSatisfiedOutlinedIcon />
        </button>
        <button title="Calender" className="h-10 w-10 rounded-full p-1 text-primary dark:hover:bg-gray-800">
          <EditCalendarIcon />
        </button>
      </div>
      <CircularProgress variant="determinate" value={charsCount} size={progressCircleSize} sx={{ color: charsProgressColor }} />

      <button className={`${styles.coloredButton} !h-9 !w-fit px-2`} disabled={postDisabled}>
        <span className="font-bold">{t("publish")}</span>
      </button>
    </div>
  )
}

export default ComposePostFooter

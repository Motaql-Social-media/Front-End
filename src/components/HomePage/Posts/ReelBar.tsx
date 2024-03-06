import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import { styles } from "../../../styles/styles"
import { useTranslation } from "react-i18next"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
import i18next from "i18next"
import { Modal } from "@mui/material"
import ComposeQuote from "../ComposePost/ComposeQuote"

const ReelBar = ({ id, replyCount, reposted, repostsNum, liked, likesNum, topic, isBookmarked, username }: { id: string; replyCount: number; reposted: boolean; repostsNum: number; liked: boolean; likesNum: number; topic: any; isBookmarked: boolean; username: string }) => {
  const [like, setLike] = useState(liked)
  const [repost, setRepost] = useState(reposted)
  const [bookmark, setBookmark] = useState(isBookmarked)

  const [likeCount, setLikeCount] = useState(likesNum)
  const [repostCount, setRepostCount] = useState(repostsNum)

  const userToken = useSelector((state: any) => state.user.token)

  const { t } = useTranslation()

  const [menuToggle, setMenuToggle] = useState(false)

  const handleMenuClick = (e: any) => {
    e.stopPropagation()
    setMenuToggle((prev) => !prev)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleShare = (e: any) => {
    e.stopPropagation()

    navigator.clipboard.writeText(`https://theline.social/${username}/reel/${id}`)
    setOpenSnackbar(true)
  }

  useEffect(() => {
    if (openSnackbar) {
      setTimeout(() => {
        setOpenSnackbar(false)
      }, 3000)
    }
  }, [openSnackbar])
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleLikeClick = (e: any) => {
    e.stopPropagation()

    API.patch(
      `reels/${id}/toggle-react`,
      {},
      {
        headers: {
          authorization: "Bearer " + userToken,
        },
      }
    )
      .then((res) => {
        setLikeCount(like ? likeCount - 1 : likeCount + 1)
        setLike(!like)
      })
      .catch((err) => console.log(err))
  }
  const handleRepostClick = (e: any, quote: string) => {
    e.stopPropagation()

    API.post(
      `reels/${id}/rereel`,
      {
        content: "",
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

  const handelBookmarkClick = (e: any) => {
    e.stopPropagation()

    API.patch(
      `reels/${id}/toggle-bookmark`,
      {},
      {
        headers: {
          authorization: "Bearer " + userToken,
        },
      }
    )
      .then((res) => {
        setBookmark(!bookmark)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="text-ternairy mt-3 flex   items-center justify-around dark:text-gray-500  ">
      <button className={`${styles.coloredButton} flex !h-fit !w-fit  items-center justify-center max-[600px]:text-sm px-2`} title={topic.description}>
        {topic.topic}
      </button>
      <div className={`group pointer-events-auto flex cursor-pointer items-center transition-colors  duration-300 hover:text-primary`} title={t("reply")}>
        <div className="flex h-10 w-10  items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018] ">
          <ChatBubbleOutlineOutlinedIcon
            sx={{
              width: 16,
              height: 16,
            }}
          />
        </div>
        <span className="text-sm">{replyCount}</span>
      </div>
      <div className="relative">
        <div className={`group pointer-events-auto flex cursor-pointer  items-center transition-colors duration-300 ${repost ? "text-green-500" : ""} hover:text-green-500`} title={t("repost")} onClick={handleMenuClick}>
          <div className={` flex  h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e8f9ee] dark:group-hover:bg-[#031309] `}>
            <CachedOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
          <span className="text-sm">{repostCount}</span>
        </div>
        <div className={`absolute ${i18next.language === "en" ? "left-2" : "right-2"}  top-6 z-10 w-[150px] rounded-md bg-white  dark:bg-black ${menuToggle ? "" : "hidden"} border border-gray-200 dark:border-gray-600 `}>
          <ul className="list-none">
            <li
              className={`items-center p-2 pl-3 text-white `}
              onClick={(e: any) => {
                handleRepostClick(e, "")
                handleMenuClick(e)
              }}
            >
              <CachedOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
              <span className="text-[15px] dark:text-white">{repost ? t("undo_repost") : t("repost")}</span>
            </li>

            <li
              onClick={(e: any) => {
                // handleRepostClick(e, "test")
                handleOpen()
                handleMenuClick(e)
              }}
              className={`flex items-center p-2 pl-3 `}
            >
              <FormatQuoteIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
              <span className="text-[15px] dark:text-white">{t("quote")}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={`group  pointer-events-auto flex cursor-pointer  items-center transition-colors duration-300 ${like ? "text-pink-600" : ""} hover:text-pink-600`} title={t("like")} onClick={handleLikeClick}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#f9e5ef] dark:group-hover:bg-[#14000a]">
          {like && (
            <FavoriteOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          )}
          {!like && (
            <FavoriteBorderOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          )}
        </div>
        <span className="text-sm">{likeCount}</span>
      </div>
      <div className="flex  items-center justify-center ">
        <div className={`group pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 ${bookmark ? "text-primary" : ""} hover:text-primary`} title={t("bookmark")} onClick={handelBookmarkClick}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
            <BookmarkBorderOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
        </div>
        <div
          className={`group pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 hover:text-primary`}
          title={t("share")}
          onClick={(e: any) => {
            handleShare(e)
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
            <FileUploadOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute left-1/2 top-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2 border p-4 dark:border-darkBorder dark:bg-black ">
          <ComposeQuote id={id} handleClose={handleClose} setRepost={setRepost} repost={repost} repostCount={repostCount} setRepostCount={setRepostCount} type="reel" />
        </div>
      </Modal>
      <div className={`absolute bottom-8 left-1/2 ${openSnackbar ? "opacity-100" : "opacity-0"} z-[999] -translate-x-1/2 rounded-full bg-primary p-2 transition-opacity duration-[750]`}>
        <span className="font-semibold text-black">Link Copied to Clipboard</span>
      </div>
    </div>
  )
}

export default ReelBar

import { Avatar } from "@mui/material"

import VerifiedIcon from "@mui/icons-material/Verified"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import i18next from "i18next"

import { Box } from "@mui/material"

import { Link } from "react-router-dom"

import { useState } from "react"
import { useSelector } from "react-redux"
import { styles } from "../../../styles/styles"
import HoveredProfile from "./HoveredProfile"
import { useTranslation } from "react-i18next"

const PostHeader = ({ userProfilePicture, name, username, date, speciality, isFollowed, id, type }: { userProfilePicture: string; name: string; username: string; date: string; speciality: string; isFollowed: boolean; id: string; type: string }) => {
  const [menuToggle, setMenuToggle] = useState(false)

  const user = useSelector((state: any) => state.user.user)

  const handleMenuClick = (e: any) => {
    e.stopPropagation()
    setMenuToggle((prev) => !prev)
  }

  const handleProfileClick = (e: any) => {
    e.stopPropagation()
    console.log("profile")
  }

  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isVisible3, setIsVisible3] = useState(false)

  const [timeoutRef, setTimeoutRef] = useState<any>(null)

  const handleMouseEnter = (n: Number) => {
    clearTimeout(timeoutRef)
    const timer = setTimeout(() => (n === 1 ? setIsVisible(true) : n === 2 ? setIsVisible2(true) : setIsVisible3(true)), 1000) // Change 1000 to desired delay
    setTimeoutRef(timer)
  }

  const handleMouseLeave = (n: number) => {
    clearTimeout(timeoutRef)
    n === 1 ? setIsVisible(false) : n === 2 ? setIsVisible2(false) : setIsVisible3(false)
    setIsVisible(false)
  }

  const tmpUser = {
    followings_num: 120,
    followers_num: 125,
    bio: "this is my bio hhhhhh",
    profile_picture: userProfilePicture,
  } // replace with actual user data me or the post publisher

  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-2">
      <div onClick={handleProfileClick} className="relative" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
        <Avatar alt={name} src={userProfilePicture} sx={{ width: 40, height: 40 }} />
        {isVisible && <HoveredProfile username={username} hoveredUser={tmpUser} />}
      </div>
      <div className="flex gap-1">
        <div className="relative flex flex-col justify-center" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
          <div className="font-semibold text-gray-200 hover:underline" onClick={handleProfileClick}>
            {name}
          </div>
          <div className="text-gray-400">{speciality}</div>
          {isVisible2 && <HoveredProfile username={username} hoveredUser={tmpUser} />}
        </div>
        <div className="flex items-start  gap-1">
          <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>
            <div className="text-gray-400" onClick={handleProfileClick}>
              <span dir="ltr">@{username}</span>
            </div>
            <div className={` bg-ternairy m-1 h-[2px] w-[2px] rounded-full dark:bg-gray-200`}></div>
            <div className="text-gray-400">{date}</div>
            {isVisible3 && <HoveredProfile username={username} hoveredUser={tmpUser} />}
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="more relative ">
        <button onClick={handleMenuClick}>
          <MoreHorizIcon className="text-primary " />
        </button>
        <div className={`absolute ${i18next.language === "en" ? "right-2" : "left-2"}  top-6 z-10 w-[110px] rounded-md bg-white  dark:bg-black ${menuToggle ? "" : "hidden"} w-fit border border-gray-200 dark:border-gray-600 `}>
          <ul className="list-none">
            <MenuItem
              onClick={() => {
                // handleDeletePost();
                // handleMenuClose();
              }}
              className={`flex items-center ${username === user.username ? "" : "hidden"}`}
            >
              <DeleteOutlineIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
              <span className="text-[15px] text-red-600">
                {t("delete")} {t(type)}
              </span>
            </MenuItem>

            <MenuItem
              onClick={() => {
                // isFollowed ? handleUnfollow() : handleFollow();
                // handleMenuClose();
              }}
              className={`${username !== user.username ? "" : "hidden"}`}
            >
              <PersonAddAltIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
              <span className="text-[15px] dark:text-white">
                {isFollowed ? t("unfollow") : t("follow")} <span dir="ltr">@{username}</span>
              </span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                // ProfileRequests.mute(false, APIs, userToken);
                // handleMenuClose();
              }}
              className={`${username !== user.username ? "" : "hidden"}`}
            >
              <VolumeOffOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
              <span className="text-[15px] dark:text-white">
                {t("mute")} <span dir="ltr">@{username}</span>
              </span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                // ProfileRequests.block(false, APIs, userToken);
                // handleMenuClose();
              }}
              className={`${username !== user.username ? "" : "hidden"}`}
            >
              <BlockOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
              <span className="text-[15px] dark:text-white">
                {t("block")} <span dir="ltr">@{username}</span>
              </span>
            </MenuItem>
            <MenuItem onClick={handleMenuClick}>
              <Link className="pointer-events-auto" to={`/${username}/status/${id}/retweets`}>
                <QueryStatsOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
                <span className="text-[15px] dark:text-white">{t("view_post_engagement")}</span>
              </Link>
            </MenuItem>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PostHeader

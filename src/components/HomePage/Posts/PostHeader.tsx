import { Avatar } from "@mui/material"

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

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import HoveredProfile from "./HoveredProfile"
import { useTranslation } from "react-i18next"
import axios from "axios"

const PostHeader = ({ date, tweeter, id, type, posts, setPosts }: { date: string; tweeter: any; id: string; type: string; posts: any; setPosts: any }) => {
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

  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const [timeDifference, setTimeDifference] = useState("")

  const getTimeDifference = (date: string) => {
    const currentDate = new Date().getTime()

    const targetDate = new Date(date).getTime()

    const differenceMs = targetDate - currentDate

    const differenceSeconds = Math.floor(Math.abs(differenceMs / 1000))

    const differenceMinutes = Math.floor(differenceSeconds / 60)

    const differenceHours = Math.floor(differenceMinutes / 60)

    const differenceDays = Math.floor(differenceHours / 24)

    const final = differenceDays > 0 ? `${differenceDays}d` : differenceHours > 0 ? `${differenceHours % 24}h` : differenceMinutes > 0 ? `${differenceMinutes % 60}m` : `${differenceSeconds % 60}s`
    return final
  }

  useEffect(() => {
    setTimeDifference(getTimeDifference(date))
  }, [])

  const userToken = useSelector((state: any) => state.user.token)
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const handleFollowState = () => {
    API.patch(
      `users/current/toggle-follow/${tweeter.username}`,
      {},
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((res) => {
        setFollowState((prev: boolean) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleBlockState = () => {
    API.patch(
      `users/current/toggle-block/${tweeter.username}`,
      {},
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((res) => {
        setBlockState((prev: boolean) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleMuteState = () => {
    API.patch(
      `users/current/toggle-mute/${tweeter.username}`,
      {},
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((res) => {
        setMuteState((prev: boolean) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [followState, setFollowState] = useState<boolean>(tweeter.isFollowed)
  const [blockState, setBlockState] = useState<boolean>(tweeter.isBlocked)
  const [muteState, setMuteState] = useState<boolean>(tweeter.isMuted)

  const handleDeletePost = () => {
    API.delete(`/tweets/${id}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res)
        setPosts(posts.filter((post: any) => post.tweetId !== id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-2">
      <div onClick={handleProfileClick} className="relative" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
        <Avatar alt={tweeter.name} src={process.env.REACT_APP_MEDIA_URL + tweeter.imageUrl} sx={{ width: 40, height: 40 }} />
        {isVisible && <HoveredProfile hoveredUser={tweeter} state={followState} setState={setFollowState} />}
      </div>
      <div className="flex gap-1">
        <div className="relative flex flex-col justify-center" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
          <div className="font-semibold text-gray-200 hover:underline" onClick={handleProfileClick}>
            {tweeter.name}
          </div>
          <div className="text-gray-400">{tweeter.jobtitle}</div>
          {isVisible2 && <HoveredProfile hoveredUser={tweeter} state={followState} setState={setFollowState} />}
        </div>
        <div className="flex items-start  gap-1">
          <div className="relative flex items-center" onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>
            <div className="text-gray-400" onClick={handleProfileClick}>
              <span dir="ltr">@{tweeter.username}</span>
            </div>
            <div className={` bg-ternairy m-1 h-[2px] w-[2px] rounded-full dark:bg-gray-200`}></div>
            <div className="text-gray-400">{timeDifference}</div>
            {isVisible3 && <HoveredProfile hoveredUser={tweeter} state={followState} setState={setFollowState} />}
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      {type !== "fromQuote" && (
        <div className="more relative ">
          <button onClick={handleMenuClick}>
            <MoreHorizIcon className="text-primary " />
          </button>
          <div className={`absolute ${i18next.language === "en" ? "right-2" : "left-2"}  top-6 z-10 w-[250px] rounded-md bg-white  dark:bg-black ${menuToggle ? "" : "hidden"} border border-gray-200 dark:border-gray-600 `}>
            <ul className="list-none">
              <li
                className={`items-center p-2 pl-3 text-red-600 ${tweeter.username === user.username ? "flex" : "hidden"}`}
                onClick={(e: any) => {
                  handleDeletePost()
                  handleMenuClick(e)
                }}
              >
                <DeleteOutlineIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base `} />
                <span className="text-[15px] ">
                  {t("delete")} {t(type)}
                </span>
              </li>

              <li
                onClick={(e: any) => {
                  handleFollowState()
                  handleMenuClick(e)
                }}
                className={`flex items-center p-2 pl-3  ${tweeter.username !== user.username ? "" : "hidden"}`}
              >
                <PersonAddAltIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
                <span className="text-[14px] dark:text-white">
                  {followState ? t("unfollow") : t("follow")} <span dir="ltr">@{tweeter.username}</span>
                </span>
              </li>
              <li
                onClick={(e: any) => {
                  handleMuteState()
                  handleMenuClick(e)
                }}
                className={`flex items-center p-2 pl-3  ${tweeter.username !== user.username ? "" : "hidden"}`}
              >
                <VolumeOffOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
                <span className="text-[14px] dark:text-white">
                  {muteState ? t("unmute") : t("mute")} <span dir="ltr">@{tweeter.username}</span>
                </span>
              </li>
              <li
                onClick={(e: any) => {
                  handleBlockState()
                  handleMenuClick(e)
                }}
                className={`flex items-center p-2 pl-3  ${tweeter.username !== user.username ? "" : "hidden"}`}
              >
                <BlockOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
                <span className=" text-[14px] dark:text-white">
                  {blockState ? t("unblock") : t("block")} <span dir="ltr">@{tweeter.username}</span>
                </span>
              </li>
              <li onClick={handleMenuClick} className={`flex items-center p-2 pl-3  `}>
                <Link className="pointer-events-auto" to={`/${tweeter.username}/status/${id}/engagement`}>
                  <QueryStatsOutlinedIcon className={`${i18next.language === "en" ? "mr-3" : "ml-3"} text-base dark:text-white`} />
                  <span className=" text-[14px] dark:text-white">{t("view_post_engagement")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostHeader

import { Avatar } from "@mui/material"
import { useState } from "react"
import HoveredProfile from "../HomePage/Posts/HoveredProfile"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import EmailIcon from "@mui/icons-material/Email"

const Notification = ({ content, createdAt, isSeen, metadata, notificationFrom, notificationId, type }: { content: string; createdAt: any; isSeen: boolean; metadata: any; notificationFrom: any; notificationId: string; type: string }) => {
  const icons: any = {
    REACT: (
      <div className="text-red-600">
        <FavoriteIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
    REPOST: (
      <div className="text-green-600">
        <CachedOutlinedIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
    REPLY: (
      <div className="text-blue-600">
        <ChatBubbleOutlineOutlinedIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
    MENTION: (
      <div className="text-blue-600">
        <AlternateEmailIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
    MESSAGE: (
      <div className="text-blue-600">
        <EmailIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
    FOLLOW: (
      <div className="text-blue-600">
        <PersonAddIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
  }

  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisibel2] = useState(false)

  const [timeoutRef, setTimeoutRef] = useState<any>(null)

  const handleMouseEnter = (n: Number) => {
    clearTimeout(timeoutRef)
    const timer = setTimeout(() => (n === 1 ? setIsVisible(true) : setIsVisibel2(true)), 1000)
    setTimeoutRef(timer)
  }

  const handleMouseLeave = (n: number) => {
    clearTimeout(timeoutRef)
    n === 1 ? setIsVisible(false) : setIsVisibel2(false)
  }

  const [followState, setFollowState] = useState(notificationFrom.isFollowed)

  const handleProfileClick = (e: any) => {
    e.stopPropagation()
    console.log("profile")
  }

  const user = useSelector((state: any) => state.user.user)

  const navigate = useNavigate()

  const handleNotificationClick = (e: any) => {
    if (type.split("_")[0] === "REACT" || type.split("_")[0] === "MENTION") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "TWEET" ? metadata.tweetId : metadata.reelId}`)
    } else if (type.split("_")[0] === "REPOST") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "TWEET" ? metadata.retweetId : metadata.rereelId}`)
    } else if (type.split("_")[0] === "REPLY") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "TWEET" ? metadata.replyId : metadata.replyId}`)
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // Adjust to 24-hour format as needed
    }

    return new Intl.DateTimeFormat("en-US", options).format(date)
  }

  return (
    <div className="cursor-pointer border-y border-y-darkBorder p-3" onClick={handleNotificationClick}>
      <div className="flex items-center justify-start gap-2">
        {icons[type.split("_")[0]]}
        <div onClick={handleProfileClick} className="relative cursor-pointer" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
          <Avatar alt={notificationFrom.name} src={process.env.REACT_APP_USERS_MEDIA_URL + notificationFrom.imageUrl} sx={{ width: 30, height: 30 }} />
          {isVisible && <HoveredProfile hoveredUser={notificationFrom} state={followState} setState={setFollowState} />}
        </div>
      </div>
      <div className="ml-[5%] mt-2 flex justify-start gap-2">
        <div onClick={handleProfileClick} className="relative cursor-pointer" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
          <span className="cursor-default font-semibold hover:underline">{notificationFrom.name}</span>
          {isVisible2 && <HoveredProfile hoveredUser={notificationFrom} state={followState} setState={setFollowState} />}
        </div>
        <span>{content}</span>
      </div>
      <div className="text-end text-sm text-gray-500">{formatDate(createdAt)}</div>
    </div>
  )
}

export default Notification

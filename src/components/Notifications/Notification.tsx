import { Avatar } from "@mui/material"
import { useState } from "react"
import HoveredProfile from "../HomePage/Posts/HoveredProfile"
import { useNavigate } from "react-router"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import EmailIcon from "@mui/icons-material/Email"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
import i18next from "i18next"
import { t } from "i18next"

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
    QUOTE: (
      <div className="text-blue-600">
        <FormatQuoteIcon sx={{ width: 30, height: 30 }} />
      </div>
    ),
  }

  const notificationTypeContentMap: any = {
    MESSAGE: {
      en: "sent you a message",
      ar: "أرسل لك رسالة",
    },
    MENTION_REEL: {
      en: "mentioned you in a reel",
      ar: "ذكرك في قصة ",
    },
    MENTION_TWEET: {
      en: "mentioned you in a tweet",
      ar: "ذكرك في مدونة",
    },
    FOLLOW: {
      en: "followed you",
      ar: "قام بمتابعتك",
    },
    REPLY_REEL: {
      en: "replied to your reel",
      ar: "رد على قصة خاصة بك",
    },
    REPLY_TWEET: {
      en: "replied to your tweet",
      ar: "رد على مدونة خاصة بك",
    },
    REACT_REEL: {
      en: "reacted to your reel",
      ar: "تفاعل مع قصة خاصة بك",
    },
    REACT_TWEET: {
      en: "reacted to your tweet",
      ar: "تفاعل مع مدونة خاصة بك",
    },
    REPPOST_REEL: {
      en: "reposted your reel",
      ar: "أعاد نشر قصة خاصة بك",
    },
    REPOST_TWEET: {
      en: "reposted your tweet",
      ar: "أعاد نشر مدونة خاصة بك",
    },
    QUOTE_TWEET: {
      en: "quoted your tweet",
      ar: "أقتبس من مدونة خاصة بك",
    },
    QUOTE_REEL: {
      en: "quoted your reel",
      ar: "أقتبس من  قصة خاصة بك",
    },
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
    // console.log("profile")
    navigate(`/${notificationFrom.username}`)
  }

  const navigate = useNavigate()

  const handleNotificationClick = (e: any) => {
    if (type.split("_")[0] === "REACT" || type.split("_")[0] === "MENTION") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "TWEET" ? metadata.tweetId : metadata.reelId}`)
    } else if (type.split("_")[0] === "REPOST") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "TWEET" ? metadata.retweetId : metadata.rereelId}`)
    } else if (type.split("_")[0] === "REPLY") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "TWEET" ? metadata.replyId : metadata.replyId}`)
    } else if (type.split("_")[0] === "QUOTE") {
      navigate(`/${notificationFrom.username}/${type.split("_")[1] === "REEL" ? "reel" : "diary"}/${type.split("_")[1] === "REEL" ? metadata.rereelId : metadata.tweedId}`)
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
      hour12: true,
    }

    const time = new Intl.DateTimeFormat("en-US", options).format(date)

    return i18next.language === "ar"
      ? time
          .replace("AM", "ص")
          .replace("PM", "م")
          .replace(time.split(" ")[0], t(time.split(" ")[0].toLowerCase()))
          .replace("at", "عند")
          .replace(",", "،")
      : time
  }

  return (
    <div className="cursor-pointer border-y border-y-darkBorder p-3" onClick={handleNotificationClick}>
      <div className="flex items-center justify-start gap-2">
        {icons[type.split("_")[0]]}
        <div onClick={handleProfileClick} className="relative cursor-pointer" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
          <Avatar alt={notificationFrom.name} src={notificationFrom.imageUrl.split(":")[0] === "https" ? notificationFrom.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + notificationFrom.imageUrl} sx={{ width: 30, height: 30 }} />
          {isVisible && <HoveredProfile hoveredUser={notificationFrom} state={followState} setState={setFollowState} />}
        </div>
      </div>
      <div className="ml-[5%] mt-2 flex justify-start gap-2">
        <div onClick={handleProfileClick} className="relative cursor-pointer" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
          <span className="cursor-default font-semibold hover:underline">{notificationFrom.name}</span>
          {isVisible2 && <HoveredProfile hoveredUser={notificationFrom} state={followState} setState={setFollowState} />}
        </div>
        <span>{notificationTypeContentMap[type] ? notificationTypeContentMap[type][i18next.language] : ""}</span>
      </div>
      <div className="text-end text-sm text-gray-500">{formatDate(createdAt)}</div>
    </div>
  )
}

export default Notification

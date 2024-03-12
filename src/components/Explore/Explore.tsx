import { useRef, useEffect, useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import i18next from "i18next"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import Reel from "../HomePage/Posts/Reel"
import NoReels from "./NoReels"
import Widgets from "../Widgets/Widgets"
import SubpageNavbar from "../General/SubpageNavbar"
import useCheckAuthentication from "../hooks/useCheckAuthentication"
const Explore = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  useCheckAuthentication()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const { t } = useTranslation()

  const exploreRef = useRef<any>(null)

  useEffect(() => {
    exploreRef.current.scrollTop += scroll
  }, [scroll])

  const [selectedTopic, setSelectedTopic] = useState("Art")

  const handleChooseTopic = (topic: string) => {
    setSelectedTopic(topic)
  }

  const [topics, setTopics] = useState<any[]>([])
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

  const topicsRef = useRef<any>(null)

  const handleScroll = (dir: string) => {
    const scrollContainer = topicsRef.current
    const scrollAmount = 150
    const targetScrollLeft = dir === "left" ? Math.max(0, scrollContainer.scrollLeft - scrollAmount) : Math.min(scrollContainer.scrollWidth - scrollContainer.clientWidth, scrollContainer.scrollLeft + scrollAmount)

    const scrollStep = () => {
      const step = dir === "left" ? -5 : 5
      const delta = targetScrollLeft - scrollContainer.scrollLeft

      if (scrollContainer.scrollLeft < 5) {
        setLeftArrow(false)
      } else {
        setLeftArrow(true)
      }
      if (scrollContainer.scrollLeft > scrollContainer.scrollWidth - scrollContainer.clientWidth - 5) {
        setRightArrow(false)
      } else {
        setRightArrow(true)
      }

      if (Math.abs(delta) > 5) {
        scrollContainer.scrollLeft += step
        requestAnimationFrame(scrollStep)
      } else {
        scrollContainer.scrollLeft = targetScrollLeft
      }
    }

    requestAnimationFrame(scrollStep)
  }

  const [leftArrow, setLeftArrow] = useState(false)
  const [rightArrow, setRightArrow] = useState(true)

  const [reels, setReels] = useState<Reel[]>([])

  const fetchReels = () => {
    API.get(`topics/${selectedTopic}/reels`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        // console.log(res.data.data.supportingreels)
        setReels(res.data.data.supportingreels)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchReels()
  }, [selectedTopic])

  const [muted, setMuted] = useState(false)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={exploreRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="explore" />
        <div dir="ltr" className="flex items-center gap-1 border-y border-y-darkBorder px-1 ">
          <div>
            <div
              onClick={() => {
                handleScroll("left")
              }}
              className={`cursor-pointer ${leftArrow ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
            >
              <KeyboardArrowLeftIcon fontSize="large" />
            </div>
          </div>
          <div ref={topicsRef} className=" no-scrollbar my-1 flex gap-2 overflow-x-scroll px-1 py-3 ">
            {topics.map((topic: any) => (
              <div key={topic.topic} title={topic.description} className={` w-fit cursor-pointer rounded-full bg-primary px-2 py-1 font-semibold text-black  max-[600px]:text-sm max-[560px]:text-[0.5rem]  min-[700px]:px-4 min-[700px]:py-2 ${topic.topic === selectedTopic ? "brightness-100" : "brightness-50"}`} onClick={() => handleChooseTopic(topic.topic)}>
                {topic.topic}
              </div>
            ))}
          </div>
          <div>
            <div
              onClick={() => {
                handleScroll("right")
              }}
              className={`cursor-pointer ${rightArrow ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </div>
          </div>
        </div>
        <div>
          {reels.map((reel: any) => {
            return (
              <div key={reel.reelId}>
                <Reel muted={muted} setMuted={setMuted} inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} postType={reel.type} id={reel.reelId} topic={reel.topics[0]} reels={reels} setReels={setReels} />
              </div>
            )
          })}
          {reels.length === 0 && <NoReels />}
        </div>
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Explore

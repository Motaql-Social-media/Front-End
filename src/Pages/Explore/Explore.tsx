import { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import i18next from "i18next"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import Reel from "../../components/HomePage/Posts/Reel"
import NoReels from "../../components/Explore/NoReels"
import Widgets from "../../components/Widgets/Widgets"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import useCheckAuthentication from "../../components/hooks/useCheckAuthentication"
import { CircularProgress } from "@mui/material"
import Loading from "../../components/General/Loading"
import ElementVisibleObserver from "../../components/General/ElementVisibleObserver"
import { t } from "i18next"
const Explore = ({ scroll }: { scroll: number }) => {
  useCheckAuthentication()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const exploreRef = useRef<any>(null)

  useEffect(() => {
    exploreRef.current.scrollTop += scroll
  }, [scroll])

  const [selectedTopic, setSelectedTopic] = useState(i18next.language === "en" ? "All" : "الكل")

  const handleChooseTopic = (topic: string) => {
    setSelectedTopic(topic)
  }

  const direction = useSelector((state: any) => state.theme.dir)

  const [topics, setTopics] = useState<any[]>([])
  useEffect(() => {
    API.get("topics")
      .then((res) => {
        console.log(res.data.data.topics)
        setTopics([{ topic: t("all") }, ...res.data.data.topics])
      })
      .catch((err) => console.log(err))
  }, [direction])

  const topicsRef = useRef<any>(null)

  const handleScroll = (dir: string) => {
    if (direction === "ltr") {
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
    } else {
      const scrollContainer = topicsRef.current
      const scrollAmount = 150
      // scrollContainer.scrollLeft -= 50
      const targetScrollLeft = dir === "right" ? Math.max(scrollContainer.clientWidth - scrollContainer.scrollWidth, scrollContainer.scrollLeft - scrollAmount) : Math.min(0, scrollContainer.scrollLeft + scrollAmount)

      const scrollStep = () => {
        const step = dir === "right" ? -5 : 5
        const delta = targetScrollLeft - scrollContainer.scrollLeft

        if (Math.abs(scrollContainer.scrollLeft) < 5) {
          setLeftArrow(false)
        } else {
          setLeftArrow(true)
        }
        if (Math.abs(scrollContainer.scrollLeft) > scrollContainer.scrollWidth - scrollContainer.clientWidth - 5) {
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
  }

  const [leftArrow, setLeftArrow] = useState(false)
  const [rightArrow, setRightArrow] = useState(true)

  const [reels, setReels] = useState<Reel[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchReels = () => {
    if (selectedTopic === "All" || selectedTopic === "الكل")
      API.get(`reels/timeline?page=${page}&limit=20`)
        .then((res) => {
          // console.log(res.data.data.timelineReels)
          setLoading(false)
          setReels((prev) => [...prev, ...res.data.data.timelineReels])
          if (res.data.data.timelineReels.length < 20) setFinished(true)
        })
        .catch((err) => console.log(err))
    else
      API.get(`topics/${selectedTopic}/reels?page=${page}&limit=20`)
        .then((res) => {
          // console.log(res.data.data.supportingreels)
          setLoading(false)
          setReels(res.data.data.supportingreels)
          if (res.data.data.supportingreels.length < 20) setFinished(true)
        })
        .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchReels()
  }, [selectedTopic, page])

  const [muted, setMuted] = useState(false)

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={exploreRef} className="no-scrollbar ml-0 mr-1  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="explore" />
        <div className="flex w-full items-center gap-1 border-y border-y-darkBorder px-1 ">
          <div>
            <div
              onClick={() => {
                handleScroll("left")
              }}
              className={`cursor-pointer ${leftArrow ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
            >
              {direction === "rtl" ? <KeyboardArrowRightIcon fontSize="large" /> : <KeyboardArrowLeftIcon fontSize="large" />}
            </div>
          </div>
          <div ref={topicsRef} className="no-scrollbar my-1 flex w-[90%] gap-2 overflow-x-scroll px-1 py-3 ">
            {topics.map((topic: any) => (
              <div key={topic.topic} title={topic.description} className={` w-fit cursor-pointer rounded-full bg-primary px-2 py-1 font-semibold text-black  max-[600px]:text-sm  min-[700px]:px-4 min-[700px]:py-2 ${topic.topic === selectedTopic ? "brightness-100" : "brightness-50"}`} onClick={() => handleChooseTopic(topic.topic)}>
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
              {direction !== "rtl" ? <KeyboardArrowRightIcon fontSize="large" /> : <KeyboardArrowLeftIcon fontSize="large" />}
            </div>
          </div>
        </div>
        {loading && <Loading />}
        {!loading && (
          <div>
            {reels.map((reel: any) => {
              return (
                <div key={reel.reelId}>
                  <Reel muted={muted} setMuted={setMuted} inPostPage={false} content={reel.content} createdAt={reel.createdAt} isBookmarked={reel.isBookmarked} isReacted={reel.isReacted} isRereeled={reel.isRereeled} mentions={reel.mentions} originalReel={reel.originalReel} originalReeler={reel.originalReeler} reReelCount={reel.reReelCount} reactCount={reel.reactCount} reelUrl={reel.reelUrl} reeler={reel.reeler} repliesCount={reel.repliesCount} postType={reel.type} id={reel.reelId} topic={reel.topics[0]} reels={reels} setReels={setReels} />
                </div>
              )
            })}
            {reels.length === 0 && <NoReels />}
            {reels.length === 0 && <div className="h-[150vh]"></div>}
            <ElementVisibleObserver handler={handleFetchMore} />
          </div>
        )}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Explore

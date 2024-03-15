import { useSelector } from "react-redux"
import HorizontalNavbar from "../General/HorizontalNavbar"
import { useEffect, useState, createContext } from "react"
import { Outlet } from "react-router-dom"
import ComposePost from "./ComposePost/ComposePost"
import { useTranslation } from "react-i18next"

import { useRef } from "react"
import axios from "axios"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Widgets from "../Widgets/Widgets"
import useCheckAuthentication from "../hooks/useCheckAuthentication"

export const HomeContext = createContext<any>(null)

const Home = ({ scroll }: { scroll: number }) => {

  useCheckAuthentication()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [diariesPage, setDiariesPage] = useState<number>(1)
  const [finishedDiaries, setFinishedDiaries] = useState<boolean>(false)
  const [reelsPage, setReelsPage] = useState<number>(1)
  const [finishedReels, setFinishedReels] = useState<boolean>(false)

  useEffect(() => {
    if (window.location.pathname === "/home/diaries" || window.location.pathname === "/home") fetchDiaries()
  }, [diariesPage,window.location.pathname])

  useEffect(() => {
    if (window.location.pathname === "/home/reels") fetchReels()
  }, [reelsPage,window.location.pathname])

  // useEffect(() => {
  //   if ((window.location.pathname === "/home/diaries" || window.location.pathname === "/home") && diariesPage === 1) {
  //     setDiaries([])
  //     setDiariesPage(1)
  //     fetchDiaries()
  //   } else if (window.location.pathname === "/home/reels" && reelsPage === 1) {
  //     setReels([])
  //     setReelsPage(1)
  //     fetchReels()
  //   }
  // }, [window.location.pathname])

  const fetchDiaries = () => {
    // console.log(`tweets/timeline?page=${diariesPage}&limit=${20}`)
    API.get(`tweets/timeline?page=${diariesPage}&limit=${20}`)
      .then((res) => {
        // console.log(res.data.data.timelineTweets)
        if (res.data.data.timelineTweets.length < 20) setFinishedDiaries(true)
        setDiaries((prev) => [...prev,...res.data.data.timelineTweets])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchReels = () => {
    // console.log(reelsPage)
    API.get(`reels/timeline?page=${reelsPage}&limit=${20}`)
      .then((res) => {
        // console.log(res.data.data.timelineReels)
        if (res.data.data.timelineReels.length < 20) setFinishedReels(true)
        setReels((prev) => [...prev,...res.data.data.timelineReels])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [diaries, setDiaries] = useState<Diary[]>([])
  const [reels, setReels] = useState<Reel[]>([])

  const { t } = useTranslation()

  const homeRef = useRef<any>(null)

  useEffect(() => {
    homeRef.current.scrollTop += scroll
  }, [scroll])

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos
      setPrevScrollPos(currentScrollPos)

      // Check if scrolling down
      if (isScrollingDown) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const [isVisible, setIsVisible] = useState(true)

  const handleFetchMore = () => {
    if (window.location.pathname === "/home/reels") {
      if (!finishedReels) setReelsPage((prev) => prev + 1)
    } else {
      if (!finishedDiaries) setDiariesPage((prev) => prev + 1)
    }
  }

  const addTweetCallback = (t: any) => {
    // console.log(t)
    setDiaries((prev) => [t, ...prev])
  }
  const addReelCallback = (r: any) => {
    setReels((prev) => [r, ...prev])
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={homeRef} className="home no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div
          className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer border-b bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300 dark:border-b-darkBorder max-[540px]:hidden`}
          onClick={() => {
            window.location.reload()
          }}
        >
          {t("home")}
        </div>
        <div>
          <ComposePost buttonName="Post" postId={""} postType="diary" addTweetCallback={addTweetCallback} addReelCallback={addReelCallback} />
        </div>
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("diaries"), location: "diaries" },
              { title: t("reels"), location: "reels" },
            ]}
            originalUrl="/home"
            handlers={[null, null]}
          />
        </div>
        <HomeContext.Provider value={{ diaries, setDiaries, reels, setReels }}>
          <Outlet />
        </HomeContext.Provider>

        <ElementVisibleObserver handler={handleFetchMore} />
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Home

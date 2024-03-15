import { useEffect, useState, useRef, createContext } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { useTranslation } from "react-i18next"
import HorizontalNavbar from "../General/HorizontalNavbar"
import Widgets from "../Widgets/Widgets"
import useCheckAuthentication from "../hooks/useCheckAuthentication"
import ElementVisibleObserver from "../General/ElementVisibleObserver"
import Loading from "../General/Loading"

export const BookmarksContext = createContext<any>(null)

const Bookmarks = ({ scroll }: { scroll: number }) => {
  useCheckAuthentication()

  const user = useSelector((state: any) => state.user)

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const [diaries, setDiaries] = useState<Diary[]>([])
  const [reels, setReels] = useState<Reel[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const { t } = useTranslation()

  const bookmarksRef = useRef<any>(null)

  useEffect(() => {
    bookmarksRef.current.scrollTop += scroll
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

  const [loading, setLoading] = useState(true)

  const fetchBookmarksDiaries = () => {
    API.get(`users/current/tweet-bookmarks?page=${page}&limit=20`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        // console.log(res)
        setLoading(false)

        if (res.data.data.bookmarks.length < 20) {
          setFinished(true)
        }
        setDiaries((prev) => [...prev, ...res.data.data.bookmarks])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchBookmarksReels = () => {
    API.get(`users/current/reel-bookmarks?page=${page}&limit=20`, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        // console.log(res)
        setLoading(false)
        if (res.data.data.bookmarks.length < 20) {
          setFinished(true)
        }
        setReels((prev) => [...prev, ...res.data.data.bookmarks])
      })
      .catch((err) => {
        console.log(err)
      })
  }



  const fetchData = () => {
    if (window.location.pathname === "/bookmarks/diaries" || window.location.pathname === "/bookmarks") {
      if (!finished) {
        fetchBookmarksDiaries()
      }
    } else if (window.location.pathname === "/bookmarks/reels") {
      if (!finished) {
        fetchBookmarksReels()
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [window.location.pathname, page])

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={bookmarksRef} className="home no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div
          className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer border-b bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300 dark:border-b-darkBorder max-[540px]:hidden`}
          onClick={() => {
            window.location.reload()
          }}
        >
          {t("bookmarks")}
        </div>
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("diaries"), location: "diaries" },
              { title: t("reels"), location: "reels" },
            ]}
            originalUrl="/bookmarks"
            handlers={[null, null]}
          />
        </div>
        {loading && <Loading />}
        {!loading && (
          <>
            <BookmarksContext.Provider value={{ diaries, setDiaries, reels, setReels }}>
              <Outlet />
            </BookmarksContext.Provider>
            <ElementVisibleObserver handler={handleFetchMore} />
          </>
        )}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Bookmarks

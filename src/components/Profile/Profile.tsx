import React, { useEffect, useRef, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ImageViewer from "react-simple-image-viewer"
import FollowButton from "../General/FollowButton"
import BlockButton from "../General/BlockButton"
import MuteButton from "../General/MuteButton"
import { ArrowForward, Cake, CalendarMonth, Edit, LocationOn } from "@mui/icons-material"
import { Link } from "react-router-dom"
import i18next, { use } from "i18next"
import { Outlet } from "react-router-dom"
import HorizontalNavbar from "../General/HorizontalNavbar"
import EditProfileButton from "../General/EditProfileButton"
import Widgets from "../Widgets/Widgets"
import useCheckAuthentication from "../hooks/useCheckAuthentication"

const Profile = ({ scroll }: { scroll: number }) => {
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

  const profileRef = useRef<any>(null)

  useEffect(() => {
    profileRef.current.scrollTop += scroll
  }, [scroll])

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos
      setPrevScrollPos(currentScrollPos)

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

  const { tag } = useParams()

  const handleBack = () => {
    navigate(-1)
  }

  const [profile, setProfile] = useState<any>(null)

  const [username, setUsername] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [bannerUrl, setBannerUrl] = useState<string>("")
  const [createdAt, setCreatedAt] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<string>("")
  const [followersCount, setFollowersCount] = useState<number>(0)
  const [followingsCount, setFollowingsCount] = useState<number>(0)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [jobTitle, setJobTitle] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [postsCount, setPostsCount] = useState<number>(0)

  useEffect(() => {


    API.get(`users/${tag}/profile`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        console.log(res.data.data.user)
        setProfile(res.data.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [tag])

  useEffect(() => {
    if (profile) {
      setUsername(profile.username)
      setBio(profile.bio)
      setName(profile.name)
      setBannerUrl(profile.bannerUrl)
      setCreatedAt(profile.createdAt)
      setDateOfBirth(profile.dateOfBirth)
      setFollowersCount(profile.followersCount)
      setFollowingsCount(profile.followingsCount)
      setIsFollowed(profile.isFollowed)
      setIsBlocked(profile.isBlocked)
      setIsMuted(profile.isMuted)
      setImageUrl(profile.imageUrl)
      setJobTitle(profile.jobtitle)
      setLocation(profile.location)
      setPostsCount(profile.postsCount)
    }
  }, [profile])

  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    const month = date.toLocaleString("default", { month: "long" })
    const day = date.getDate()
    const year = date.getFullYear()

    return `${t("born")} ${t(month.toLowerCase())} ${day}, ${year}`
  }

  function formatJoinDate(dateString: string) {
    const date = new Date(dateString)

    const month = date.toLocaleString("default", { month: "long" })
    const year = date.getFullYear()

    return `${t("joined")} ${t(month.toLowerCase())} ${year}`
  }

  useEffect(() => {
    if (tag === user.username) {
      setBannerUrl(user.bannerUrl)
      setImageUrl(user.imageUrl)
    }
  }, [user])

  

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={profileRef} className="no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <div className={`flex items-center justify-start gap-7 ${i18next.language === "en" ? "pl-2" : "pr-2"}`}>
          <div onClick={handleBack} className="cursor-pointer">
            {i18next.language === "en" ? <ArrowBackIcon fontSize="small" /> : <ArrowForward fontSize="small" />}
          </div>
          <div
            className={` sticky left-0 top-0  ${isVisible ? "opacity-100" : "opacity-0"} z-[99] cursor-pointer bg-black bg-opacity-80 p-3 text-xl font-bold backdrop-blur-md transition-opacity duration-300  max-[540px]:hidden`}
            onClick={() => {
              window.location.reload()
            }}
          >
            <div>
              {name}
              <div className="text-sm text-gray-500">
                {postsCount} {t("posts")}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-darkBorder">
          <div className="relative">
            <img alt="banner" className="h-[200px] w-full cursor-pointer" src={process.env.REACT_APP_USERS_MEDIA_URL + bannerUrl} loading="lazy" onClick={() => openImageViewer(1)} />
            <div>
              <img loading="lazy" onClick={() => openImageViewer(0)} alt="profile" className="absolute -bottom-[75px] left-[5%] h-[150px] w-[150px] transform  cursor-pointer rounded-full border-4 border-black" src={imageUrl.split(":")[0] === "https" ? imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + imageUrl} />
            </div>
          </div>
          <div dir="ltr">
            <div className="min-h-[75px] w-full max-xs:mt-16">
              <div className="flex items-center justify-end gap-4 p-5">
                <MuteButton state={isMuted} setState={setIsMuted} username={tag as string} />
                <BlockButton state={isBlocked} setState={setIsBlocked} username={tag as string} />
                <FollowButton state={isFollowed} setState={setIsFollowed} username={tag as string} />
                <EditProfileButton setName={setName} setBio={setBio} setJobTitle={setJobTitle} setLocation={setLocation} setBannerUrl={setBannerUrl} setDateOfBirth={setDateOfBirth} setImageUrl={setImageUrl} image_profile={imageUrl} banner_image={bannerUrl} name={name} bio={bio} location={location} jobtitle={jobTitle} birthday={dateOfBirth} username={tag as string} />
              </div>
            </div>
            <div className="p-5">
              <div>
                <div className="flex items-center justify-start gap-3">
                  <div className="text-xl font-bold">{name}</div>
                  <div className="text-lg text-gray-500"> - {jobTitle}</div>
                </div>
                <div className=" text-gray-500">@{username}</div>
              </div>
              <div className="py-3">{bio}</div>
              <div className="flex items-center justify-between py-3 text-gray-500">
                {location && (
                  <div className="flex items-center gap-1">
                    <LocationOn
                      sx={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    {location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Cake
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  {formatDate(dateOfBirth)}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarMonth
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  {formatJoinDate(createdAt)}
                </div>
              </div>
              <div className="mt-2 flex justify-start gap-3 ">
                <Link className={`${i18next.language === "en" ? "mr-2" : "ml-2"}  text-sm hover:underline`} to={`/${username}/followers_followings/followings`}>
                  <span className="font-semibold">{followingsCount}</span> <span className="text-secondary">{t("followings")}</span>
                </Link>
                <Link className="text-sm hover:underline" to={`/${username}/followers_followings/followers`}>
                  <span className="font-semibold">{followersCount}</span> <span className="text-secondary">{t("followers")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[53px] items-center border-b border-b-darkBorder pb-2">
          <HorizontalNavbar
            urls={[
              { title: t("diaries_replies"), location: "diaries" },
              { title: t("reels"), location: "reels" },
            ]}
            originalUrl={`/${tag}`}
            handlers={[null, null]}
          />
        </div>
        <Outlet />
      </div>
      {isViewerOpen && (
        <div className="z-[99]" dir="ltr">
          <ImageViewer disableScroll={true} src={[imageUrl, bannerUrl].map((m) => (m.split(":")[0] === "https" ? m : process.env.REACT_APP_USERS_MEDIA_URL + m))} currentIndex={currentImage} closeOnClickOutside={true} onClose={closeImageViewer} />
        </div>
      )}
      {user && <Widgets />}
    </div>
  )
}

export default Profile

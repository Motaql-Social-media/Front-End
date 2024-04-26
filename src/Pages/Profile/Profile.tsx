import React, { useEffect, useRef, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ImageViewer from "react-simple-image-viewer"
import FollowButton from "../../components/General/FollowButton"
import BlockButton from "../../components/General/BlockButton"
import MuteButton from "../../components/General/MuteButton"
import { ArrowForward, Cake, CalendarMonth, Edit, LocationOn } from "@mui/icons-material"
import { Link } from "react-router-dom"
import i18next, { use } from "i18next"
import { Outlet } from "react-router-dom"
import HorizontalNavbar from "../../components/General/HorizontalNavbar"
import EditProfileButton from "../../components/General/EditProfileButton"
import Widgets from "../../components/Widgets/Widgets"
import useCheckAuthentication from "../../components/hooks/useCheckAuthentication"
import { CircularProgress } from "@mui/material"
import ProfileChatButton from "../../components/General/ProfileChatButton"

const Profile = ({ scroll }: { scroll: number }) => {
  const navigate = useNavigate()

  useCheckAuthentication()

  const user = useSelector((state: any) => state.user.user)

  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
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
  const [viewPosts, setViewPosts] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [isBlockingMe, setIsBlockingMe] = useState(false)

  useEffect(() => {
    API.get(`users/${tag}/profile`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setLoading(false)
        setProfile(res.data.data.user)
        setViewPosts(!res.data.data.user.isBlocked)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 404) navigate("/404")
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
      setIsBlockingMe(profile.isBlocking)
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
    if (tag === user?.username) {
      setBannerUrl(user?.bannerUrl)
      setImageUrl(user?.imageUrl)
    }
  }, [user])

  useEffect(() => {
    setViewPosts(!isBlocked)
  }, [isBlocked])

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_USERS_MEDIA_URL + imageUrl)
  // }, [imageUrl])

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
            <div className="">
              <img loading="lazy" onClick={() => openImageViewer(0)} alt="profile" className={`absolute -bottom-[75px] bg-black ${i18next.language === "en" ? "left-[5%]" : "right-[5%]"}  h-[150px] w-[150px] transform  cursor-pointer rounded-full border-4 border-black`} src={imageUrl.split(":")[0] === "https" ? imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + imageUrl} />
            </div>
          </div>
          <div>
            <div className="min-h-[75px] w-full max-xs:mt-16">
              <div className="flex items-center justify-end gap-4 p-5">
                <ProfileChatButton tag={tag} />
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
                  <div className="text-lg text-gray-500">@{username}</div>
                </div>
                <div className=" text-gray-500">{jobTitle}</div>
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
        {loading && (
          <div className="flex w-full justify-center">
            <CircularProgress
              sx={{
                color: "#40e5da",
              }}
            />
          </div>
        )}
        {!loading && (
          <>
            {isBlockingMe && (
              <div className="flex w-full flex-col items-center gap-4">
                <div className="text-3xl font-bold text-red-500">
                  @{username} {t("blocking_you")}
                </div>
                <div className="max-w-[400px] text-gray-500">{t("blocking_message", { tag: username })}</div>
              </div>
            )}
            {!isBlockingMe && (
              <div>
                {viewPosts && (
                  <div>
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
                )}
                {!viewPosts && (
                  <div className="flex h-96 flex-col items-center gap-5 pt-12">
                    <div className="flex gap-3 text-3xl font-bold">
                      <div>@{username}</div>
                      <div>{t("is_blocked")}</div>
                    </div>
                    <div className="max-w-[400px] text-gray-500">
                      {t("view_posts_message")}
                      {username}.
                    </div>
                    <button className="w-fit rounded-full bg-primary px-5 py-3 text-2xl font-semibold text-black hover:bg-primaryHover" onClick={() => setViewPosts(true)}>
                      {t("view_posts")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
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

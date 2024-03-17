import { Close } from "@mui/icons-material"
import { Modal } from "@mui/material"
import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { TextField } from "@mui/material"
import Birthdate from "../Signup/Birthdate"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import Crop from "./Crop/Crop"
import axios from "axios"
import { useDispatch } from "react-redux"
import { changeUser } from "../../store/UserSlice"
import { t } from "i18next"
import i18next from "i18next"
import { styles } from "../../styles/styles"

const EditProfileButton = ({ setBio, setName, setBannerUrl, setDateOfBirth, setImageUrl, setJobTitle, setLocation, image_profile, banner_image, name, bio, location, jobtitle, birthday, username }: { image_profile: string; banner_image: string; name: string; bio: string; location: string; jobtitle: string; birthday: string; username: string; setBio: any; setName: any; setBannerUrl: any; setDateOfBirth: any; setImageUrl: any; setJobTitle: any; setLocation: any }) => {
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [newName, setNewName] = useState(name !== null ? name : "")
  const [newBio, setNewBio] = useState(bio !== null ? bio : "")
  const [newLocation, setNewLocation] = useState(location !== null ? location : "")
  const [newJobtitle, setNewJobtitle] = useState(jobtitle)
  const [month, setMonth] = useState(birthday.split("-")[1])
  const [day, setDay] = useState(birthday.split("-")[2])
  const [year, setYear] = useState(birthday.split("-")[0])
  const [newbannerImage, setnewbannerImage] = useState(banner_image)
  const [newprofileImage, setnewprofileImage] = useState(image_profile)
  const [newbannerImageUrl, setnewbannerImageUrl] = useState(banner_image)
  const [newprofileImageUrl, setnewprofileImageUrl] = useState(image_profile)
  const dispatch = useDispatch()

  useEffect(() => {
    setNewName(name !== null ? name : "")
    setNewBio(bio !== null ? bio : "")
    setNewLocation(location !== null ? location : "")
    setNewJobtitle(jobtitle)
    setDay(birthday.split("-")[2])
    setYear(birthday.split("-")[0])
    setMonth(new Date(birthday).toLocaleString("en-US", { month: "long" }).toLowerCase())
    setnewbannerImage(banner_image)
    setnewbannerImageUrl(banner_image)
    setnewprofileImage(image_profile)
    setnewprofileImageUrl(image_profile)
  }, [name, bio, location, jobtitle, birthday, banner_image, image_profile])

  useEffect(() => {
    // console.log(banner_image)
  }, [banner_image])

  function formatDate(dateString: string) {
    const date = new Date(dateString)

    const month = date.toLocaleString("en-US", { month: "long" }).toLowerCase()
    const day = date.getDate()
    const year = date.getFullYear()

    return `${t(month.toLowerCase())} ${day}, ${year}`
  }

  const [editBirthday, setEditBirthday] = useState(false)

  const hiddenBannerInput = useRef(null)
  const hiddenImageInput = useRef(null)

  const [profilePic, setProfilePic] = useState(user?.imageUrl)
  const [profilePicURL, setProfilePicURL] = useState(user?.imageUrl)

  const [openCrop, setOpenCrop] = useState(false)

  const handlePictureClick = (event: any) => {
    if (hiddenImageInput.current !== null) (hiddenImageInput.current as HTMLElement).click()

    setType("profile")
  }

  const c = document.body.getElementsByClassName("reactEasyCrop_CropArea")[0]
  const [type, setType] = useState("profile")

  useEffect(() => {
    if (openCrop)
      if (c)
        if (type === "banner") {
          c.setAttribute("style", "border-radius: 0px !important;")
        } else {
          c.setAttribute("style", "border-radius: 50% !important;")
        }
  }, [openCrop, type, c])

  useEffect(() => {
    if (type === "banner") {
      setnewbannerImage(profilePic)
      setnewbannerImageUrl(profilePicURL)
    } else {
      setnewprofileImage(profilePic)
      setnewprofileImageUrl(profilePicURL)
    }
  }, [profilePicURL, profilePic])

  const handleBannerClick = (event: any) => {
    setType("banner")

    if (hiddenBannerInput.current !== null) (hiddenBannerInput.current as HTMLElement).click()
  }

  const handlePictureChange = (event: any) => {
    const fileUploaded = event.target.files[0]

    setProfilePic(fileUploaded)
    setProfilePicURL(URL.createObjectURL(fileUploaded))

    setOpenCrop(true)
    event.target.value = null
  }

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
      "accept-language": i18next.language,
    },
  })

  const handleSave = () => {
    // console.log(`${year}-${month}-${day}`)
    const formData = new FormData()
    if (newName !== user?.name && newName !== "") formData.append("name", newName)
    if (newBio !== user?.bio) formData.append("bio", newBio)
    if (newLocation !== user?.location) formData.append("location", newLocation)
    if (newJobtitle !== user?.jobtitle && newJobtitle !== "") formData.append("jobtitle", newJobtitle)
    if (`${year}-${month}-${day}` !== user?.dateOfBirth) formData.append("dateOfBirth", `${year}-${month}-${day}`)
    if (newprofileImage !== image_profile) {
      formData.append("image_profile", newprofileImage)
    }
    if (newbannerImage !== banner_image) {
      formData.append("banner_profile", newbannerImage)
    }

    API.patch(`users/current/edit-profile`, formData)
      .then((res) => {
        //   console.log(res.data.data.user)
        setName(res.data.data.user.name)
        setBio(res.data.data.user.bio)
        setLocation(res.data.data.user.location)
        setJobTitle(res.data.data.user.jobtitle)
        setDateOfBirth(res.data.data.user.dateOfBirth)
        setImageUrl(res.data.data.user.imageUrl)
        setBannerUrl(res.data.data.user.bannerUrl)
        dispatch(changeUser(res.data.data.user))
        setOpen(false)
        setEditBirthday(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle: modalStyleT = {
    position: "absolute",
    borderRadius: "16px",
    backgroundColor: "black",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }

  return (
    <div>
      {user?.username === username && (
        <button className={` h-10 w-fit rounded-full border border-darkBorder px-3 font-semibold hover:bg-darkHover`} onClick={handleOpen}>
          {t("edit_profile")}
        </button>
      )}
      <Modal open={open} onClose={handleClose} disableEscapeKeyDown disablePortal>
        <div style={modalStyle} className={`  h-[90%] w-[40%]  overflow-y-scroll rounded-2xl border p-4  dark:border-darkBorder dark:bg-black`}>
          <div className={`${openCrop ? "hidden" : "block"}`}>
            <div className="flex items-center gap-5">
              <div className="cursor-pointer rounded-full p-1  text-white hover:bg-darkHover" onClick={handleClose}>
                <Close />
              </div>
              <div className="text-2xl font-semibold text-white">{t("edit_profile")}</div>
              <div className="flex-grow"></div>
              <div>
                <button className="rounded-full bg-primary px-3 py-1 text-lg font-semibold" onClick={handleSave}>
                  {t("save")}
                </button>
              </div>
            </div>
            <div className="relative mb-[90px] mt-3 h-[200px] w-full">
              <div className="relative h-full w-full">
                <img src={newbannerImageUrl === banner_image ? process.env.REACT_APP_USERS_MEDIA_URL + newbannerImageUrl : newbannerImageUrl} alt="banner" className="h-full w-full" />
                <input type="file" accept="image/*" hidden ref={hiddenBannerInput} onChange={handlePictureChange} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-900 p-2 hover:bg-darkHover" onClick={handleBannerClick}>
                  <AddAPhotoOutlinedIcon sx={{ color: "white" }} />
                </div>
              </div>
              <div>
                <div className="absolute -bottom-[75px] left-[5%] h-[150px] w-[150px] cursor-pointer rounded-full">
                  <div className="relative h-full w-full">
                    <img src={newprofileImageUrl === image_profile ? (newprofileImage.split(":")[0] === "https" ? newprofileImage : process.env.REACT_APP_USERS_MEDIA_URL + newprofileImageUrl) : newprofileImageUrl} alt="profile" className=" h-full w-full rounded-full  border-4 border-black" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-900 p-2 hover:bg-darkHover" onClick={handlePictureClick}>
                      <AddAPhotoOutlinedIcon sx={{ color: "white" }} />
                    </div>
                  </div>
                  <input type="file" accept="image/*" hidden ref={hiddenImageInput} onChange={handlePictureChange} />
                </div>
              </div>
            </div>
            <div dir={i18next.language === "en" ? "ltr" : "rtl"} className="flex flex-col gap-4">
              <div className="relative">
                <TextField
                  label={t("name")}
                  variant="outlined"
                  value={newName}
                  onChange={(e) => {
                    const newValue: string = e.target.value.slice(0, 25)

                    setNewName(newValue)
                  }}
                  inputProps={{ onPaste: (e) => e.preventDefault() }}
                  InputLabelProps={{
                    style: { color: "#40e5da", textAlign: "right" },
                  }}
                  sx={styles.textField}
                />
                <div className={`absolute ${i18next.language === "en" ? "right-4" : "left-4"}  top-1 w-fit text-sm text-gray-500`}>{newName ? newName.length : 0}/25</div>
              </div>
              <div className="relative h-[120px]">
                <TextField
                  multiline
                  label={t("bio")}
                  variant="outlined"
                  value={newBio}
                  onChange={(e) => {
                    const newValue = e.target.value.slice(0, 160)

                    setNewBio(newValue)
                  }}
                  InputLabelProps={{
                    style: { color: "#40e5da", textAlign: "right" },
                  }}
                  inputProps={{ onPaste: (e) => e.preventDefault() }}
                  sx={styles.bioTextField}
                />
                <div className={`absolute ${i18next.language === "en" ? "right-4" : "left-4"}  top-1 w-fit text-sm text-gray-500`}>{newBio ? newBio.length : 0}/160</div>
              </div>
              <div className="relative">
                <TextField
                  inputProps={{ onPaste: (e) => e.preventDefault() }}
                  label={t("location")}
                  variant="outlined"
                  value={newLocation}
                  onChange={(e) => {
                    const newValue = e.target.value.slice(0, 30)

                    setNewLocation(newValue)
                  }}
                  InputLabelProps={{
                    style: { color: "#40e5da", textAlign: "right" },
                  }}
                  sx={styles.textField}
                />
                <div className={`absolute ${i18next.language === "en" ? "right-4" : "left-4"}  top-1 w-fit text-sm text-gray-500`}>{newLocation ? newLocation.length : 0}/30</div>
              </div>
              <div className="relative">
                <TextField
                  inputProps={{ onPaste: (e) => e.preventDefault() }}
                  label={t("speciality")}
                  variant="outlined"
                  value={newJobtitle}
                  onChange={(e) => {
                    const newValue = e.target.value.slice(0, 30)

                    setNewJobtitle(newValue)
                  }}
                  InputLabelProps={{
                    style: { color: "#40e5da", textAlign: "right" },
                  }}
                  sx={styles.textField}
                />
                <div className={`absolute ${i18next.language === "en" ? "right-4" : "left-4"}  top-1 w-fit text-sm text-gray-500`}>{newJobtitle ? newJobtitle.length : 0}/30</div>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <div className="  text-gray-500">{t("birthdate")}</div>
                  <div
                    className="cursor-pointer text-primary"
                    onClick={() => {
                      if (!editBirthday) setEditBirthday(true)
                      else setEditBirthday(false)
                    }}
                  >
                    {editBirthday ? t("cancel") : t("edit")}
                  </div>
                </div>
                {!editBirthday && <div className="mb-2 text-xl text-white">{formatDate(birthday)}</div>}
                {editBirthday && (
                  <div>
                    <div className="mb-2 text-sm text-gray-500">{t("edit_birth_data_message")}</div>
                    <div className="flex w-full justify-center">
                      <Birthdate month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} monthwidth={"120px"} yearwidth={"100px"} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`${openCrop ? "!block" : "!hidden"}  !mt-0`}>
            <Crop photoURL={profilePicURL} setOpenCrop={setOpenCrop} setPhotoURL={setProfilePicURL} setFile={setProfilePic} aspect={type === "banner" ? 3 : 1} originalPhoto={type === "banner" ? user?.bannerUrl : user?.imageUrl} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EditProfileButton

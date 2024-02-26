import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import DisplayMedia from "../../DisplayImages/DisplayMedia"
import axios from "axios"
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import VerifiedIcon from "@mui/icons-material/Verified"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ComposePostFooter from "./ComposePostFooter"
import { getColor } from "../../../constants"
import { useTranslation } from "react-i18next"
import i18next from "i18next"

function ComposePost({
  buttonName,
  handleNewPost,
  postType,
}: //   referredTweetId,
//   handleClosePopup,
{
  buttonName: string
  handleNewPost: any
  postType: string
  //   referredTweetId: string;
  //   handleClosePopup: any;
}) {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [description, setDescription] = useState("")
  const [replyPermissionIndex, setReplyPermissionIndex] = useState(0)
  const [runningMock, setRunningMock] = useState(false)
  const [charsCount, setCharsCount] = useState(0)
  const [charsProgressColor, setCharsProgressColor] = useState("#1D9BF0")
  const [progressCircleSize, setProgressCircleSize] = useState(24)
  const [progressCircleValue, setProgressCircleValue] = useState<number | null>(null)
  const [media, setMedia] = useState<any[]>([])
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [mediaDisabled, setMediaDisabled] = useState(false)
  const [GIF, setGIF] = useState(null)
  const [GIFDisabled, setGIFDisabled] = useState(false)
  const [poll, setPoll] = useState(null)
  const [pollDisabled, setpollDisabled] = useState(false)
  const [postDisabled, setPostDisabled] = useState(true)
  const hiddenUploadMediaInput = useRef()

  const darkMode = useSelector((state: any) => state.theme.darkMode)
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  useEffect(() => {
    setPostDisabled(((description.length === 0 || (description.match(/\s/g) && description.match(/\s/g)?.length === description.length)) && media.length === 0) || description.length > 280)
  }, [description, media])

  const getComposeTweet = () => {
    // return {
    //   referredTweetId: referredTweetId,
    //   description: `${runningMock ? "ismail ramadan" : description}`,
    //   media: media.map((item: any, index) => {
    //     return {
    //       data: mediaUrls[index],
    //       type: item.type.match(/mp4/) ? "mp4" : "jpg",
    //     };
    //   }),
    //   type: postType,
    // };
  }

  const handleDeleteMediaCallback = (index: number) => {
    setMedia(media.filter((i, ind) => ind !== index))
    setMediaDisabled(false)
  }

  const openMenu = Boolean(anchorPostMenu)

  const handleMenuButtonClick = (event: any) => {
    setAnchorPostMenu(event.currentTarget)
  }
  const handleMenuClose = (event: any) => {
    setAnchorPostMenu(null)
  }
  const handleMenuItemClick = (event: any, index: any) => {
    setReplyPermissionIndex(index)
    setAnchorPostMenu(null)
  }

  const handleSubmit = (event: any) => {
    // event.preventDefault();
    // console.log("handleSubmit");
    // console.log("description ", description);
    // console.log("userToken ", userToken);
    // setDescription("");
    // setCharsCount(0);
    // setCharsProgressColor("#1D9BF0");
    // setProgressCircleSize(24);
    // setProgressCircleValue(null);
    // setMedia([]);
    // setMediaUrls([]);
    // setMediaDisabled(false);
    // setGIFDisabled(false);
    // setpollDisabled(false);
    // console.log("getComposeTweet ", getComposeTweet(postType));
    // axios
    //   .post(APIs.actual.postTweetAPI, getComposeTweet(), {
    //     headers: {
    //       authorization: "Bearer " + userToken,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("success in handleSubmit");
    //     console.log("response.data ", response.data);
    //     const post = { ...response.data };
    //     if (runningMock) {
    //       post.data.description = description;
    //       post.data.media = media.map((item, index) => {
    //         return {
    //           type: item.type.match(/mp4/) ? "mp4" : "jpg",
    //           data: mediaUrls[index],
    //         };
    //       });
    //       console.log("running mock");
    //       console.log(post);
    //     }
    //     handleNewPost && handleNewPost(post);
    //     handleClosePopup && handleClosePopup();
    //   })
    //   .catch((error) => {
    //     console.log("error in handleSubmit");
    //     console.log(error);
    //   });
  }
  const handleDescriptionChange = (e: any) => {
    if (e.target.value.length < 280) setDescription(e.target.value)
    setCharsCount((e.target.value.length * 100) / 280)
    setCharsProgressColor(e.target.value.length < 260 ? "#1D9BF0" : e.target.value.length < 280 ? "#fdd81f" : "#f4212e")
    setProgressCircleSize(e.target.value.length < 260 ? 24 : 32)
    setProgressCircleValue(e.target.value.length >= 260 ? 280 - e.target.value.length : null)
  }
  const handleUploadMediaClick = (e: any) => {
    // e.preventDefault();
    // hiddenUploadMediaInput.current.click();
  }
  const handleUploadMedia = (uploadedMedia: any) => {
    const file = uploadedMedia.target.files[0]
    // console.log(uploadedMedia.target.files[0])
    setMedia([...mediaUrls, file])
    // const mediaFormData = new FormData()
    // mediaFormData.append("media", uploadedMedia.target.files[0])
    // call to upload media

    const imageUrl = URL.createObjectURL(file)
    setMediaUrls([...mediaUrls, imageUrl])

    // if (uploadedMedia.target.files[0]) {
    //   mediaFormData.append("media", uploadedMedia.target.files[0]);
    //   axios
    //     .post(APIs.actual.uploadMedia, mediaFormData, {
    //       headers: {
    //         authorization: "Bearer " + userToken,
    //       },
    //     })
    //     .then((response) => {
    //       console.log("in upload media");
    //       console.log(response.data);
    //       console.log("media", uploadedMedia.target.files[0]);
    //       setMedia([...media, uploadedMedia.target.files[0]]);
    //       if (media.length > 2) setMediaDisabled(true);
    //       else setMediaDisabled(false);
    //       setGIFDisabled(true);
    //       setpollDisabled(true);
    //       setMediaUrls([...mediaUrls, ...response.data.data.usls]);
    //       //console.log(response.data.data.usls);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else console.log("uploading media error");
  }

  useEffect(() => {
    if (media.length > 3) setMediaDisabled(true)
    else setMediaDisabled(false)
  }, [media])

  const htmlElement = document.getElementById("htmlid")

  const themeColor = useSelector((state: any) => state.theme.color)

  const { t } = useTranslation()

  return (
    <div className={`ComposePost flex h-fit border-b ${buttonName === "Post" ? "border-t" : ""} !w-full border-lightBorder p-3 text-black dark:border-darkBorder dark:text-white`} data-testid="postId">
      <div data-testid="profileImage" className={`h-10 w-10 ${i18next.language === "en" ? "sm:mr-3" : "sm:ml-3"} `}>
        <Link className="hover:underline" to={`/${user.username.split("@")[1]}`}>
          <Avatar alt={user.name} src={`${process.env.REACT_APP_MEDIA_URL}${user.imageUrl.split("user").pop().slice(1)}`} sx={{ width: 40, height: 40 }} />
        </Link>
      </div>
      <div className="mt-1.5 w-full">
        <TextField
          id="description"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={`${buttonName === "Post" ? t("compose_post") : t("compose_reply")}`}
          onChange={(e) => handleDescriptionChange(e)}
          multiline
          value={description}
          fullWidth
          maxRows={23}
          sx={{
            border: "0px",
            "& .MuiInputBase-root": {
              color: darkMode ? "#ffffff" : "#000000",
            },
          }}
        ></TextField>
        <DisplayMedia mediaUrls={mediaUrls} setMediaUrls={setMediaUrls} margin={1.5} showCancelButton={true} deleteCallback={handleDeleteMediaCallback} />

        <hr className={`h-px border-0 bg-lightBorder dark:bg-darkBorder ${buttonName === "Post" ? "" : "hidden"}`} />
        <ComposePostFooter buttonName={buttonName} handleUploadMediaClick={handleUploadMediaClick} handleUploadMedia={handleUploadMedia} hiddenUploadMediaInput={hiddenUploadMediaInput} mediaDisabled={mediaDisabled} GIFDisabled={GIFDisabled} pollDisabled={pollDisabled} postDisabled={postDisabled} progressCircleSize={progressCircleSize} charsCount={charsCount} charsProgressColor={charsProgressColor} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default ComposePost

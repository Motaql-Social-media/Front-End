import { Box, Avatar } from "@mui/material"
import { styles } from "../../../styles/styles"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import VerifiedIcon from "@mui/icons-material/Verified"
import i18next from "i18next"
import { useTranslation } from "react-i18next"
import FollowButton from "../../General/FollowButton"
import { useEffect, useState } from "react"

const HoveredProfile = ({ hoveredUser, state, setState }: { hoveredUser: any; state: boolean; setState: any }) => {
  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const { t } = useTranslation()

  useEffect(() => {
    console.log(hoveredUser)
  }, [hoveredUser])

  return (
    <div onClick={(e: any) => e.stopPropagation()}>
      <Box className="cursor-auto transition-all" sx={{ zIndex: 5, position: "absolute", top: "20px", backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black", padding: "10px", borderRadius: "10px", boxShadow: darkMode ? "0px 0px 1px 1px gray" : "0px 0px 1px 1px black", width: "250px" }}>
        <div className="flex w-full justify-between ">
          <Avatar alt="Remy Sharp" src={hoveredUser.imageUrl.split(":")[0] === "https" ? hoveredUser.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + hoveredUser.imageUrl} sx={{ width: 50, height: 50 }} />
          <FollowButton username={hoveredUser.username} state={state} setState={setState} />
        </div>
        <Link className="hover:pointer-events-pointer block w-full font-semibold hover:underline" to={`/${hoveredUser.username}`}>
          {hoveredUser.name}
        </Link>
        <Link className="text-secondary block w-fit" to={`/${hoveredUser.username}`}>
          <span dir="ltr">@{hoveredUser.username}</span>
        </Link>
        <div className="mt-2">
          <div className="text-sm">{hoveredUser.bio}</div>
          <div className="mt-2 flex w-full ">
            <Link className={`${i18next.language === "en" ? "mr-2" : "ml-2"}  text-sm hover:underline`} to={`/${hoveredUser.username}/followers_followings/followings`}>
              <span className="font-semibold">{hoveredUser.followingsCount}</span> <span className="text-secondary">{t("followings")}</span>
            </Link>
            <Link className="text-sm hover:underline" to={`/${hoveredUser.username}/followers_followings/followers`}>
              <span className="font-semibold">{hoveredUser.followersCount}</span> <span className="text-secondary">{t("followers")}</span>
            </Link>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default HoveredProfile

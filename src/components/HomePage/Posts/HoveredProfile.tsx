import { Box, Avatar } from "@mui/material"
import { styles } from "../../../styles/styles"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import VerifiedIcon from "@mui/icons-material/Verified"
import i18next from "i18next"
import { useTranslation } from "react-i18next"

const HoveredProfile = ({ username, hoveredUser }: { username: string; hoveredUser: any }) => {
  const user = useSelector((state: any) => state.user.user)
  const darkMode = useSelector((state: any) => state.theme.darkMode)

  const {t}= useTranslation() 

  return (
    <Box className="cursor-auto transition-all" sx={{ zIndex: 5, position: "absolute", top: "20px", backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black", padding: "10px", borderRadius: "10px", boxShadow: darkMode ? "0px 0px 1px 1px gray" : "0px 0px 1px 1px black", width: "250px" }}>
      <div className="flex w-full justify-between ">
        <Avatar alt="Remy Sharp" src={hoveredUser.profile_picture} sx={{ width: 50, height: 50 }} />
        <div>{username !== user.username && <button className={`${styles.coloredButton} !h-8 !w-fit !px-3`}> follow</button>}</div>
      </div>
      <Link className="hover:pointer-events-pointer block w-full font-semibold hover:underline" to={`/${username}`}>
        {username}
        <VerifiedIcon className="pl-1 text-primary" sx={{ fontSize: "22px" }} />
      </Link>
      <Link className="text-secondary block w-fit" to={`/${username}`}>
        <span dir="ltr">@{username}</span>
      </Link>
      <div className="mt-2">
        <div className="text-sm">{hoveredUser.bio}</div>
        <div className="mt-2 flex w-full ">
          <Link className={`${i18next.language === "en" ? "mr-2" : "ml-2"}  text-sm hover:underline`} to={`/${username}/following`}>
            <span className="font-semibold">{user.username !== username ? hoveredUser.followings_num : user.followings_num}</span> <span className="text-secondary">{t('followings')}</span>
          </Link>
          <Link className="text-sm hover:underline" to={`/${username}/followers`}>
            <span className="font-semibold">{user.username !== username ? hoveredUser.followers_num : user.followers_num}</span> <span className="text-secondary">{t('followers')}</span>
          </Link>
        </div>
      </div>
    </Box>
  )
}

export default HoveredProfile

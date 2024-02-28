import { Menu, MenuItem } from "@mui/material"

import { Avatar } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import i18next from "i18next"
import SidebarOption from "./SidebarOption"
import Logo from "../../assets/images/mainLogo.svg"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import SwitchAccount from "./SwitchAccount"

const DesktopSidebar = ({ optionsNames, optionsIcons, optionLinks, selected, shrink, handleLogout, mobile }: { optionsNames: string[]; optionsIcons: any[]; optionLinks: string[]; selected: number; shrink: boolean; handleLogout: any; mobile: boolean }) => {
  const navigate = useNavigate()

  const darkMode = useSelector((state: any) => state.theme.darkMode)
  const user = useSelector((state: any) => state.user.user)

  const { t } = useTranslation()

  const htmlElement = document.getElementById("htmlid")

  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)
  const handleClickMenu = (event: any) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorMenu(null)
  }
  return (
    <div className=" flex items-center justify-between  border-r border-lightBorder text-center text-black dark:border-darkBorder dark:text-white  xs:max-w-[400px] xs:justify-end md:flex-grow">
      <div className={`flex h-full w-full flex-col ${mobile ? "pl-5" : "max-lg:items-end"} ${i18next.language === "en" ? "xs:pl-[30%]" : "xs:pr-[30%]"} `}>
        <div
          className="mt-5 cursor-pointer mr-5"
          onClick={() => {
            navigate("/home")
          }}
        >
          <img src={Logo} alt="logo" className=" h-8 w-12" />
        </div>
        {optionsNames.map((optionName, index) => (
          <SidebarOption mobile={mobile} key={optionName} icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} select={selected === index ? true : false} />
        ))}
        {/* <div className="hidden xs:block" onClick={handlePostClick}>
          <Button
            name={shrink ? <HistoryEduOutlinedIcon /> : "Post"}
            color="text-white"
            backgroundColor={"bg-" + getColor(themeColor)}
            height={shrink ? "h-14" : "h-12"}
            width={shrink ? "w-14" : "w-56"}
            alt="post"
            title="post"
            other={shrink ? "mr-2" : ""}
          />
        </div>
        <PostPopup open={composePostPopup} setOpen={setComposePostPopup} /> */}
        {shrink || mobile ? (
          <div className="group mr-2 mt-auto box-border w-fit cursor-pointer border-0">
            <div title="switchAccountContainer" className=" flex w-fit  items-center justify-around rounded-full p-3 group-hover:bg-lightHover dark:group-hover:bg-darkHover" id="mahmoud_switch_account">
              <Avatar alt={user.name} src={`${process.env.REACT_APP_MEDIA_URL}${user.imageUrl.split("user").pop().slice(1)}`} id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={
                  htmlElement?.classList.contains("dark")
                    ? {
                        "& .MuiMenu-paper": {
                          background: "black",
                          borderRadius: "20px",
                          boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                          border: "solid 1px #333435",
                        },
                      }
                    : {
                        "& .MuiMenu-paper": {
                          borderRadius: "20px",
                          boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                        },
                      }
                }
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    handleLogout()
                  }}
                  className="text-base dark:text-white"
                >
                  Logout {user?.username}
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <SwitchAccount handleLogout={handleLogout} openMenu={openMenu} anchorMenu={anchorMenu} handleCloseMenu={handleCloseMenu} handleClickMenu={handleClickMenu} />
        )}
      </div>
    </div>
  )
}

export default DesktopSidebar

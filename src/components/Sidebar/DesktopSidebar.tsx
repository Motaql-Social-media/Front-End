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
import { styles } from "../../styles/styles"
import { useEffect } from "react"
import { Modal } from "@mui/material"
import ComposePost from "../HomePage/ComposePost/ComposePost"

const DesktopSidebar = ({ optionsNames, optionsIcons, optionLinks, selected, shrink, handleLogout, mobile }: { optionsNames: string[]; optionsIcons: any[]; optionLinks: string[]; selected: number; shrink: boolean; handleLogout: any; mobile: boolean }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  const navigate = useNavigate()

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
          className="mr-5 mt-5 cursor-pointer"
          onClick={() => {
            navigate("/home")
          }}
        >
          <img src={Logo} alt="logo" className=" h-8 w-12" />
        </div>
        {optionsNames.map((optionName, index) => (
          <SidebarOption mobile={mobile} key={optionName} icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} select={selected === index ? true : false} />
        ))}

        {shrink || mobile ? (
          <div className="group mr-2 mt-auto box-border w-fit cursor-pointer border-0">
            <div title="switchAccountContainer" className=" flex w-fit  items-center justify-around rounded-full p-3 group-hover:bg-lightHover dark:group-hover:bg-darkHover" id="mahmoud_switch_account">
              <Avatar alt={user.name} src={`${user.imageUrl.split(":")[0] === "https" ? user.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + user.imageUrl}`} id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />
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
                  {t("logout")} {user?.username}
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <SwitchAccount handleLogout={handleLogout} openMenu={openMenu} anchorMenu={anchorMenu} handleCloseMenu={handleCloseMenu} handleClickMenu={handleClickMenu} />
        )}
        {mobile && (
          <button onClick={handleOpen} className={`${styles.coloredButton} !w-[100px] self-center`}>
            {t("publish")}
          </button>
        )}
        {mobile && (
          <Modal open={open} onClose={handleClose} disableEscapeKeyDown disablePortal>
            <div style={modalStyle} className={`  h-[90%] w-[40%]  overflow-y-scroll rounded-2xl border p-4  dark:border-darkBorder dark:bg-black`}>
              {/* <ComposePost buttonName="Post" postId={""} postType="diary" addTweetCallback={addTweetCallback} addReelCallback={addReelCallback} /> */}
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default DesktopSidebar

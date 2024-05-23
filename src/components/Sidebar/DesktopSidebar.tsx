import { Menu, MenuItem } from "@mui/material"

import { Avatar } from "@mui/material"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SidebarOption from "./SidebarOption"
import Logo from "../../assets/images/mainLogo.svg"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import SwitchAccount from "./SwitchAccount"
import { useEffect } from "react"
import i18next from "i18next"
import { styles } from "../../styles/styles"

const DesktopSidebar = ({ optionsNames, optionsIcons, optionLinks, selected, shrink, handleLogout, mobile }: { optionsNames: string[]; optionsIcons: any[]; optionLinks: string[]; selected: number; shrink: boolean; handleLogout: any; mobile: boolean }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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
  const location = useLocation()

  const nu = useSelector((state: any) => state.user.user)
  const cnu = useSelector((state: any) => state.cnu.cnu)

  const [user, setUser] = useState<any>()

  useEffect(() => {
    if (location.pathname.split("/")[1] === "control_panel") {
      setUser(cnu)
    } else {
      setUser(nu)
    }
  }, [location.pathname])

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

  const direction = useSelector((state: any) => state.theme.dir)

  return (
    <div className=" flex items-center justify-between  border-r border-lightBorder text-center text-black dark:border-darkBorder dark:text-white  xs:max-w-[400px] xs:justify-end md:flex-grow">
      <div className={`flex h-full w-full flex-col ${mobile ? "pl-5" : direction === "ltr" ? "max-lg:items-end" : "max-lg:items-start"} ${i18next.language === "en" ? "xs:pl-[30%]" : "xs:pr-[30%]"} `}>
        <div
          className="mb-2 mr-5 cursor-pointer"
          onClick={() => {
            navigate("/home")
          }}
        >
          <img src={Logo} alt="logo" className=" h-8 w-12" />
        </div>
        {optionsNames.map((optionName, index) => (
          <SidebarOption mobile={mobile} key={optionName} icon={optionsIcons[index]} name={optionName} link={optionLinks[index]} select={selected === index ? true : false} />
        ))}

        {location.pathname.split("/")[1] === "control_panel" && (
          <button
            className={`${styles.coloredButton}`}
            onClick={() => {
              navigate("/control_panel/add_employee")
            }}
          >
            {t("add_employee")}
          </button>
        )}

        {shrink || mobile ? (
          <div className="group mr-2 mt-auto box-border w-fit cursor-pointer border-0">
            <div title="switchAccountContainer" className=" flex w-fit  items-center justify-around rounded-full p-3 group-hover:bg-lightHover dark:group-hover:bg-darkHover" id="mahmoud_switch_account">
              <Avatar alt={user?.name} src={`${user?.imageUrl.split(":")[0] === "https" ? user?.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + user?.imageUrl}`} id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />
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
      </div>
    </div>
  )
}

export default DesktopSidebar

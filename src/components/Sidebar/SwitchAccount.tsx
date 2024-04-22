import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { useSelector } from "react-redux"

import { t } from "i18next"

function SwitchAccount({ handleLogout, openMenu, anchorMenu, handleCloseMenu, handleClickMenu }: { handleLogout: () => void; openMenu: boolean; anchorMenu: HTMLElement | null; handleCloseMenu: any; handleClickMenu: any }) {
  const htmlElement = document.getElementById("htmlid")

  const location = useLocation()

  const nu = useSelector((state: any) => state.user.user)
  const cnu = useSelector((state: any) => state.cnu.cnu)

  const [user, setUser] = useState<any>()

  useEffect(() => {
    if (location.pathname.split("/")[1] === "control_panel") {
      console.log("cnu", cnu)
      setUser(cnu)
    } else {
      setUser(nu)
    }
  }, [location.pathname])

  return (
    <>
      <div className="group !mb-0 mt-auto box-border w-full cursor-pointer border-0">
        <div title="Accounts" className=" flex w-full items-center justify-around rounded-full group-hover:bg-lightHover dark:group-hover:bg-darkHover xs:!p-3">
          <Avatar alt={user?.name} src={`${user?.imageUrl?.split(":")[0] === "https" ? user?.imageUrl : process.env.REACT_APP_USERS_MEDIA_URL + user?.imageUrl}`} />
          <div>
            <div className="truncate font-semibold">{user?.name}</div>
            <div className="text-secondary truncate">{user?.username}</div>
          </div>

          <div title="moreIcon" className="w-[10%]" id="mahmoud_account_options">
            <MoreHorizOutlinedIcon id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />

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
      </div>
    </>
  )
}

export default SwitchAccount

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ListAltRoundedIco from "@mui/icons-material/ListAltRounded";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TagIcon from "@mui/icons-material/Tag";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import SidebarOption from "./SidebarOption";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import Logo from "../../assets/images/mainLogo.svg";

import { Avatar, Menu, MenuItem } from "@mui/material";
import SwitchAccount from "./SwitchAccount";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { logoutUser } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  const { t } = useTranslation();

  const optionsNames = [
    t("home"),
    t("explore"),
    t("notifications"),
    t("messages"),
    t("bookmarks"),
    t("profile"),
    t("settings"),
  ];
  const optionsIcons = [
    [<HomeOutlinedIcon />, <HomeIcon />],
    [
      <TagIcon sx={{ color: darkMode ? "#ffffff" : "#000000" }} />,
      <TagIcon sx={{ color: darkMode ? "#ffffff" : "#000000" }} />,
    ],
    [
      //   <Badge badgeContent={unseenCount} color="primary">
      <NotificationsNoneRoundedIcon />,
      //   </Badge>,
      //   <Badge badgeContent={unseenCount} color="primary">
      <NotificationsIcon />,
      //   </Badge>,
    ],
    [<MailOutlineRoundedIcon />, <EmailIcon />],
    // [<ListAltRoundedIco sx={{color:darkMode?"#d9d9d9":"#1f1f1f"}}/>,<ListAltIcon sx={{color:darkMode?"#ffffff":"#000000"}}/>],
    // [<PeopleOutlinedIcon />,<PeopleIcon/>],
    [<BookmarkBorderOutlinedIcon />, <BookmarkIcon />],
    [<PersonOutlinedIcon />, <PersonIcon />],
    [<SettingsOutlinedIcon />, <SettingsIcon />],
  ];
  const optionLinks = [
    "/home",
    "/explore",
    "/notifications",
    "/messages",
    "/bookmarks",
    // `/${userTag}`,
    `/profile`,

    "/settings/account",
  ];

  const pathname = useLocation().pathname;

  const [selected, setSelected] = useState(optionLinks.indexOf(pathname));

  const navigate = useNavigate();

  const [shrink, setShrink] = useState(window.innerWidth < 1278);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1278) setShrink(true);
      else setShrink(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    //   axios
    //     .get(APIs.actual.getNotificationUnseenCount, {
    //       params: {},
    //       headers: {
    //         authorization: "Bearer " + userToken,
    //       },
    //     })
    //     .then((res) => {
    //       // console.log(res.data.data.notificationsCount)
    //       dispatch(setUnseenCount(res.data.data.notificationsCount));
    //       // setUnseenCount(res.data.data.notificationsCount)
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }, []);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("passwordIsConfirmed");
    dispatch(logoutUser());
    navigate("/");
  };

  const htmlElement = document.getElementById("htmlid");

  const [anchorMenu, setAnchorMenu] = useState(null);
  const openMenu = Boolean(anchorMenu);
  const handleClickMenu = (event: any) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setSelected(optionLinks.indexOf(pathname));
  }, [pathname]);
  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  type modalStyleT = {
    position: React.CSSProperties["position"];
    backgroundColor: React.CSSProperties["backgroundColor"];
    border: React.CSSProperties["border"];
    borderRadius: React.CSSProperties["borderRadius"];
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
    maxWidth?: React.CSSProperties["maxWidth"];
    top?: React.CSSProperties["top"];
    left?: React.CSSProperties["left"];
    transform?: React.CSSProperties["transform"];
  };
  const modalStyle: modalStyleT = {
    position: "absolute",

    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  };

  if (windowWidth < 700) {
    modalStyle.width = "100vw";
    modalStyle.height = "100vh";
    modalStyle.maxWidth = "none"; // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px";
    modalStyle.height = "651.6px";
    modalStyle.top = "50%";
    modalStyle.left = "50%";
    modalStyle.transform = "translate(-50%, -50%)";
    modalStyle.maxWidth = "none"; // optional, to remove any max-width constraints
  }

  const themeColor = useSelector((state: any) => state.theme.color);
  const handlePostClick = () => {
    // setComposePostPopup(true);
  };

  const user = useSelector((state: any) => state.user?.user);

  return (
    <div className=" flex items-center justify-between  border-r border-lightBorder text-center text-black dark:border-darkBorder dark:text-white max-xs:!sticky max-xs:!bottom-0 max-xs:z-10 max-xs:backdrop-brightness-[90%] dark:max-xs:bg-black dark:max-xs:bg-opacity-50  dark:max-xs:backdrop-blur-sm dark:max-xs:backdrop-brightness-[30%] xs:max-w-[400px] xs:justify-end md:flex-grow">
      <div
        className={`flex h-full w-full flex-row  max-[1278px]:items-end max-xs:w-full max-xs:!items-center max-xs:justify-around xs:flex-col ${
          i18next.language === "en" ? "xs:pl-[30%]" : "xs:pr-[30%]"
        } `}
      >
        <div
          className="max-xs:hidden cursor-pointer mt-5"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="logo" className=" w-12 h-8" />
        </div>
        {optionsNames.map((optionName, index) => (
          <SidebarOption
            key={optionName}
            icon={optionsIcons[index]}
            name={optionName}
            link={optionLinks[index]}
            // alt="sidebarOption"
            select={selected === index ? true : false}
          />
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
        {shrink ? (
          <div className="group mr-2 mt-auto box-border w-fit cursor-pointer border-0">
            <div
              title="switchAccountContainer"
              className=" flex w-fit  items-center justify-around rounded-full p-3 group-hover:bg-lightHover dark:group-hover:bg-darkHover"
              id="mahmoud_switch_account"
            >
              <Avatar
                alt={user.name}
                src={`${process.env.REACT_APP_MEDIA_URL}${user.imageUrl
                  .split("user")
                  .pop()
                  .slice(1)}`}
                id="demo-positioned-button"
                aria-controls={openMenu ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickMenu}
              />
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
                          boxShadow:
                            "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                          border: "solid 1px #333435",
                        },
                      }
                    : {
                        "& .MuiMenu-paper": {
                          borderRadius: "20px",
                          boxShadow:
                            "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                        },
                      }
                }
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleLogout();
                  }}
                  className="text-base dark:text-white"
                >
                  Logout {user?.username}
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <SwitchAccount
            handleLogout={handleLogout}
            openMenu={openMenu}
            anchorMenu={anchorMenu}
            handleCloseMenu={handleCloseMenu}
            handleClickMenu={handleClickMenu}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;

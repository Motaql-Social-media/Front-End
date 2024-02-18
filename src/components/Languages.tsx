import i18next from "i18next";
import { useTranslation } from "react-i18next";

import LanguageIcon from "@mui/icons-material/Language";
import { useRef, useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import cookie from "js-cookie";

import en from "../assets/images/gb.svg";
import sa from "../assets/images/sa.svg";
import { useEffect } from "react";

const Languages = () => {
  const { t } = useTranslation();

  const languages = [
    { code: "en", name: "English", country_code: "us", dir: "ltr" },
    { code: "ar", name: "العربية", country_code: "sa", dir: "rtl" },
  ];
  const currentLanguageCode = cookie.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || "ltr";
  }, [currentLanguage]);

  const [menuToggle, setMenuToggle] = useState(false);

  const handleMenuClick = () => {
    setMenuToggle((prev) => !prev);
  };

  return (
    <div
      className={`w-fit  absolute top-0 ${
        currentLanguage?.dir === "ltr" ? "right-0" : "left-0"
      } m-3 bg-transparent`}
    >
      {/* <button
        onClick={handleClick}
        className="flex justify-center items-center"
      >
        <LanguageIcon
          className="text-primary "
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        />
      </button> */}
      <div className="relative">
        <button onClick={handleMenuClick}>
          <LanguageIcon className="text-primary " />
        </button>
        <div
          className={`absolute z-10 top-4 ${
            i18next.language === "en" ? "right-6" : "left-6"
          }  w-[100px] bg-white  rounded-md ${menuToggle ? "" : "hidden"} shadow-card`}
        >
          <ul className="list-none ">
            <li className=" p-2  rounded-md">
              <div className="flex justify-center items-center w-full">
                <span className="dark:text-black">{t("language")}</span>
              </div>
            </li>
            {languages.map((language) => (
              <li
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                value={language.code}
                key={language.code}
                // disabled={language.code === currentLanguageCode}
                onClick={() => {
                  i18next.changeLanguage(language.code);
                  handleMenuClick();
                }}
              >
                <div className="flex justify-center items-center">
                  <span
                    className={`p-2 ${
                      language.code === currentLanguageCode
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                  >
                    {language.code === "ar" ? (
                      <img
                        src={sa}
                        className="w-4 h-4"
                        alt="Saudi Arabia Flag"
                      />
                    ) : (
                      <img src={en} className="w-4 h-4" alt="England Flag" />
                    )}
                  </span>
                  <span className="dark:text-black">{language.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <div className="flex justify-center items-center w-full">
            <span className="">{t("language")}</span>
          </div>
        </MenuItem>
        {languages.map((language) => (
          <MenuItem
            value={language.code}
            key={language.code}
            disabled={language.code === currentLanguageCode}
            onClick={() => {
              i18next.changeLanguage(language.code);
              handleClose();
            }}
          >
            <div className="flex justify-center items-center">
              <span
                className={`p-2 ${
                  language.code === currentLanguageCode
                    ? "opacity-50"
                    : "opacity-100"
                }`}
              >
                {language.code === "ar" ? (
                  <img src={sa} className="w-4 h-4" alt="Saudi Arabia Flag" />
                ) : (
                  <img src={en} className="w-4 h-4" alt="England Flag" />
                )}
              </span>
              {language.name}
            </div>
          </MenuItem>
        ))}
      </Menu> */}
    </div>
  );
};

export default Languages;

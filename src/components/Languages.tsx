import i18next from "i18next";
import { useTranslation } from "react-i18next";

import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || "ltr";
  }, [currentLanguage]);
  return (
    <div
      className={`w-fit  absolute top-0 ${
        currentLanguage?.dir === "ltr" ? "right-0" : "left-0"
      } m-3 bg-transparent`}
    >
      <button
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
      </button>
      <Menu
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
      </Menu>
      {/*<div className="w-fit min-w-16 absolute top-0 right-0 m-3">
      <FormControl fullWidth>
        <InputLabel id="language-select-label">
          <LanguageIcon className="text-primary" />
        </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          label="lang"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&$focused": {
                borderColor: "#40e5da",
              },
            },
          }}
        >
          <MenuItem>
            <div className="flex justify-center items-center">
              <span className="ml-2">{t("language")}</span>
            </div>
          </MenuItem>
          {languages.map((language) => (
            <MenuItem
              value={language.code}
              key={language.code}
              disabled={language.code === currentLanguageCode}
              onClick={() => i18next.changeLanguage(language.code)}
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
        </Select>
      </FormControl>
    </div>

    */}
    </div>
  );
};

export default Languages;

import i18next from "i18next";
import { useTranslation } from "react-i18next";

import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";

import cookie from "js-cookie";

import { useEffect } from "react";

const Languages = () => {
  const { t } = useTranslation();

  const languages = [
    { code: "en", name: "English", country_code: "us", dir: "ltr" },
    { code: "ar", name: "العربية", country_code: "sa", dir: "rtl" },
  ];
  const currentLanguageCode = cookie.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

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
      <div className="relative">
        <button onClick={handleMenuClick}>
          <LanguageIcon className="text-primary " />
        </button>
        <div
          className={`absolute z-10 top-4 ${
            i18next.language === "en" ? "right-6" : "left-6"
          }  w-[110px] bg-white  rounded-md ${
            menuToggle ? "" : "hidden"
          } shadow-card`}
        >
          <ul className="list-none ">
            <li className=" p-1  rounded-md">
              <div className="flex justify-center items-center w-full">
                <span className="dark:text-black">{t("language")}</span>
              </div>
            </li>
            {languages.map((language) => (
              <li
                className={`${
                  language.code === currentLanguageCode
                    ? "brightness-[20%] bg-opacity-20"
                    : "cursor-pointer hover:bg-gray-100 "
                } p-2 rounded-md`}
                value={language.code}
                key={language.code}
                onClick={() => {
                  if (language.code !== currentLanguageCode) {
                    i18next.changeLanguage(language.code);
                    handleMenuClick();
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`m-1 ${
                      language.code === currentLanguageCode
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                  >
                    {language.code === "ar" ? (
                      <img
                        src={`https://flagcdn.com/sa.svg`}
                        width="25"
                        style={{ aspectRatio: "4/3" }}
                        alt={"sa"}
                      ></img>
                    ) : (
                      <img
                        src={`https://flagcdn.com/us.svg`}
                        width="25"
                        style={{ aspectRatio: "4/3" }}
                        alt={"en"}
                      ></img>
                    )}
                  </span>
                  <span className="dark:text-black">{language.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Languages;

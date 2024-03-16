import i18next from "i18next"
import { useTranslation } from "react-i18next"

import LanguageIcon from "@mui/icons-material/Language"
import { useState } from "react"

import cookie from "js-cookie"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeDir } from "../store/ThemeSlice"

const Languages = () => {
  const { t } = useTranslation()

  const languages = [
    { code: "en", name: "English", country_code: "us", dir: "ltr" },
    { code: "ar", name: "العربية", country_code: "sa", dir: "rtl" },
  ]
  const currentLanguageCode = cookie.get("i18next") || "en"
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || "ltr"
  }, [currentLanguage])

  const [menuToggle, setMenuToggle] = useState(false)

  const handleMenuClick = () => {
    setMenuToggle((prev) => !prev)
  }

  const dispatch = useDispatch()

  return (
    <div className={`absolute  top-0 w-fit ${currentLanguage?.dir === "ltr" ? "right-0" : "left-0"} z-[999] m-3 bg-transparent`}>
      <div className="relative">
        <button onClick={handleMenuClick}>
          <LanguageIcon className="text-primary " />
        </button>
        <div className={`absolute top-4 z-10 ${i18next.language === "en" ? "right-6" : "left-6"}  w-[110px] rounded-md  bg-white ${menuToggle ? "" : "hidden"} shadow-card`}>
          <ul className="list-none ">
            <li className=" rounded-md  p-1">
              <div className="flex w-full items-center justify-center">
                <span className="dark:text-black">{t("language")}</span>
              </div>
            </li>
            {languages.map((language) => (
              <li
                className={`${language.code === currentLanguageCode ? "bg-opacity-20 brightness-[20%]" : "cursor-pointer hover:bg-gray-100 "} rounded-md p-2`}
                value={language.code}
                key={language.code}
                onClick={() => {
                  if (language.code !== currentLanguageCode) {
                    i18next.changeLanguage(language.code)
                    dispatch(changeDir())

                    handleMenuClick()
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <span className={`m-1 ${language.code === currentLanguageCode ? "opacity-50" : "opacity-100"}`}>{language.code === "ar" ? <img src={`https://flagcdn.com/sa.svg`} width="25" style={{ aspectRatio: "4/3" }} alt={"sa"}></img> : <img src={`https://flagcdn.com/us.svg`} width="25" style={{ aspectRatio: "4/3" }} alt={"en"}></img>}</span>
                  <span className="dark:text-black">{language.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Languages

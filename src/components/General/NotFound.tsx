import { styles } from "../../styles/styles"
import useCheckAuthentication from "../hooks/useCheckAuthentication"
import { useNavigate } from "react-router-dom"
import { t } from "i18next"

const NotFound = () => {
  useCheckAuthentication()

  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center gap-5">
      <h1 className="text-6xl font-bold text-red-700 ">{t("sorry")}</h1>
      <p className="text-3xl font-bold text-primary">{t("not_found")}</p>
      <button className={`${styles.coloredButton} !h-fit !w-fit !px-5 !py-3 !text-3xl !font-bold`} onClick={() => navigate("/home")}>
        {t("not_found_button")}
      </button>
    </div>
  )
}

export default NotFound

import { ArrowRight } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import SubpageNavbar from "../General/SubpageNavbar"
import Widgets from "../Widgets/Widgets"
import { useSelector } from "react-redux"
import useCheckAuthentication from "../hooks/useCheckAuthentication"

const Settings = () => {
  const options = ["account", "privacy"]

  useCheckAuthentication()

  const { t } = useTranslation()
  const user = useSelector((state: any) => state.user.user)

  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="settings" />
        {options.map((option, index) => (
          <div key={index} className={`flex cursor-pointer items-center justify-between border-b border-b-darkBorder pl-5 ${window.location.pathname.split("/").pop() === option ? "bg-darkHover" : "bg-transparent"}  hover:bg-darkHover`} onClick={() => navigate(`/settings/${option}`)}>
            <div className="py-2">{t(`${option}`)}</div>
            <div className="flex-grow"></div>
            <div>
              <ArrowRight />
            </div>
          </div>
        ))}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Settings

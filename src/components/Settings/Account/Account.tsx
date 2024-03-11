import { Key } from "@mui/icons-material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ArrowRight from "@mui/icons-material/ArrowRight"
import { useNavigate } from "react-router-dom"
import SubpageNavbar from "../../General/SubpageNavbar"
import Widgets from "../../Widgets/Widgets"
import { useSelector } from "react-redux"
import { t } from "i18next"

const Account = () => {
  const options = [
    {
      title: t("account_information"),
      logo: <AccountCircle />,
      location: "/settings/account_information",
    },
    {
      title: t("change_password"),
      logo: <Key />,
      location: "/settings/password",
    },
  ]

  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user.user)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="your_account" />
        <div className="px-5 text-sm text-gray-500">{t("settings_account_message")}</div>
        {options.map((option, index) => (
          <div key={option.title} className="flex cursor-pointer items-center p-3 hover:bg-darkHover" onClick={() => navigate(`${option.location}`)}>
            <div>{option.logo}</div>
            <div className="pl-3 text-xl">{option.title}</div>
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

export default Account

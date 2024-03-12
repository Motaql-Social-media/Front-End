import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {  ArrowRight } from "@mui/icons-material"
import SubpageNavbar from "../../General/SubpageNavbar"
import Widgets from "../../Widgets/Widgets"
import { t } from "i18next"

const MuteBlock = () => {


  const options = [
    {
      title: t('blocked_accounts'),
      location: "/settings/blocked_accounts",
    },
    {
      title: t('muted_accounts'),
      location: "/settings/muted_accounts",
    },
  ]

  const navigate = useNavigate()

  const user = useSelector((state: any) => state.user.user)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="mute_block" />

        {options.map((option, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between p-3 hover:bg-darkHover"
            onClick={() => {
              navigate(option.location)
            }}
          >
            <div>
              <div className="text-lg font-semibold">{option.title}</div>
            </div>
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

export default MuteBlock

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmPassword from "./ConfirmPassword"
import { useSelector } from "react-redux"
import { ArrowRight } from "@mui/icons-material"
import SubpageNavbar from "../../../General/SubpageNavbar"
import Widgets from "../../../Widgets/Widgets"
import { t } from "i18next"

const AccountInformations = () => {
  

  const user = useSelector((state: any) => state.user.user)

  const [passwordConfirmed, setPasswordConfirmed] = useState(sessionStorage.getItem("passwordConfirmed") === "true" ? true : false)

  const options = [
    {
      title: t('username'),
      value: "@" + user.username,
      location: "/settings/username",
    },
    {
      title: t('phone_number'),
      value: user.phoneNumber,
      location: "/settings/phone_number",
    },
    {
      title: t('email'),
      value: user.email,
      location: "/settings/email",
    },
  ]

  const navigate = useNavigate()


  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="account_information" />
        {!passwordConfirmed && <ConfirmPassword setPasswordConfirmed={setPasswordConfirmed} />}
        {passwordConfirmed && (
          <div>
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
                  <div className="text-gray-500">{option.value}</div>
                </div>
                <div>
                  <ArrowRight />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default AccountInformations

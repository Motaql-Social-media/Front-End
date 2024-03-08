import { Key } from "@mui/icons-material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ArrowRight from "@mui/icons-material/ArrowRight"
import { useNavigate } from "react-router-dom"

const Account = () => {
  const options = [
    {
      title: "Account Information",
      description: "See information about your account like phone number and email address",
      logo: <AccountCircle />,
      location: "/settings/account_information",
    },
    {
      title: "Change Your Password",
      description: "Change your password at any time to keep your account secure",
      logo: <Key />,
      location: "/settings/password",
    },
  ]

  const navigate = useNavigate()

  return (
    <div>
      <div className="border-b border-b-darkBorder px-5 py-3 text-2xl font-semibold">Your Account</div>
      <div className="px-5 text-sm text-gray-500">See information about your account, change your password</div>
      {options.map((option, index) => (
        <div key={option.title} className="flex items-center p-3 cursor-pointer hover:bg-darkHover" onClick={() => navigate(`${option.location}`)}>
          <div>{option.logo}</div>
          <div className="pl-3 text-xl">{option.title}</div>
          <div className="flex-grow"></div>
          <div>
            <ArrowRight />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Account

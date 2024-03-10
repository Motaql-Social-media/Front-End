import { ArrowRight } from "@mui/icons-material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Outlet, useNavigate } from "react-router-dom"

const Settings = () => {
  const options = ["account", "privacy"]

  const { t } = useTranslation()

  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === "/settings") {
      navigate("/settings/account")
    }
  }, [window.location.pathname])

  return (
    <div className="min-md:mr-[8%] grid grow grid-cols-12">
      <div className="col-span-5 h-full  border-r  border-r-darkBorder max-md:col-span-12">
        <div className="border-b border-b-darkBorder px-5 py-3 text-2xl font-semibold"> Settings</div>
        {options.map((option, index) => (
          <div key={index} className={`flex cursor-pointer items-center justify-between border-b border-b-darkBorder pl-5 ${window.location.pathname.split("/").pop() === option ? "bg-darkHover" : "bg-transparent"}  hover:bg-darkHover`} onClick={() => navigate(`/settings/${option}`)}>
            <div className="py-2">{t(`${option}`)}</div>
            <div className="flex-grow"></div>
            <div>
              <ArrowRight />
            </div>
            <div className={`h-[45px] w-1 ${window.location.pathname.split("/").pop() === option ? "bg-primary" : "bg-transparent"} `}></div>
          </div>
        ))}
      </div>
      <div className="col-span-7 h-full border-r border-r-darkBorder max-md:col-span-12">
        <Outlet />
      </div>
    </div>
  )
}

export default Settings

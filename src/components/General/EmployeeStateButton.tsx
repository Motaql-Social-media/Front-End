import { useSelector } from "react-redux"
import axios from "axios"
import i18next from "i18next"
import React from "react"
import { t } from "i18next"

function EmployeeStateButton({ username, id, state, setState }: { username: string; id: number; state: boolean; setState: any }) {
  const cnu = useSelector((state: any) => state.cnu.cnu)
  const cnt = useSelector((state: any) => state.cnu.cnt)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + cnt,
      "accept-language": i18next.language,
    },
  })
  const handleState = () => {
    API.patch(`/employees/${id}/toggle-activate`, {})
      .then((res) => {
        // console.log(res.data)
        setState((prev: boolean) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleButtonClick = (e: any) => {
    e.stopPropagation()
    handleState()
  }

  const [hover, setHover] = React.useState(false)

  return (
    <div>
      {username !== cnu?.name && (
        <button className={`${state ? "bg-red-600 text-black" : "border border-red-600 bg-transparent text-red-600"} !h-8 !w-fit rounded-full !px-3 font-semibold`} onClick={handleButtonClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {state ? t("deactivate") : !hover ? t("deactivated") : t("activate")}
        </button>
      )}
    </div>
  )
}

export default EmployeeStateButton

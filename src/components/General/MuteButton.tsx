import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useState } from "react"

const MuteButton = ({ username, state, setState }: { username: string; state: boolean; setState: any }) => {
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)
  const { t } = useTranslation()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const handleState = () => {
    API.patch(`users/current/toggle-mute/${username}`, {})
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

  const [hover, setHover] = useState(false)

  return (
    <div>
      {username !== user?.username && (
        <button className={`${state ? "bg-red-600 text-black" : "border border-red-600 bg-transparent text-red-600"} !h-8 !w-fit rounded-full !px-3 font-semibold`} onClick={handleButtonClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {state ? (!hover ? t("muted") : t("unmute")) : t("mute")}
        </button>
      )}
    </div>
  )
}

export default MuteButton

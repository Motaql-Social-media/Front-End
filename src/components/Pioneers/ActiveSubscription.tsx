import React from "react"
import { t, use } from "i18next"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import PaidIcon from "@mui/icons-material/Paid"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import axios from "axios"
import { useSelector } from "react-redux"
import { styles } from "../../styles/styles"
import { useDispatch } from "react-redux"
import { changeSubscription } from "../../store/UserSlice"
import { useNavigate } from "react-router-dom"

function ActiveSubscription({ subscription, setSubscription, setSeeTypes }: { subscription: ActiveSubscription | null; setSubscription: any; setSeeTypes: any }) {
  const [color, setColor] = React.useState("interestedColor")
  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  React.useEffect(() => {
    if (subscription?.type === "INTERESTED") setColor("interestedColor")
    else if (subscription?.type === "PROFESIONAL") setColor("primary")
    else setColor("businessColor")
  }, [subscription])

  function isoDateToDDMMYYYY(isoDate: string) {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0") // Add leading zero for single-digit days

    return `${day}/${month}/${year}`
  }

  const [cancelButtonClicked, setCancelButtonClicked] = React.useState(false)

  const dispatch = useDispatch()
  const handleCancelationButton = () => {
    setCancelButtonClicked(true)
  }
  const handleCancelCancelation = () => {
    setCancelButtonClicked(false)
  }
  const handleCancelSubscription = () => {
    API.delete(`/remove-current-subscription`)
      .then((res) => {
        console.log(res)
        setSubscription(null)
        dispatch(changeSubscription("NONE"))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const navigate = useNavigate()

  return (
    <div className="p-5">
      <div className="text-lg text-gray-400">{t("subscription_information")}</div>
      <div className="mt-3 w-full rounded-2xl border border-darkBorder p-3">
        <div className="mb-2 border-b border-b-darkBorder pb-4">
          <div className="mb-4 flex w-full items-center justify-around gap-4">
            <DriveFileRenameOutlineIcon />
            <div className="text-xl font-bold">{t("subscriper_name")}</div>
            <div className="flex-grow"></div>
          </div>
          <div>{subscription?.fullname}</div>
        </div>
        <div className="mb-4">
          <div className="flex w-full items-center justify-around gap-4">
            <PaidIcon />
            <div className="text-lg">{t("subscription_type")}</div>
            <div className="flex-grow"></div>
          </div>
          <div className={`text-${color} mt-1 text-2xl font-bold`}>{t(subscription?.type.toLowerCase() || "")}</div>
        </div>
        <div>
          <div className="flex w-full items-center justify-around gap-4">
            <CalendarMonthIcon />
            <div className="text-lg">{t("subscription_end_date")}</div>
            <div className="flex-grow"></div>
          </div>
          <div className="mt-1">{isoDateToDDMMYYYY(subscription?.endDate || "")}</div>
        </div>
      </div>
      {cancelButtonClicked && <div className="my-3 text-xl font-bold text-red-600">{t("cancelation_message")}</div>}{" "}
      <div className="flex items-center justify-center gap-3">
        <button className={`${styles.coloredButton} !bg-red-600`} onClick={cancelButtonClicked ? handleCancelSubscription : handleCancelationButton}>
          {cancelButtonClicked ? t("confirm") : t("cancel_subscription")}
        </button>
        {cancelButtonClicked && (
          <button className={`${styles.coloredButton} !bg-primary`} onClick={handleCancelCancelation}>
            {t("cancel")}
          </button>
        )}
      </div>
      <button
        className={`${styles.coloredButton}`}
        onClick={() => {
          setSeeTypes(true)
        }}
      >
        {t("see_subscription_types")}
      </button>
    </div>
  )
}

export default ActiveSubscription

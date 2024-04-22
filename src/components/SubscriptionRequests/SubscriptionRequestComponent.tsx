import React from "react"
import { Avatar } from "@mui/material"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { t } from "i18next"
import { styles } from "../../styles/styles"
import axios from "axios"
import { useSelector } from "react-redux"
function SubscriptionRequestComponent({ subscriptionRequest }: { subscriptionRequest: Subscription }) {
  function isoDateToDDMMYYYY(isoDate: string) {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0") // Add leading zero for single-digit days

    return `${day}/${month}/${year}`
  }

  const cnt = useSelector((state: any) => state.cnu.cnt)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${cnt}`,
    },
  })
  const handleActivateSubscription = () => {
    // API.patch(`/subscriptions/${subscriptionRequest.subscriptionId}/accept`)
  }
  const handleRefuseRequest = () => {}

  return (
    <div className="border-b border-b-darkBorder p-3 hover:bg-darkHover">
      <div className="flex w-full justify-start gap-2">
        <div className="h-full">
          <Avatar alt={subscriptionRequest.subscriber.name} src={`${process.env.REACT_APP_USERS_MEDIA_URL + subscriptionRequest.subscriber.imageUrl}`} sx={{ width: 50, height: 50 }} />
        </div>
        <div className="w-full">
          <div className="flex w-full gap-2">
            <div className="text-lg font-semibold">{subscriptionRequest.subscriber.name}</div>
            <div className="text-gray-400 " dir="ltr">
              @{subscriptionRequest.subscriber.username}
            </div>
            <div className="flex-grow"></div>
            <div className="text-primary ">
              <CameraAltIcon />
            </div>
          </div>
          <div>
            <div className="text-gray-400">{subscriptionRequest.subscriber.jobtitle}</div>
            <div className="text-gray-400">{subscriptionRequest.fullname}</div>
            <div className="text-gray-400">
              <span dir="ltr">{subscriptionRequest.subscriber.phoneNumber}</span>
            </div>
            <div className="text-gray-400">{subscriptionRequest.subscriber.email}</div>
            <div className="flex items-center justify-between font-bold">
              <div>
                {t("subscription_type")}
                {" : "}
                <span className={`${subscriptionRequest.type === "INTERESTED" ? "text-interestedColor" : subscriptionRequest.type === "business" ? "text-businessColor" : "text-primary"}`}>{t(subscriptionRequest.type.toLowerCase())}</span>
              </div>
              <div>
                {t("subscription_date")}
                {" : "}
                {isoDateToDDMMYYYY(subscriptionRequest.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-around">
        <button className={`${styles.coloredButton} max-w-[40%]`}>{t("activate_subscription")}</button>
        <button className={`${styles.coloredButton} max-w-[40%]  !bg-red-600`}>{t("refuse_request")}</button>
      </div>
    </div>
  )
}

export default SubscriptionRequestComponent

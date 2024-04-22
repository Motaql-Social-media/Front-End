import React from "react"
import { t } from "i18next"
import { styles } from "../../styles/styles"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SubscriptionButtonContainer({ checked, name, imgFile }: { checked: boolean; name: string; imgFile: any }) {
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [subscriptionSent, setSubscriptionSent] = React.useState(false)

  const navigate = useNavigate()

  const handleSubscription = () => {
    const type = window.location.pathname.split("/").pop()

    const formData = new FormData()
    formData.append("fullname", name)
    formData.append("image_profile", imgFile)
    formData.append("type", type || "")

    API.post("/subscriptions/add-subscription", formData)
      .then((res) => {
        // console.log(res)
        setSubscriptionSent(true)
        setTimeout(() => {
          setSubscriptionSent(false)
          navigate("/home")
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="p-5">
        <div className="mt-3 w-full rounded-2xl border border-white bg-primary p-3 font-bold">
          <div className="text-xl text-black">{t("subscription_welcome")}</div>
          <button className={`${styles.normalButton}`} disabled={!checked || name === "" || !imgFile} onClick={handleSubscription}>
            {t("subscription_button")}
          </button>
          {subscriptionSent && <div className="text-lg text-black">{t("subscription_sent")}</div>}
          <div className="text-xl text-black">{t("subscription_welcome2")}</div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionButtonContainer

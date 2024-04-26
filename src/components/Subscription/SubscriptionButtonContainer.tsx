import React from "react"
import i18next, { t } from "i18next"
import { styles } from "../../styles/styles"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SubscriptionButtonContainer({ checked, name, imgFile }: { checked: boolean; name: string; imgFile: any }) {
  const userToken = useSelector((state: any) => state.user.token)
  const user = useSelector((state: any) => state.user.user)

  const freeTrialAvavilable = false
  const type = window.location.pathname.split("/").pop()
  const price = type === "business" ? 1999 : 999

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  const [subscriptionSent, setSubscriptionSent] = React.useState(false)

  const navigate = useNavigate()

  const handleFreeSubscription = () => {
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

  const handlePaidSubscription = (): void => {
    const PaymentAPI = axios.create({
      baseURL: `https://apitest.myfatoorah.com/`,
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${process.env.NODE_ENV === "production" ? process.env.PAYMENT_FATOORAH_PROD_API_KEY : process.env.PAYMENT_FATOORAH_DEV_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    PaymentAPI.post("v2/ExecutePayment", {
      PaymentMethodId: "2",
      CustomerName: user.name,
      DisplayCurrencyIso: "SAR",
      MobileCountryCode: "+965",
      CustomerMobile: user.phoneNumber,
      CustomerEmail: user.email,
      InvoiceValue: price,
      CallBackUrl: "https://theline.social/pioneers",
      ErrorUrl: "https://theline.social",
      Language: "en",
      CustomerReference: user.userId,
      SubscriptionType: type?.toUpperCase(),
      InvoiceItems: [{ ItemName: `${type} subscription`, Quantity: 1, UnitPrice: price }],
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error))
  }

  return (
    <>
      <div className="p-5">
        <div className="mt-3 w-full rounded-2xl border border-white bg-primary p-3 font-bold">
          <div className="text-xl text-black">{t("subscription_welcome")}</div>
          {freeTrialAvavilable && (
            <button className={`${styles.normalButton}`} disabled={!checked || name === "" || !imgFile} onClick={handleFreeSubscription}>
              {t("subscription_button_free")}
            </button>
          )}
          {!freeTrialAvavilable && (
            <button className={`${styles.normalButton}`} disabled={!checked || name === "" || !imgFile} onClick={handlePaidSubscription}>
              {t("subscription_button_paid", { price: price })}
            </button>
          )}
          {subscriptionSent && <div className="text-lg text-black">{t("subscription_sent")}</div>}
          <div className="text-xl text-black">{t("subscription_welcome2")}</div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionButtonContainer

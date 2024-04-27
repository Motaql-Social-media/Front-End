import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Widgets from "../../components/Widgets/Widgets"
import { useRef } from "react"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import PioneersTabs from "../../components/Pioneers/PioneersTabs"
import ActiveSubscription from "../../components/Pioneers/ActiveSubscription"
import axios from "axios"
import { styles } from "../../styles/styles"
import { t } from "i18next"

function Pioneers() {
  const user = useSelector((state: any) => state.user.user)
  const userToken = useSelector((state: any) => state.user.token)

  const [subscription, setSubscription] = React.useState<ActiveSubscription | null>(null)
  const [isFreeTrialUsed, setIsFreeTrialUsed] = React.useState()

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })

  useEffect(() => {
    API.get("subscriptions/current-subscription")
      .then((res) => {
        console.log(res.data.data)
        setSubscription(res.data.data.subscription)
        setIsFreeTrialUsed(res.data.data.isFreeTrialUsed)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const pioneersRef = useRef<HTMLDivElement>(null)

  const [seeTypes, setSeeTypes] = React.useState(false)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={pioneersRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="pioneers" />
        {(!subscription || subscription?.status === "PENDING" || seeTypes) && <PioneersTabs status={subscription?.status} />}
        {subscription && subscription.status === "ACTIVATED" && !seeTypes && <ActiveSubscription subscription={subscription} setSubscription={setSubscription} setSeeTypes={setSeeTypes} />}
        {seeTypes && (
          <div className="px-4">
            <button className={`${styles.coloredButton}`} onClick={() => setSeeTypes(false)}>
              {t("return_to_my_subscription")}
            </button>
          </div>
        )}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Pioneers

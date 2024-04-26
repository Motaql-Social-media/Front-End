import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import axios from "axios"
import SubscriptionRequestsContainer from "../../components/SubscriptionRequests/SubscriptionRequestsContainer"

function SubscriptionRequests() {
  const cnu = useSelector((state: any) => state.cnu.cnu)
  const cnt = useSelector((state: any) => state.cnu.cnt)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${cnt}`,
    },
  })

  const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([])
  const [allSubscriptions, setAllSubscriptions] = React.useState<Subscription[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  useEffect(() => {
    API.get("subscriptions")
      .then((res) => {
          console.log(res.data.data.subscriptions)
        setSubscriptions(res.data.data.subscriptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const subscriptionRequestsRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={subscriptionRequestsRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="subscriptions" />
        <SubscriptionRequestsContainer subscriptionRequests={subscriptions} />
      </div>
    </div>
  )
}

export default SubscriptionRequests

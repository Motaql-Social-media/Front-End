import React from "react"
import SubscriptionRequestComponent from "./SubscriptionRequestComponent"

function SubscriptionRequestsContainer({ subscriptionRequests, setSubscriptions }: { subscriptionRequests: Subscription[]; setSubscriptions: any }) {
  const handleChangeRequestStatus = (id: number, newSubscription: Subscription) => {
    const ns = subscriptionRequests.map((subscriptionRequest) => {
      if (subscriptionRequest.subscriptionId === id) {
        return newSubscription
      }
      return subscriptionRequest
    })
    setSubscriptions(ns)
  }
  return (
    <>
      {subscriptionRequests.map((subscriptionRequest) => (
        <div key={subscriptionRequest.subscriptionId}>
          <SubscriptionRequestComponent subscriptionRequest={subscriptionRequest} changeRequestStatusCallback={handleChangeRequestStatus} />
        </div>
      ))}
    </>
  )
}

export default SubscriptionRequestsContainer

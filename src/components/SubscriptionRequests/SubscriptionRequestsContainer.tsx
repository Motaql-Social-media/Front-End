import React from "react"
import SubscriptionRequestComponent from "./SubscriptionRequestComponent"

function SubscriptionRequestsContainer({ subscriptionRequests }: { subscriptionRequests: Subscription[] }) {
  const handleChangeRequestStatus = (id: number, newSubscription: Subscription) => {
    subscriptionRequests = subscriptionRequests.map((subscriptionRequest) => {
      if (subscriptionRequest.subscriptionId === id) {
        return newSubscription
      }
      return subscriptionRequest
    })
  }
  return (
    <>
      {subscriptionRequests.map((subscriptionRequest) => (
        <div key={subscriptionRequest.subscriber.userId}>
          <SubscriptionRequestComponent subscriptionRequest={subscriptionRequest} changeRequestStatusCallback={handleChangeRequestStatus} />
        </div>
      ))}
    </>
  )
}

export default SubscriptionRequestsContainer

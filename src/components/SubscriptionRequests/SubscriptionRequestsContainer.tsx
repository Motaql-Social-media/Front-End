import React from "react"
import SubscriptionRequestComponent from "./SubscriptionRequestComponent"

function SubscriptionRequestsContainer({ subscriptionRequests }: { subscriptionRequests: Subscription[] }) {
  const handleChangeRequestStatus = (id: number, newSubscription: Subscription) => {
    console.log(id, newSubscription)
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
        <div key={subscriptionRequest.subscriptionId}>
          <SubscriptionRequestComponent subscriptionRequest={subscriptionRequest} changeRequestStatusCallback={handleChangeRequestStatus} />
        </div>
      ))}
    </>
  )
}

export default SubscriptionRequestsContainer

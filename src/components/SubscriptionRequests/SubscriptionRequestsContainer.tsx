import React from "react"
import SubscriptionRequestComponent from "./SubscriptionRequestComponent"

function SubscriptionRequestsContainer({ subscriptionRequests }: { subscriptionRequests: Subscription[] }) {
  return (
    <>
      {subscriptionRequests.map((subscriptionRequest) => (
        <div key={subscriptionRequest.subscriber.userId}>
          <SubscriptionRequestComponent subscriptionRequest={subscriptionRequest} />
        </div>
      ))}
    </>
  )
}

export default SubscriptionRequestsContainer

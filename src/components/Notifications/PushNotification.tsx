import i18next from "i18next"
import Notification from "./Notification"

const PushNotification = ({ content, createdAt, isSeen, metadata, notificationFrom, notificationId, type }: { content: string; createdAt: any; isSeen: boolean; metadata: any; notificationFrom: any; notificationId: string; type: string }) => {
  return (
    <div className={`absolute ${i18next.language === "en" ? "right-3" : "left-3"}  bottom-8 w-[300px] overflow-hidden rounded-2xl border border-primary bg-black`}>
      <Notification content={content} createdAt={createdAt} isSeen={isSeen} metadata={metadata} notificationFrom={notificationFrom} notificationId={notificationId} type={type} />
    </div>
  )
}

export default PushNotification

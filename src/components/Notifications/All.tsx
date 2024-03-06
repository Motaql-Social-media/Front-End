import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Notification from "./Notification"

const All = () => {
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })
  const userToken = useSelector((state: any) => state.user.token)

  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    API.get(`users/current/notifications`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        console.log(res.data.data.notifications.notifications)
        setNotifications(res.data.data.notifications.notifications)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      {notifications &&
        notifications.length > 0 &&
        notifications.map((n: any) => (
          <div key={n.notificationId}>
            <Notification content={n.content} createdAt={n.createdAt} isSeen={n.isSeen} metadata={n.metadata} notificationFrom={n.notificationFrom} notificationId={n.notificationId} type={n.type} />
          </div>
        ))}
    </div>
  )
}

export default All

import React from "react"
import { Avatar } from "@mui/material"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { t } from "i18next"
import { styles } from "../../styles/styles"
import axios from "axios"
import { useSelector } from "react-redux"
import { Close } from "@mui/icons-material"
import { Modal } from "@mui/material"

function SubscriptionRequestComponent({ subscriptionRequest, changeRequestStatusCallback }: { subscriptionRequest: Subscription; changeRequestStatusCallback: any }) {
  function isoDateToDDMMYYYY(isoDate: string) {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0") // Add leading zero for single-digit days

    return `${day}/${month}/${year}`
  }

  const cnt = useSelector((state: any) => state.cnu.cnt)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${cnt}`,
    },
  })
  const handleActivateSubscription = () => {
    API.patch(`/subscriptions/${subscriptionRequest.subscriptionId}/accept`)
      .then((res) => {
        console.log(res)
        changeRequestStatusCallback(subscriptionRequest.subscriptionId, res.data.data.subscription)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleRefuseRequest = () => {
    API.patch(`/subscriptions/${subscriptionRequest.subscriptionId}/refuse`)
      .then((res) => {
        console.log(res)
        changeRequestStatusCallback(subscriptionRequest.subscriptionId, res.data.data.subscription)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  // Update the window width when the component mounts
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle: modalStyleT = {
    position: "absolute",
    borderRadius: "16px",
    backgroundColor: "black",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none"
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none"
  }

  const [openModal, setOpenModal] = React.useState(false)
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  return (
    <div className="border-b border-b-darkBorder p-3 hover:bg-darkHover">
      <div className="flex w-full justify-start gap-2">
        <div className="h-full">
          <Avatar alt={subscriptionRequest.subscriber.name} src={`${ subscriptionRequest.subscriber?.imageUrl}`} sx={{ width: 50, height: 50 }} />
        </div>
        <div className="w-full">
          <div className="flex w-full gap-2">
            <div className="text-lg font-semibold">{subscriptionRequest.subscriber.name}</div>
            <div className="text-gray-400 " dir="ltr">
              @{subscriptionRequest.subscriber.username}
            </div>
            <div className="flex-grow"></div>
            <div className="text-primary ">
              <div className="cursor-pointer" onClick={handleOpenModal}>
                <CameraAltIcon />
              </div>
              <Modal open={openModal} onClose={handleCloseModal} disableEscapeKeyDown disablePortal>
                <div style={modalStyle} className={`h-[90%] w-[40%] rounded-2xl border bg-black p-4 dark:border-darkBorder dark:bg-black`}>
                  <div className="w-fit cursor-pointer rounded-full  p-1 text-white hover:bg-darkHover" onClick={handleCloseModal}>
                    <Close />
                  </div>
                  <div className="mt-6 flex h-fit w-full items-center justify-center ">
                    <img className="rounded-2xl border border-primary" alt={subscriptionRequest.subscriber.name} src={`${subscriptionRequest.liveImage}`}></img>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div>
            <div className="text-gray-400">{subscriptionRequest.subscriber.jobtitle}</div>
            <div className="text-gray-400">{subscriptionRequest.fullname}</div>
            <div className="text-gray-400">
              <span dir="ltr">{subscriptionRequest.subscriber.phoneNumber}</span>
            </div>
            <div className="text-gray-400">{subscriptionRequest.subscriber.email}</div>
            <div className="flex items-center justify-between font-bold">
              <div>
                {t("subscription_type")}
                {" : "}
                <span className={`${subscriptionRequest.type === "INTERESTED" ? "text-interestedColor" : subscriptionRequest.type === "business" ? "text-businessColor" : "text-primary"}`}>{t(subscriptionRequest.type.toLowerCase())}</span>
              </div>
              <div>
                {t("subscription_date")}
                {" : "}
                {isoDateToDDMMYYYY(subscriptionRequest.createdAt)}
              </div>
            </div>
            {subscriptionRequest.status === "ACTIVATED" && (
              <div className="mt-2">
                <div>
                  {t("activation_date")}
                  {" : "}
                  {isoDateToDDMMYYYY(subscriptionRequest.reviewedAt)}
                </div>
                <div className="mt-1">
                  {t("activation_employee")}
                  {" : "}
                  {subscriptionRequest.reviewerEmployeeName}
                </div>
              </div>
            )}
            {subscriptionRequest.status === "REJECTED" && (
              <div className="mt-2">
                <div className="text-lg font-semibold text-red-600">{t("subscription_refused")}</div>
                <div className="mt-1">
                  {t("rejection_employee")}
                  {" : "}
                  {subscriptionRequest.reviewerEmployeeName}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {subscriptionRequest.status === "PENDING" && (
        <div className="mt-2 flex items-center justify-around">
          <button className={`${styles.coloredButton} max-w-[40%]`} onClick={handleActivateSubscription}>
            {t("activate_subscription")}
          </button>
          <button className={`${styles.coloredButton} max-w-[40%]  !bg-red-600`} onClick={handleRefuseRequest}>
            {t("refuse_request")}
          </button>
        </div>
      )}
    </div>
  )
}

export default SubscriptionRequestComponent

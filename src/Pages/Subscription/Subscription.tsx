import React, { useEffect } from "react"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import Widgets from "../../components/Widgets/Widgets"
import { useSelector } from "react-redux"

import VerficationInformation from "../../components/Subscription/VerficationInformation"
import ConfirmInformation from "../../components/Subscription/ConfirmInformation"
import SubscriptionButtonContainer from "../../components/Subscription/SubscriptionButtonContainer"
import { useNavigate, useParams } from "react-router-dom"

function Subscription() {
  const user = useSelector((state: any) => state.user.user)

  const type = useParams<{ type: string }>().type
  const [correctRoute, setCorrectRoute] = React.useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (type !== "professional" && type !== "business" && type !== "interested") {
      navigate("/404")
    } else if (user.subscriptionType !== "NONE") navigate("/pioneers")
    else setCorrectRoute(true)
  }, [type])

  const subscriptionRef = React.useRef<HTMLDivElement>(null)

  const [checked, setChecked] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const [imgSrc, setImgSrc] = React.useState(null)

  const [name, setName] = React.useState("")

  const [imgFile, setImgFile] = React.useState(null)

  return (
    <>
      {correctRoute && (
        <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
          <div ref={subscriptionRef} className="no-scrollbar ml-0 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder  dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
            <SubpageNavbar title="subscription" />
            <VerficationInformation imgSrc={imgSrc} setImgSrc={setImgSrc} name={name} setName={setName} imgFile={imgFile} setImgFile={setImgFile} />
            <ConfirmInformation checked={checked} handleChange={handleChange} />
            <SubscriptionButtonContainer checked={checked} name={name} imgFile={imgFile} />
          </div>
          {user && <Widgets />}
        </div>
      )}
    </>
  )
}

export default Subscription

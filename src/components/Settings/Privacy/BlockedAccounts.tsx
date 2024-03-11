import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import SettingsPersonContainer from "../SettingsPersonContainer"
import SubpageNavbar from "../../General/SubpageNavbar"
import Widgets from "../../Widgets/Widgets"
import { t } from "i18next"


const BlockedAccounts = () => {
 

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  const userToken = useSelector((state: any) => state.user.token)

  const [blocked, setBlocked] = useState([])

  useEffect(() => {
    API.get(`users/current/blocked`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data.data.blocked)
        setBlocked(res.data.data.blocked)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const user = useSelector((state: any) => state.user.user)

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="blocked_accounts" />
        <div className="border-t border-t-darkBorder py-3">
          {blocked.length === 0 && <div className="text-center text-xl font-semibold text-gray-500">{ t('no-blocked')}</div>}
          {blocked.length > 0 && <SettingsPersonContainer people={blocked} type="block" />}{" "}
        </div>
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default BlockedAccounts

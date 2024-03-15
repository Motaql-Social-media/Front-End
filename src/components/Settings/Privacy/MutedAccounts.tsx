import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import SettingsPersonContainer from "../SettingsPersonContainer"
import SubpageNavbar from "../../General/SubpageNavbar"
import Widgets from "../../Widgets/Widgets"
import { t } from "i18next"
import ElementVisibleObserver from "../../General/ElementVisibleObserver"
import Loading from "../../General/Loading"

const MutedAccounts = () => {
  const userToken = useSelector((state: any) => state.user.token)
  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const [muted, setMuted] = useState<any[]>([])

  const [page, setPage] = useState(1)
  const [finished, setFinished] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchMuted = () => {
    API.get(`users/current/muted`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data.data.muted)
        setMuted(res.data.data.muted)
        if (res.data.data.muted.length < 20) setFinished(true)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMuted()
  }, [page])

  const user = useSelector((state: any) => state.user.user)

  const handleFetchMore = () => {
    if (!finished) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div className=" no-scrollbar ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="muted_accounts" />
        {loading && <Loading />}
        {!loading && (
          <div className="border-t border-t-darkBorder py-3">
            {muted.length === 0 && <div className="text-center text-xl font-semibold text-gray-500">{t("no_muted")}</div>}
            {muted.length > 0 && <SettingsPersonContainer people={muted} type="mute" />}
            {muted.length === 0 && <div className="h-[150vh]"></div>}
            <ElementVisibleObserver handler={handleFetchMore} />
          </div>
        )}
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default MutedAccounts

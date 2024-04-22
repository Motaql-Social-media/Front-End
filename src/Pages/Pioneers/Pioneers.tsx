import React from "react"
import { useSelector } from "react-redux"
import Widgets from "../../components/Widgets/Widgets"
import { useRef } from "react"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import PioneersTabs from "../../components/Pioneers/PioneersTabs"

function Pioneers() {
  const user = useSelector((state: any) => state.user)

  const pioneersRef = useRef<HTMLDivElement>(null)

  

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={pioneersRef} className="no-scrollbar ml-0  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="pioneers" />
        <PioneersTabs />
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default Pioneers

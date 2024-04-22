import React from "react"
import { t } from "i18next"
import Business from "./Business"
import Interested from "./Interested"
import Specialized from "./Specialized"

function PioneersTabs() {
  const titles = [t("interested"), t("professional"), t("business")]
  const components = [<Interested />, <Specialized />, <Business />]
  const [index, setIndex] = React.useState(0)
  return (
    <div>
      <div className="flex w-full justify-around border-t border-t-darkBorder">
        {titles.map((title, i) => (
          <div key={i} className={`relative flex-grow cursor-pointer p-4 text-center transition-all ${index === i ? " font-semibold text-white" : "font-bold"} hover:bg-darkHover`} onClick={() => setIndex(i)}>
            {title}
            {i === index && <div className="absolute left-1/2 h-1 w-[50%] -translate-x-1/2 rounded-full bg-primary"></div>}
          </div>
        ))}
      </div>
        <div className="border-t border-t-darkBorder">{components[index]}</div>
    </div>
  )
}

export default PioneersTabs

import React from "react"
import { t } from "i18next"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { styles } from "../../styles/styles"

function Interested() {
  const properities = [t("for_individuals"), t("interested_authentication"), t("distinctive_mark"), t("add_website"), t("career_applications"), t("free_trial"), t("subscription_price", { price: "999" })]
  return (
    <div className="px-4">
      {properities.map((property, i) => (
        <div key={i} className="flex items-center gap-2 p-4">
          <CheckCircleIcon className="text-interestedColor" />
          <p className="text-lg">{property}</p>
        </div>
      ))}
      <button className={`${styles.coloredButton}`} onClick={() => (window.location.href = "/subscription/interested")}>
        {t("choose")}
      </button>
    </div>
  )
}

export default Interested

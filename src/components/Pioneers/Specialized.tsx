import React from 'react'
import { t } from "i18next"
import { styles } from '../../styles/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function Specialized() {
  const properities = [t("for_individuals"), t("specialized_authentication"), t("specialized_mark"), t("add_website"), t("career_applications"), t("free_trial"), t("subscription_price", { price: "999" })]

  return (
    <div className="px-4">
      {properities.map((property, i) => (
        <div key={i} className="flex items-center gap-2 p-4">
          <CheckCircleIcon className="text-primary" />
          <p className="text-lg">{property}</p>
        </div>
      ))}
      <button className={`${styles.coloredButton}`} onClick={() => (window.location.href = "/subscription/specialized")}>
        {t("choose")}
      </button>
    </div>
  )
}

export default Specialized

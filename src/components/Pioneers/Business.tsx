import React from "react"
import { t } from "i18next"
import { styles } from "../../styles/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

function Business() {
  const properities = [t("for_business"), t("business_authentication"), t("business_mark"), t("add_website"), t("career_publish"), t("products_publish"), t("free_trial"), t("subscription_price", { price: "1999" })]

  return (
    <div className="px-4">
      {properities.map((property, i) => (
        <div key={i} className="flex items-center gap-2 p-4">
          <CheckCircleIcon className="text-businessColor" />
          <p className="text-lg">{property}</p>
        </div>
      ))}
      <button className={`${styles.coloredButton}`} onClick={() => (window.location.href = "/subscription/business")}>
        {t("choose")}
      </button>
    </div>
  )
}

export default Business

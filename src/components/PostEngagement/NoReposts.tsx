import { t } from "i18next"

const NoReposts = () => {
  return (
    <div className="flex h-96  items-center justify-center">
      <div className="mt-3 flex max-w-[350px] gap-5 flex-col items-start justify-center">
        <div className="text-3xl font-bold text-primary">{t("no_reposts")}</div>
        <div className="text-gray-500">{t("no_reposts_message")}</div>
      </div>
    </div>
  )
}

export default NoReposts

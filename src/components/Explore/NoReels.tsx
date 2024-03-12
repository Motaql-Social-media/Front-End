import { t } from "i18next"

const NoReels = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="mt-3 flex max-w-[350px] flex-col items-start justify-center gap-5">
        <div className="text-3xl font-bold text-primary">{t("no_reels")}</div>
        <div className="text-gray-500">{t("no_reels_explore")}</div>
      </div>
    </div>
  )
}

export default NoReels

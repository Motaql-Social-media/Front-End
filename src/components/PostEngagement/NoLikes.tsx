import { t } from "i18next"
const NoLikes = () => {
  return (
    <div className="flex items-center h-96 justify-center ">
      <div className="mt-3 flex max-w-[350px] flex-col items-start justify-center gap-4">
        <div className="text-3xl font-bold text-primary">{t("no_likes")}</div>
        <div className="text-gray-500">{t("no_likes_message")}</div>
      </div>
    </div>
  )
}

export default NoLikes

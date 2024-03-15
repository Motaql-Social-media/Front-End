import { t } from "i18next"

const FetchPostError = ({ type }: { type: "diary" | "reel" }) => {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold text-red-500">{t("post_not_found", { post: t(type) })}</div>
      <div className="text-gray-500">{t("fetch_error")}</div>
    </div>
  )
}

export default FetchPostError

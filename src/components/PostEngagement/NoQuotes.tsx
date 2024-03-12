import { t } from "i18next"

const NoQuotes = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="mt-3 flex max-w-[350px] flex-col gap-5 items-start justify-center">
        <div className="text-3xl font-bold text-primary">{t("no_quotes")}</div>
        <div className="text-gray-500">{t("no_quotes_message")}</div>
      </div>
    </div>
  )
}

export default NoQuotes

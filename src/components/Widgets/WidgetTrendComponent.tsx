import React from "react"
import { t } from "i18next"

const WidgetsTrendComponent = ({ index, name, numberOfPosts }: { index: number; name: string; numberOfPosts: number }) => {
  return (
    <div
      className="flex  w-full cursor-pointer flex-col justify-between p-3 hover:bg-lightHover dark:hover:bg-[#292d34]"
      data-testid="trendComp"
      onClick={() => {
        window.location.href = `/trending/${name}/diaries`
      }}
    >
      <div className="text-start text-xs text-gray-500">
        {index}. {t("in_trending")}
      </div>
      <div dir="ltr" className="self-end">
        #{name}
      </div>
      <div className="text-start text-xs text-gray-500">
        {numberOfPosts} {t("posts")}
      </div>
    </div>
  )
}

export default WidgetsTrendComponent

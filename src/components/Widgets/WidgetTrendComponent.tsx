import React from "react"

const WidgetsTrendComponent = ({ index, name, numberOfPosts }: { index: number; name: string; numberOfPosts: number }) => {
  return (
    <div
      className="flex  w-full cursor-pointer flex-col justify-between p-3 hover:bg-lightHover dark:hover:bg-[#292d34]"
      data-testid="trendComp"
      onClick={() => {
        window.location.href = `/trending/${name}/diaries`
      }}
    >
      <div className="text-start text-xs text-gray-500">{index}. in trending</div>
      <div className="self-end">#{name}</div>
      <div className="text-start text-xs text-gray-500">{numberOfPosts} posts</div>
    </div>
  )
}

export default WidgetsTrendComponent

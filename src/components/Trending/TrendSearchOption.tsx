import React from "react"

const TrendSearchOption = ({
  option,
  setShowMenu,
}: {
  option: {
    tag: string
  }
  setShowMenu: any
}) => {
  return (
    <div
      className="flex cursor-pointer p-3 hover:bg-darkHover"
      onClick={() => {
        setShowMenu(false)
        window.location.href = `/trending/${option.tag}/diaries`
      }}
      key={option.tag}
    >
      <div className="ml-3">
        <div className="text-secondary text-sm">#{option.tag}</div>
      </div>
    </div>
  )
}

export default TrendSearchOption

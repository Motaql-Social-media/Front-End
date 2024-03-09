import React from "react"

const TrendSearchOption = ({
  option,
  ...props
}: {
  option: {
    tag: string
  }
}) => {
  return (
    <div
      {...props}
      className="flex cursor-pointer p-3 hover:bg-lightHover"
      onClick={() => {
        window.location.href = `/trending/${option.tag}/diaries`
      }}
    >
      <div className="ml-3">
        <div className="text-secondary text-sm">#{option.tag}</div>
      </div>
    </div>
  )
}

export default TrendSearchOption

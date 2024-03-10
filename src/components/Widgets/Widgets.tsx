import SearchComponent from "../Trending/SearchComponent"
import WidgetsTrends from "./WidgetTrends"
import React from "react"

const Widgets = () => {
  return (
    <div className="hidden max-w-[400px] flex-1 text-center lg:block">
      <div className="mt-3">
        <SearchComponent query={""} callback={() => { }} fromMessage={false} />
      </div>
      <div>
        <WidgetsTrends />
      </div>
    </div>
  )
}

export default Widgets

import { useState } from "react"
import WidgetsTrendComponent from "./WidgetTrendComponent"

import React from "react"

import { useSelector } from "react-redux"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const WidgetsTrendsContainer = ({ data, loading }: { data: any; loading: boolean }) => {
  return (
    <div className={`${loading ? "flex justify-center" : ""}`}>
      <Box
        sx={{
          display: loading ? "flex" : "none",
          marginTop: 3,
        }}
      >
        <CircularProgress />
      </Box>
      {data.map((trend: any, index: number) => {
        return (
          <div key={index}>
            <WidgetsTrendComponent key={index} index={index + 1} name={trend.tag} numberOfPosts={trend.totalsupport} />
          </div>
        )
      })}
    </div>
  )
}

export default WidgetsTrendsContainer

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, VolumeMute } from "@mui/icons-material"

const Privacy = () => {
  const options = [
    {
      title: "Mute and block",
      description: "Mange the accounts that you've muted or blocked",
      logo: <VolumeMute />,
      location: "/settings/mute_block",
    },
  ]

  const navigate = useNavigate()

  return (
    <div>
      <div className="border-b border-b-darkBorder px-5 py-3 text-2xl font-semibold">Privacy and safety</div>
      <div className="px-5 text-sm text-gray-500">Manage what information you see and share.</div>
      {options.map((option, index) => (
        <div key={option.title} className="flex cursor-pointer items-center p-3 hover:bg-darkHover" onClick={() => navigate(`${option.location}`)}>
          <div>{option.logo}</div>
          <div className="pl-3 text-xl">{option.title}</div>
          <div className="flex-grow"></div>
          <div>
            <ArrowRight />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Privacy

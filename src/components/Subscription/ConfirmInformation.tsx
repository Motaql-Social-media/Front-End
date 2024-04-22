import React from "react"

import { t } from "i18next"
import WorkIcon from "@mui/icons-material/Work"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import { useSelector } from "react-redux"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { colors } from "@mui/material"

function ConfirmInformation({ checked, handleChange }: { checked: boolean; handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  const user = useSelector((state: any) => state.user.user)

  return (
    <>
      <div className="p-5">
        <div className="text-2xl">{t("confirm_information")}</div>
        <div className="mt-3 w-full rounded-2xl border border-darkBorder p-3">
          <div className="border-b border-b-darkBorder pb-2">
            <div className="mb-2 flex w-full items-center justify-around gap-4">
              <DriveFileRenameOutlineIcon />
              <div>{t("nickname")}</div>
              <div className="flex-grow"></div>
            </div>
            <div className="px-6 text-xl">{user.name}</div>
          </div>
          <div className="mt-2 border-b border-b-darkBorder pb-2">
            <div className="mb-2 flex w-full items-center justify-around gap-4">
              <DriveFileRenameOutlineIcon />
              <div>{t("username")}</div>
              <div className="flex-grow"></div>
            </div>
            <div className="px-6 text-xl">{user.username}</div>
          </div>
          <div className="mt-2 border-b border-b-darkBorder pb-2">
            <div className="mb-2 flex w-full items-center justify-around gap-4">
              <WorkIcon />
              <div>{t("speciality")}</div>
              <div className="flex-grow"></div>
            </div>
            <div className="px-6 text-xl">{user.jobtitle}</div>
          </div>
          <div className="mt-2 border-b border-b-darkBorder pb-2">
            <div className="mb-2 flex w-full items-center justify-around gap-4">
              <PhoneIcon />
              <div>{t("phone_number")}</div>
              <div className="flex-grow"></div>
            </div>
            <div className="px-6 text-xl">
              <span dir="ltr">{user.phoneNumber}</span>
            </div>
          </div>
          <div className="my-2 border-b border-b-darkBorder pb-2">
            <div className="mb-2 flex w-full items-center justify-around gap-4">
              <EmailIcon />
              <div>{t("email")}</div>
              <div className="flex-grow"></div>
            </div>
            <div className="px-6 text-xl">{user.email}</div>
          </div>
          <FormControlLabel
            required
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={t("subscription_checkbox")}
            sx={{
              ".MuiCheckbox-root": {
                color: "#40e5da",
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ConfirmInformation

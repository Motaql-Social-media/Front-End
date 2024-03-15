import React, { useEffect, useState } from "react"
import { TextField } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { SelectChangeEvent } from "@mui/material"
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import i18next from "i18next"
import { styles } from "../../../styles/styles"

const Poll = ({ handlePollClick, poll, setPoll }: { handlePollClick: any; poll: any; setPoll: any }) => {
  const { t } = useTranslation()
  const [numOfOptions, setNumOfOptions] = useState(2)
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [option4, setOption4] = useState("")
  const [days, setDays] = useState("1")
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("0")

  const handleChangeDays = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setDays(event.target.value)
  }

  const handleChangeHours = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setHours(event.target.value)
  }

  const handleChangeMinutes = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setMinutes(event.target.value)
  }

  const handleRemovePoll = () => {
    setOption1("")
    setOption2("")
    setOption3("")
    setOption4("")
    setDays("1")
    setHours("0")
    setMinutes("0")
    setNumOfOptions(2)
    handlePollClick(false)
    setPoll(null)
  }

  useEffect(() => {
    let tmpPoll: any = {
      minutes: minutes,
      hours: hours,
      days: days,
    }
    if (option1 !== "") tmpPoll = { ...tmpPoll, choice1: option1 }
    if (option2 !== "") tmpPoll = { ...tmpPoll, choice2: option2 }
    if (option3 !== "") tmpPoll = { ...tmpPoll, choice3: option3 }
    if (option4 !== "") tmpPoll = { ...tmpPoll, choice4: option4 }

    setPoll(tmpPoll)
  }, [days, minutes, hours, option1, option2, option3, option4])

  const darkMode = useSelector((state: any) => state.theme.darkMode)
  return (
    <div className="mb-5 flex h-[80%] w-full flex-col rounded-3xl border dark:border-darkBorder">
      <div className={`mb-2 flex w-full ${i18next.language === "en" ? "items-start" : "items-end"} flex-col  border-b border-b-darkBorder py-3 pl-3`}>
        <div className="relative w-[80%]">
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("choice", { number: 1 })}
            variant="outlined"
            value={option1}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 25) // Limit to 25 characters

              setOption1(newValue)
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={styles.textField}
          />
          <span className="absolute right-2 top-1 text-sm text-gray-600">{`${option1.length} / 25 `}</span>
        </div>
        <div className="relative w-[80%]">
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={t("choice", { number: 2 })}
            variant="outlined"
            value={option2}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 25) // Limit to 25 characters

              setOption2(newValue)
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={styles.textField}
          />
          <span className="absolute right-2 top-1 text-sm text-gray-600">{`${option2.length} / 25 `}</span>
          {numOfOptions === 2 && (
            <div className="absolute -right-[15%] top-[7%] h-[50px] w-[50px] cursor-pointer rounded-full p-1 text-center  align-middle text-3xl font-semibold text-primary hover:bg-darkHover" onClick={() => setNumOfOptions((prev) => prev + 1)}>
              +
            </div>
          )}
        </div>
        <div className={`relative w-[80%] ${numOfOptions < 3 ? "hidden" : ""}`}>
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={`${t("choice", { number: 3 })} (${t("optional")})`}
            variant="outlined"
            value={option3}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 25) // Limit to 25 characters

              setOption3(newValue)
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={styles.textField}
          />
          <span className="absolute right-2 top-1 text-sm text-gray-600">{`${option3.length} / 25 `}</span>
          {numOfOptions === 3 && (
            <div className="absolute -right-[15%] top-[7%] h-[50px] w-[50px] cursor-pointer rounded-full p-1 text-center  align-middle text-3xl font-semibold text-primary hover:bg-darkHover" onClick={() => setNumOfOptions((prev) => prev + 1)}>
              +
            </div>
          )}
        </div>
        <div className={`relative w-[80%] ${numOfOptions < 4 ? "hidden" : ""}`}>
          <TextField
            inputProps={{ onPaste: (e) => e.preventDefault() }}
            label={`${t("choice", { number: 4 })} (${t("optional")})`}
            variant="outlined"
            value={option4}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 25) // Limit to 25 characters

              setOption4(newValue)
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            sx={styles.textField}
          />
          <span className="absolute right-2 top-1 text-sm text-gray-600">{`${option4.length} / 25 `}</span>
        </div>
      </div>
      <div className="w-full border-b border-b-darkBorder pl-3">
        <p className="text-md mb-4 pl-2">{t("poll_length")}</p>
        <div className="mb-4 flex justify-center gap-2">
          <div className="days w-[30%]">
            <FormControl
              sx={{
                "&& .MuiFormLabel-root": {
                  color: "#40e5da",
                },
                width: "100%",
              }}
            >
              <InputLabel id="demo-simple-select-label">{t("days")}</InputLabel>
              <Select
                value={days}
                label="Days"
                onChange={handleChangeDays}
                sx={{
                  width: "100%",
                  color: "black",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#767C86 !important",
                  },
                  ".MuiSelect-select": {
                    color: "#40e5da",
                  },
                }}
                MenuProps={{
                  sx: {
                    ".MuiMenuItem-root": {
                      backgroundColor: `${!darkMode ? "white" : "black"}`,
                      color: "#40e5da",
                      padding: "1px 10px",
                      ":hover": {
                        backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                      },
                    },
                    ".MuiList-root": {
                      padding: 0,
                    },
                    ".MuiMenuItem-root.Mui-selected": {
                      bgcolor: darkMode ? "white" : "black",
                      color: "#40e5da",
                    },
                  },
                }}
              >
                {Array.from({ length: 8 }, (_, i) => i).map((d) => (
                  <MenuItem value={d} key={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="hours w-[30%]">
            <FormControl
              sx={{
                "&& .MuiFormLabel-root": {
                  color: "#40e5da",
                },
                width: "100%",
              }}
            >
              <InputLabel id="demo-simple-select-label">{t("hours")}</InputLabel>
              <Select
                value={hours}
                label="Hours"
                onChange={handleChangeHours}
                sx={{
                  width: "100%",
                  color: "black",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#767C86 !important",
                  },
                  ".MuiSelect-select": {
                    color: "#40e5da",
                  },
                }}
                MenuProps={{
                  sx: {
                    ".MuiMenuItem-root": {
                      backgroundColor: `${!darkMode ? "white" : "black"}`,
                      color: "#40e5da",
                      padding: "1px 10px",
                      ":hover": {
                        backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                      },
                    },
                    ".MuiList-root": {
                      padding: 0,
                    },
                    ".MuiMenuItem-root.Mui-selected": {
                      bgcolor: darkMode ? "white" : "black",
                      color: "#40e5da",
                    },
                  },
                }}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <MenuItem value={h} key={h}>
                    {h}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="minutes w-[30%]">
            <FormControl
              sx={{
                "&& .MuiFormLabel-root": {
                  color: "#40e5da",
                },
                width: "100%",
              }}
            >
              <InputLabel id="demo-simple-select-label">{t("minutes")}</InputLabel>
              <Select
                value={minutes}
                label="Minutes"
                onChange={handleChangeMinutes}
                sx={{
                  width: "100%",
                  color: "black",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#40e5da",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#767C86 !important",
                  },
                  ".MuiSelect-select": {
                    color: "#40e5da",
                  },
                }}
                MenuProps={{
                  sx: {
                    ".MuiMenuItem-root": {
                      backgroundColor: `${!darkMode ? "white" : "black"}`,
                      color: "#40e5da",
                      padding: "1px 10px",
                      ":hover": {
                        backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                      },
                    },
                    ".MuiList-root": {
                      padding: 0,
                    },
                    ".MuiMenuItem-root.Mui-selected": {
                      bgcolor: darkMode ? "white" : "black",
                      color: "#40e5da",
                    },
                  },
                }}
              >
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <MenuItem value={m} key={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className=" flex h-12 cursor-pointer items-center justify-center rounded-bl-3xl rounded-br-3xl  hover:bg-[#1f0404]" onClick={handleRemovePoll}>
        <span className="text-lg text-red-600">{t("remove_poll")}</span>
      </div>
    </div>
  )
}

export default Poll

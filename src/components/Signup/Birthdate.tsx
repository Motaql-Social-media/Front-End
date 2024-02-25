import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { last120Years, days, months } from "../../constants/index";

import { useSelector } from "react-redux";

import { ThemeState } from "../../store/ThemeSlice.js";

import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const Birthdate = ({
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
  yearwidth,
  monthwidth,
}: {
  month: string;
  setMonth: (value: string) => void;
  day: string;
  setDay: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  yearwidth: string;
  monthwidth: string;
}) => {
  type RootState = {
    theme: ThemeState;
  };
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleChangeYear = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    setMonth(event.target.value);
  };

  const handleChangeDay = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    setDay(event.target.value);
  };

  const { t } = useTranslation();

  return (
    <div className="date flex">
      <Box sx={{ minWidth: 125 }} className="month">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#40e5da",
            },
            minWidth: 125,
          }}
        >
          <InputLabel id="demo-simple-select-label">{t("month")}</InputLabel>
          <Select
            value={month}
            label="Month"
            onChange={handleChangeMonth}
            sx={{
              width: 125,
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
            {months.map((month) => (
              <MenuItem value={month} key={month} data-testid={month}>
                {t(month)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 90 }} className="day">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#40e5da",
            },
            minWidth: 90,
            marginRight: 1,
            marginLeft: 1,
          }}
        >
          <InputLabel id="demo-simple-select-label">{t("day")}</InputLabel>
          <Select
            value={day}
            label="Day"
            onChange={handleChangeDay}
            sx={{
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
            {days.map((day) => (
              <MenuItem value={day} key={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 115 }} className="year">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#40e5da",
            },
            minWidth: 115,
            paddingLeft: 0,
          }}
        >
          <InputLabel id="demo-simple-select-label">{t("year")}</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={handleChangeYear}
            sx={{
              width: 115,
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
            {last120Years.map((year) => (
              <MenuItem value={year} key={year} data-testid={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Birthdate;

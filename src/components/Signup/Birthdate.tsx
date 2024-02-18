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

  return (
    <div className="date flex">
      <Box sx={{ minWidth: 120 }} className="month">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#9aa1ad",
            },
            minWidth: 120,
          }}
        >
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            data-testid="monthSelect"
            value={month}
            label="Age"
            onChange={handleChangeMonth}
            sx={{
              width: monthwidth,
              color: "black",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#767C86",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              ".MuiSvgIcon-root ": {
                fill: "#767C86 !important",
              },
              ".MuiSelect-select": {
                color: `${!darkMode ? "black" : "white"}`,
              },
            }}
            MenuProps={{
              sx: {
                ".MuiMenuItem-root": {
                  backgroundColor: `${!darkMode ? "white" : "black"}`,
                  color: `${!darkMode ? "black" : "white"}`,
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
                  color: !darkMode ? "white" : "black",
                },
              },
            }}
          >
            {months.map((month) => (
              <MenuItem value={month} key={month} data-testid={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 100 }} className="day">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#9aa1ad",
            },
            minWidth: 100,
            padding: "0 10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            data-testid="daySelect"
            value={day}
            label="Day"
            onChange={handleChangeDay}
            sx={{
              color: "black",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#767C86",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              ".MuiSvgIcon-root ": {
                fill: "#767C86 !important",
              },
              ".MuiSelect-select": {
                color: `${!darkMode ? "black" : "white"}`,
              },
            }}
            MenuProps={{
              sx: {
                ".MuiMenuItem-root": {
                  backgroundColor: `${!darkMode ? "white" : "black"}`,
                  color: `${!darkMode ? "black" : "white"}`,
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
                  color: !darkMode ? "white" : "black",
                },
              },
            }}
          >
            {days.map((day) => (
              <MenuItem value={day} key={day} data-testid={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 100 }} className="year">
        <FormControl
          sx={{
            "&& .MuiFormLabel-root": {
              color: "#9aa1ad",
            },
            minWidth: 100,
            paddingLeft: 0,
          }}
        >
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            data-testid="yearSelect"
            value={year}
            label="Year"
            onChange={handleChangeYear}
            sx={{
              width: yearwidth,
              color: "black",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#767C86",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1d9bf0",
              },
              ".MuiSvgIcon-root ": {
                fill: "#767C86 !important",
              },
              ".MuiSelect-select": {
                color: `${!darkMode ? "black" : "white"}`,
              },
            }}
            MenuProps={{
              sx: {
                ".MuiMenuItem-root": {
                  backgroundColor: `${!darkMode ? "white" : "black"}`,
                  color: `${!darkMode ? "black" : "white"}`,
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
                  color: !darkMode ? "white" : "black",
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

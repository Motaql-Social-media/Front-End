import {
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";



export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  ...restProps
}) => {
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "sa",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
        console.log(data);
      },
    });

  return (
    <TextField
      label={"Phone Number"}
      variant="outlined"
      value={phone}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputLabelProps={{
        style: { color: "#40e5da", textAlign: "right" },
      }}
      sx={{
        borderColor: "#40e5da",
        "& .MuiInputBase-input": {
          borderColor: "#40e5da",
          "&$focused": {
            borderColor: "#40e5da",
          },
          color: "#40e5da",
        },
        width: "100%",
        "& .MuiOutlinedInput-root:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#40e5da",
          },
        },
        "& .MuiOutlinedInput-root": {
          borderColor: "#40e5da",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#40e5da",
            "&$focused": {
              borderColor: "#40e5da",
            },
          },
        },
        marginBottom: "10px",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              defaultValue={parseCountry(defaultCountries[0])}
              MenuProps={{
                style: {
                  height: "300px",
                  width: "360px",
                  top: "10px",
                  left: "-34px",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{
                width: "max-content",
                // Remove default outline (display only on focus)
                fieldset: {
                  display: "none",
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: "none",
                  },
                },
                // Update default spacing
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important",
                },
                svg: {
                  right: 0,
                },
              }}
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryIso2)}
              renderValue={(value) => {
                return (
                  <img
                    src={`https://flagcdn.com/${value.iso2}.svg`}
                    width="30"
                    style={{ aspectRatio: "4/3" }}
                    alt={value.iso2}
                  ></img>
                );
              }}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <img
                      src={`https://flagcdn.com/${country.iso2}.svg`}
                      width="20"
                      style={{ aspectRatio: "4/3", marginRight: "8px" }}
                      alt={country.iso2}
                    ></img>
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};

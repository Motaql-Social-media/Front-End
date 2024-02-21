import { TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18next from "i18next";
import { Alert } from "@mui/material";
import { styles } from "../../styles/styles";
import {
  LENGTH_REGEX,
  NUMBER_REGEX,
  PASSWORD_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPER_CASE_LETTER_REGEX,
  LOWER_CASE_LETTER_REGEX,
} from "../../constants/index";

const SixthStep = ({
  password,
  setPassword,
  setPosition,
  setOriginalUsername,
}: {
  password: string;
  setPassword: any;
  setPosition: any;
  setOriginalUsername: any;
  
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function checkPassword(password: string): boolean {
    return !PASSWORD_REGEX.test(password);
  }
  function hasUpperCaseLetter(password: string) {
    return UPPER_CASE_LETTER_REGEX.test(password);
  }
  function hasLowerCaseLetter(password: string) {
    return LOWER_CASE_LETTER_REGEX.test(password);
  }
  function hasSpecialCharachter(password: string) {
    return SPECIAL_CHARACTER_REGEX.test(password);
  }
  function hasNumber(password: string) {
    return NUMBER_REGEX.test(password);
  }
  function hasCorrectLength(password: string) {
    return LENGTH_REGEX.test(password);
  }
  const { t } = useTranslation();
  return (
    <div id="Sixth Step" className=" m-auto w-[350px] dark:text-white hidden">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome7")}</h1>
        <div className="relative">
          <TextField
            id="outlined-basic"
            label={t("new_password")}
            variant="outlined"
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#40e5da" },
            }}
            sx={{
              "& .MuiInputBase-input": {
                borderColor: "#40e5da",

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
                "&$focused": {
                  borderColor: "#40e5da",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  "&$focused": {
                    borderColor: "#40e5da",
                  },
                  borderColor: "#40e5da",
                },
              },
              marginBottom: "10px",
            }}
          />

          <span
            className={`toggle-password text-primary absolute ${
              i18next.language === "en" || !password ? "right-4" : "left-4"
            } top-4 cursor-pointer ${showPassword ? "active" : ""}`}
            onClick={togglePasswordVisibility}
          >
            <VisibilityIcon className={`text-primary`} />
          </span>
        </div>
        <div>
          <div
          // severity={`${checkPassword(password) ? "error" : "success"}`}
          >
            <Alert
              severity={`${hasUpperCaseLetter(password) ? "success" : "error"}`}
              sx={styles.signupPasswordCheckStyleTop}
            >
              {t("uppercase")}
            </Alert>
            <Alert
              severity={`${hasLowerCaseLetter(password) ? "success" : "error"}`}
              sx={styles.signupPasswordCheckStyleMiddle}
            >
              {t("lowercase")}
            </Alert>
            <Alert
              severity={`${
                hasSpecialCharachter(password) ? "success" : "error"
              }`}
              sx={styles.signupPasswordCheckStyleMiddle}
            >
              {t("special")}
            </Alert>
            <Alert
              severity={`${hasNumber(password) ? "success" : "error"}`}
              sx={styles.signupPasswordCheckStyleMiddle}
            >
              {t("number")}
            </Alert>
            <Alert
              severity={`${hasCorrectLength(password) ? "success" : "error"}`}
              sx={styles.signupPasswordCheckStyleBottom}
            >
              {t("min_length")}
            </Alert>
          </div>
          <button
            type="button"
            className={`${styles.coloredButton}`}
            onClick={() => {
              setPosition((prev: number) => prev + 1);
            }}
            disabled={checkPassword(password)}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SixthStep;

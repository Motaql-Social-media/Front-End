import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { styles } from "../../styles/styles";

import { useTranslation } from "react-i18next";

const ForthStep = ({
  email,
  setEmail,
  setPosition,
  emailExistError,
  setEmailExistError,
  validEmail,
}: {
  email: string;
  setEmail: (value: string) => void;
  setPosition: any;
  emailExistError: boolean;
  setEmailExistError: React.Dispatch<React.SetStateAction<boolean>>;
  validEmail: (email: string) => boolean;
}) => {
  const handleEmailBlur = () => {
    //   // let emailExist
    //   axios
    //     .post(mock ? APIs.mock.emailExistAPI : APIs.actual.emailExistAPI, {
    //       email: email,
    //     })
    //     .then((res) => {
    //       setEmailExistError(res.data.message === "Email is existed");
    //       // emailExist = res.data.message === "Email is existed"
    //     })
    //     // .then(() => {
    //     //   if (emailExist) {
    //     //     setEmailExistError(true)
    //     //   } else {
    //     //     setEmailExistError(false)
    //     //   }
    //     // })
    //     .catch((err) => {
    //       setEmailExistError(false);
    //       // console.log(err)
    //     });
    };
    
    const { t } = useTranslation();
  return (
    <div id="Forth Step" className=" m-auto w-[350px] dark:text-white hidden">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">Your Email ?</h1>

        <TextField
          id="outlined-basic"
          label={"Email"}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: { color: "#40e5da", textAlign: "right" },
          }}
          inputProps={{
            onBlur: handleEmailBlur,
            style: {
              border: emailExistError ? "1px solid red" : "",
            },
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
        />
        {!validEmail(email) && (
          <div className={`${email ? "flex" : "hidden"}`}>
            <Alert severity="error" sx={styles.signupPasswordCheckStyleMiddle}>
              Please enter a valid email
            </Alert>
          </div>
        )}
        <span
          className={`ml-3 text-sm text-red-600 ${
            emailExistError ? "" : "hidden"
          }`}
        >
          Email has already been taken
        </span>
        <button
          type="button"
          id="next"
          className={`${styles.coloredButton}`}
          onClick={() => {
            setPosition((prev: number) => prev + 1);
          }}
          disabled={!validEmail(email) || emailExistError}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default ForthStep;

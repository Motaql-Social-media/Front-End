import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
const TagStep = ({
  userTag,
  setUserTag,
  originalUsername,
  userToken,
  user,
  setUser,
  setPosition,
}: {
  userTag: string;
  setUserTag: (userTag: string) => void;
  originalUsername: string;
  userToken: string;
  user: {};
  setUser: any;
  setPosition: any;
}) => {
  const [usernameError, setUsernameError] = useState(false);

  const handleUsernameBlur = () => {
    //   axios
    //     .post(mock ? APIs.mock.checkUsername : APIs.actual.checkUsername, {
    //       username: userTag,
    //     })
    //     .then((res) => {
    //       setUsernameError(false);
    //     })
    //     .catch((err) => {
    //       if (userTag !== originalUsername) {
    //         setUsernameError(true);
    //         console.log(err);
    //       } else {
    //         setUsernameError(false);
    //       }
    //     });
  };

  const handleAssignUsername = () => {
    //   axios
    //     .patch(
    //       mock ? APIs.mock.assignUsername : APIs.actual.assignUsername,
    //       {
    //         username: userTag,
    //       },
    //       {
    //         headers: {
    //           authorization: "Bearer " + userToken,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       const newuser = {
    //         ...user,
    //         username: userTag,
    //       };
    //       setUser(newuser);
    // setPosition((prev: number) => prev + 1);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };
  const { t } = useTranslation();
  useEffect(() => {
    setUserTag(originalUsername);
  }, [originalUsername]);

  return (
    <div id="Tag Step" className=" m-auto w-[350px] dark:text-white hidden">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">
          What should we call you?
        </h1>
        <p className="text-gray-500 mb-4">
          Your @username is unique. You can always change it later.
        </p>
        <div className="relative">
          <TextField
            id="outlined-basic"
            label={"Username"}
            variant="outlined"
            value={userTag}
            onChange={(e) => {
              setUserTag(e.target.value);
            }}
            InputLabelProps={{
              style: { color: "#40e5da", textAlign: "right" },
            }}
            inputProps={{
              onBlur: handleUsernameBlur,
              style: {
                border: usernameError ? "1px solid red" : "0px",
              },
            }}
            sx={{
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
          {!usernameError && (
            <CheckCircleIcon className="absolute top-0 right-0 -translate-x-2 translate-y-4 text-[18px] text-green-600" />
          )}
          {usernameError && (
            <ErrorIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-8 text-[18px] text-red-600" />
          )}
          {usernameError && (
            <span className="ml-3 text-sm text-red-600">
              Username has already been taken
            </span>
          )}
          <button
            type="button"
            id="next"
            className={`${styles.coloredButton}`}
            onClick={() => {
              setPosition((prev: number) => prev + 1);
            }}
            disabled={!userTag || usernameError}
          >
            {originalUsername === userTag ? t("Skip") : t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagStep;

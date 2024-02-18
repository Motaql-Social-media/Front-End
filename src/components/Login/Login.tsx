import { useState, useEffect, HtmlHTMLAttributes } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Modal, Box, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Logo from "../../assets/images/mainLogo.png";
import { styles } from "../../styles/styles";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, userState } from "../../store/UserSlice";
import { ThemeState } from "../../store/ThemeSlice";

// import GoogleLoginButton from "../General/GoogleLoginButton";
import axios from "axios";

import { EMAIL_REGEX } from "../../constants/index";

import React from "react";

import { getColor } from "../../constants";
import { AnyAction } from "@reduxjs/toolkit";
import { NotificationState } from "../../store/NotificationSlice";
import { useTranslation } from "react-i18next";

import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import i18next from "i18next";

const Login = ({
  openModal,
  handleCloseModal,
  setLocation,
}: {
  openModal: boolean;
  handleCloseModal: any;
  setLocation: any;
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  type RootState = {
    user: userState;
    theme: ThemeState;
    notification: NotificationState;
  };
  const user = useSelector((state: any) => state.user);

  const [emailExistError, setEmailExistError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  type modalStyleT = {
    position: React.CSSProperties["position"];
    backgroundColor: React.CSSProperties["backgroundColor"];
    border: React.CSSProperties["border"];
    borderRadius: React.CSSProperties["borderRadius"];
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
    maxWidth?: React.CSSProperties["maxWidth"];
    top?: React.CSSProperties["top"];
    left?: React.CSSProperties["left"];
    transform?: React.CSSProperties["transform"];
  };
  const modalStyle: modalStyleT = {
    position: "absolute",
    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  };

  if (windowWidth < 700) {
    modalStyle.width = "100vw";
    modalStyle.height = "100vh";
    modalStyle.maxWidth = "none"; // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px";
    modalStyle.height = "651.6px";
    modalStyle.top = "50%";
    modalStyle.left = "50%";
    modalStyle.transform = "translate(-50%, -50%)";
    modalStyle.maxWidth = "none"; // optional, to remove any max-width constraints
  }

  const APIs = {
    mock: {
      emailExistAPI:
        "httpss://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail",
    },
    actual: {
      emailExistAPI:
        "https://backend.gigachat.cloudns.org/api/user/existedEmailORusername",
      loginAPI: "https://backend.gigachat.cloudns.org/api/user/login",
    },
  };

  function handleNext(emailExist: boolean) {
    if (emailExist) {
      const firstPage = document.getElementById("firstPage");
      const secondPage = document.getElementById("secondPage");
      if (firstPage) firstPage.style.display = "none";
      if (secondPage) secondPage.style.display = "block";
    } else {
      setEmailExistError(true);
      setTimeout(() => {
        setEmailExistError(false);
      }, 3000);
    }
  }

  const handleReturn = () => {
    const firstPage = document.getElementById("firstPage");
    const secondPage = document.getElementById("secondPage");
    if (firstPage) firstPage.style.display = "block";
    if (secondPage) secondPage.style.display = "none";
  };

  const handleLoginEvent = (e: any) => {
    e.preventDefault();
    let userCredentials = {
      query: userName,
      password: password,
      //   push_token: FCMToken,
    };
    // axios
    //   .post(APIs.actual.loginAPI, userCredentials)
    //   .then((res) => {
    //     console.log(res.data.data.user)
    //     console.log(res.data.token)
    //   })
    //   .catch((err) => {
    //      setLoginError(err.message === "Request failed with status code 401")
    //   })

    dispatch(
      loginUser({ userCredentials, isgoogle: false }) as unknown as AnyAction
    ).then((result: any) => {
      // console.log(result)
      if (result.payload) {
        setUserName("");
        setPassword("");
        handleCloseModal();
        navigate("/home");
        setLoginError(false);
      } else {
        setLoginError(
          result.error.message === "Request failed with status code 401"
        );
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function validEmail(emeil: string) {
    return EMAIL_REGEX.test(emeil);
  }

  const handleEmailCheck = () => {
    let userCredentials: { username: string; email?: string } = {
      username: userName,
    };

    if (validEmail(userName)) {
      userCredentials = { email: userName, username: "" };
    }

    let emailExist: boolean;
    axios
      .post(APIs.actual.emailExistAPI, userCredentials)
      .then((res) => {
        emailExist = res.status === 200;
      })
      .then(() => {
        handleNext(emailExist);
      })
      .catch((err) => {
        console.log(err);
        emailExist = !(err.message === "Request failed with status code 404");
        handleNext(emailExist);
        // console.log(emailExist)
      });
  };

  const themeColor = useSelector((state: RootState) => state.theme.color);

  //   const FCMToken = useSelector(
  //     (state: RootState) => state.notification.FCMToken
  //   );

  const { t } = useTranslation();

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        data-testid="loginModal"
        disableEscapeKeyDown
        disablePortal
      >
        <Box style={modalStyle}>
          <div
            className="pop-up relative min-w-[350px] bg-white dark:bg-black md:rounded-2xl h-full"
            id="mahmoud_login_box"
          >
            <button
              className="relative top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
              onClick={handleCloseModal}
            >
              x
            </button>
            <img
              src={Logo}
              alt="Logo"
              className={`-mt-4 ${
                document.body.dir === "rtl" ? "mr-[45%]" : "ml-[45%]"
              } w-[40px]`}
            />
            {/* --------------------------------------First Login Page------------------------------------- */}
            <div
              id="firstPage"
              className="m-auto w-[300px] dark:text-white mt-12"
            >
              <h1 className="mb-4 mt-3 text-3xl font-bold">
                {t("login_welcome")}
              </h1>
              <button className={`${styles.coloredButton}`}>
                {t("signin_google")}
              </button>
              {/* <GoogleLoginButton
                  handleCloseModal={handleCloseModal}
                  message={"Sign in with Google"}
                /> */}
              <div className="flex h-10 items-center justify-center">
                <div className="flex w-full items-center">
                  <hr className="mr-2 w-full" />
                </div>
                &nbsp; {t("or")} &nbsp;
                <div className="flex w-full items-center">
                  <hr className="ml-2 w-full" />
                </div>
              </div>
              <TextField
                id="outlined-basic"
                label={t("login_email_placeholder")}
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                InputLabelProps={{
                  style: { color: "#40e5da", textAlign: "right" },
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

              <button
                type="button"
                id="next"
                className={`${styles.coloredButton}`}
                onClick={handleEmailCheck}
                disabled={userName === ""}
              >
                {t("next")}
              </button>
              <Link
                onClick={() => {
                  setLocation("/password_reset");
                  navigate("/password_reset");
                }}
                to={"/password_reset"}
              >
                <button
                  id="forgotPassword"
                  className={`${styles.normalButton}`}
                >
                  {t("forgot_password")}
                </button>
              </Link>
              <span className="my-5 text-sm text-gray-400">
                {t("no_account")}{" "}
                <Link to={"/Signup"} className={`text-primary text-sm`}>
                  {t("signup")}
                </Link>{" "}
              </span>
              <div className={`${emailExistError ? "" : "hidden"}`}>
                <Alert severity="error">{t("email_not_found")}</Alert>
              </div>
            </div>

            {/* --------------------------------------Second Login Page------------------------------------- */}
            <div
              id="secondPage"
              className="m-auto hidden  max-w-[400px] dark:text-white mt-12"
            >
              <h1 className="text-4xl mb-8">{t("login_welcome2")}</h1>
              <form
                action="/"
                method="post"
                className="flex flex-col gap-5"
                autoComplete="off"
                onSubmit={handleLoginEvent}
              >
                <TextField
                  id="outlined-basic"
                  label={t("login_email_placeholder")}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#40e5da" },
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
                <div className={`relative ${user?.error ? "-mb-4" : ""}`}>
                  <TextField
                    id="outlined-basic"
                    label={t("login_password_placeholder")}
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

                  <span
                    className={`toggle-password text-primary absolute ${
                      i18next.language === "en" || !password
                        ? "right-4"
                        : "left-4"
                    } top-4 cursor-pointer ${showPassword ? "active" : ""}`}
                    onClick={togglePasswordVisibility}
                  >
                    <VisibilityIcon />
                  </span>
                </div>
                <div className={`${loginError ? "" : "hidden"}`}>
                  <Alert
                    severity="error"
                    sx={styles.signupPasswordCheckStyleMiddle}
                  >
                    {user?.error}
                  </Alert>
                </div>
                {/* <Link
                  onClick={() => {
                    setLocation("/password_reset");
                  }}
                  to={"/password_reset"}
                  className={` text-xs ${"text-gray-400"}`}
                  data-testid="forgetPassword"
                >
                  {t("forgot_password")}
                </Link> */}
                <Link
                  onClick={() => {
                    setLocation("/password_reset");
                  }}
                  to={"/password_reset"}
                >
                  <button
                    id="forgotPassword"
                    className={`${styles.normalButton}`}
                  >
                    {t("forgot_password")}
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setLocation("/password_reset");
                  }}
                  type="submit"
                  id="forgotPassword"
                  className={`${styles.coloredButton}`}
                  disabled={password === ""}
                >
                  {user?.loading ? "Loading..." : t("signin")}
                </button>
              </form>
            </div>
            <div
              className={`text-white top-8 ${
                document.body.dir === "rtl" ? "left-5" : "right-5"
              } absolute cursor-pointer`}
              onClick={handleReturn}
            >
              <ArrowBackIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Login;

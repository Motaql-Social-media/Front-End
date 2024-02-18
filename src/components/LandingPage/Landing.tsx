import { useEffect } from "react";
import Login from "../Login/Login";
// import SignUp from "../Signup/SignUp";
// import GoogleLoginButton from "../General/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeState } from "../../store/ThemeSlice";

import Logo from "../../assets/images/mainLogo.png";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles/styles";
import SignUp from "../Signup/Signup";

const Landing = ({
  openLoginModal,
  handleOpenLoginModal,
  handleCloseLoginModal,
  openSignupModal,
  handleOpenSignupModal,
  handleCloseSignupModal,
  location,
  setLocation,
}: {
  openLoginModal: boolean;
  handleOpenLoginModal: any;
  handleCloseLoginModal: any;
  openSignupModal: boolean;
  handleOpenSignupModal: any;
  handleCloseSignupModal: any;
  location: any;
  setLocation: any;
}) => {
  type RootState = {
    theme: ThemeState;
  };
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  // Dark & Light mode
  //   const logoImgDark = require("../../assets/imgs/giga-chat-logo-dark-removebg-preview.png");

  //   const logoImgLight = require("../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    } else if (location !== "/password_reset") {
      navigate("/");
    }
  }, []);

  const { t } = useTranslation();
  return (
    <div className="landing flex flex-col lg:flex-row justify-center items-center h-full">
      <div className="w-[50%] flex justify-center items-center lg:pl-[10%] lg:pb-[10%]">
        <img
          src={Logo}
          alt="logo"
          className="lg:w-[60%] lg:h-[60%] w-26 h-20"
        />
      </div>
      <div className="lg:w-[40%] flex flex-col p-10 gap-10 lg:self-start lg:pt-16 items-start">
        <h1 className="dark:text-white text-6xl font-bold">
          {t("landing_welcom")}
        </h1>
        <h3 className="dark: text-white text-4xl font-bold">
          {t("landing_welcom2")}.
        </h3>
        <div className="flex gap-4 flex-col w-[80%]">
          <button className={`${styles.coloredButton}`}>
            {t("signin_google")}
          </button>
          <div className="flex justify-center items-center">
            <hr className="w-[40%] dark:text-white" />
            <p className="dark:text-white mx-2">{t("or")}</p>
            <hr className="dark:text-white w-[40%]" />
          </div>
          <button className={`${styles.coloredButton}`} onClick={handleOpenSignupModal}>{t("signup")}</button>
          <div className="dark:text-gray-400 text-xs">
            {t("landing_agreement")}{" "}
            <a className="text-primary" href="/">
              {t("landing_terms")}
            </a>{" "}
            {t("and")}{" "}
            <a className="text-primary" href="/">
              {t("landing_privacy")}
            </a>
            , {t("landing_include")}{" "}
            <a className="text-primary" href="/">
              {t("landing_cookie")}{" "}
            </a>
            .
          </div>
          <div className="mt-12">
            <div className="dark:text-white font-bold">
              {t("already_have_account")}
            </div>
          </div>
          <button
            className={`${styles.normalButton}`}
            onClick={handleOpenLoginModal}
          >
            {t("signin")}
          </button>
        </div>
      </div>
      <Login
        openModal={openLoginModal}
        handleCloseModal={handleCloseLoginModal}
        setLocation={setLocation}
      />
      <SignUp
        openModal={openSignupModal}
        handleCloseModal={handleCloseSignupModal}
        setLocation={setLocation}
      />
    </div>
  );
};

export default Landing;

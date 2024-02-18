import { useSelector } from "react-redux";
import { getColor } from "../../constants";
// import GoogleLoginButton from "../General/GoogleLoginButton";

import { Link } from "react-router-dom";

import React from "react";

import { styles } from "../../styles/styles";
import { ThemeState } from "../../store/ThemeSlice";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
const PreStep = ({
  handleCloseModal,
  setPosition,
  setLocation,
}: {
  handleCloseModal: any;
  setPosition: any;
  setLocation: (location: string) => void;
}) => {
  type RootState = {
    theme: ThemeState;
  };
  const themeColor = useSelector((state: RootState) => state.theme.color);

  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div id="Pre Step">
      <div className="m-auto w-[300px] dark:text-white ">
        <h1 className="mb-4 mt-3 text-3xl font-bold">Join The Line today</h1>
        {/* <GoogleLoginButton
          handleCloseModal={handleCloseModal}
          message={"Sign in with Google"}
        /> */}
        <button className={`${styles.coloredButton}`}>
          {t("signin_google")}
        </button>
        <div className="flex h-10 items-center justify-center">
          <div className="flex w-full items-center">
            <hr className="mr-2 w-full" />
          </div>
          &nbsp; or &nbsp;
          <div className="flex w-full items-center">
            <hr className="ml-2 w-full" />
          </div>
        </div>
        <button
          className={`${styles.coloredButton}`}
          onClick={() => {
            setPosition((prev: number) => prev + 1);
          }}
        >
          {t("signup")}
        </button>

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
        <span className="my-5 text-sm text-gray-400">
          {t("no_account")}{" "}
          <Link
            onClick={() => {
              setLocation("/login");
              navigate("/login");
            }}
            to={"/login"}
            className={`text-primary text-sm`}
          >
            {t("signin")}
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default PreStep;

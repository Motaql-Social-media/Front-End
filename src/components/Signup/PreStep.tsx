import { useSelector } from "react-redux"
import { getColor } from "../../constants"
import { useEffect, useRef } from "react"

// import GoogleLoginButton from "../General/GoogleLoginButton";

import { Link } from "react-router-dom"

import React from "react"

import { styles } from "../../styles/styles"
import { ThemeState } from "../../store/ThemeSlice"
import { useTranslation } from "react-i18next"

import { useNavigate } from "react-router-dom"
const PreStep = ({ handleCloseModal, setPosition, position, setLocation }: { handleCloseModal: any; setPosition: any; position: number; setLocation: (location: string) => void }) => {
  type RootState = {
    theme: ThemeState
  }
  const themeColor = useSelector((state: RootState) => state.theme.color)

  const { t } = useTranslation()

  const navigate = useNavigate()

  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButton.current?.removeAttribute("disabled")
  }, [position])

  return (
    <div id="Pre Step">
      <div className="m-auto w-[300px] dark:text-white ">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome")}</h1>
        {/* <GoogleLoginButton
          handleCloseModal={handleCloseModal}
          message={"Sign in with Google"}
        /> */}
        <button className={`${styles.coloredButton}`}>{t("signin_google")}</button>
        <div className="flex h-10 items-center justify-center">
          <div className="flex w-full items-center">
            <hr className="mr-2 w-full" />
          </div>
          <div className="flex h-10 items-center justify-center">
            <div className="flex w-full items-center">
              <hr className="mr-2 w-full" />
            </div>
            &nbsp; {t("or")} &nbsp;
            <div className="flex w-full items-center">
              <hr className="ml-2 w-full" />
            </div>
          </div>{" "}
          <div className="flex w-full items-center">
            <hr className="ml-2 w-full" />
          </div>
        </div>
        <button
          className={`${styles.coloredButton}`}
          ref={nextButton}
          onClick={() => {
            nextButton.current?.setAttribute("disabled", "true")
            setPosition((prev: number) => prev + 1)
          }}
        >
          {t("signup")}
        </button>

        <div className="text-xs dark:text-gray-400">
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
          <div className="font-bold dark:text-white">{t("already_have_account")}</div>
        </div>
        <span className="my-5 text-sm text-gray-400">
          {t("no_account")}{" "}
          <Link
            onClick={() => {
              setLocation("/login")
              navigate("/login")
            }}
            to={"/login"}
            className={`text-sm text-primary`}
          >
            {t("signin")}
          </Link>{" "}
        </span>
      </div>
    </div>
  )
}

export default PreStep

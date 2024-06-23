import { useEffect, useRef } from "react"

// import GoogleLoginButton from "../General/GoogleLoginButton";

import { Link } from "react-router-dom"

import React from "react"

import { styles } from "../../styles/styles"
import { useTranslation } from "react-i18next"

import { useNavigate } from "react-router-dom"
import GoogleButton from "../General/GoogleButton"
const PreStep = ({ handleCloseModal, setPosition, position, setLocation }: { handleCloseModal: any; setPosition: any; position: number; setLocation: (location: string) => void }) => {
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
        <GoogleButton />
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
          <a className="text-primary" href="/terms_of_services" target="_blank" rel="noopener noreferrer">
            {t("landing_terms")}
          </a>{" "}
          {t("and")}{" "}
          <a className="text-primary" href="/privacy_policy" target="_blank" rel="noopener noreferrer">
            {t("landing_privacy")}
          </a>
          , {t("landing_include")}{" "}
          <a className="text-primary" href={`${process.env.REACT_APP_SOCKET_URL || ""}/privacy_policy#:~:text=%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA%20%D9%85%D9%86%20%D9%85%D9%84%D9%81%D8%A7%D8%AA%20%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%20%D8%A7%D9%84%D8%A7%D8%B1%D8%AA%D8%A8%D8%A7%D8%B7%20%D9%88%D8%AA%D9%82%D9%86%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%82%D8%A8%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%A8%D9%87%D8%A9`} target="_blank" rel="noopener noreferrer">
            {t("landing_cookie")}
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

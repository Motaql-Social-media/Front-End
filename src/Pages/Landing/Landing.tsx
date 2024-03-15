import { useEffect } from "react"
import Login from "../Login/Login"
// import GoogleLoginButton from "../General/GoogleLoginButton";
import { useNavigate } from "react-router-dom"
import { ThemeState } from "../../store/ThemeSlice"

import Logo from "../../assets/images/mainLogo.svg"
import { useTranslation } from "react-i18next"
import { styles } from "../../styles/styles"
import SignUp from "../Signup/Signup"
import GoogleButton from "../../components/General/GoogleButton"

const Landing = ({ openLoginModal, handleOpenLoginModal, handleCloseLoginModal, openSignupModal, handleOpenSignupModal, handleCloseSignupModal, location, setLocation }: { openLoginModal: boolean; handleOpenLoginModal: any; handleCloseLoginModal: any; openSignupModal: boolean; handleOpenSignupModal: any; handleCloseSignupModal: any; location: any; setLocation: any }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/home")
    } else if (location !== "/password_reset") {
      // navigate("/");
    }
  }, [])

  const { t } = useTranslation()
  return (
    <div className="landing mx-auto mt-16 flex h-[100vh] flex-col items-center sm:mt-0 sm:justify-center lg:flex-row ">
      <div className="flex w-[50%] items-center justify-center lg:pb-[10%] lg:pl-[10%]">
        <img src={Logo} alt="logo" className="w-26 h-20 lg:h-[60%] lg:w-[60%]" />
      </div>
      <div className="flex flex-col  items-start gap-8 p-10 lg:w-[40%] lg:self-start  lg:pt-16">
        <h1 className="text-2xl font-bold  dark:text-white min-[575px]:text-3xl md:text-4xl lg:text-5xl">{t("landing_welcom")}</h1>
        <h3 className="min-[575px]:text-md text-sm font-bold dark:text-white md:text-lg lg:text-xl">{t("landing_welcom2")}.</h3>
        <div className="flex w-[80%] max-w-[400px] flex-col gap-[10%] self-center">
          <GoogleButton />
          <div className="flex items-center justify-center">
            <hr className="w-[40%] dark:text-white" />
            <p className="mx-2 dark:text-white">{t("or")}</p>
            <hr className="w-[40%] dark:text-white" />
          </div>
          <button className={`${styles.coloredButton}`} onClick={handleOpenSignupModal}>
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
          <button className={`${styles.normalButton}`} onClick={handleOpenLoginModal}>
            {t("signin")}
          </button>
        </div>
      </div>
      <Login openModal={openLoginModal} handleCloseModal={handleCloseLoginModal} setLocation={setLocation} />
      <SignUp openModal={openSignupModal} handleCloseModal={handleCloseSignupModal} setLocation={setLocation} />
    </div>
  )
}

export default Landing

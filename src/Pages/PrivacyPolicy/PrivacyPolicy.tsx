import Logo from "../../assets/images/mainLogo.svg"
import { styles } from "../../styles/styles"
import cover from "../../assets/images/cover.jpg"
import i18next, { t } from "i18next"

const PrivacyPolicy = () => {
  return (
    <div className="w-full overflow-y-scroll">
      <div className="sticky left-0 top-0 z-[99] flex w-full items-center justify-around bg-black px-5 py-2">
        <div className="flex items-center justify-between gap-4">
          <img src={Logo} alt="logo" className="h-12 w-12 " />
          <div className="text-3xl font-bold">{t("privacy_policy")}</div>
        </div>
        <div>
          <button className={`${styles.coloredButton} !px-4`}>{t("download_pdf")}</button>
        </div>
      </div>
      <img src={cover} alt="cover" className="w-full" />
      <div className="mb-5 flex h-14 w-full items-center justify-center bg-primary text-2xl font-bold text-black">{t("last_updated")}</div>
      <div className="max-w-[75%]">
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("introduction")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("privacy_policy_text1")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("privacy_policy_text2")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("privacy_policy_text3")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("privacy_policy_text4")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("privacy_policy_text5")}</div>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("information_from_users")}</div>
          <ul className={`list-disc ${i18next.language === "en" ? "pl-12" : "pr-12"}`}>
            <li className="my-2 text-gray-400">{t("information_from_users_text1")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text2")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text3")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text4")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text5")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text6")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text7")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text8")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text9")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text10")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text11")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text12")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text13")}</li>
            <li className="my-2 text-gray-400">{t("information_from_users_text14")}</li>
            {i18next.language === "en" && <li className="my-2 text-gray-400">{t("information_from_users_text15")}</li>}
          </ul>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("information_from_cookies")}</div>
          <div className="mb-4 text-4xl font-bold">{t("information_from_cookies_text1")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("information_from_cookies_text11")}</div>
          <div className="mb-4 text-4xl font-bold">{t("information_from_cookies_text2")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("information_from_cookies_text21")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("information_from_cookies_text22")}</div>
          <ul className={`list-disc ${i18next.language === "en" ? "pl-12" : "pr-12"}`}>
            <li className="my-2 text-gray-400">{t("information_from_cookies_text3")}</li>
            <li className="my-2 text-gray-400">{t("information_from_cookies_text4")}</li>
            <li className="my-2 text-gray-400">{t("information_from_cookies_text5")}</li>
            <li className="my-2 text-gray-400">{t("information_from_cookies_text6")}</li>
            <li className="my-2 text-gray-400">{t("information_from_cookies_text7")}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("share_with_third_party")}</div>
          <ul className={`list-disc ${i18next.language === "en" ? "pl-12" : "pr-12"}`}>
            <li className="my-2 text-gray-400">{t("share_with_third_party_text1")}</li>
            <li className="my-2 text-gray-400">{t("share_with_third_party_text2")}</li>
            <li className="my-2 text-gray-400">{t("share_with_third_party_text3")}</li>
            <li className="my-2 text-gray-400">{t("share_with_third_party_text4")}</li>
            <li className="my-2 text-gray-400">{t("share_with_third_party_text5")}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("what_do_we_do_with_your_personal_information")}</div>
          <ul className={`list-disc ${i18next.language === "en" ? "pl-12" : "pr-12"}`}>
            <li className="my-2 text-gray-400">{t("what_do_we_do_with_your_personal_information_text1")}</li>
            <li className="my-2 text-gray-400">{t("what_do_we_do_with_your_personal_information_text2")}</li>
            <li className="my-2 text-gray-400">{t("what_do_we_do_with_your_personal_information_text3")}</li>
            <li className="my-2 text-gray-400">{t("what_do_we_do_with_your_personal_information_text4")}</li>
            <li className="my-2 text-gray-400">{t("what_do_we_do_with_your_personal_information_text5")}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("protect_information")}</div>

          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("protect_information_text")}</div>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-6xl font-bold text-primary">{t("control_over_your_information")}</div>

          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} my-2 text-gray-400`}>{t("control_over_your_information_text")}</div>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 z-[99] flex h-12 w-full items-center justify-center gap-2 bg-primary text-xl font-bold text-black">
        {t("send_email_privacy")}
        <a href="mailto:contact@theline.social" className="underline">
          contact@theline.social
        </a>
      </div>
    </div>
  )
}

export default PrivacyPolicy

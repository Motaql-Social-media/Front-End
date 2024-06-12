import Logo from "../../assets/images/mainLogo.svg"
import { styles } from "../../styles/styles"
import cover from "../../assets/images/cover.jpg"
import i18next, { t } from "i18next"

const TermsOfService = () => {
  const getProcessedDescription = (description: string) => {
    console.log(description?.replace(/(?:\r\n|\r|\n)/g, " <br> "))
    return description?.replace(/(?:\r\n|\r|\n)/g, " <br> ")
  }

  return (
    <div className="relative w-full overflow-y-scroll">
      <div className={`sticky left-0 top-0 z-[99] flex w-full items-center justify-start bg-black px-5 py-2 ${i18next.language === "en" ? "pl-32" : "pr-32"}`}>
        <div className="flex items-center justify-between gap-4">
          <img src={Logo} alt="logo" className="h-12 w-12 " />
          <div className="text-2xl font-bold xs:text-3xl">{t("terms_of_service")}</div>
        </div>
      </div>
      <img src={cover} alt="cover" className="w-full" />
      <div className="mb-5 flex h-14 w-full items-center justify-center bg-primary text-xl font-bold text-black xxs:text-2xl">{t("last_updated")}</div>
      <div className="md:w-[75%]">
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-5xl font-bold text-primary xxs:text-6xl">{t("introduction")}</div>
          <div className="leading-7 text-gray-400">
            {getProcessedDescription(t("introduction_text"))
              .split(" ")
              .map((word: string) => (word === "<br>" ? <br /> : ` ${word} `))}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-5xl font-bold text-primary xxs:text-6xl">{t("terms_and_definations")}</div>
          <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} `}>
            <div className="mb-4 text-3xl font-bold xxs:text-4xl">{t("terms")}</div>
            <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("terms_text")}</div>
            <div className="mb-4 mt-4  text-3xl font-bold xxs:text-4xl">{t("definitions")}</div>
            <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} `}>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("definitions_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("you_your")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("you_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("we")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("we_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("administrator")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("administrator_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("policies")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("policies_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("procedures")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("procedures_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("chat")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("chat_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("precautions")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("precautions_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("enterprise")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("enterprise_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("system")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("system_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("law")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("law_text")}</div>

              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("user_information")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("user_information_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("users")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("users_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("website")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("website_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("content_and_interactive_areas")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("content_and_interactive_areas_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("automated_processing")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("automated_processing_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("third_party")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("third_party_text")}</div>
              <div className="my-2 text-xl font-bold xxs:text-2xl">{t("terms_of_use")}</div>
              <div className={`${i18next.language === "en" ? "pl-8" : "pr-8"} text-gray-400`}>{t("terms_of_use_text")}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-5xl font-bold text-primary xxs:text-6xl">{t("general_terms")}</div>
          <ul className={`list-disc ${i18next.language === "en" ? "pl-12" : "pr-12"}`}>
            <li className="my-2 text-gray-400">{t("general_item1")}</li>
            <li className="my-2 text-gray-400">{t("general_item2")}</li>
            <li className="my-2 text-gray-400">{t("general_item3")}</li>
            <li className="my-2 text-gray-400">{t("general_item4")}</li>
            <li className="my-2 text-gray-400">{t("general_item5")}</li>
            <li className="my-2 text-gray-400">{t("general_item6")}</li>
            <li className="my-2 text-gray-400">{t("general_item7")}</li>
            <li className="my-2 text-gray-400">{t("general_item8")}</li>
            <li className="my-2 text-gray-400">{t("general_item9")}</li>
            <li className="my-2 text-gray-400">{t("general_item10")}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 p-5 ">
          <div className="mb-9 text-5xl font-bold text-primary xxs:text-6xl">{t("electronic_terms")}</div>
          <ul className={`list-disc ${i18next.language === "en" ? "pl-12" : "pr-12"}`}>
            <li className="my-2 text-gray-400">{t("electronic_item1")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item2")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item3")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item4")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item5")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item6")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item7")}</li>
            <li className="my-2 text-gray-400">{t("electronic_item8")}</li>
          </ul>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 z-[99] flex h-12 w-full items-center justify-center gap-2 bg-primary text-xs font-bold text-black md:text-xl">
        {t("send_email")}
        <a href="mailto:contact@thelinechat.com" className="underline">
          contact@thelinechat.com
        </a>
      </div>
    </div>
  )
}

export default TermsOfService

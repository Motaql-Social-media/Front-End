import { MuiPhone } from "./CustomPhoneInput";

import { PhoneNumberUtil } from "google-libphonenumber";

import { styles } from "../../styles/styles";

import { useTranslation } from "react-i18next";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const SecondStep = ({
  setPosition,
  phoneNumber,
  setPhoneNumber,
}: {
  setPosition: any;
  phoneNumber: string;
  setPhoneNumber: any;
}) => {
  const { t } = useTranslation();
  return (
    <div id="Second Step" className=" m-auto w-[350px] dark:text-white hidden">
      <div className="max-w[600px] !h-fit">
        <h1 className="mb-4 mt-3 text-3xl font-bold">{t("signup_welcome3")}</h1>
        <div style={{ zIndex: 3 }}>
          <MuiPhone value={phoneNumber} onChange={setPhoneNumber} />
          {!isPhoneValid(phoneNumber) && phoneNumber.length > 0 && (
            <div className="text-red-600">{t("valid_phone")}</div>
          )}
        </div>
        <button
          type="button"
          id="next"
          className={`${styles.coloredButton}`}
          onClick={() => {
            setPosition((prev: number) => prev + 1);
          }}
          disabled={!isPhoneValid(phoneNumber)}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default SecondStep;

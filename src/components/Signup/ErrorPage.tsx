import React from "react";

import { styles } from "../../styles/styles";

const ErrorPage = ({
  setDay,
  setMonth,
  setYear,
  setNickName,
  setEmail,
  handleCloseModal,
}: {
  setDay: (day: string) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  setNickName: (nickname: string) => void;
  setEmail: (email: string) => void;
  handleCloseModal: () => void;
}) => {
  const handleCloseBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page");
    const FirstStep = document.getElementById("First Step");

    if (ErrorPage) {
      ErrorPage.style.display = "none";
    }
    if (FirstStep) {
      FirstStep.style.display = "block";
    }

    setDay("");
    setMonth("");
    setYear("");
    setNickName("");
    setEmail("");

    handleCloseModal();
  };
  return (
    <div
      id="Error Page"
      className="m-auto w-[300px] dark:text-white hidden h-full"
    >
      <div className="!h-fit  mt-[50%]">
        <div className="text-xl font-semibold">
          Can't complete your signup right now.
        </div>
        <button
          type="button"
          id="next"
          className={`${styles.normalButton} mt-12`}
          onClick={handleCloseBirthdateError}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

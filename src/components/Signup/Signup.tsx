import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";

import { Modal, Box } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/UserSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import UploadProfilePicture from "./UploadProfilePicture";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

import Logo from "../../assets/images/mainLogo.svg";

import { EMAIL_REGEX } from "../../constants/index";
import ForthStep from "./ForthStep";
import FifthStep from "./FifthStep";
import TagStep from "./TagStep";
import ErrorPage from "./ErrorPage";
import PreStep from "./PreStep";
import SixthStep from "./SixthStep";

import { ThemeState } from "../../store/ThemeSlice.js";

import CustomizedStepper from "./CustomizedStepper";

import i18next from "i18next";

const SignUp = ({
  openModal,
  handleCloseModal,
  setLocation,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
  setLocation: (location: string) => void;
  month?: string;
  setMonth?: (value: string) => void;
  day?: string;
  setDay?: (value: string) => void;
  year?: string;
  setYear?: (value: string) => void;
  yearwidth?: string;
  monthwidth?: string;
}) => {
  type RootState = {
    theme: ThemeState;
  };
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState<any>();
  const [userTag, setUserTag] = useState<any>("");
  const [originalUsername, setOriginalUsername] = useState("");

  const [password, setPassword] = useState("");

  const [emailExistError, setEmailExistError] = useState(false);
  const [openBirthdateErrorModal, setOpenBirthdateErrorModal] = useState(false);

  const [position, setPosition] = useState(0);

  const mock = false;

  function nextShow() {
    const PreStep = document.getElementById("Pre Step");
    const FirstStep = document.getElementById("First Step");
    const SecondStep = document.getElementById("Second Step");
    const ThirdStep = document.getElementById("Third Step");
    const ForthStep = document.getElementById("Forth Step");
    const FifthStep = document.getElementById("Fifth Step");
    const SixthStep = document.getElementById("Sixth Step");
    const TagStep = document.getElementById("Tag Step");
    const PictureStep = document.getElementById("Picture Step");

    if (PreStep) PreStep.style.display = "none";
    if (FirstStep) FirstStep.style.display = "none";
    if (SecondStep) SecondStep.style.display = "none";
    if (ThirdStep) ThirdStep.style.display = "none";
    if (ForthStep) ForthStep.style.display = "none";
    if (FifthStep) FifthStep.style.display = "none";
    if (SixthStep) SixthStep.style.display = "none";
    if (TagStep) TagStep.style.display = "none";
    if (PictureStep) PictureStep.style.display = "none";

    // console.log("D", position);

    switch (position) {
      case 0:
        if (PreStep) PreStep.style.display = "block";
        break;
      case 1:
        if (FirstStep) FirstStep.style.display = "block";
        break;
      case 2:
        if (SecondStep) SecondStep.style.display = "block";
        break;
      case 3:
        if (ThirdStep) ThirdStep.style.display = "block";
        break;
      case 4:
        if (ForthStep) ForthStep.style.display = "block";
        break;
      //   case -1:
      //     if (FirstStep) FirstStep.style.display = "block";
      // break;
      case 5:
        if (FifthStep) FifthStep.style.display = "block";
        break;
      case 6:
        if (SixthStep) SixthStep.style.display = "block";
        break;
      case 7:
        if (TagStep) TagStep.style.display = "block";
        break;
      case 8:
        if (PictureStep) PictureStep.style.display = "block";
        break;
      default:
        break;
    }
  }

  useEffect(nextShow, [position]);

  function validEmail(emeil: string) {
    return EMAIL_REGEX.test(emeil);
  }

  const handleCloseBirthdateErrorModal = () =>
    setOpenBirthdateErrorModal(false);

  const handleOpenBirthdateErrorModal = () => setOpenBirthdateErrorModal(true);

  const handleOpenBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page");
    const ThirdStep = document.getElementById("Third Step");

    if (ThirdStep) ThirdStep.style.display = "none";
    if (ErrorPage) ErrorPage.style.display = "block";

    handleOpenBirthdateErrorModal();
  };

  const handleCompleteSignup = (user: any) => {
    handleCloseModal();

    // let userCredentials = {
    //   email: email,
    //   password: password,
    // }
    dispatch(signupUser({ user: user, token: userToken, navigate }));
    // navigate("/home");

    // dispatch(loginUser({ userCredentials, isgoogle: null })).then((result) => {
    //   // console.log(result)
    //   if (result.payload) {
    //     setEmail("")
    //     setPassword("")
    //     handleCloseModal()
    //     navigate("/home")
    //   }
    // })
  };

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

  useEffect(() => {
    setPosition(0);
    if (!openModal) {
      const PreStep = document.getElementById("Pre Step");
      const FirstStep = document.getElementById("First Step");
      const SecondStep = document.getElementById("Second Step");
      const ThirdStep = document.getElementById("Third Step");
      const ForthStep = document.getElementById("Forth Step");
      const FifthStep = document.getElementById("Fifth Step");
      const TagStep = document.getElementById("Tag Step");
      const PictureStep = document.getElementById("Picture Step");

      if (PreStep) PreStep.style.display = "none";
      if (FirstStep) FirstStep.style.display = "none";
      if (SecondStep) SecondStep.style.display = "none";
      if (ThirdStep) ThirdStep.style.display = "none";
      if (ForthStep) ForthStep.style.display = "none";
      if (FifthStep) FifthStep.style.display = "none";
      if (TagStep) TagStep.style.display = "none";
      if (PictureStep) PictureStep.style.display = "none";
    }
  }, [openModal]);

  if (windowWidth < 700) {
    modalStyle.width = "100vw";
    modalStyle.height = "100vh";
    modalStyle.maxWidth = "none";
  } else {
    modalStyle.width = "601.6px";
    modalStyle.height = "651.6px";
    modalStyle.top = "50%";
    modalStyle.left = "50%";
    modalStyle.transform = "translate(-50%, -50%)";
    modalStyle.maxWidth = "none";
  }
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        disableEscapeKeyDown
        disablePortal
      >
        <Box style={modalStyle}>
          <div className="relative min-w-[350px] bg-white dark:bg-black md:rounded-2xl h-full">
            <button
              className="relative  top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
              onClick={() => {
                setLocation("/");
                navigate("/");
                handleCloseModal();
              }}
            >
              x
            </button>
            <img
              src={Logo}
              alt="Logo"
              className={`-mt-4 ${
                i18next.language === "ar" ? "mr-[45%]" : "ml-[45%]"
              } w-[40px]`}
            />
            <div dir="ltr">
              <CustomizedStepper step={position} />
            </div>
            <PreStep
              handleCloseModal={handleCloseModal}
              setPosition={setPosition}
              setLocation={setLocation}
              position={position}
            />
            <FirstStep
              nickName={nickName}
              setNickName={setNickName}
              speciality={speciality}
              setSpeciality={setSpeciality}
              month={month}
              setMonth={setMonth}
              day={day}
              setDay={setDay}
              year={year}
              setYear={setYear}
              setPosition={setPosition}
position={position}            />
            <SecondStep
              nickName={nickName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setPosition={setPosition}
              position={position}
            />
            <ThirdStep
              nickName={nickName}
              phoneNumber={phoneNumber}
              setPosition={setPosition}
              position={position}
            />

            <ForthStep
              nickName={nickName}
              email={email}
              setEmail={setEmail}
              emailExistError={emailExistError}
              setEmailExistError={setEmailExistError}
              validEmail={validEmail}
              setPosition={setPosition}
              position={position}
            />
            <FifthStep
              nickName={nickName}
              email={email}
              setPosition={setPosition}
              position={position}
            />

            <SixthStep
              nickName={nickName}
              email={email}
              phoneNumber={phoneNumber}
              speciality={speciality}
              month={month}
              day={day}
              year={year}
              password={password}
              setPassword={setPassword}
              setUserToken={setUserToken}
              setUser={setUser}
              setOriginalUsername={setOriginalUsername}
              setPosition={setPosition}
              position={position}
            />

            
            <TagStep
              // mock={mock}
              userTag={userTag}
              setUserTag={setUserTag}
              originalUsername={originalUsername}
              userToken={userToken}
              user={user}
              setUser={setUser}
              setPosition={setPosition}
              position={position}
            />
            <UploadProfilePicture
              userR={user}
              setUser={setUser}
              userToken={userToken}
              handleCompleteSignup={handleCompleteSignup}
              handleCloseModal={handleCloseModal}
            />
            <ErrorPage
              setDay={setDay}
              setMonth={setMonth}
              setYear={setYear}
              setNickName={setNickName}
              setEmail={setEmail}
              handleCloseModal={handleCloseModal}
            />
          </div>
          <div
            className={`text-white top-8 ${
              document.body.dir === "rtl" ? "left-5" : "right-5"
            } absolute cursor-pointer ${
              (position === 0 || position === 7 || position === 8) && `hidden`
            }`}
            onClick={() => {
              if (position > 0) setPosition((prev) => prev - 1);
            }}
          >
            <ArrowBackIcon />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SignUp;

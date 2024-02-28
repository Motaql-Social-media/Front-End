import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

import { useEffect, useRef, useState } from "react";

import defaultProfilePic from "../../assets/images/Default_Profile_Picture.png";

import axios from "axios";

import { changeProfilePicture } from "../../store/UserSlice";

import { styles } from "../../styles/styles";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import React from "react";

import Crop from "../General/Crop/Crop";

import { useTranslation } from "react-i18next";

import "../../styles/signup.css";


const UploadProfilePicture = ({
  userR,
  setUser,
  userToken,
  handleCompleteSignup,
  handleCloseModal,
}: {
  userR: any;
  setUser: (user: any) => void;
  userToken: string;
  handleCompleteSignup: (user: any) => void;
  handleCloseModal: () => void;
}) => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const user = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();

  const hiddenFileInput = useRef(null);
  const skipForNowButton = useRef(null);
  const completeSignupButton = useRef(null);

  const [profilePic, setProfilePic] = useState(
    user ? user.profileImage : defaultProfilePic
  );
  const [profilePicURL, setProfilePicURL] = useState(
    user ? user.profileImage : defaultProfilePic
  );

  const [openCrop, setOpenCrop] = useState(false);

  // const [mediaUrls, setMediaUrls] = useState([])

  const handlePictureClick = (event: any) => {
    if (hiddenFileInput.current !== null)
      (hiddenFileInput.current as HTMLElement).click();
  };

  const handlePictureChange = (event: any) => {
    const fileUploaded = event.target.files[0];

    setProfilePic(fileUploaded);
    setProfilePicURL(URL.createObjectURL(fileUploaded));

    setOpenCrop(true);

    if (skipForNowButton.current !== null)
      (skipForNowButton.current as HTMLElement).style.display = "none";
    if (completeSignupButton.current !== null)
      (completeSignupButton.current as HTMLElement).style.display = "block";
  };

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleAssignProfilePicture = () => {
    // handleCompleteSignup(userR);

    const mediaFormData = new FormData();
    mediaFormData.append("image_profile", profilePic);

    API.post("users/current/upload-photo-profile", mediaFormData, {
      headers: {
        authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        dispatch(
          changeProfilePicture({
            user: { ...userR, imageUrl: res.data.data.imageUrl },
            token: userToken,
          })
        );
        setUser({ ...userR, imageUrl: res.data.data.imageUrl });
        // console.log({ ...userR, imageUrl: res.data.data.imageUrl })
        // handleCompleteSignup({ ...userR, imageUrl: res.data.data.imageUrl });
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(fromSwitch)
    // if (fromSwitch === false) {
    //   axios
    //     .post(APIs.actual.loginAPI, { query: email, password: password })
    //     .then((res) => {
    //       console.log(res);
    //       tmpuser = res.data.data.user;
    //       token = res.data.token;
    //       return axios.post(APIs.actual.uploadMedia, mediaFormData, {
    //         headers: {
    //           authorization: "Bearer " + res.data.token,
    //         },
    //       });
    //     })
    //     .then((res) => {
    //       console.log(res.data.data.usls[0]);
    //       // console.log(userToken)
    //       newuser = {
    //         ...tmpuser,
    //         profileImage: res.data.data.usls[0],
    //       };
    //       console.log(newuser);

    //       return axios.patch(
    //         APIs.actual.changeProfilePicture,
    //         { profile_image: res.data.data.usls[0] },
    //         {
    //           headers: {
    //             authorization: "Bearer " + token,
    //           },
    //         }
    //       );
    //     })
    //     .then((res) => {
    //       console.log("Profile picture changed successfully");

    //       handleCompleteSignup(newuser);
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    // axios
    //   .post(APIs.actual.uploadMedia, mediaFormData, {
    //     headers: {
    //       authorization: "Bearer " + userToken,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res.data.data.usls[0])
    //     // console.log(userToken)
    //     newuser = {
    //       ...user,
    //       // picture: profilePicURL,
    //       profileImage: res.data.data.usls[0],
    //     };
    //     // console.log(newuser)
    //     return axios.patch(
    //       APIs.actual.changeProfilePicture,
    //       { profile_image: res.data.data.usls[0] },
    //       {
    //         headers: {
    //           authorization: "Bearer " + userToken,
    //         },
    //       }
    //     );
    //   })
    //   .then((res) => {
    //     console.log("Profile picture changed successfully");
    //     setUser(newuser);
    //     // console.log(res)
    //     setTimeout(() => {
    //       dispatch(changeProfilePicture({ user: newuser, token: userToken }));
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // }
  };

  const { t } = useTranslation();

  return (
    <div
      id="Picture Step"
      className={`hidden ${openCrop ? "" : "m-auto -mt-10 w-[320px]"} `}
    >
      <div className={`!h-fit ${openCrop ? "!hidden" : ""}`}>
        <h1 className="mb-4 mt-12 text-3xl font-bold">
          {t("signup_welcome10")}
        </h1>

        <p className="text-gray-500 mb-4">{t("signup_welcome11")}</p>
        <div className="relative m-auto w-fit rounded-full border-2 border-black dark:border-white">
          <div className="w-fit rounded-full border border-white dark:border-black">
            <img
              src={profilePicURL ? profilePicURL : defaultProfilePic}
              alt="profile"
              className="h-[200px] w-[200px] rounded-full"
            />
          </div>
          <button
            className="absolute left-[50%] top-[50%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gray-500 bg-opacity-50 hover:bg-gray-600 hover:bg-opacity-50 dark:bg-secondary dark:hover:bg-darkHover"
            onClick={handlePictureClick}
          >
            <AddAPhotoOutlinedIcon
              className={`-ml-[3px] -mt-[5px] ${
                darkMode ? "text-white" : "text-black"
              }`}
            />
            <input
              type="file"
              accept=""
              onChange={handlePictureChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
        </div>

        <button
          type="button"
          ref={skipForNowButton}
          className={`${styles.coloredButton}`}
          onClick={() => {
            // console.log(userR);
            handleAssignProfilePicture();
            handleCloseModal();
          }}
          //   disabled={!userTag || usernameError}
        >
          {t("skip_message")}
        </button>

        {/* <button
          className="btn mt-3 bg-black dark:bg-white"
          onClick={() => {}}
        ></button> */}
        <button
          type="button"
          className={`${styles.coloredButton} hidden`}
          ref={completeSignupButton}
          onClick={() => {
            // console.log({ email, password })
            handleAssignProfilePicture();
            handleCloseModal();
          }}
        >
          {t("confirm")}
        </button>
      </div>
      <div className={`${openCrop ? "!block" : "!hidden"}  !mt-0`}>
        <Crop
          photoURL={profilePicURL}
          setOpenCrop={setOpenCrop}
          setPhotoURL={setProfilePicURL}
          setFile={setProfilePic}
          aspect={1}
          originalPhoto={user ? user.profileImage : defaultProfilePic}
        />
      </div>
    </div>
  );
};

export default UploadProfilePicture;

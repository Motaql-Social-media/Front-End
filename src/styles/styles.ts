// This will be for custom repeated styles

const styles = {
  normalColors:
    "bg-white dark:bg-black text-black dark:text-white hover:bg-lightHover dark:hover:bg-darkHover",
  invertedColors:
    "bg-black dark:bg-white text-white dark:text-black hover:bg-darkHover dark:hover:bg-lightHover",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",

  heroHeadText:
    "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

  sectionHeadText:
    "text-[#5db1cd] font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-[#2e7992] uppercase tracking-wider",
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    width: 601.6,
    height: 651.6,
    backgroundColor: "transperant",
    backdropFilter: "blur(5px)",
    border: "1px solid #767C86",
    borderRadius: "16px",
  },
  signupPasswordCheckStyleBottom: {
    ".MuiAlert-message": {
      fontSize: 12,
      padding: 0,
    },
    ".MuiAlert-icon": {
      fontSize: 15,
      paddingRight: 0,
    },
    height: "30px",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  signupPasswordCheckStyleTop: {
    ".MuiAlert-message": {
      fontSize: 12,
      padding: 0,
    },
    ".MuiAlert-icon": {
      fontSize: 15,
      paddingRight: 0,
    },
    height: "30px",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  signupPasswordCheckStyleMiddle: {
    ".MuiAlert-message": {
      fontSize: 12,
      padding: 0,
    },
    ".MuiAlert-icon": {
      fontSize: 15,
      paddingRight: 0,
    },
    height: "30px",
    borderRadius: 0,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  coloredButton:
    "text-black font-semibold w-full bg-primary rounded-full h-12 my-2 disabled:bg-opacity-30 ",
  normalButton:
    "text-primary border font-semibold w-full dark:bg-black rounded-full h-12 my-2",
};

export { styles };

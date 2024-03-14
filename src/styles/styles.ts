// This will be for custom repeated styles

const styles = {
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
  coloredButton: "text-black font-semibold w-full bg-primary rounded-full h-12 my-2 disabled:bg-opacity-30 hover:bg-primaryHover",
  normalButton: "text-primary border font-semibold w-full dark:bg-black rounded-full h-12 my-2",
}

export { styles }

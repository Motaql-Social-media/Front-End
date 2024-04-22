import React, { useEffect } from "react"
import SubpageNavbar from "../../components/General/SubpageNavbar"
import Modal from "@mui/material/Modal"
import Crop from "../../components/General/Crop/Crop"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import { t } from "i18next"
import TextField from "@mui/material/TextField"
import { styles } from "../../styles/styles"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import axios from "axios"
import { useSelector } from "react-redux"

function AddEmployee() {
  const addEmployeeRef = React.useRef<HTMLDivElement>(null)

  const [employeeName, setEmployeeName] = React.useState<string>("")
  const [employeePhoneNumber, setEmployeePhoneNumber] = React.useState<string>("")
  const [employeeEmail, setEmployeeEmail] = React.useState<string>("")
  const [employeePassword, setEmployeePassword] = React.useState<string>("")
  const [employeeState, setEmployeeState] = React.useState<string>("activated")
  const [employeeType, setEmployeeType] = React.useState<string>("EMPLOYEE")

  const hiddenImageInput = React.useRef(null)

  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const [profilePic, setProfilePic] = React.useState<any>("")
  const [profilePicURL, setProfilePicURL] = React.useState("")

  const [openCrop, setOpenCrop] = React.useState(false)

  const handlePictureClick = (event: any) => {
    if (hiddenImageInput.current !== null) (hiddenImageInput.current as HTMLElement).click()
  }

  /*
  const c = document.body.getElementsByClassName("reactEasyCrop_CropArea")[0]
  useEffect(() => {
      c.setAttribute("style", "border-radius: 50% !important;")
    }, [c])
*/

  useEffect(() => {
    setProfilePic(profilePic)
    setProfilePicURL(profilePicURL)
  }, [profilePicURL, profilePic])

  const handlePictureChange = (event: any) => {
    const fileUploaded = event.target.files[0]

    setProfilePic(fileUploaded)
    setProfilePicURL(URL.createObjectURL(fileUploaded))

    handleOpen()
    setOpenCrop(true)
    event.target.value = null
  }

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle: modalStyleT = {
    position: "absolute",
    borderRadius: "16px",
    backgroundColor: "black",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeState((event.target as HTMLInputElement).value)
  }

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeType((event.target as HTMLInputElement).value)
  }

  const cnt = useSelector((state: any) => state.cnu.cnt)

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${cnt}`,
    },
  })

  const [employeeAdded, setEmployeeAdded] = React.useState(false)

  const handleAddEmployee = () => {
    const formData = new FormData()
    formData.append("name", employeeName)
    formData.append("email", employeeEmail)
    formData.append("phoneNumber", employeePhoneNumber)
    formData.append("password", employeePassword)
    formData.append("image_profile", profilePic)
    formData.append("status", employeeState)
    formData.append("type", employeeType)

    API.post("/employees/add-employee", formData)
      .then((res) => {
        // console.log(res)
        setEmployeeAdded(true)
        setTimeout(() => {
          setEmployeeEmail("")
          setEmployeeName("")
          setEmployeePassword("")
          setEmployeePhoneNumber("")
          setEmployeeState("activated")
          setEmployeeType("EMPLOYEE")
          setProfilePic("")
          setProfilePicURL("")
          setEmployeeAdded(false)
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-[540px]:mt-16">
      <div ref={addEmployeeRef} className="no-scrollbar ml-0 mr-1  w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-[540px]:border-l-0 max-[540px]:border-r-0 sm:w-[600px]">
        <SubpageNavbar title="add_employee" />
        <div className="m-5 rounded-2xl border border-darkBorder">
          <div>
            <TextField
              label={t("employee_name")}
              variant="outlined"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value.slice(0, 30))}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              sx={styles.textField}
            />
          </div>
          <div>
            <TextField
              label={t("phone_number")}
              variant="outlined"
              value={employeePhoneNumber}
              onChange={(e) => setEmployeePhoneNumber(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              sx={styles.textField}
            />
          </div>
          <div>
            <TextField
              label={t("email")}
              variant="outlined"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              sx={styles.textField}
            />
          </div>
          <div>
            <TextField
              label={t("pass_code")}
              variant="outlined"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
              InputLabelProps={{
                style: { color: "#40e5da", textAlign: "right" },
              }}
              sx={styles.textField}
            />
          </div>
          <div>
            <div className="mb-1">{t("employee_image")}</div>
            {profilePicURL === "" && <ImageOutlinedIcon onClick={handlePictureClick} className="cursor-pointer" sx={{ width: "60px", height: "60px" }} />}
            {profilePicURL !== "" && <img src={profilePicURL} alt="profile" className=" h-[100px] w-[100px] cursor-pointer rounded-full  border-4 border-black" onClick={handlePictureClick} />}
            <input type="file" accept="image/*" hidden ref={hiddenImageInput} onChange={handlePictureChange} />
          </div>
          <div>
            <div className="mb-1">{t("employee_status")}</div>

            <RadioGroup
              row
              value={employeeState}
              onChange={handleChangeStatus}
              sx={{
                "& .MuiRadio-root": {
                  color: "#40e5da",
                },
                ".Mui-checked": {
                  color: "#40e5da",
                },
              }}
            >
              <FormControlLabel value="activated" control={<Radio />} label={t("activated")} />
              <FormControlLabel value="deactivated" control={<Radio />} label={t("deactivated")} />
            </RadioGroup>
          </div>
          <div>
            <div className="mb-1">{t("employee_type")}</div>

            <RadioGroup
              row
              value={employeeType}
              onChange={handleChangeType}
              sx={{
                "& .MuiRadio-root": {
                  color: "#40e5da",
                },
                ".Mui-checked": {
                  color: "#40e5da",
                },
              }}
            >
              <FormControlLabel value="EMPLOYEE" control={<Radio />} label={t("employee")} />
              <FormControlLabel value="ADMIN" control={<Radio />} label={t("admin")} />
            </RadioGroup>
          </div>
          {employeeAdded && <div className="text-center text-xl text-green-500">{t("employee_added")}</div>}
          <button onClick={handleAddEmployee} className={styles.coloredButton}>
            {t("confirm")}
          </button>

          <Modal open={open} onClose={handleClose} disableEscapeKeyDown disablePortal>
            <div style={modalStyle} className={`  `}>
              {/* <div className="cursor-pointer rounded-full p-1  text-white hover:bg-darkHover" onClick={handleClose}>
                <Close />
              </div> */}
              <Crop photoURL={profilePicURL} setOpenCrop={setOpenCrop} setClose={handleClose} setPhotoURL={setProfilePicURL} setFile={setProfilePic} aspect={1} originalPhoto={""} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee

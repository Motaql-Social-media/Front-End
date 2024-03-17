import { styled } from "@mui/material/styles"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector"
import { StepIconProps } from "@mui/material/StepIcon"

import BadgeIcon from "@mui/icons-material/Badge"
import PhoneIcon from "@mui/icons-material/Phone"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import EmailIcon from "@mui/icons-material/Email"
import PasswordIcon from "@mui/icons-material/Password"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
    left: window.innerWidth > 400 ? -45 : -25,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,#9EE6E1 0%,#40e5da 50%,#0B3152 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,#9EE6E1 0%,#40e5da 50%,#0B3152 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",

    borderRadius: 1,
    width: "110%",
  },
}))

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#000",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient( 136deg, #9EE6E1 0%, #40e5da 50%, #0B3152 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "linear-gradient( 136deg, #9EE6E1 0%, #40e5da 50%, #0B3152 100%)",
  }),
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <AddCircleOutlineIcon />,
    2: <BadgeIcon />,
    3: <PhoneIcon />,
    4: <VerifiedUserIcon />,
    5: <EmailIcon />,
    6: <VerifiedUserIcon />,
    7: <PasswordIcon />,
    8: <DriveFileRenameOutlineIcon />,
    9: <AccountCircleIcon />,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function CustomizedSteppers({ step }: { step: number }) {
  return (
    <div dir="ltr" className="mt-5 px-4">
      <Stepper alternativeLabel activeStep={step} sx={{ direction: "ltr" }} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step
            key={label}
            sx={{
              padding: 0,
              width: "fit-content",
            }}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon} sx={{ width: "fit-content" }}>
              <span className={`${label <= step + 1 ? "text-primary" : "text-white"}  text-xs`}>{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

import { CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <div className="flex w-full flex-grow justify-center">
      <CircularProgress
        sx={{
          color: "#40e5da",
        }}
      />
    </div>
  )
}

export default Loading

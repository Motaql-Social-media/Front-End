import { createSlice } from "@reduxjs/toolkit"

const initStateUnseen = localStorage.getItem("unseen")

export type NotificationState = {
  unseenCount: number
}
const initialState: NotificationState = {
  unseenCount: initStateUnseen ? parseInt(initStateUnseen) : 0,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUnseenCount: (state, action: any) => {
      state.unseenCount = action.payload
    },
    resetCount: (state) => {
      state.unseenCount = 0
    },
    receiveNotification: (state) => {
      state.unseenCount += 1
    },
  },
})

export const { setUnseenCount } = notificationSlice.actions
export const { receiveNotification } = notificationSlice.actions
export const { resetCount } = notificationSlice.actions

export default notificationSlice.reducer

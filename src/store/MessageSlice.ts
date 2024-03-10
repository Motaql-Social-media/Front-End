import { createSlice } from "@reduxjs/toolkit"

const initStateUnseen = localStorage.getItem("unseen-messages")

export type NotificationState = {
  unseenCount: number
}
const initialState: NotificationState = {
  unseenCount: initStateUnseen ? parseInt(initStateUnseen) : 0,
}

const messageSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessageUnseenCount: (state, action: any) => {
      state.unseenCount = action.payload
    },
    resetCount: (state) => {
      state.unseenCount = 0
    },
    receiveMessage: (state) => {
      state.unseenCount += 1
    },
  },
})

export const { setMessageUnseenCount } = messageSlice.actions
export const { receiveMessage } = messageSlice.actions
export const { resetCount } = messageSlice.actions

export default messageSlice.reducer

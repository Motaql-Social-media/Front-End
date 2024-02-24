import { createSlice } from "@reduxjs/toolkit";

const initState = localStorage.getItem("FCMToken");
const initStateUnseen = localStorage.getItem("unseen");

export type NotificationState = {
  FCMToken: string | null;
  unseenCount: number;
};
const initialState: NotificationState = {
  FCMToken: initState ? initState : null,
  unseenCount: initStateUnseen ? parseInt(initStateUnseen) : 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationToken: (state, action) => {
      state.FCMToken = action.payload;
    },
    setUnseenCount: (state, action) => {
      // console.log(action.payload);
      state.unseenCount = action.payload;
    },
  },
});

export const { setNotificationToken } = notificationSlice.actions;
export const { setUnseenCount } = notificationSlice.actions;

export default notificationSlice.reducer;

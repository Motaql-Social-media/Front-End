import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./ThemeSlice"
import userReducer from "./UserSlice"
import notificationReducer from "./NotificationSlice"
import messageReducer from "./MessageSlice"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    notification: notificationReducer,
    message: messageReducer,
  },
})

export default store

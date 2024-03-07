import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import userReducer from "./UserSlice";
import notificationReducer from "./NotificationSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;

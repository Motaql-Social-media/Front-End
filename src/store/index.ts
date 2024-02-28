import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export default store;

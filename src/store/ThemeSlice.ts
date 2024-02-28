import { createSlice } from "@reduxjs/toolkit";

const initMode = localStorage.getItem("mode");
const initColor = localStorage.getItem("color");

export type ThemeState = {
    darkMode: boolean;
    color: number;
};

const initialState: ThemeState = {
    darkMode: initMode !== "true" ? true : false,
    color: initColor === null ? 1 : parseInt(initColor),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode: (state) => {
        const htmlElement = document.getElementById("htmlid");
        state.darkMode = true;
        document.documentElement.style.setProperty("--color-theme", "dark");
        if (htmlElement) {
            htmlElement.classList.add("dark");
        }
    },
    setLightMode: (state) => {
        const htmlElement = document.getElementById("htmlid");
        state.darkMode = false;
        document.documentElement.style.setProperty("--color-theme", "white");
        if (htmlElement) {
            htmlElement.classList.remove("dark");
        }
    },
    changeColor: (state, actions) => {
      state.color = actions.payload.color;
      localStorage.setItem("color", actions.payload.color);
    },
  },
});

export const toggleTheme = themeSlice.actions;
export const changeColor = themeSlice.actions.changeColor;
export const setDarkMode = themeSlice.actions.setDarkMode;
export const setLightMode = themeSlice.actions.setLightMode;

export default themeSlice.reducer;

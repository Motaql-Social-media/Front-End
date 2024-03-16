import { createSlice } from "@reduxjs/toolkit"

const initMode = localStorage.getItem("mode")
const initColor = localStorage.getItem("color")
const initDir = localStorage.getItem("dir")

export type ThemeState = {
  darkMode: boolean
  color: number
  dir: string
}

const initialState: ThemeState = {
  darkMode: initMode !== "true" ? true : false,
  color: initColor === null ? 1 : parseInt(initColor),
  dir: initDir === null ? "rtl" : initDir,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      const htmlElement = document.getElementById("htmlid")
      state.darkMode = true
      document.documentElement.style.setProperty("--color-theme", "dark")
      if (htmlElement) {
        htmlElement.classList.add("dark")
      }
    },
    setLightMode: (state) => {
      const htmlElement = document.getElementById("htmlid")
      state.darkMode = false
      document.documentElement.style.setProperty("--color-theme", "white")
      if (htmlElement) {
        htmlElement.classList.remove("dark")
      }
    },
    changeColor: (state, actions) => {
      state.color = actions.payload.color
      localStorage.setItem("color", actions.payload.color)
    },
    changeDir: (state) => {
      state.dir = state.dir === "rtl" ? "ltr" : "rtl"
      localStorage.setItem("dir", state.dir)
    },
  },
})

export const toggleTheme = themeSlice.actions
export const changeColor = themeSlice.actions.changeColor
export const setDarkMode = themeSlice.actions.setDarkMode
export const setLightMode = themeSlice.actions.setLightMode
export const changeDir = themeSlice.actions.changeDir

export default themeSlice.reducer

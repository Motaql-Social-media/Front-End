import { createSlice } from "@reduxjs/toolkit"

const initialUser = localStorage.getItem("cnu")
const initialToken = localStorage.getItem("cnt")

const initialState: AdminUserState = {
  cnu: initialUser ? JSON.parse(initialUser) : null,
  cnt: initialToken ? JSON.parse(initialToken) : null,
}

export const adminUserSlice = createSlice({
  name: "cnu",
  initialState,
  reducers: {
    login: (state, action) => {
      state.cnu = action.payload.user
      localStorage.setItem("cnu", JSON.stringify(action.payload.user))
      state.cnt = action.payload.token
      localStorage.setItem("cnt", JSON.stringify(action.payload.token))
    },
    logout: (state) => {
      state.cnu = null
      state.cnt = null
      localStorage.removeItem("cnu")
      localStorage.removeItem("cnt")
    },
  },
})

export default adminUserSlice.reducer
export const { login, logout } = adminUserSlice.actions

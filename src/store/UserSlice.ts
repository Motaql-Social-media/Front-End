import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialUser = localStorage.getItem("user")
const initialToken = localStorage.getItem("token")

export type userState = {
  loading: boolean
  user: any
  error: string | null
  token: string | null
}
const initialState: userState = {
  loading: false,
  user: initialUser ? JSON.parse(initialUser) : null,
  error: null,
  token: initialToken ? JSON.parse(initialToken) : null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      state.loading = false
      state.error = null
      state.token = null
    },
    signupUser: (state, action) => {
      // console.log(action.payload);
      state.user = action.payload.user

      //next line will be removed
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))

      state.loading = false
      state.error = null
      state.token = action.payload.token
      action.payload.navigate("/home")
    },
    changeProfilePicture: (state, action) => {
      state.user = action.payload.user

      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))

      state.loading = false
      state.error = null
      state.token = action.payload.token
    },
    changeUsername: (state, action) => {
      if (state.user) state.user.username = action.payload
      let temp_user = JSON.parse(localStorage.getItem("user") as string)
      temp_user.username = action.payload
      localStorage.setItem("user", JSON.stringify(temp_user))
    },
    changeEmail: (state, action) => {
      if (state.user) state.user.email = action.payload
      let temp_user = JSON.parse(localStorage.getItem("user") as string)
      temp_user.email = action.payload
      localStorage.setItem("user", JSON.stringify(temp_user))
    },
    changeUser: (state, action) => {
      const newuser = {
        profileImage: state.user?.profileImage,
        ...action.payload,
      }
      state.user = newuser
      localStorage.setItem("user", JSON.stringify(newuser))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.user = null
        state.error = null
        state.token = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.data.user
        state.error = null
        state.token = action.payload.data.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        console.log(action.error.message)
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials"
        } else {
          state.error = "Access Denied! Invalid Credentials"

          //this may be changed
          // state.error = action.error.message
        }
        state.token = null
      })
  },
})

let google = false

export const loginUser = createAsyncThunk("user/loginUser", async ({ userCredentials, isgoogle }: { userCredentials: any; isgoogle: boolean }) => {
  let response
  if (isgoogle) {
    google = true
    // console.log(userCredentials);
    response = userCredentials
    userCredentials.data.user = {
      banner_image: userCredentials.data.user.bannerImage,
      ...response.data.user,
    }
    localStorage.setItem("user", JSON.stringify(userCredentials.data.user))
    localStorage.setItem("token", JSON.stringify(userCredentials.token))
  } else {
    google = false
    console.log(userCredentials)

    const request = await axios.post(`${process.env.REACT_APP_API_URL}auth/signin`, userCredentials)
    response = await request.data
    // console.log(response);
    // response.data.user = {
    //   banner_image: response.data.user.bannerImage,
    //   ...response.data.user,
    // };
    localStorage.setItem("user", JSON.stringify(response.data.user))
    localStorage.setItem("token", JSON.stringify(response.data.token))
  }

  return response
})

export const logoutUser = userSlice.actions.logoutUser
export const signupUser = userSlice.actions.signupUser
export const changeProfilePicture = userSlice.actions.changeProfilePicture
export const changeUsername = userSlice.actions.changeUsername
export const changeEmail = userSlice.actions.changeEmail
export const changeUser = userSlice.actions.changeUser
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userAccessToken: null,
  userData: null,
  userType: 'b2c',
  userVisit: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userAccessToken, userType } = action.payload
      state.userAccessToken = userAccessToken
      state.userType = userType
    },
    logout: (state) => {
      state.userAccessToken = null
      state.userData = null
      state.userType = 'b2c'
    },
    userDetails: (state, action) => {
      state.userData = action.payload
    },
    userVisitChange: (state) => {
      state.userVisit = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, userDetails, userVisitChange } = userSlice.actions

export default userSlice.reducer

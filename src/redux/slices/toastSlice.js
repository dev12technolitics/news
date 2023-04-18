import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: '',
  message: '',
  toggle: false,
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    handleToastOpen: (state, action) => {
      const { message, status } = action.payload
      state.toggle = true
      state.status = status
      state.message = message
    },
    handleToastClose: (state) => {
      state.toggle = false
      state.status = ''
      state.message = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { handleToastOpen, handleToastClose } = toastSlice.actions

export default toastSlice.reducer

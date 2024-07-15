/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('setUser payload:', action.payload)
      state.user = action.payload
    },
    setLoading: (state, action) => {
      console.log('setLoading payload:', action.payload)
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      console.log('setError payload:', action.payload)
      state.error = action.payload
    },
  },
})

export const { setUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  article: {},
  //   isLoading: false,
  //   error: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      console.log('setArticle payload:', action.payload)
      state.article = action.payload
    },
    // setLoading: (state, action) => {
    //   console.log('setLoading payload:', action.payload)
    //   state.isLoading = action.payload
    // },
    // setError: (state, action) => {
    //   console.log('setError payload:', action.payload)
    //   state.error = action.payload
    // },
  },
})

export const { setArticle } = articleSlice.actions
export default articleSlice.reducer

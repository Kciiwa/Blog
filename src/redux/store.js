import { configureStore } from '@reduxjs/toolkit'

import { articlesApi } from './api'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
})

export default store

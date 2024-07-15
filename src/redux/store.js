import { configureStore } from '@reduxjs/toolkit'

import { articlesApi } from './api'
import userReducer from './userSlice' // Импортируем ваш срез состояния для пользователя

const store = configureStore({
  reducer: {
    user: userReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
})

export default store

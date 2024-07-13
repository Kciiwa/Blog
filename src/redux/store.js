import { configureStore } from '@reduxjs/toolkit'

import { articlesApi } from './api'
// import counterReducer from '../features/counter/counterSlice';

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
})

export default store

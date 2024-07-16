import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ limit, offset }) => `articles?limit=${limit}&offset=${offset}`,
    }),
    getArticle: build.query({
      query: ({ slug }) => `articles/${slug}`,
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
    editProfile: build.mutation({
      query: ({ body, token }) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
    createArticle: build.mutation({
      query: ({ body, token }) => ({
        url: 'articles',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useAddUserMutation,
  useLoginUserMutation,
  useEditProfileMutation,
  useCreateArticleMutation,
} = articlesApi

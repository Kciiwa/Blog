import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ limit, offset, token }) => ({
        url: `articles?limit=${limit}&offset=${offset}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` || null,
        },
      }),
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
    updateArticle: build.mutation({
      query: ({ body, token, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
    deleteArticle: build.mutation({
      query: ({ token, slug }) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    likeArticle: build.mutation({
      query: ({ token, slug }) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    unlikeArticle: build.mutation({
      query: ({ token, slug }) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} = articlesApi

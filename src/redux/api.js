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
  }),
})

export const { useGetArticlesQuery, useGetArticleQuery } = articlesApi

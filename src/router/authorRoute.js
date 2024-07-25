import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

import { useGetArticleQuery } from '../redux/api'

function AuthorRoute() {
  const { slug } = useParams()
  const { data, isLoading } = useGetArticleQuery({ slug })
  const authorName = localStorage.getItem('username')
  if (isLoading) return <div>Loading...</div>

  return data?.article?.author.username === authorName ? (
    <Outlet />
  ) : (
    <Navigate to={`/fullArticlePage/${slug}`} state={{ error: 'Редактирование невозможно' }} />
  )
}

export default AuthorRoute

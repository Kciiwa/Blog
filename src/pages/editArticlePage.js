import React from 'react'
import { useLocation } from 'react-router-dom'

import NewArticleForm from '../components/newArticleForm/newArticleForm'

function NewArticlePage() {
  const location = useLocation()
  const { article } = location.state || {}

  return <NewArticleForm article={article} editmode={!!article} />
}

export default NewArticlePage

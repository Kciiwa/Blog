import React from 'react'
import { useLocation } from 'react-router-dom'

import FullArticle from '../components/fullArticle/fullArticle'

function FullArticlePage() {
  const location = useLocation()
  const { isLiked, countOfLikes } = location.state || {}
  // console.log(`isliked from page: ${isLiked}`)
  return <FullArticle initialIsLiked={isLiked} initialCountOfLikes={countOfLikes} />
}

export default FullArticlePage

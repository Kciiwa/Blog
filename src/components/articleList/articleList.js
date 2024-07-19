import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'

import { useGetArticlesQuery } from '../../redux/api'
import Article from '../article/article'

import styles from './articleList.module.css'

function ArticleList() {
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  // eslint-disable-next-line radix
  const currentPage = parseInt(searchParams.get('page')) || 1

  const limit = 5
  const offset = (currentPage - 1) * limit
  const token = localStorage.getItem('token')
  const {
    data = { articles: [], articlesCount: 0 },
    isLoading,
    refetch,
  } = useGetArticlesQuery({
    limit,
    offset,
    token,
  })

  useEffect(() => {
    refetch()
  }, [refetch, currentPage])

  if (isLoading) return <h1>Loading...</h1>

  const totalPages = Math.ceil(data.articlesCount / limit)

  const onChangePage = (pageNumber) => {
    searchParams.set('page', pageNumber)
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  return (
    <>
      <section className={styles.articleList}>
        {data.articles.map((item) => (
          <Article
            key={item.slug}
            slug={item.slug}
            title={item.title}
            favorited={item.favorited}
            description={item.description}
            tagList={item.tagList}
            favoritesCount={item.favoritesCount}
            author={item.author}
            createdAt={item.createdAt}
          />
        ))}
      </section>
      <div className={styles.paginationWapper}>
        <Pagination
          current={currentPage}
          total={totalPages * limit}
          onChange={onChangePage}
          hideOnSinglePage
          showSizeChanger={false}
          pageSize={limit}
        />
      </div>
    </>
  )
}

export default ArticleList

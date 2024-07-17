import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

import { useGetArticlesQuery } from '../../redux/api'
import Article from '../article/article'
// import ArticlePagination from '../pagination/pagination'

import styles from './articleList.module.css'

function ArticleList() {
  const [page, setPage] = useState(1)
  const limit = 5
  const offset = (page - 1) * limit
  const {
    data = { articles: [], articlesCount: 0 },
    isLoading,
    refetch,
  } = useGetArticlesQuery({
    limit,
    offset,
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  console.log(data.articlesCount)

  if (isLoading) return <h1>Loading...</h1>

  const totalPages = Math.ceil(data.articlesCount / limit)

  const onChangePage = (pageNumber) => setPage(pageNumber)

  return (
    <>
      <section className={styles.articleList}>
        {data.articles.map((item) => (
          <Article
            key={item.slug}
            slug={item.slug}
            title={item.title}
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
          current={page}
          total={totalPages}
          onChange={onChangePage}
          hideOnSinglePage
          showSizeChanger={false}
          pageSize={5}
        />
      </div>
    </>
  )
}

export default ArticleList

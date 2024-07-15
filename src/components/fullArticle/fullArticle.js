/* eslint-disable indent */
import React from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { useGetArticleQuery } from '../../redux/api'

import styles from './fullArticle.module.css'

function FullArticle() {
  const { slug } = useParams()

  const { data = {}, isLoading } = useGetArticleQuery({ slug })
  const { article } = data

  console.log(article?.createdAt)

  const dateOfCreation =
    article?.createdAt !== undefined
      ? format(article?.createdAt, 'MMMM d, yyyy', { locale: enGB })
      : null

  // console.log(article)

  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className={styles.wrapper}>
      <div className={styles.fullArticle}>
        <div className={styles.info}>
          <div className={styles.articleHeader}>
            <h5 className={styles.title}>
              {article?.title?.trim() !== '' ? article.title : 'No Title'}
            </h5>
            <div className={styles.likes}>
              <button type="button" className={styles.likeBtn} />
              <span className={styles.countLikes}>{article?.favoritesCount}</span>
            </div>
          </div>
          <div className={styles.tagList}>
            {article?.tagList?.length !== 0
              ? article.tagList.map((tag) => {
                  if (tag.trim() !== '') {
                    return (
                      <span key={uuidv4()} className={styles.tag}>
                        {tag}
                      </span>
                    )
                    // eslint-disable-next-line no-else-return
                  } else return null
                })
              : null}
          </div>
          <p className={styles.description}>{article.description}</p>
        </div>
        <div className={styles.author}>
          <div className={styles.createdByAt}>
            <h6 className={styles.username}>{article.author?.username}</h6>
            <p className={styles.date}>{dateOfCreation}</p>
          </div>
          <img
            className={styles.avatar}
            src={article?.author?.image}
            alt="author"
            width="46px"
            height="46px"
          />
        </div>
      </div>
      <div className={styles.body}>
        <Markdown options={{ forceBlock: true, wrapper: 'div' }}>{article?.body ?? ''}</Markdown>
      </div>
    </div>
  )
}

export default FullArticle

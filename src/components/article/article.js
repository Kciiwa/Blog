/* eslint-disable indent */
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import useTruncatedText from '../../hooks/useTruncatedText'

import styles from './article.module.css'

function Article({ title, description, tagList, favoritesCount, author, slug, createdAt }) {
  if (!title || !description || !author || !createdAt) {
    return <h1>Loading...</h1>
  }

  const shortDescription = useTruncatedText(description, 100)

  const dateOfCreation = format(createdAt, 'MMMM d, yyyy', { locale: enGB })

  return (
    <div className={styles.article}>
      <div className={styles.info}>
        <div className={styles.articleHeader}>
          <Link to={`/fullArticlePage/${slug}`} className={styles.title}>
            {title && title.trim() !== '' ? title : 'No Title'}
          </Link>
          <div className={styles.likes}>
            <button type="button" className={styles.likeBtn} />
            <span className={styles.countLikes}>{favoritesCount}</span>
          </div>
        </div>
        <div className={styles.tagList}>
          {tagList.lenght !== 0
            ? tagList.map((tag) => {
                if (tag && tag.trim() !== '') {
                  return (
                    <span key={uuidv4()} className={styles.tag}>
                      {tag}
                    </span>
                  )
                  // eslint-disable-next-line no-else-return
                } else return null
              })
            : 'No Tags'}
        </div>
        <p className={styles.description}>{shortDescription}</p>
      </div>
      <div className={styles.author}>
        <div className={styles.createdByAt}>
          <h6 className={styles.username}>{author?.username}</h6>
          <p className={styles.date}>{dateOfCreation}</p>
        </div>
        <img
          className={styles.avatar}
          src={author?.image}
          alt="author"
          width="46px"
          height="46px"
        />
      </div>
    </div>
  )
}

export default Article

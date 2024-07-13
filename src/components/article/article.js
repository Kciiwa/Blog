/* eslint-disable indent */
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

import useTruncatedText from '../../hooks/useTruncatedText'

import styles from './article.module.css'

function Article({ title, description, tagList, favoritesCount, author, slug }) {
  const shortDescription = useTruncatedText(description, 100)

  return (
    <div className={styles.article}>
      <div className={styles.info}>
        <div className={styles.articleHeader}>
          <Link to={`/fullArticlePage/${slug}`} className={styles.title}>
            {title.trim() !== '' ? title : 'No Title'}
          </Link>
          <div className={styles.likes}>
            <button type="button" className={styles.likeBtn} />
            <span className={styles.countLikes}>{favoritesCount}</span>
          </div>
        </div>
        <div className={styles.tagList}>
          {tagList.lenght !== 0
            ? tagList.map((tag) => {
                if (tag.trim() !== '') {
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
        <h6 className={styles.username}>{author?.username}</h6>
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

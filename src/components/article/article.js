/* eslint-disable no-else-return */
/* eslint-disable indent */
/* eslint-disable indent */
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../redux/api'
import useTruncatedText from '../../hooks/useTruncatedText'

import styles from './article.module.css'

function Article({
  title,
  description,
  tagList,
  favoritesCount,
  author,
  slug,
  createdAt,
  favorited,
}) {
  const [isLiked, setIsLiked] = useState(favorited)
  const [countOfLikes, setCountOfLikes] = useState(favoritesCount)
  const token = localStorage.getItem('token')

  const [likeArticle] = useLikeArticleMutation()
  const [unlikeArticle] = useUnlikeArticleMutation()

  if (!title || !description || !author || !createdAt) {
    return <h1>Loading...</h1>
  }

  const shortDescription = useTruncatedText(description, 100)

  const dateOfCreation = format(createdAt, 'MMMM d, yyyy', { locale: enGB })

  const onHandleLike = async () => {
    if (token) {
      if (!isLiked) {
        try {
          await likeArticle({
            token,
            slug,
          })
          setIsLiked(true)
          setCountOfLikes((prevState) => prevState + 1)
        } catch (err) {
          console.error(`Не могу поставить лайк... ${err}`)
        }
      } else {
        try {
          await unlikeArticle({
            token,
            slug,
          })
          setIsLiked(false)
          setCountOfLikes((prevState) => prevState - 1)
        } catch (err) {
          console.error(`Не могу убрать лайк... ${err}`)
        }
      }
    }
  }

  return (
    <div className={styles.article}>
      <div className={styles.info}>
        <div className={styles.articleHeader}>
          <Link
            to={`/fullArticlePage/${slug}`}
            state={{ isLiked, countOfLikes }}
            className={styles.title}
          >
            {title && title.trim() !== '' ? title : 'No Title'}
          </Link>
          <div className={styles.likes}>
            <button
              type="button"
              className={token && isLiked ? styles.activeLikeBtn : styles.likeBtn}
              onClick={onHandleLike}
            />
            <span className={styles.countLikes}>{countOfLikes}</span>
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

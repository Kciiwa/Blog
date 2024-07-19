/* eslint-disable no-else-return */
/* eslint-disable indent */
import React, { useState, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import {
  useDeleteArticleMutation,
  useGetArticleQuery,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '../../redux/api'
import ModalWindow from '../modalWindow/modalWindow'

import styles from './fullArticle.module.css'

function FullArticle({ initialIsLiked, initialCountOfLikes }) {
  const [modal, setModal] = useState(false)
  const currentUsername = localStorage.getItem('username')
  const navigate = useNavigate()

  const { slug } = useParams()
  const token = localStorage.getItem('token')

  const { data = {}, isLoading, refetch } = useGetArticleQuery({ slug })
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [countOfLikes, setCountOfLikes] = useState(initialCountOfLikes)

  const [deleteArticle] = useDeleteArticleMutation()
  const { article } = data

  const dateOfCreation =
    article?.createdAt !== undefined
      ? format(new Date(article?.createdAt), 'MMMM d, yyyy', { locale: enGB })
      : null

  const showModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const handleDelete = async () => {
    try {
      await deleteArticle({
        token,
        slug,
      }).unwrap()
      navigate('/')
    } catch (err) {
      console.error(`не получилось удалить статью: ${err}`)
    }
  }

  const [likeArticle] = useLikeArticleMutation()
  const [unlikeArticle] = useUnlikeArticleMutation()

  const onHandleLike = useCallback(async () => {
    if (token) {
      if (!isLiked) {
        try {
          await likeArticle({
            token,
            slug,
          }).unwrap()
          await setIsLiked(true)
          await setCountOfLikes((prevState) => prevState + 1)
          refetch()
        } catch (err) {
          console.error(`Не получилось поставить лайк... ${err}`)
        }
      } else if (isLiked) {
        try {
          await unlikeArticle({
            token,
            slug,
          }).unwrap()
          await setIsLiked(false)
          await setCountOfLikes((prevState) => prevState - 1)
          refetch()
        } catch (err) {
          console.error(`Не получилось убрать лайк... ${err}`)
        }
      }
    }
  })

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
              <button
                type="button"
                className={token && isLiked ? styles.activeLikeBtn : styles.likeBtn}
                onClick={onHandleLike}
              />
              <span className={styles.countLikes}>{countOfLikes}</span>
            </div>
          </div>
          <div className={styles.tagList}>
            {article?.tagList?.length !== 0
              ? article.tagList.map((tag) => {
                  if (tag && tag.trim() !== '') {
                    return (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    )
                  } else return null
                })
              : null}
          </div>
          <p className={styles.description}>{article.description}</p>
        </div>
        <div className={styles.authorEditWrapper}>
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
          {currentUsername === article.author.username ? (
            <div className={styles.buttons}>
              <button type="button" className={styles.deleteBtn} onClick={showModal}>
                Delete
              </button>
              <Link to={`/articles/${slug}/edit`} state={{ article }} className={styles.editBtn}>
                Edit
              </Link>
              {modal && (
                <ModalWindow
                  closeModal={closeModal}
                  handleAction={handleDelete}
                  showModal={showModal}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.body}>
        <Markdown options={{ forceBlock: true, wrapper: 'div' }}>{article?.body ?? ''}</Markdown>
      </div>
    </div>
  )
}

export default FullArticle

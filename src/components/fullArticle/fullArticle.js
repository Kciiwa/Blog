/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Markdown from 'markdown-to-jsx'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux/api'
import ModalWindow from '../modalWindow/modalWindow'

import styles from './fullArticle.module.css'

function FullArticle() {
  const [modal, setModal] = useState(false)
  const currentUsername = localStorage.getItem('username')

  // console.log(currentUsername)
  const navigate = useNavigate()

  const { slug } = useParams()
  const token = localStorage.getItem('token')

  const { data = {}, isLoading, refetch } = useGetArticleQuery({ slug })

  const [deleteArticle] = useDeleteArticleMutation()

  useEffect(() => {
    refetch()
  }, [refetch])
  const { article } = data

  // console.log(article.author.username)

  const dateOfCreation =
    article?.createdAt !== undefined
      ? format(article?.createdAt, 'MMMM d, yyyy', { locale: enGB })
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
      console.log('delete article')

      // localStorage.setItem('token', userData.user.token)
      // dispatch(setUser(userData.user))
      // setSuccess(true)
      // localStorage.setItem('username', userData.user.username)
      // localStorage.setItem('image', userData.user.image)

      navigate('/')
    } catch (err) {
      console.log(`не получилось удалить статью: ${err}`)
    }
  }

  // console.log(article.title)

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
                  if (tag && tag.trim() !== '') {
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

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { useGetArticleQuery } from '../../redux/api'

import styles from './editArticleForm.module.css'

function EditArticleForm() {
  const { slug } = useParams()

  const { data = {} } = useGetArticleQuery({ slug })
  const { article } = data
  console.log(article.tagList)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      text: article?.body,
      tags: article?.tagList || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })
  //   console.log(`fields ${fields}`)

  //   const [createArticle] = useCreateArticleMutation()

  const onSubmit = async () => {
    // dispatch(setLoading(true))
    //     try {
    //       const articleData = await createArticle({
    //         body: {
    //           article: {
    //             title: data.title,
    //             description: data.description,
    //             body: data.text,
    //             tags: data.tags,
    //           },
    //         },
    //         token: localStorage.getItem('token'),
    //       }).unwrap()
    //       console.log('article created successfully: ', articleData)
    //     } catch (err) {
    //       console.error('oops ', err.message)
    //     }
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newTag = document.querySelector('input[name="newTag"]').value
    if (newTag.trim()) {
      append({ tag: newTag.trim() })
      document.querySelector('input[name="newTag"]').value = ''
    }
  }

  const handleCancelTag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('input[name="newTag"]').value = ''
  }

  const handleRemoveTag = (index, e) => {
    e.preventDefault()
    e.stopPropagation()
    remove(index)
  }

  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.header}>Create new article</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.textLabel}>
          <p className={styles.textLabel}>Title</p>
          <input
            className={`${errors.title ? styles.error : ''} ${styles.title} ${styles.input}`}
            {...register('title', { required: 'This field is required' })}
            placeholder="Title"
          />
        </label>
        {errors.title && <span className={styles.required}>{errors.title.message}</span>}

        <label className={styles.textLabel}>
          <p className={styles.textLabel}>Short description</p>
          <input
            className={`${errors.description ? styles.error : ''} ${styles.description} ${styles.input}`}
            {...register('description', { required: 'This field is required' })}
            placeholder="Description"
          />
        </label>
        {errors.description && (
          <span className={styles.required}>{errors.description.message}</span>
        )}

        <label className={styles.textLabel}>
          <p className={styles.textLabel}>Text</p>
          <textarea
            className={`${errors.text ? styles.error : ''} ${styles.text} ${styles.input}`}
            rows="8"
            cols="30"
            autoComplete="off"
            placeholder="Text"
            {...register('text', { required: 'This field is required' })}
          />
        </label>
        {errors.text && <span className={styles.required}>{errors.text.message}</span>}

        <div className={styles.tagsContainer}>
          <label className={styles.textLabel}>
            <p className={styles.textLabel}>Tags</p>
            {article.tagList.map((tag) => (
              <div className={styles.savedTagWrapper} key={uuidv4()}>
                <input className={styles.tag} value={tag} disabled />
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(e)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
            {fields.map((field, index) => (
              <div className={styles.savedTagWrapper} key={field.id}>
                <input className={styles.tag} value={field.tag} disabled />
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(index, e)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className={styles.tagInputContainer}>
              <input
                type="text"
                className={`${styles.tagInput} ${styles.input}`}
                placeholder="Tag"
                {...register('newTag', { required: false })}
              />
              <button type="button" onClick={handleCancelTag} className={styles.deleteButton}>
                Delete
              </button>
              <button type="button" onClick={handleAddTag} className={styles.addButton}>
                Add tag
              </button>
            </div>
          </label>
        </div>

        <input className={styles.submitBtn} type="submit" value="Send" />
      </form>
    </div>
  )
}

export default EditArticleForm
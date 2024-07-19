/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreateArticleMutation, useUpdateArticleMutation } from '../../redux/api'
import ErrorAlert from '../errorAlert/errorAlert'

import styles from './newArticleForm.module.css'

function NewArticleForm({ editmode = false, article }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      tagList: [],
    },
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    if (editmode && article) {
      setValue('title', article.title)
      setValue('description', article.description)
      setValue('text', article.body)
      replace(article.tagList || [])
    }
  }, [editmode, article, setValue, replace])

  const [createArticle, { error: createError, isLoading: isCreating }] = useCreateArticleMutation()
  const [updateArticle, { error: updateError, isLoading: isUpdating }] = useUpdateArticleMutation()

  const onSubmit = async (data) => {
    try {
      if (!editmode) {
        const articleData = await createArticle({
          body: {
            article: {
              title: data.title,
              description: data.description,
              body: data.text,
              tagList: data.tagList,
            },
          },
          token: localStorage.getItem('token'),
        }).unwrap()
        console.log('article created successfully: ', articleData)
      } else {
        const articleData = await updateArticle({
          body: {
            article: {
              title: data.title,
              description: data.description,
              body: data.text,
              tagList: data.tagList,
            },
          },
          token: localStorage.getItem('token'),
          slug,
        }).unwrap()
        console.log('article updated successfully: ', articleData)
      }
      navigate('/')
    } catch (err) {
      console.error(err.message)
    }
  }

  const error = createError || updateError
  const isLoading = isCreating || isUpdating

  return (
    <>
      {isLoading ? <h3 className={styles.loading}>Loading...</h3> : null}
      {error ? <ErrorAlert errors={error.data.errors} /> : null}
      <div className={styles.formWrapper}>
        <h3 className={styles.header}>{editmode ? 'Edit article' : 'Create new article'}</h3>
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
            <label className={styles.textLabel} htmlFor="Tags">
              Tags
              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className={styles.savedTagWrapper}>
                    <input
                      {...register(`tagList.${index}`)}
                      className={styles.tag}
                      type="text"
                      placeholder="Tag"
                    />
                    <button
                      className={styles.deleteButton}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button className={styles.addButton} type="button" onClick={() => append('')}>
                  Add Tag
                </button>
              </div>
            </label>
          </div>

          <input className={styles.submitBtn} type="submit" value="Send" />
        </form>
      </div>
    </>
  )
}

export default NewArticleForm

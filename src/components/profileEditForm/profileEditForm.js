/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { setError, setLoading, setUser } from '../../redux/userSlice'
import { useEditProfileMutation } from '../../redux/api'

import styles from './profileEditForm.module.css'

function ProfileEditForm() {
  const dispatch = useDispatch()
  const [error, setErrorLocal] = useState([])
  //   const [success, setSuccess] = useState(false)

  const { username, email, image } = useSelector((state) => state.user.user)

  const [editProfile] = useEditProfileMutation()

  const onSubmit = async (data) => {
    dispatch(setLoading(true))
    try {
      const userData = await editProfile({
        body: {
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
            image: data.avatarURL,
          },
        },
        token: localStorage.getItem('token'),
      }).unwrap()

      console.log('User edited successfully:', userData)
      //   localStorage.setItem('token', userData.user.token)
      localStorage.setItem('username', userData.user.username)
      localStorage.setItem('image', userData.user.image)
      dispatch(setUser(userData.user))
      // console.log(` из стора ${store.getState()}`)
      //   setSuccess(true)
    } catch (err) {
      setErrorLocal([...error, err.message])
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>Edit Profile</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.textLabel}>
          <p className={styles.textLabel}>Username</p>
          <input
            className={
              errors.username
                ? `${styles.error} ${styles.username} ${styles.input}`
                : `${styles.username} ${styles.input}`
            }
            {...register('username', {
              required: { value: true, message: 'This field is required' },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'You must specify your first name before moving forward',
              },
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters' },
              maxLength: {
                value: 20,
                message: 'Your username must contain no more than 20 characters',
              },
            })}
            placeholder="Username"
            defaultValue={username}
          />
        </label>
        {errors.username && <div className={styles.required}>{errors.username.message}</div>}

        <label className={styles.textLabel}>
          <p className={styles.textLabel}>Email address</p>
          <input
            className={
              errors.email
                ? `${styles.error} ${styles.email} ${styles.input}`
                : `${styles.email} ${styles.input}`
            }
            {...register('email', {
              required: { value: true, message: 'This field is required' },
              pattern: { value: /^\S+@\S+$/i, message: 'Enter your existing email address' },
            })}
            placeholder="Email"
            defaultValue={email}
          />
        </label>
        {errors.email && <span className={styles.required}>{errors.email.message}</span>}
        <label className={styles.textLabel}>
          <p className={styles.textLabel}>New password</p>
          <input
            className={
              errors.password
                ? `${styles.error} ${styles.password} ${styles.input}`
                : `${styles.password} ${styles.input}`
            }
            {...register('password', {
              required: { value: true, message: 'This field is required' },
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 15,
                message: 'Your password must contain no more than 15 characters',
              },
            })}
            placeholder="Password"
            type="password"
            defaultValue=""
          />
        </label>
        {errors.password && <span className={styles.required}>{errors.password.message}</span>}
        <label className={styles.textLabel}>
          <p className={styles.textLabel}>Avatar image (url)</p>
          <input
            className={
              errors.avatarURL
                ? `${styles.error} ${styles.avatarURL} ${styles.input}`
                : `${styles.avatarURL} ${styles.input}`
            }
            {...register('avatarURL', {
              required: { value: true, message: 'This field is required' },
            })}
            placeholder="Avatar image"
            defaultValue={image}
          />
        </label>
        {errors.avatarURL && <div className={styles.required}>{errors.avatarURL.message}</div>}
        <input className={styles.submitBtn} type="submit" value="Save" />
      </form>
    </div>
  )
}
export default ProfileEditForm

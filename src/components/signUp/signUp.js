/* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// import store from '../../redux/store'
import { useAddUserMutation } from '../../redux/api'
import { setUser, setLoading, setError } from '../../redux/userSlice' // Импортируем действия из вашего среза пользователя

import style from './signUp.module.css'

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setErrorLocal] = useState([])
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const [addUser] = useAddUserMutation()
  // const [loginUser] = useLoginUserMutation()

  const onSubmit = async (data) => {
    dispatch(setLoading(true))
    try {
      const userData = await addUser({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }).unwrap()

      console.log('User created successfully:', userData)
      localStorage.setItem('token', userData.user.token)
      localStorage.setItem('username', userData.user.username)
      localStorage.setItem('image', userData.user.image)
      // localStorage.setItem('user', userData.user.username)
      dispatch(setUser(userData.user))
      // console.log(` из стора ${store.getState()}`)
      setSuccess(true)
      navigate('/')
    } catch (err) {
      setErrorLocal([...error, err.message])
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={style.formWrapper}>
      {error.length !== 0 && (
        <div className={style.errorMessage}>
          {error.map((e, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={index}>{e}</p>
          ))}
        </div>
      )}
      {success && (
        <div className={style.successMessage}>Registration successful! You are now logged in.</div>
      )}
      <h3 className={style.title}>Create new account</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.textLabel}>
          <p className={style.textLabel}>Username</p>
          <input
            className={
              errors.username
                ? `${style.error} ${style.username} ${style.input}`
                : `${style.username} ${style.input}`
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
          />
        </label>
        {errors.username && <div className={style.required}>{errors.username.message}</div>}

        <label className={style.textLabel}>
          <p className={style.textLabel}>Email address</p>
          <input
            className={
              errors.email
                ? `${style.error} ${style.email} ${style.input}`
                : `${style.email} ${style.input}`
            }
            {...register('email', {
              required: { value: true, message: 'This field is required' },
              pattern: { value: /^\S+@\S+$/i, message: 'Enter your existing email address' },
            })}
            placeholder="Email"
          />
        </label>
        {errors.email && <span className={style.required}>{errors.email.message}</span>}

        <label className={style.textLabel}>
          <p className={style.textLabel}>Password</p>
          <input
            className={
              errors.password
                ? `${style.error} ${style.password} ${style.input}`
                : `${style.password} ${style.input}`
            }
            {...register('password', {
              required: { value: true, message: 'This field is required' },
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
              maxLength: {
                value: 40,
                message: 'Your password must contain no more than 40 characters',
              },
            })}
            placeholder="Password"
            type="password"
          />
        </label>
        {errors.password && <span className={style.required}>{errors.password.message}</span>}

        <label className={style.textLabel}>
          <p className={style.textLabel}>Repeat Password</p>
          <input
            className={
              errors.passwordRepeat
                ? `${style.error} ${style.password} ${style.input}`
                : `${style.password} ${style.input}`
            }
            {...register('passwordRepeat', {
              required: { value: true, message: 'This field is required' },
              validate: (value) => value === getValues('password') || 'Passwords must match',
            })}
            placeholder="Password"
            type="password"
          />
        </label>
        {errors.passwordRepeat && (
          <span className={style.required}>{errors.passwordRepeat.message}</span>
        )}

        <label className={style.agreement}>
          <input type="checkbox" {...register('agreement', { required: true })} />
          <span className={style.checkbox} />
          <div className={errors.agreement ? `${style.errorAgreement}` : ''}>
            I agree to the processing of my personal information
          </div>
        </label>

        <input className={style.submitBtn} type="submit" value="Create" />
      </form>

      <p className={style.signInText}>
        Already have an account?{' '}
        <Link to="/sign-in" className={style.signInLink}>
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUp

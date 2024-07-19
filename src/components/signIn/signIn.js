/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setError, setLoading, setUser } from '../../redux/userSlice'
import { useLoginUserMutation } from '../../redux/api'
import ErrorAlert from '../errorAlert/errorAlert'

import style from './signIn.module.css'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorLocal, setErrorLocal] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loginUser, { error, isLoading }] = useLoginUserMutation()

  const onSubmit = async (data) => {
    dispatch(setLoading(true))
    try {
      const userData = await loginUser({
        user: {
          email: data.email,
          password: data.password,
        },
      }).unwrap()
      localStorage.setItem('token', userData.user.token)
      dispatch(setUser(userData.user))
      localStorage.setItem('username', userData.user.username)
      localStorage.setItem('image', userData.user.image)

      navigate('/')
    } catch (err) {
      setErrorLocal([...errorLocal, err.message])
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={style.formWrapper}>
      {isLoading ? <h3 className={style.loading}>Loading...</h3> : null}
      {error ? <ErrorAlert errors={error.data.errors} /> : null}

      <h3 className={style.title}>Sign In</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
                value: 15,
                message: 'Your password must contain no more than 15 characters',
              },
            })}
            placeholder="Password"
            type="password"
          />
        </label>
        {errors.password && <span className={style.required}>{errors.password.message}</span>}
        <input className={style.submitBtn} type="submit" value="Login" />
      </form>
      <p className={style.signInText}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={style.signInLink}>
          Sign Up
        </Link>
        .
      </p>
    </div>
  )
}

export default SignIn

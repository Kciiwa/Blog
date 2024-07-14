/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import style from './signUp.module.css'

function SignUp() {
  const {
    register,
    handleSubmit,
    // watch,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data.username)
  //   console.log(watch('exampleRequired'))

  return (
    <div className={style.formWrapper}>
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
            // defaultValue="test"
            {...register('username', {
              required: { value: true, message: 'This field is required' },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'You must specify your first name before moving forward',
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
                value: 15,
                message: 'Your password must contain no more than 15 characters',
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
        <Link to="/signInPage" className={style.signInLink}>
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUp

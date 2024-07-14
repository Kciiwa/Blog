/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import styles from '../App.module.css'

function Layout() {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Realworld Blog
        </Link>
        <Link to="signInPage" className={styles.buttonIn} type="button">
          Sign In
        </Link>
        <Link to="/signUpPage" className={styles.buttonUp} type="button">
          Sign Up
        </Link>
      </header>

      <Outlet />
    </>
  )
}

export { Layout }

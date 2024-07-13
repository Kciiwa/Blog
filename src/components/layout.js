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
        <button className={styles.buttonIn} type="button">
          <h6>Sign In</h6>
        </button>
        <button className={styles.buttonUp} type="button">
          <h6>Sign Up</h6>
        </button>
      </header>

      <Outlet />
      {/* <main className={styles.main}>
        <ArticleList />
      </main> */}
    </>
  )
}

export { Layout }

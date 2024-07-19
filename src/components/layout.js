/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from '../App.module.css'
import { setUser } from '../redux/userSlice'

function Layout() {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const image = localStorage.getItem('image')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('image')
    dispatch(setUser(null))
    navigate('/')
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Realworld Blog
        </Link>
        {!token ? (
          <>
            <Link to="/sign-in" className={styles.buttonIn} type="button">
              Sign In
            </Link>
            <Link to="/sign-up" className={styles.buttonUp} type="button">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/new-article"
              className={`${styles.buttonUp} ${styles.buttonCreateArticle} `}
              type="button"
            >
              Create article
            </Link>
            <Link to="/profile" className={styles.profile}>
              <h6 className={styles.username}>{username}</h6>
              <img
                src={image}
                alt="users avatar"
                width="46px"
                height="46px"
                className={styles.avatar}
              />
            </Link>
            <div className={styles.profile}>
              <button
                onClick={handleLogout}
                className={`${styles.buttonUp} ${styles.buttonLogout} `}
                type="button"
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </header>

      <Outlet />
    </>
  )
}

export { Layout }

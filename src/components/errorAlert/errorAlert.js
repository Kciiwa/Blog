import React, { useState } from 'react'

import styles from './errorAlert.module.css'

function ErrorAlert({ errors }) {
  const [visibleErrors, setVisibleErrors] = useState(
    Object.fromEntries(Object.keys(errors).map((key) => [key, true]))
  )

  const handleDismiss = (field) => {
    setVisibleErrors((prev) => ({ ...prev, [field]: false }))
  }

  const errorMessages = Object.entries(errors).map(([field, message]) => (
    <button
      type="button"
      key={field}
      className={`${styles.message} ${visibleErrors[field] ? styles.visible : styles.hidden}`}
      onClick={() => handleDismiss(field)}
    >
      {field}: {message}
    </button>
  ))

  return <div className={styles.alertWrapper}>{errorMessages}</div>
}

export default ErrorAlert

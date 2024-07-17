import styles from './modalWindow.module.css'

function ModalWindow({ closeModal, handleAction }) {
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Are you sure you want to delete this article?</p>
      </div>
      <div>
        <button type="button" onClick={closeModal} className={styles.btn}>
          No
        </button>
        <button
          type="button"
          onClick={handleAction}
          className={`${styles.btn} ${styles.btnConfirm}`}
        >
          Yes
        </button>
      </div>
    </div>
  )
}

export default ModalWindow

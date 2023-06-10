import styles from '../form.module.scss'

export default function({ setFailed }) {

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
        <button type='button' className={styles.x} onClick={() => setFailed(false)}></button>
        <div className={styles.msg}>Password reset failed. Please check your password and try again.</div>
      </div>
    </div>
  )
}
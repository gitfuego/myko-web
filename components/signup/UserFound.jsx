import styles from '../form.module.scss'

export default function({ setUserFound }) {

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
        <button type='button' className={styles.x} onClick={() => setUserFound(false)}></button>
        <div className={styles.msg}>A user is already registered with this phone number. Use a different number or log in.</div>
      </div>
    </div>
  )
}
import styles from '../form.module.scss'

export default function({ setLoginFailed }) {

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
        <button className={styles.x} onClick={() => setLoginFailed(false)}></button>
        <div className={styles.msg}>Invalid login attempt. Please double check your credentials.</div>
      </div>
    </div>
  )
}
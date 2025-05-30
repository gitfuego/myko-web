import styles from '../form.module.scss'

export default function({ setFailed }) {

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
        <button type='button' className={styles.x} onClick={() => setFailed(false)}></button>
        <div className={styles.msg}>Invalid signup attempt. Please make sure all fields are filled.</div>
      </div>
    </div>
  )
}
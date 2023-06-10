import { useRouter } from 'next/router'
import styles from '../form.module.scss'

export default function() {
  const router = useRouter();
  
  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
      <div className={styles.msg}>Password reset successfully, log in to start chatting!</div>
        <button className={styles.blackbtn} type='button' onClick={() => router.push('/login')}>LOG IN</button>
      </div>
    </div>
  )
}
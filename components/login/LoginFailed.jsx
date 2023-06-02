import { useRouter } from 'next/router';
import styles from '../form.module.scss'

export default function() {
  const router = useRouter();

  return (
    <div className={styles.loginFailContainer}>
      <div className={styles.subContainer}>
        <button className={styles.x} onClick={() => router.push('/login')}></button>
        <div className={styles.loginFailMsg}>Invalid login attempt. Please double check your credentials.</div>
      </div>
    </div>
  )
}
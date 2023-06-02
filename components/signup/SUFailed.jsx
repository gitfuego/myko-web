import { useRouter } from 'next/router';
import styles from '../form.module.scss'

export default function() {
  const router = useRouter();

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
        <button type='button' className={styles.x} onClick={() => router.back()}></button>
        <div className={styles.msg}>Invalid signup attempt. Please make sure all fields are filled.</div>
      </div>
    </div>
  )
}
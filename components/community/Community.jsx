import { useRouter } from 'next/router';
import styles from './Community.module.scss';

export default function({ user, artist }) {
  const router = useRouter();
  const messages = [];

  return (
  <div className={styles.main}>
    <header className={styles.header}>
      <button className={styles.back} type='button' onClick={() => { router.back() }}></button>
      <div>{artist}</div>
      <a href='#'>
        <div style={{backgroundImage: `url('/drake.jpeg')`}} className={styles.image}></div>
      </a>
    </header>
    <div className={styles.messageContainer}>{messages}</div>
  </div>
  );
}
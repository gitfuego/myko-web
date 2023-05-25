import { useRouter } from 'next/router';
import styles from './ClubCardExplore.module.scss';

export default function({ artist }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push('/home?artist=' + artist.id);
  }

  return (
    <a href={'/home?artist=' + artist.id} onClick={handleClick} className={styles.container}>
      <div style={{backgroundImage: `url(${artist.src})`}} className={styles.image}></div>
      <div className={styles.name}>{artist.name}</div>
    </a>
  );
}
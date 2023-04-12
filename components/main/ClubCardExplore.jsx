import { useRouter } from 'next/router';
import styles from './ClubCardExplore.module.scss';

export default function({ artist }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault()
    router.push(artist.href)
  }

  return (
    <a href={artist.href} onClick={handleClick} className={styles.container}>
      <div style={{backgroundImage: `url(${artist.src})`}} className={styles.image}></div>
      <div className={styles.name}>{artist.name}</div>
    </a>
  );
}
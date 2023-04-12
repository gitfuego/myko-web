import { useRouter } from 'next/router';
import styles from './ClubCardProfile.module.scss';

export default function({ artist }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(artist.href);
  }

  return (
    <a href={artist.href} onClick={handleClick}
     style={{backgroundImage: `url(${artist.src})`}} className={styles.image}>
      <div className={styles.name}>{artist.name.toUpperCase()}</div>
    </a>
  );
}
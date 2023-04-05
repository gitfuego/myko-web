import { useRouter } from "next/router";
import styles from "./Header.module.scss";

export default function({ user, handleClick }) {
  const router = useRouter();

  return (
    <header className={styles.topContainer}>
      <div className={styles.topSub}></div>
      <div className={styles.topSub}>
        <a href='#' onClick={() => router.push('/')}>
          <img src={user === null ? "/mykoWhite.svg" : "/mykoGradient.svg"} />
        </a>
      </div>
      <div className={styles.topSub}>
        <button id='login' className={styles.button} onClick={handleClick}>{user === null ? 'LOGIN' : 'SIGN OUT'}</button>
      </div>
    </header>
  );
}
import { useRouter } from "next/router";
import ActiveLink from "./ActiveLink";
import styles from "./Header.module.scss";
import { useEffect } from "react";

export default function({ user, handleClick }) {
  const router = useRouter();
  
  return (
    <header className={styles.topContainer}>
      <div className={styles.topSub}></div>
      <div className={styles.topSub}>
        <ActiveLink href={'/'}>
          <img src={!user ? "/mykoWhite.svg" : "/mykoGradient.svg"} />
        </ActiveLink>
      </div>
      <div className={styles.topSub}>
        {router.asPath === '/login' ? '' : <button id='login' 
        className={styles.button} 
        onClick={handleClick}>{user === null ? 'LOGIN' : 'SIGN OUT'}</button>}
      </div>
    </header>
  );
}
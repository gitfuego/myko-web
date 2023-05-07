import ActiveLink from "./ActiveLink";
import styles from "./Header.module.scss";

export default function({ user, handleClick }) {

  return (
    <header className={styles.topContainer}>
      <div className={styles.topSub}></div>
      <div className={styles.topSub}>
        <ActiveLink href={'/'}>
          <img src={!user ? "/mykoWhite.svg" : "/mykoGradient.svg"} />
        </ActiveLink>
      </div>
      <div className={styles.topSub}>
        <button id='login' className={styles.button} onClick={handleClick}>{user === null ? 'LOGIN' : 'SIGN OUT'}</button>
      </div>
    </header>
  );
}
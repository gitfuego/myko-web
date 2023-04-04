import styles from "./Header.module.scss";

export default function({ user, handleClick }) {

  return (
    <header className={styles.topContainer}>
      <div className={styles.topSub}></div>
      <div className={styles.topSub}>
        <a href='/'>
          <img src={user === null ? "/mykoWhite.svg" : "/mykogradient.svg"} />
        </a>
      </div>
      <div className={styles.topSub}>
        <button className={styles.button} onClick={handleClick}>{user === null ? 'LOGIN' : 'SIGN OUT'}</button>
      </div>
    </header>
  );
}
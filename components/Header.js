import styles from "./Header.module.scss";

export default function() {

  return (
    <header className={styles.topContainer}>
      <div className={styles.topSub}></div>
      <div className={styles.topSub}>
        <img src="/mykoWhite.svg" />
      </div>
      <div className={styles.topSub}>
        <button>LOGIN</button>
      </div>
    </header>
  );
}
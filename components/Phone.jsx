import styles from './Phone.module.scss'

export default function({children}) {
  return (
    <div className={styles.container}>
      <div id='login' className={styles.main} >
        {children}
      </div>
    </div>
  );
}
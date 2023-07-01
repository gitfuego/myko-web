import styles from './Phone.module.scss'

export default function({children}) {

  return (
    <div id='phone' className={styles.container}>
      <div className={styles.main} >
        {children}
      </div>
    </div>
  );
}
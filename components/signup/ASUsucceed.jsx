import styles from '../form.module.scss';

export default function() {
  <div className={styles.container}>
    <button type='button' className={styles.back} 
    style={{alignSelf: 'flex-start'}} 
    onClick={() => window.location.href = '/'}></button>
    <h2 className={styles.small}>Our team will be with you shortly!</h2>
    <div className={styles.small}>Please reach out to info@myko.vip if you have any further questions. </div>
  </div>
}
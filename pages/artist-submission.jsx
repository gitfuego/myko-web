import Phone from "../components/Phone";
import styles from '../components/form.module.scss';

export default function() {
  return (
    <Phone>
      <div className={styles.container} style={{height: '55%'}}>
        <button className={styles.back} 
        style={{alignSelf: 'flex-start'}} 
        onClick={() => window.location.href = '/'}></button>
        <h2 style={{padding: '0px 5%'}}>Our team will be with you shortly!</h2>
        <div className={styles.small} style={{height: '55%', padding: '0px 22%'}}>Please reach out to info@myko.vip if you have any further questions. </div>
      </div>
    </Phone>
  );
}
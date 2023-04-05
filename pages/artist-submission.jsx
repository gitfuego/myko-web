import Phone from "../components/Phone";
import styles from '../components/form.module.scss';
import { useRouter } from "next/router";

export default function() {
  const router = useRouter();
  return (
    <Phone>
      <div className={styles.container} style={{height: '55%'}}>
        <button className={styles.back} 
        style={{alignSelf: 'flex-start'}} 
        type="button" 
        onClick={() => router.push('/')}></button>
        <h2 style={{padding: '0px 5%'}}>Our team will be with you shortly!</h2>
        <div className={styles.small} style={{height: '55%', padding: '0px 22%'}}>Please reach out to info@myko.vip if you have any further questions. </div>
      </div>
    </Phone>
  );
}
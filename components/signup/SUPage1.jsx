import { useRouter } from 'next/router';
import styles from '../form.module.scss';

export default function({ formData, setFormData, nextPage }) {
  const router = useRouter();

  function handleNext() {
    nextPage();
  }

  return (
    <div>
      <button className={styles.back} type='button' onClick={() => router.back()}></button><br/>
      <h2 className={styles.heading}>Enter your phone number:</h2>
      <div className={styles.container}>
        <input
        type='tel'
        className={styles.inputField}
        placeholder="Phone number"
        value={formData.number}
        onChange={(event) =>
          setFormData({ ...formData, number: event.target.value })
        }
        />
        <button className={styles.blackbtn} onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}
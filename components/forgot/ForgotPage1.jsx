import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from '../form.module.scss';

export default function({ formData, setFormData, nextPage }) {
  const router = useRouter();

  function handleNext() {
    fetch('/api/sendCodeFP', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phoneNumber: '+' + formData.phoneNumber.replace(/\D/g,'')}),
    })
      .then((response) => response.json())
      .then((data) => {
        nextPage();
      })
  }

  const handleChange = (value, country, e, formattedValue) => {
    setFormData({...formData, phoneNumber: formattedValue});
  };

  return (
    <div className={styles.outer}>
      <button className={styles.back} type='button' onClick={() => router.back()}></button>
      <h2 className={styles.heading}>Enter your phone number to reset your password:</h2>
      <div className={styles.container}>
        <PhoneInput
          enableSearch
          inputProps={{id: 'phone-number'}}
          preferredCountries={['us']}
          placeholder='Phone number'
          containerClass={styles.inputField}
          inputClass={styles.inputSub}
          buttonStyle={{height: '65%', marginTop: '3%'}}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <button className={styles.blackbtn} onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}
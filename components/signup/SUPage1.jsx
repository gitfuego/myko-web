import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from '../form.module.scss';
import { useState, useEffect } from 'react';

export default function({ formData, setFormData, nextPage, setUserFound }) {
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    document.getElementById('phone-number').focus();
  }, [])

  function handleNext() {
    fetch('/api/sendCodeSU', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phoneNumber: '+' + formData.phoneNumber.replace(/\D/g,'')}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isRegistered) setUserFound(true);
        else nextPage();
      })
      .catch(() => {
        window.alert('Error: could not send code');
      })
  }

  const handleChange = (value, country, e, formattedValue) => {
    setFormData({...formData, phoneNumber: formattedValue});
  };

  return (
    <div className={styles.outer}>
      <button className={styles.back} type='button' onClick={() => router.back()}></button>
      <h2 className={styles.heading}>Enter your phone number:</h2>
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
        <label htmlFor='consent' style={{width: '75%'}}>
          <input id='consent' type='checkbox' className={styles.check} onChange={() => setChecked(!checked)} />
          {' '}By checking, you agree to be contacted via SMS and you agree to abide by our <a href='/terms' target='_blank' style={{color: 'blue'}}>Terms of Service</a>.
        </label>
        <button className={checked ? styles.blackbtn : styles.blackbtnDisabled} onClick={checked ? handleNext : () => undefined}>NEXT</button>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styles from '../form.module.scss'
import ActiveLink from '../ActiveLink';

export default function LoginForm({ user, setUser, setLoginFailed }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push('/home');
    else document.getElementById('phone-number').focus();
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber: '+' + phoneNumber.replace(/\D/g,''), password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((newUser) => {
        if (newUser.hasOwnProperty('user_id')) {
          setUser(newUser);
          router.push(`/home`);
        } else {
          setLoginFailed(true);
        }
      })
      .catch(() => {
        window.alert('error on submission')
      });
  };


  const handleChange = (value, country, e, formattedValue) => {
    setPhoneNumber(formattedValue);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container} style={{height: '60%'}}>
      <button className={styles.back} 
      style={{alignSelf: 'flex-start'}} 
      type='button'
      onClick={() => router.push('/') }></button>
      <h2>Welcome back!</h2>
      <PhoneInput
        enableSearch
        inputProps={{id: 'phone-number'}}
        preferredCountries={['us']}
        placeholder='Phone number'
        containerClass={styles.inputField}
        inputClass={styles.inputSub}
        buttonStyle={{height: '65%', marginTop: '3%'}}
        value={phoneNumber}
        onChange={handleChange}
      />
      <input
        className={styles.inputField}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className={styles.small}><ActiveLink href={'/forgot-password'} >Forgot my password</ActiveLink></div>
      <br/>
      <button className={styles.blackbtn} type="submit">LOG IN</button>
      <div className={styles.small}>New to <span className={styles.brand}>MYKO</span>? <ActiveLink href={'/signup'} >Sign up</ActiveLink></div>
    </form>
  );
}
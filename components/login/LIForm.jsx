import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../form.module.scss'
import ActiveLink from '../ActiveLink';

export default function LoginForm({ user, setUser, setLoginFailed }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push('/home');
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, password }),
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


  return (
    <form onSubmit={handleSubmit} className={styles.container} style={{height: '60%'}}>
      <button className={styles.back} 
      style={{alignSelf: 'flex-start'}} 
      type='button'
      onClick={() => router.push('/') }></button>
      <h2>Welcome back!</h2>
      <input
        className={styles.inputField}
        placeholder="Phone Number"
        type='tel'
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g,'') )}
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
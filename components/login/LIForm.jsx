import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../form.module.scss'

function LoginForm({ user, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    // fetch('INSERT API ENDPOINT HERE*****', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password }),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       // handle successful login
    //     } else {
    //       throw new Error('Login failed.');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    setUser(1);
    router.push('/home');
  };

  // useEffect(() => {
  //   document.getElementById('login').style.display = 'none';
  // }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.container} style={{height: '60%'}}>
      <button className={styles.back} 
      style={{alignSelf: 'flex-start'}} 
      type='button'
      onClick={() => router.push('/') }></button>
      <h2>Welcome back!</h2>
      <input
        className={styles.inputField}
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        className={styles.inputField}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      /> <br/>
      <button className={styles.blackbtn} type="submit">LOG IN</button>
      <div className={styles.small}>New to <span className={styles.brand}>MYKO</span>? <a href='#' onClick={() => router.push('/signup') } >Sign up</a></div>
    </form>
  );
}

export default LoginForm;
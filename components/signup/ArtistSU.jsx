import styles from '../form.module.scss';
import { use, useState } from 'react';
import { useRouter } from 'next/router';

export default function({toggleSignedUp}) {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    router.push('/artist-submission');
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  return (
    <form onSubmit={handleSubmit} className={styles.container} style={{height: '55%'}}>
      <button className={styles.back} 
      type='button'
      style={{alignSelf: 'flex-start'}} 
      onClick={() => router.push('/')}></button>
        <input
          className={styles.inputField}
          placeholder="Artist name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          />
          <input
          className={styles.inputField}
          placeholder="Email"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          />
        <input
          className={styles.inputField}
          id='password'
          placeholder="Password"
          type="password"
          minLength={3}
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
          />
      <div className={styles.small}>Password must be at least 8 characters</div>
      <button className={styles.blackbtn} type="submit">JOIN WAITLIST</button>
      <div className={styles.small}>Already have an account? <a href='#' onClick={() => router.push('/login')}>Sign in</a></div>
    </form>
  );
}
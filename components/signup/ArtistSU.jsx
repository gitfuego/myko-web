import styles from '../form.module.scss';
import { useState } from 'react';

export default function({toggleSignedUp}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    window.location.href= '/artist-submission';
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
      onClick={() => window.location.href = '/'}></button>
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
      <div className={styles.small}>Already have an account? <a href='/login'>Sign in</a></div>
    </form>
  );
}
import styles from '../form.module.scss';
import ActiveLink from '../ActiveLink';
import { useState } from 'react';

export default function({ formData, setFormData, setFailed, setSuccess }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password.length < 8 || formData.name.length < 1) {
      return setFailed(true);
    }
    fetch('/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData, phoneNumber: '+' + formData.phoneNumber.replace(/\D/g,'')}),
    })
    .then((response) => {
      setSuccess(true);
    })
    .catch(() => {
      setFailed(true);
    })
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  function toggleShowPassword() {
    setPasswordVisible(!passwordVisible);
  }

  
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Enter your name and password:</h2>
        <label htmlFor='name' className={styles.inputField}>
          <input
            className={styles.input}
            placeholder="Name"
            id='name'
            minLength={1}
            maxLength={50}
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            />
        </label>
        <label htmlFor='password' className={styles.inputField}>
          <input
            className={styles.input}
            id='password'
            placeholder="Password"
            type={passwordVisible ? "text" : "password"}
            minLength={8}
            maxLength={255}
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            />
            <button type='button' 
            className={styles.toggleShowPassword} 
            id="togglePassword" 
            onClick={toggleShowPassword}>
            </button>
        </label>
      </div>
      <div className={styles.small}>Password must be at least 8 characters</div><br/><br/>
      <button className={styles.blackbtn} type="submit">SIGN UP</button><br/>
      <div className={styles.small}>Already have an account? <ActiveLink href={'/login'}>Sign in</ActiveLink></div>
    </form>
  );
}
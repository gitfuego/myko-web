import styles from '../form.module.scss';
import { useState } from 'react';

export default function({ formData, setFormData, setSuccess, setFailed }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password1.length < 8 || formData.password1 !== formData.password2) {
      return setFailed(true);
    }
    fetch('/api/updatePassword', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phoneNumber: formData.phoneNumber, password: formData.password1}),
    })
    .then((response) => {
      setSuccess(true);
    })
    .catch(() => {
      setFailed(true);
    })
  };
  const [password1Visible, setPassword1Visible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  function toggleShowPassword1() {
    setPassword1Visible(!password1Visible);
  }

  function toggleShowPassword2() {
    setPassword2Visible(!password2Visible);
  }

  
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Enter your new password:</h2>
        <label htmlFor='password1' className={styles.inputField}>
          <input
            className={styles.input}
            id='password1'
            placeholder="New Password"
            type={password1Visible ? "text" : "password"}
            minLength={8}
            value={formData.password1}
            onChange={(event) =>
              setFormData({ ...formData, password1: event.target.value })
            }
            />
            <button type='button' 
            className={styles.toggleShowPassword} 
            id="togglePassword" 
            onClick={toggleShowPassword1}>
            </button>
        </label>
        <label htmlFor='password2' className={styles.inputField}>
          <input
            className={styles.input}
            id='password2'
            placeholder="Confirm Password"
            type={password2Visible ? "text" : "password"}
            minLength={8}
            value={formData.password2}
            onChange={(event) =>
              setFormData({ ...formData, password2: event.target.value })
            }
            />
            <button type='button' 
            className={styles.toggleShowPassword} 
            id="togglePassword" 
            onClick={toggleShowPassword2}>
            </button>
        </label>
      </div>
      <div className={styles.small}>Password must be at least 8 characters</div><br/><br/>
      <button className={styles.blackbtn} type="submit">RESET PASSWORD</button><br/>
    </form>
  );
}
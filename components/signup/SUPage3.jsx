import styles from '../form.module.scss';
import { useRouter } from 'next/router';
import ActiveLink from '../ActiveLink';

export default function({ formData, setFormData }) {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Enter your name and password:</h2>
        <input
          className={styles.inputField}
          placeholder="Name"
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
      </div>
      <br/>
      <div className={styles.small}>Password must be at least 8 characters</div><br/><br/>
      <button className={styles.blackbtn} type="submit">SIGN UP</button><br/>
      <div className={styles.small}>Already have an account? <ActiveLink href={'/login'}>Sign in</ActiveLink></div>
    </form>
  );
}
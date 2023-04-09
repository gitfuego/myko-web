import styles from './Main.module.scss';

export default function({user}) {
  return (
    <div style={{height: '100%'}} className={styles.profile}>
      <div className={styles.profilePicContainer}></div>
      <h4>{user}</h4>
      <div style={{height: '100%'}}>
      </div>
    </div>
  );
}
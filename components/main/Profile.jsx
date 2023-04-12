import ClubCardProfile from './ClubCardProfile';
import styles from './Main.module.scss';

export default function({user, hidden}) {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push(<ClubCardProfile key={'profilecard' + i} artist={{name: 'Drake', src: '/drake.jpeg', href: '/home?artist=Drake'}} />);
  }
  return (
    <div style={{height: '100%', display: hidden ? 'none' : 'block'}} >
      <div className={styles.profile}>
        <div className={styles.profilePicContainer}></div>
        <div className={styles.username}>{user}</div>
        <button type='button' className={styles.editButton}>Edit Profile</button>
        <div style={{alignSelf: 'flex-start', fontSize: '16px', margin: '0px 30px'}}>My Clubs</div>
      </div>
      <div className={styles.myClubsProfile}>{cards}</div>
    </div>
  );
}
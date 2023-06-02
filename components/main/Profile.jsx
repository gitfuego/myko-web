import { useRouter } from 'next/router';
import ClubCardProfile from './ClubCardProfile';
import styles from './Main.module.scss';

export default function({user, hidden}) {
  const router = useRouter();
  const cards = [];
  for (let i = 0; i < 1; i++) {
    cards.push(<ClubCardProfile key={'profilecard' + i} artist={{name: 'Drake', src: '/drake.jpeg', href: '/home?artist=Drake'}} />);
  }
  return (
    <div style={{height: '90%', display: hidden ? 'none' : 'block'}} >
      <div className={styles.profile}>
        <div className={styles.profilePicContainer} style={{backgroundImage: `url(${user?.profile_pic ?? '/profileicon.svg'})`}}></div>
        <div className={styles.username}>{user ? user.username : 'Name not found'}</div>
        <button onClick={() => router.push('/home?editProfile=true')} type='button' className={styles.editButton}>Edit Profile</button>
        <div style={{alignSelf: 'flex-start', fontSize: '16px', margin: '0px 30px'}}>My Clubs</div>
      </div>
      <div className={styles.myClubsProfile}>
        {cards}
      </div>
    </div>
  );
}
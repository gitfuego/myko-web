import { useRouter } from 'next/router';
import ClubCardProfile from './ClubCardProfile';
import styles from './Main.module.scss';

export default function({user, hidden, signout}) {
  const router = useRouter();
  const clubs = [];
  return (
    <div style={{height: '90%', display: hidden ? 'none' : 'block'}} >
      <div className={styles.profile}>
        <button type='button' className={styles.signOut} onClick={() => signout()}></button>
        <div className={styles.profilePicContainer} style={{backgroundImage: `url(${user?.profile_pic ?? '/profileicon.svg'})`}}></div>
        <div className={styles.username}>{user?.username ? user.username : 'Name not found'}</div>
        <button onClick={() => router.push('/home?editProfile=true')} type='button' className={styles.editButton}>Edit Profile</button>
        <div style={{alignSelf: 'flex-start', fontSize: '16px', margin: '0px 30px'}}>My Clubs</div>
      </div>
      <div className={styles.myClubsProfile}>
        {clubs.map(artist => <ClubCardProfile key={'homecard' + artist.id} artist={artist} />)}
      </div>
    </div>
  );
}
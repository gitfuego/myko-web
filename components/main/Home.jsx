import ClubCardHome from './ClubCardHome';
import styles from './Main.module.scss';
import { useEffect } from 'react';

export default function({user, hidden, userArtists}) {

  return (
    <div style={{height: '90%', display: hidden ? 'none' : 'block'}}>
      <header className={styles.header}>
        <h6>YOUR CLUBS</h6>
        <label htmlFor='search' className={styles.searchBox}>
          <div>
          <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4994 19.8621C16.118 19.8621 19.8621 16.118 19.8621 11.4994C19.8621 6.88081 16.118 3.13672 11.4994 3.13672C6.88081 3.13672 3.13672 6.88081 3.13672 11.4994C3.13672 16.118 6.88081 19.8621 11.4994 19.8621Z" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.9515 21.9515L17.4043 17.4043" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          </div>
          <input id='search' type="text" placeholder="Search chats" />
        </label>
      </header>
      <div className={styles.myClubsHome}>
        {userArtists.map(artist => <ClubCardHome key={'homecard' + artist.id} artist={artist} />)}
      </div>
    </div>
  );
}
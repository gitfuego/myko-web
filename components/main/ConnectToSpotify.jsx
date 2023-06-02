import styles from './ConnectToSpotify.module.scss';


export default function() {
  const CLIENT_ID = "9ed4ae02c05d4296857b53d2397fee6a";
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
  
  return (
    <div className={styles.outer}>
      <div className={styles.main}>
        <h1 style={{fontSize: '36px'}}>Connect your Spotify account to continue</h1>
        <a href={AUTH_URL} >
          <div className={styles.spotify}>
            <div>Connect to Spotify</div>
            <div className={styles.logo}></div>
          </div>
        </a>
      </div>
    </div>
  );
}
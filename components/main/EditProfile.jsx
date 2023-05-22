import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './EditProfile.module.scss';

export default function({ user, token, setToken, code }) {
  const router = useRouter();

  const CLIENT_ID = "9ed4ae02c05d4296857b53d2397fee6a";
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
  
  function handleSubmit(e) {
    e.preventDefault();
  }

  // function getAuthToken() {
  //   const authParameters = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET
  //   }
  //   fetch('https://accounts.spotify.com/api/token', authParameters)
  //   .then(result => result.json())
  //   .then(data => console.log(data))
  // }

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   let token = window.localStorage.getItem("token");

  //   if (!token && hash) {
  //     token = hash.substring(1).split('&').find(e => e.startsWith("access_token")).split("=")[1];

  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //     setToken(token);
  //   }
  // }, []);

  return (
  <div className={styles.outer}>
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.topFlex}>
          <button className={styles.back} type='button' onClick={() => { router.back() }}></button>
          <div className={styles.name}><span>Edit Profile</span></div>
          <a href=''>
            <div className={styles.image}></div>
          </a>
        </div>
      </header>
      { !code ? 
      <a href={AUTH_URL} >
        <div className={styles.spotify}>
          <div>Connect to Spotify</div>
          <div className={styles.logo}></div>
        </div>
      </a>
      : 
      <div className={styles.spotify}>Spotify Connected</div>
      }
      
      
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  </div>
  );
}
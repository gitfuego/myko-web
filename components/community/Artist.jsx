import { useEffect, useState } from "react";
import styles from './Artist.module.scss'
import Community from "./Community.jsx";
import Placeholder from "./Placeholder.jsx";
import SpotifyWebApi from 'spotify-web-api-node';
import Loading from "../Loading.jsx";
import { useRouter } from "next/router.js";

const spotifyApi = new SpotifyWebApi({
  clientId: "9ed4ae02c05d4296857b53d2397fee6a",
})

export default function({ user, artist, accessToken }) {
  const router = useRouter();
  const [ artistData, setArtistData ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/checkIfRegistered')
    .then(()=> {
      return //do something here (setIsRegistered then setLoading)
    })
  }, [artist]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getArtist(artist)
      .then(data => {
        setArtistData({
          src: data.body.images[0]?.url,
          name: data.body.name,
        })
      })
  }, [accessToken])

  return (
    <>
      { isLoading ? (
      <div className={styles.loadingContainer}>
        <button type='button'
        style={{alignSelf: 'flex-start', margin: '30px 20px'}}
        className={styles.back}
        onClick={() => router.back()}></button>
        <div className={styles.loadingSub}>
          <Loading />
        </div>
      </div>):
      isRegistered ? 
      <Community artist={artist} user={user} artistData={artistData} /> : 
      <Placeholder artist={artist} user={user} artistData={artistData} /> }
    </>
  );
}
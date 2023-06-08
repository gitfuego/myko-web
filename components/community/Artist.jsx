import { useEffect, useState } from "react";
import Community from "./Community.jsx";
import Placeholder from "./Placeholder.jsx";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: "9ed4ae02c05d4296857b53d2397fee6a",
})

export default function({ user, artist, accessToken }) {
  const [ artistData, setArtistData ] = useState(null);

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
      { false ? 
      <Community artist={artist} user={user} artistData={artistData} /> : 
      <Placeholder artist={artist} user={user} artistData={artistData} /> }
    </>
  );
}
import { useState, useEffect } from 'react';
import Phone from '../components/Phone.jsx';
import Nav from '../components/main/Nav.jsx';
import Home from '../components/main/Home.jsx';
import Explore from '../components/main/Explore.jsx';
import Profile from '../components/main/Profile.jsx';
import Artist from '../components/community/Artist.jsx';
import EditProfile from '../components/main/EditProfile.jsx';
import { useRouter } from 'next/router.js';
import ConnectToSpotify from '../components/main/ConnectToSpotify.jsx';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: "9ed4ae02c05d4296857b53d2397fee6a",
});


export default function({ user, setUser, accessToken, setCode, signout }) {
  // state will be either home, explore, or profile
  const [ tab, changeTab ] = useState('explore');
  const router = useRouter();
  const { artist, editProfile } = router.query;

  const [initArtists, setInitArtists] = useState([]);
  const [userArtistIDs, setUserArtistIDs] = useState([]);
  const [userArtists, setUserArtists] = useState([]);
  

  useEffect(() => {
    if (user === null) router.push('/login');
  })

  useEffect(() => {
    const authCode = new URLSearchParams(window.location.search).get('code');
    setCode(authCode);
   }, [])

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken]);

  useEffect(() => {
    if (!user?.user_id) return;
    fetch(`/api/getFollowed/${user.user_id}`)
    .then((response) => response.json())
    .then((artists) => {
      setUserArtistIDs(artists.map((artist) => artist.artist_id));
    })
    .catch(() => console.log('could not fetch followed artists'))
  }, [user])

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getPlaylistTracks('37i9dQZEVXbLRQDuF5jeBp')
      .then(res => {
        const set = new Set();
        res.body.items.forEach(item => {
          set.add(item.track.artists[0].id);
        });
        const arr = Array.from(set);
        arr.length = 20;
        return arr;
      })
      .then(artistIDs => {
        return spotifyApi.getArtists(artistIDs);
      })
      .then(res => {
        setInitArtists(
          res.body.artists.map(artist => {
            return { 
              id: artist.id,
              src: artist.images[0]?.url,
              name: artist.name,
            };
          })
        )
      })
      .catch(err => {
      console.log('Error retrieving top artists:', err);
      });
  }, [accessToken])

   useEffect(() => {
    if (!accessToken || userArtistIDs.length < 1) return;
    spotifyApi.getArtists([...userArtistIDs])
    .then(res => {
      setUserArtists(
        res.body.artists.map(artist => {
          return { 
            id: artist.id,
            src: artist.images[0]?.url,
            name: artist.name,
          };
        })
      )
    })
    .catch(err => {
    console.log('Error retrieving user artists:', err);
    });
  }, [userArtistIDs, accessToken])

  return (
    <Phone>
      { !accessToken ? <ConnectToSpotify/> : ''}
      { artist ? <Artist artist={artist} user={user} accessToken={accessToken} setUserArtistIDs={setUserArtistIDs} userArtistIDs={userArtistIDs}/> : '' }
      { editProfile ? <EditProfile user={user} setUser={setUser} /> : '' }
      <Home key='home' user={user} hidden={tab !== 'home'} accessToken={accessToken} userArtists={userArtists}/>
      <Explore key='explore' user={user} hidden={tab !== 'explore'} accessToken={accessToken} initArtists={initArtists}/>
      <Profile key='profile' user={user} hidden={tab !== 'profile'} accessToken={accessToken} signout={signout} userArtists={userArtists}/>
      <Nav key='nav' tab={tab} changeTab={changeTab} />
    </Phone>
  )
}
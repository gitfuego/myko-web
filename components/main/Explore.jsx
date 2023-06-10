import { useEffect, useState } from 'react';
import ClubCardExplore from './ClubCardExplore';
import styles from './Main.module.scss';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: "9ed4ae02c05d4296857b53d2397fee6a",
})

export default function({user, hidden, accessToken, initArtists }) {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(initArtists);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults(initArtists);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchArtists(search)
    .then(res => {
      if (cancel) return;
      setSearchResults(
        res.body.artists.items.map(artist => {
          return { 
            id: artist.id,
            src: artist.images[0]?.url,
            name: artist.name,
          };
        })
      )
    })
    return () => cancel = true;
  }, [search, accessToken, initArtists])

  return (
    <div style={{height: '90%', display: hidden ? 'none' : 'block'}}>
      <header className={styles.header}>
        <h6>EXPLORE</h6>
        <label htmlFor='search' className={styles.searchBox}>
          <div>
          <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4994 19.8621C16.118 19.8621 19.8621 16.118 19.8621 11.4994C19.8621 6.88081 16.118 3.13672 11.4994 3.13672C6.88081 3.13672 3.13672 6.88081 3.13672 11.4994C3.13672 16.118 6.88081 19.8621 11.4994 19.8621Z" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.9515 21.9515L17.4043 17.4043" stroke="#CECECE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          </div>
          <input id='search' 
          type="text" 
          placeholder="Search artists" 
          value={search}
          onChange={e => setSearch(e.target.value)}/>
        </label>
      </header>
      <div className={styles.clubsExplore}>
        {searchResults.map(artist => <ClubCardExplore key={'explorecard' + artist.id} artist={artist} />)}
      </div>
    </div>
  );
}
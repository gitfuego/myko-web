import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from './Community.module.scss';
import Message from './Message';
import socket from '../../lib/socket';
import SpotifyWebApi from 'spotify-web-api-node';
import { getAccordionSummaryUtilityClass } from '@mui/material';

const spotifyApi = new SpotifyWebApi({
  clientId: "9ed4ae02c05d4296857b53d2397fee6a",
})


export default function({ user, artist, accessToken }) {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [ messages, setMessages] = useState([]);
  const [ artistData, setArtistData ] = useState(null);

  useEffect(() => {
    if (!artist) return;
    fetch(`/api/messages/${artist}`)
    .then(response => response.json())
    .then(newMessages => {
      setMessages([...newMessages])
    });
  }, [artist])

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

  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    socket.emit('join',  {user, room: artist} )

    // Listen for 'message' events
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Disconnect from the socket.io server
      socket.disconnect();
    };
  }, [artist]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const [messageText, setMessageText] = useState('');

  function handleSend(e) {
    if (e.key === 'Enter' && messageText.length > 0) {
      socket.emit('message', {
        userID: user.user_id,
        username: user.username,
        profile_pic: user.profile_pic,
        artistID: artist,
        message_text: messageText
      });
      setMessageText('');
    }
  }

  return (
  <div className={styles.outer}>
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.topFlex}>
          <button className={styles.back} type='button' onClick={() => { router.back() }}></button>
          <div className={styles.name}><span>{artistData ? artistData.name : 'loading...'}</span></div>
          <a href='#'>
            <div style={{backgroundImage: `url(${artistData?.src})`}} className={styles.image}></div>
          </a>
        </div>
      </header>
      <div className={styles.messageContainer}>
        {messages.map((msgData) => <Message data={msgData} />)}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.sendContainer} >
        <div className={styles.sub}>
          <input type='text'
          placeholder='Send Message...' 
          className={styles.type} 
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          onKeyDown={handleSend}/>
          <button type='button' className={styles.plus}></button>
        </div>
      </div>
    </div>
  </div>
  );
}
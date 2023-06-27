import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from './Artist.module.scss';
import Message from './Message';
import Loading from '../Loading';
import socket from '../../lib/socket';
import DropdownMenu from '../DropDown';

export default function({ user, artist, artistData, setUserArtistIDs, userArtistIDs}) {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [allMessagesFetched, setAllMessagesFetched] = useState(false);
  const [loadFlag, setLoadFlag] = useState(false);

  useEffect(() => {
    if (!artist) return;
    fetch(`/api/messages/${artist}/${user.user_id}`)
    .then(response => response.json())
    .then(newMessages => {
      if (newMessages?.length) setMessages([...newMessages]);
      if (newMessages.length < 10) setAllMessagesFetched(true);
    });
  }, [artist])

  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    socket.emit('join',  {user, room: artist} )

    // Listen for 'message' events
    socket.on('message', (message) => {
      setLoadFlag(false);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Disconnect from the socket.io server
      socket.disconnect();
    };
  }, [artist]);

  useEffect(() => {
    if (!loadFlag) messagesEndRef.current?.scrollIntoView();
  }, [messages, artist]);

  const [messageText, setMessageText] = useState('');
  const [messageMedia, setMessageMedia] = useState(undefined);

  function changeImage(e) {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      setMessageMedia(dataURL);
    }

    reader.readAsDataURL(input.files[0]);
  }

  async function handleSend(e, isBtn = false) {
    if (!isBtn) {
      if (e.key !== 'Enter' || messageText.length === 0) return;
    }

    const file = document.getElementById('attach').files[0];
    let imageUrl;
    if (file) {
      // get url in s3 bucket from server endpoint
      const { url } = await fetch('/api/s3Url').then(res => res.json())
      
      // post image to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: file
      })
  
      imageUrl = url.split('?')[0];
    }

    socket.emit('message', {
      userID: user.user_id,
      username: user.username,
      profile_pic: user.profile_pic,
      artistID: artist,
      message_text: messageText,
      message_media: imageUrl
    });
    setMessageMedia(undefined);
    setMessageText('');
  }

  function likeEmit(msgID) {
    socket.emit('like', { messageID: msgID, userID: user.user_id });
  }

  function unlikeEmit(msgID) {
    socket.emit('unlike', { messageID: msgID, userID: user.user_id });
  }

  function loadMoreMessages() {
    setLoadFlag(true);
    setFetchingMessages(true);
    fetch(`/api/loadMoreMessages/${artist}/${user.user_id}/${messages.length}`)
      .then(response => response.json())
      .then(newMessages => {
        if (newMessages?.length) {
          setMessages((prevMessages) => [...newMessages, ...prevMessages]);
          setFetchingMessages(false);
        } 
        if (newMessages.length < 10){
          setAllMessagesFetched(true);
        }
      })
      .catch(() => {
        console.log('error fetching more messages');
      });
  }

  return (
  <div className={styles.outer}>
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.topFlex}>
          <button className={styles.back} type='button' onClick={() => { router.back() }}></button>
          <div className={styles.name}><span>{artistData ? artistData.name : <Loading/>}</span></div>
          <DropdownMenu setUserArtistIDs={setUserArtistIDs} userArtistIDs={userArtistIDs} user={user} artist={artist}>
            <div style={{backgroundImage: `url(${artistData?.src})`}} className={styles.image}></div>
          </DropdownMenu>
        </div>
      </header>
      <div className={styles.messageContainer}>
        { allMessagesFetched ? '' : fetchingMessages ? <Loading /> 
        : <button type='button' className={styles.loadMore} onClick={loadMoreMessages}>Load More</button>}
        {messages.map((msgData, idx) => <Message key={idx} data={msgData} likeEmit={likeEmit} unlikeEmit={unlikeEmit} />)}
        <div key={'endref'} ref={messagesEndRef} />
      </div>
      <div className={styles.sendContainer} >
        <div className={styles.sub}>
          <input type='text'
          placeholder='Send Message...' 
          className={styles.type} 
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          onKeyDown={handleSend}/>
          {messageText.length > 0 ?
          <button type='button' className={styles.sendButton} onClick={(e) => handleSend(e, true)}></button> : ''}
          <button type='button' className={styles.plus} onClick={() => {document.getElementById('attach').click()}} />
        </div>
        {messageMedia ? <img className={styles.attachment} src={messageMedia}/> : ''}
        <input id='attach' type='file' accept='image/*' onChange={changeImage} style={{display: 'none'}} /> 
      </div>
    </div>
  </div>
  );
}
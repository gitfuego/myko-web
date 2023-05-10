import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import styles from './Community.module.scss';
import Message from './Message';
import socket from '../../lib/socket';


export default function({ user, artist }) {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [ messages, setMessages] = useState([]);

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
      socket.emit('message', {...user, artist, message: messageText});
      setMessageText('');
    }
  }

  return (
  <div className={styles.outer}>
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.topFlex}>
          <button className={styles.back} type='button' onClick={() => { router.back() }}></button>
          <div className={styles.name}><span>{"Drake"}</span></div>
          <a href='#'>
            <div style={{backgroundImage: `url('/drake.jpeg')`}} className={styles.image}></div>
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
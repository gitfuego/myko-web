import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Community.module.scss';
import Message from './Message';

export default function({ user, artist }) {
  const router = useRouter();
  
  const [messageText, setMessageText] = useState('');

  const messages = [];
  for (let i = 0; i < 20; i++) {
    messages.push(<Message sender={{name: 'Drake', src: '/drake.jpeg'}} />);
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
        {messages}
      </div>
      <div className={styles.sendContainer} >
        <div className={styles.sub}>
          <input type='text'
          placeholder='Send Message...' 
          className={styles.type} 
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}/>
          <button type='button' className={styles.plus}></button>
        </div>
      </div>
    </div>
  </div>
  );
}
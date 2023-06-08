import { useRouter } from "next/router";
import { useState } from "react";
import styles from './Artist.module.scss'
import Message from "./Message.jsx";

export default function({ user, artist, artistData }) {
  const router = useRouter();

  const [reqCount, setReqCount] = useState(0);

  function requestArtist() {
    window.alert('artist requested!')
  }

  const messages = [];
  for (let i = 0; i < 6; i++) {
    let msgData;
    if (i === 0) {
      msgData={profile_pic: '/drake.jpeg', username: 'DRAKE', message_text: 'Hey guys, check out an unreleased snippet here: www.soundcloud.com/newsnippet'};
    } else if (i % 2 === 0) {
      msgData={profile_pic: '/jb.jpeg', username: 'John Smith', message_text: 'Yo, this app is so dope'};
    } else {
      msgData={profile_pic: '/sza.jpg', username: 'Marco Vincent', message_text: 'It is frr'};
    }
    messages.push(<Message data={msgData} />)
  }

  return (
    <div className={styles.outer}>
      <div className={styles.main}>
        <header className={styles.banner} style={{backgroundImage: `url(${artistData?.src})`}}>
          <div className={styles.topFlex}>
            <button className={styles.backAlt} type='button' onClick={() => { router.back() }}></button>
            <div className={styles.name}><span>{artistData ? artistData.name : 'loading...'}</span></div>
            <div></div>
          </div>
        </header>
        <div className={styles.messageContainer2}>
          {messages}
        </div>
        <div className={styles.sendContainer} >
          <div>{reqCount} users have requested this community</div>
          <button type="button" className={styles.reqButton}
          onClick={requestArtist}>Request!</button>
        </div>
      </div>
    </div>
    );
}
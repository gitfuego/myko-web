import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from './Artist.module.scss'
import Message from "./Message.jsx";
import Loading from "../Loading";

export default function({ user, artist, artistData }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [reqCount, setReqCount] = useState(0);
  const [requested, setRequested] = useState(true);

  function requestArtist() {
    fetch('/api/artistRequest', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID: user.user_id, artistID: artist}),
    })
      .then((response) => response.json())
      .then((data) => {
        setRequested(true);
        setReqCount(reqCount + 1);
      })
      .catch(() => {
        window.alert('error: could not send request')
      })
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/getRequests/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID: user.user_id, artistID: artist}),
    })
      .then((response) => response.json())
      .then((data) => {
        setReqCount(data.numRequests);
        setRequested(data.didRequest);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('could not get number of requests')
      })
  }, [artist]);

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
    messages.push(<Message key={'fakemsg' + i} data={msgData} />)
  }

  return (
    <div className={styles.outer}>
      <div className={styles.main}>
        <header className={styles.banner} style={{backgroundImage: `url(${artistData?.src})`}}>
          <div className={styles.topFlex}>
            <button className={styles.backAlt} type='button' onClick={() => router.back()}></button>
            <div className={styles.name}><span>{artistData ? artistData.name : <Loading color={'white'}/>}</span></div>
            <div></div>
          </div>
        </header>
        <div className={styles.messageContainer2}>
          {messages}
        </div>
        <div className={styles.sendContainer} >
          {isLoading ? <Loading /> : 
          <div className={styles.reqContainer}>
            <div>{`${reqCount} ${reqCount === 1 ? 'user has' : 'users have'} requested this community`}</div>
            {requested ?
            <div className={styles.requested}><div>Requested</div></div> :
            <button type="button"
            className={styles.reqButton}
            onClick={requestArtist}>Request!</button>}
          </div>}
        </div>
      </div>
    </div>
    );
}
import { useEffect, useState } from 'react';
import styles from './Message.module.scss';
import Linkify from 'linkify-react';
import socket from '../../lib/socket';

export default function({ data, likeEmit, unlikeEmit }) {

  const [likeCount, setLikeCount] = useState(Number(data.like_count?? 0));
  const [liked, setLiked] = useState(data.user_liked === 1);

  useEffect(() => {
    socket.off(`like:${data.message_id}`);
    socket.off(`unlike:${data.message_id}`);

    socket.on(`like:${data.message_id}`, () => {
      setLikeCount((prevCount) => prevCount + 1);
    });

    socket.on(`unlike:${data.message_id}`, () => {
      setLikeCount((prevCount) => prevCount - 1);
    });

    return () => {
      socket.off(`like:${data.message_id}`);
      socket.off(`unlike:${data.message_id}`);
    };
  }, [data.message_id])

  function handleLike() {
    if (!liked) {
      likeEmit(data.message_id);
    } else {
      unlikeEmit(data.message_id);
    }
    setLiked(!liked);
  }

  // abbreviates number
  function aN(number){
    const SI_SYMBOL = ["", "k", "m", "b", "t", "q"];

    // what tier? (determines SI symbol)
    const tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
  }

  return (
    <div className={styles.container}>
      <div style={{backgroundImage: `url(${data.profile_pic ?? '/profilePlaceholder.svg'})`}} className={styles.image}></div>
      <div className={styles.textContainer}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div className={styles.name}>{data.username ?? "error: unknown username"}</div>
          { data.verified === 1 ? <div className={styles.verified} ></div> : '' }
        </div>
        <div className={styles.message}>
          <Linkify as="div" options={{target: "_blank", className: styles.link}}>
            {data.message_text ?? "error: message not found"}
          </Linkify>
        </div>
        {data.message_media ? <img className={styles.attachment} src={data.message_media}/> : ''}
      </div>
      <div className={styles.likeContainer}>
        <button type='button'
         onClick={handleLike} 
         className={styles.like} 
         style={{backgroundImage: `url(${liked ? 'heartFull.svg' : '/heartEmpty.svg'})`}}></button>
        <div className={styles.likeCount}>{aN(likeCount)}</div>
      </div>
    </div>
  )
}
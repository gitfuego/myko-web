import styles from './Message.module.scss';

export default function({ data }) {

  const SI_SYMBOL = ["", "k", "m", "b", "t", "q"];
  // abbreviates number
  function aN(number){

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

  function like() {
    return;
  }
  return (
    <div className={styles.container}>
      <div style={{backgroundImage: `url(${data.profile_pic ?? '/drake.jpeg'})`}} className={styles.image}></div>
      <div className={styles.textContainer}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div className={styles.name}>{data.username ?? "user"}</div>
          { data.verified === 1 ? <div className={styles.verified} ></div> : '' }
        </div>
        <div className={styles.message}>{data.message ?? "hi"}</div>
      </div>
      <div className={styles.likeContainer}>
        <button type='button'
         onClick={like} 
         className={styles.like} 
         style={{backgroundImage: `url('/heart.svg')`}}></button>
        <div className={styles.likeCount}>{aN(0)}</div>
      </div>
    </div>
  )
}
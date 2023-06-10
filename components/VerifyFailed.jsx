import { useEffect, useState } from 'react'
import Loading from './Loading'
import styles from './form.module.scss'

export default function({ failureExit }) {
  const [canExit, setCanExit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCanExit(true);
    }, 10000)
  }, [])

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUp}>
        {canExit ? <button type='button' className={styles.x} onClick={failureExit}></button> : 
        <div style={{height: '30px'}}><Loading/></div> }
        <div className={styles.msg}>Verification failed. Please try again{!canExit ? ' after ten seconds' : ''}.</div>
      </div>
    </div>
  )
}
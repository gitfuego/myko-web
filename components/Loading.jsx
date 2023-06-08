import styles from './Loading.module.scss'

export default function({color = 'black'}) {
  
  return (
    <div className={styles.ldsellipsis}>
      <div style={{backgroundColor: color}}></div>
      <div style={{backgroundColor: color}}></div>
      <div style={{backgroundColor: color}}></div>
      <div style={{backgroundColor: color}}></div>
    </div>
  )
}
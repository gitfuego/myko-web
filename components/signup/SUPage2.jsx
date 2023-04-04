import styles from '../form.module.scss';
import { useState } from 'react';

export default function({ nextPage, backPage }) {

  function handleNext() {
    nextPage();
  }

  const [ digit1, setDigit1 ] = useState(null);
  const [ digit2, setDigit2 ] = useState(null);
  const [ digit3, setDigit3 ] = useState(null);
  const [ digit4, setDigit4 ] = useState(null);
  
  return (
    <div>
      <button className={styles.back} onClick={backPage}></button>
      <div className={styles.enterCode}>Enter your code</div>
      <div className={styles.container}>
        <div className={styles.digits} >
          <input
            id='digit1'
            maxLength={1}
            className={styles.inputCode}
            value={digit1}
            onChange={(event) => setDigit1(event.target.value)}
          />
          
          <input
            id='digit2'
            maxLength={1}
            className={styles.inputCode}
            value={digit2}
            onChange={(event) => setDigit2(event.target.value)}
          />
          
          <input
            id='digit3'
            maxLength={1}
            className={styles.inputCode}
            value={digit3}
            onChange={(event) => setDigit3(event.target.value)}
          />
          
          <input
            id='digit4'
            maxLength={1}
            className={styles.inputCode}
            value={digit4}
            onChange={(event) => setDigit4(event.target.value)}
          />
          
        </div>
        <button className={styles.blackbtn} onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}
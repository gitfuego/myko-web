import styles from '../form.module.scss';
import { useState } from 'react';

export default function({ nextPage, backPage }) {


  function handleNext() {
    const code = [digit1, digit2, digit3, digit4].join('');
    nextPage();
  }

  function handleInput(event) {
    const input = event.target;
    if (input.value.length >= input.maxLength) {
      const next = input.nextElementSibling;
      if (next != null && next.tagName.toLowerCase() === 'input') {
        next.focus();
      }
    }
  }

  const [ digit1, setDigit1 ] = useState(null);
  const [ digit2, setDigit2 ] = useState(null);
  const [ digit3, setDigit3 ] = useState(null);
  const [ digit4, setDigit4 ] = useState(null);

  
  return (
    <div>
      <button className={styles.back} type='button' onClick={backPage}></button>
      <h2 className={styles.enterCode}>Enter your code</h2>
      <div className={styles.container}>
        <div className={styles.digits} >
          <input
            id='digit1'
            type='tel'
            maxLength={1}
            className={styles.inputCode}
            value={digit1}
            onChange={(event) => setDigit1(event.target.value)}
            onInput={handleInput}
          />
          
          <input
            id='digit2'
            type='tel'
            maxLength={1}
            className={styles.inputCode}
            value={digit2}
            onChange={(event) => setDigit2(event.target.value)}
            onInput={handleInput}
          />
          
          <input
            id='digit3'
            type='tel'
            maxLength={1}
            className={styles.inputCode}
            value={digit3}
            onChange={(event) => setDigit3(event.target.value)}
            onInput={handleInput}
          />
          
          <input
            id='digit4'
            type='tel'
            maxLength={1}
            className={styles.inputCode}
            value={digit4}
            onChange={(event) => setDigit4(event.target.value)}
            onInput={handleInput}
          />
          
        </div>
        <button className={styles.blackbtn} onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}
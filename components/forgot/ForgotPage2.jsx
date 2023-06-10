import styles from '../form.module.scss';
import { useEffect, useState } from 'react';

export default function({ formData, nextPage, backPage, setVerifyFailed }) {

  function handleNext() {
    const code = [digit1, digit2, digit3, digit4].join('');
    fetch('/api/verifyPhone', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phoneNumber: formData.phoneNumber, code}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.didVerify) nextPage();
        else setVerifyFailed(true);
      })
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

  const [ digit1, setDigit1 ] = useState('');
  const [ digit2, setDigit2 ] = useState('');
  const [ digit3, setDigit3 ] = useState('');
  const [ digit4, setDigit4 ] = useState('');

  useEffect(() => {
    document.getElementById('digit1').focus();
  }, [])

  function handlePaste(e) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const inputs = document.querySelectorAll('input[type="tel"]');
    inputs.forEach((input, index) => {
      input.value = pastedText[index];
    })
    inputs[3].focus();
  }
  
  return (
    <div className={styles.outer}>
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
            onPaste={handlePaste}
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
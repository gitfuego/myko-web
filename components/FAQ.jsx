import styles from './FAQ.module.scss';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import FadeIn from './FadeIn';

export default function({ fanArr, artistArr }) {
  const fanQs = [];
  const artistQs = [];
  for (let i = 0; i < fanArr.length; i++) {
    fanQs.push(
      <div style={{margin: '3% auto'}}>
        <FadeIn direction={'down'}>
          <Accordion className={styles.question} style={{borderRadius: '100px', padding: '5%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'lightblue'}} />}>
              {fanArr[i].question}
            </AccordionSummary>
            <AccordionDetails className='answer' style={{backgroundColor: 'rgba(0,0,0,0.3)', fontSize: '25px', borderRadius: '55px', padding: '5%'}}>
              {fanArr[i].answer}
            </AccordionDetails>
          </Accordion>
        </FadeIn>
      </div>
    );
  }
  for (let i = 0; i < artistArr.length; i++) {
    artistQs.push(
      <div style={{margin: '3% auto'}}>
        <FadeIn direction={'down'}>
          <Accordion className={styles.question} style={{borderRadius: '100px', padding: '5%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'lightblue'}} />}>
              {artistArr[i].question}
            </AccordionSummary>
            <AccordionDetails className='answer' style={{backgroundColor: 'rgba(0,0,0,0.3)', fontSize: '25px', borderRadius: '55px', padding: '5%'}}>
              {artistArr[i].answer}
            </AccordionDetails>
          </Accordion>
        </FadeIn>
      </div>
    );
  }

  const [demo, setDemo] = useState('fans');

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faq}>FAQs for</div>
      <label htmlFor="demo">
      <select id="demo" onChange={() => setDemo(demo === 'fans' ? 'artists' : 'fans')} className={styles.faqSelect}>
        <option value="fans">Fans</option>
        <option value="artists">Artists</option>
      </select>
      </label>
      <div className={styles.accContainer}>{demo === 'fans' ? fanQs : artistQs}</div>
    </div>
  );
}
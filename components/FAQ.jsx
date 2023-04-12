import styles from './FAQ.module.scss';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import FadeIn from './FadeIn';

function CustomAccordion({ q, a }) {
  const [expanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <div type='button' onClick={handleClick} className={styles.faqWrapper}>
      <Accordion className={styles.question} expanded={expanded} style={{borderRadius: '100px', padding: '5%', textAlign: 'center'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'lightblue'}}/>}>
          <div style={{textAlign: 'center', width: '100%', fontSize: '40px'}}>{q}</div>
        </AccordionSummary>
        <AccordionDetails style={{ /*backgroundColor: 'rgba(0,0,0,0.3)', */fontSize: '40px', borderRadius: '55px', padding: '2% 0% 0%', fontFamily: 'Helvetica', fontWeight: '400', color: 'white'}}>
          {a}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


export default function({ fanArr, artistArr }) {
  const fanQs = [];
  const artistQs = [];
  for (let i = 0; i < fanArr.length; i++) {
    fanQs.push(
      <div style={{margin: '3% auto'}}>
        <FadeIn direction={'down'}>
          <CustomAccordion q={fanArr[i].question} a={fanArr[i].answer} />
        </FadeIn>
      </div>
    );
  }
  for (let i = 0; i < artistArr.length; i++) {
    artistQs.push(
      <div style={{margin: '3% auto'}}>
        <FadeIn direction={'down'}>
          <CustomAccordion q={artistArr[i].question} a={artistArr[i].answer} />
        </FadeIn>
      </div>
    );
  }

  const [demo, setDemo] = useState('artists');

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faq}>FAQs for</div>
      <label htmlFor="demo">
      <select id="demo" onChange={() => setDemo(demo === 'artists' ? 'fans' : 'artists')} className={styles.faqSelect}>
        <option value="artists">Artists</option>
        <option value="fans">Fans</option>
      </select>
      </label>
      <div className={styles.accContainer}>{demo === 'fans' ? fanQs : artistQs}</div>
    </div>
  );
}
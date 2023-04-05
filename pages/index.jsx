import FadeIn from "../components/FadeIn";
import FAQ from "../components/FAQ";

export default function() {
  const fanQs = [
    {question: 'WHAT IS MYKO?', answer: 'placeholder'},
    {question: "HOW CAN I JOIN AN ARTIST'S COMMUNITY?", answer: 'placeholder'},
    {question: "WHAT CAN I DO IF I DON'T QUALIFY?", answer: 'placeholder'}
  ];
  const artistQs = [
    {question: 'WHAT IS MYKO?', answer: 'placeholder'},
    {question: "WHO CAN JOIN MY COMMUNITY?", answer: 'placeholder'},
    {question: "CAN I MAKE MONEY FROM THIS?", answer: 'placeholder'}
  ];
  return (
    <div className="content">
      <section className="splash">
        <div className="landing-text">
          <div className="main">Where artists and their top listeners hang out.</div>
          <div className="sub">Connect with Spotify and see which communities you qualify for!</div>
        </div>
        <div>
          <img id="landing-phone" src='/landingPhone.svg' />
        </div>
      </section>
      <section className="entrance-container">
        <FadeIn direction={'left'}>
          <a href="/signup">
            <div className="rainbow-btn">I'M A FAN</div>
          </a>
        </FadeIn>
        <FadeIn direction={'right'}>
          <a href="/artist-signup">
          <div className="rainbow-btn">I'M AN ARTIST</div>
          </a>
        </FadeIn>
      </section>
      <FadeIn>
        <div className="splash" style={{fontSize: '80px', textAlign: 'center'}}>Connect with your favorite artists today!</div>
      </FadeIn>
      <section id='artist-gallery'>
            <img src='/badbunny.png' />
            <img src='/taylorswift.jpeg' />
            <img src='/sza.jpg' />
            <img src='/jb.jpeg' />
            <img src='/drake.jpeg' />
            <img src='/edsheeran.jpeg' />
            <img src='/shakira.jpeg' />
      </section>
      <section>
        <FAQ 
        fanArr={fanQs} 
        artistArr={artistQs} />
      </section>
    </div>
  );
};
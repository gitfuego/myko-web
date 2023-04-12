import FadeIn from "../components/FadeIn";
import FAQ from "../components/FAQ";

export default function() {
  const artistQs = [
    {question: 'WHAT IS MYKO?', answer: 'Myko is an exclusive access community chatroom for music artists and their top fans to more closely connect away from social media'},
    {question: "WHO CAN JOIN MY COMMUNITY?", answer: 'Anyone. You control how exclusive or inclusive your community is based on your monthly listening requirement and subscription price'},
    {question: "CAN I MAKE MONEY FROM THIS?", answer: "Absolutely. Just set a monthly subscription price for your community for fans that don't qualify based on their monthly listening history to start earning"}
  ];
  const fanQs = [
    {question: 'WHAT IS MYKO?', answer: 'Myko is an exclusive access community chatroom for music artists and their top fans to more closely connect away from social media'},
    {question: "HOW CAN I JOIN AN ARTIST'S COMMUNITY?", answer: 'placeholder'},
    {question: "WHAT CAN I DO IF I DON'T QUALIFY?", answer: 'placeholder'}
  ];


  return (
    <div className="content">
      <section key="splash" className="splash">
        <div className="landing-text">
          <div className="main">Where artists and their top listeners hang out.</div>
          <div className="sub">Connect with Spotify and see which communities you qualify for!</div>
        </div>
        <div id="landing-phone">
          <img src='/landingPhone.svg' />
        </div>
      </section>
      <section key="join" className="entrance-container">
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
      <section key="gallery" id='artist-gallery'>
            <img src='/badbunny.png' />
            <img src='/taylorswift.jpeg' />
            <img src='/sza.jpg' />
            <img src='/jb.jpeg' />
            <img src='/drake.jpeg' />
            <img src='/edsheeran.jpeg' />
            <img src='/shakira.jpeg' />
      </section>
      <section key="faq">
        <FAQ 
        fanArr={fanQs} 
        artistArr={artistQs} />
      </section>
    </div>
  );
};
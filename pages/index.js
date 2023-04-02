import FadeIn from "../components/FadeIn";

export default function() {
  return (
    <div className="background">
      <header className="topContainer">
        <div className="topSub"></div>
        <div className="topSub">
          <img className="logo" src="/mykoWhite.svg" />
        </div>
        <div className="topSub">
          <button>LOGIN</button>
        </div>
      </header>
      <section className="splash">
        <div className="landing-text">
          <div className="main">Where artists and their top listeners hangout.</div>
          <div className="sub">Connect with Spotify and see which communities you qualify for!</div>
        </div>
        <div>
          <img id="landing-phone" src='/landingPhone.svg' />
        </div>
      </section>
      <section className="entrance-container">
        <FadeIn direction={'left'}>
          <a href="#">
            <div className="rainbow-btn">I'M A FAN</div>
          </a>
        </FadeIn>
        <FadeIn direction={'right'}>
          <a href="#">
          <div className="rainbow-btn">I'M AN ARTIST</div>
          </a>
        </FadeIn>
      </section>
      <section className="entrance-container">
        <FadeIn direction={'left'}>
          <a href="#">
            <div className="rainbow-btn">I'M A FAN</div>
          </a>
        </FadeIn>
        <FadeIn direction={'right'}>
          <a href="#">
          <div className="rainbow-btn">I'M AN ARTIST</div>
          </a>
        </FadeIn>
      </section>
      <section className="entrance-container">
        <FadeIn direction={'left'}>
          <a href="#">
            <div className="rainbow-btn">I'M A FAN</div>
          </a>
        </FadeIn>
        <FadeIn direction={'right'}>
          <a href="#">
          <div className="rainbow-btn">I'M AN ARTIST</div>
          </a>
        </FadeIn>
      </section>
    </div>
  );
};
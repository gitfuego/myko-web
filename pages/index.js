export default function() {
  function handleClick() {
    window.alert('yurrr');
  }
  return (
    <div className="background">
      {/* <div className="logo">
      </div> */}
      <header className="topContainer">
        <div className="topSub"></div>
        <div className="topSub">
          <img className="logo" src="/mykoWhite.svg" />
        </div>
        <div className="topSub">
          <button onClick={handleClick}>LOGIN</button>
        </div>
      </header>
      <section className="splash">
        <div className="landing-text">
          <div className="main">Where artists and their top listeners hangout.</div>
          <div className="sub">Connect with Spotify and see which communities you qualify for!</div>
        </div>
        <div className="landing-img-container">
          <img id="landing-phone" src='/landingPhone.svg' />
        </div>
      </section>
    </div>
  );
};
import '../styles/globals.scss';
import { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';

export default function({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [showLogin, toggleShowLogin] = useState(false);

  function clickLogin() {
    toggleShowLogin(!showLogin);
    document.body.style.overflowY = document.body.style.overflowY === 'hidden' ? 'scroll' : 'hidden';
  }

  function signout() {
    return;
  }
  return (
    <div id="background">
      <Header user={user} handleClick={user === null ? clickLogin : signout} setUser={setUser} />
      {showLogin ? <Login clickLogin={clickLogin} /> : null}
      <Component {...pageProps} />
    </div>
  );
}
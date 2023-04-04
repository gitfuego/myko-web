import '../styles/globals.scss';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  function clickLogin() {
    window.location.href = '/login';
  }

  function signout() {
    return;
  }
  return (
    <div id="background">
      <Header key={'header'} user={user} handleClick={ user === null ? clickLogin : signout} setUser={setUser} />
      <Component {...pageProps} user={user} />
      <Footer key={'footer'}/>
    </div>
  );
}
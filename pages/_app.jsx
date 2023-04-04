import '../styles/globals.scss';
import { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';

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
      <Header user={user} handleClick={user === null ? clickLogin : signout} setUser={setUser} />
      <Component {...pageProps} user={user} />
    </div>
  );
}
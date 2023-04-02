import '../styles/globals.scss';
import { useState } from 'react';
import Header from '../components/Header';

export default function({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [showLogin, toggleShowLogin] = useState(false);
  return (
    <div id="background">
      <Header />
      {showLogin ? <Login /> : <></>}
      <Component {...pageProps} />
    </div>
  );
}
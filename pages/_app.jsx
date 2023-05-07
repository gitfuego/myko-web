import '../styles/globals.scss';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  function clickLogin() {
    router.push('/login');
  }

  function signout() {
    fetch('/api/signout')
    .then(() => {
      setUser(null);
      router.push('/login');
    })
    .catch(() => {
      window.alert('logout error')
    });
  }
  return (
    <div id="background">
      <Header key={'header'} user={user} handleClick={ user === null ? clickLogin : signout} setUser={setUser} />
      <Component {...pageProps} user={user} setUser={setUser} />
      <Footer key={'footer'}/>
    </div>
  );
}
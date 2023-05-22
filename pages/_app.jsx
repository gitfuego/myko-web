import '../styles/globals.scss';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState("");
  const [code, setCode] = useState('');
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState('')

  useEffect(() => {
    if (code) {
      axios.post("/api/spotifyLogin", {
          code,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setRefreshToken(res.data.refreshToken)
          setExpiresIn(res.data.expiresIn)
          router.push('/home');
        })
        .catch(() => {
          window.alert('error with spotifyLogin');
        })
    }
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios.post("/api/spotifyRefresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.alert('error with spotifyRefresh');
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

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
      <Component {...pageProps} user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} code={code} setCode={setCode}/>
      <Footer key={'footer'}/>
    </div>
  );
}
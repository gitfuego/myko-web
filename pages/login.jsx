import { useRouter } from 'next/router.js';
import LIForm from '../components/login/LIForm.jsx';
import LoginFailed from '../components/login/LoginFailed.jsx';
import Phone from '../components/Phone.jsx';
import { useEffect, useState } from 'react';

export default function({ user, setUser }) {
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);

  const checkCookie = () => {
    fetch('/api/login', {
      credentials: 'include',
    })
    .then( (response) => {
      if (response.status === 200) return response.json();
      else return;
    })
    .then( (newUser) => {
      if (newUser !== undefined && newUser !== null) {
        setUser(newUser);
        router.push('/home');
      } else {
        return;
      }
    })
    .catch(() => console.log('error checking cookie'))
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <Phone>
      { loginFailed ? <LoginFailed setLoginFailed={setLoginFailed} /> : ''}
      <LIForm user={user} setUser={setUser} setLoginFailed={setLoginFailed} />
    </Phone>
  )
}